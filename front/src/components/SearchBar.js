import React from 'react';
import { Redirect } from 'react-router-dom';
import '../index.css'
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import axios from 'axios';
import { Dropdown } from 'primereact/dropdown';
import { AutoComplete } from 'primereact/autocomplete';
import Button from '@material-ui/core/Button';
import { Growl } from 'primereact/growl';

export default class SearchBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            result: [],
            checkCustId: false,
            city: null,
            locations: [],
            filteredRestaurants: null,
            buttonActive: false,
            restaurants: [],
            comRestaurants: [],
            restaurant: null,
            restaurantNameError: null,
            reload: false,
            red: false,
            redList: false,
            redRes: false,
            redlocation: '',
        };
        this.showRestaurantError = this.showRestaurantError.bind(this);
        this.showCityError = this.showCityError.bind(this);
        this.classes = this.props.classes
        this.onCityChange = this.onCityChange.bind(this);
        this.filterRestaurants = this.filterRestaurants.bind(this);
    }

    jsUcfirst = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    onCityChange(e) {
        this.setState({ city: e.target.value, restaurant: '', restaurants: [], buttonActive: true, ifLocation: true });
    }

    filterRestaurants(event) {
        setTimeout(() => {
            const restaurantList = this.state.restaurants.map(item => item.restaurantName)
            let results;
            if (event.query.length === 0) {
                results = restaurantList
            }
            else {
                results = restaurantList.filter((restaurant) => {
                    return restaurant.toLowerCase().startsWith(event.query.toLowerCase());
                });
            }
            this.setState({ filteredRestaurants: results });
        }, 10);
    }

    showRestaurantError() {
        this.growl.show({ severity: 'error', summary: 'Restaurant Name Not listed on our website yet!', detail: '' });
    }
    showCityError() {
        this.growl.show({ severity: 'error', summary: 'Please Select a City first!', detail: '' });
    }

    redirectToRestro = () => {
        localStorage.setItem('reloadPage', 'redirect')
        if (this.state.city === null) {
            this.showCityError()
        }
        else if (this.state.restaurant === null || this.state.restaurant === '') {
            this.setState({ red: true })
        }
        else {
            let f = 0
            let rn = null
            this.state.restaurants.map(name => {
                let n = name.restaurantName.toLowerCase()
                if (this.state.restaurant.toLowerCase() === n) {
                    f = 1
                    rn = name.restaurantName
                }
                return null;
            })
            if (f === 1) {
                this.setState({ red: true, restaurantNameError: "", restaurant: rn })
            }
            else {
                this.showRestaurantError()
            }
        }
    }
    getLocation() {
        axios.get('http://localhost:1050/restaurant/getRestaurants/' + this.state.city.code).then(res => {
            this.setState({ restaurants: res.data.message, errorMessage: "" })
        }).catch(error => {
            if (error.res) {
                this.setState({ errorMessage: error.res.data.message })
            }
            else {
                this.setState({ errorMessage: "Server Error" })
            }
        })
    }


    render() {
        if (this.state.ifLocation) {
            this.getLocation()
            this.setState({ ifLocation: false })
        }
        if (this.state.red && (this.state.restaurant === '' || this.state.restaurant === null)) {
            this.setState({ red: false })
            return <Redirect to={"/restaurantList/" + this.state.city.code} push />
        }
        if (this.state.red && this.state.restaurant === '' && this.state.localLoggedIn) {
            this.setState({ red: false })
            return <Redirect to={"/restaurantList/" + this.state.city.code + '/' + this.props.customerId + '/' + this.props.name} push />
        }
        if (this.state.red && this.state.restaurant !== '') {
            this.setState({ red: false })
            return <Redirect to={"/restaurant/" + this.state.city.code + "/" + this.state.restaurant} push />
        }
        if (this.state.localLoggedIn && this.state.red && this.state.restaurant !== '') {
            this.setState({ red: false })
            return <Redirect to={"/restaurant/" + this.state.city.code + "/" + this.state.restaurant + '/' + this.props.customerId + '/' + this.props.name} push />
        }
        const cities = [
            { name: 'Chandigarh', code: 'Chandigarh' },
            { name: 'New Delhi', code: 'New Delhi' },
            { name: 'Mysore', code: 'Mysore' },
        ];
        return (
            <div>
                <div className="d-none d-sm-block">
                    <div className="container" style={{ marginBottom: "20px", marginTop: "20px", position: "relative" }}>
                        <div className="row d-flex content-justify-center" style={{ marginLeft: "15.90%", width:"95%" }}>
                            <Dropdown value={this.state.city} options={cities} size={6} onChange={this.onCityChange} placeholder="Select a City" optionLabel="name" style={{ width: "250px", marginRight: "5px" }} />
                            <span className="p-fluid" >
                                <div className="p-inputgroup">
                                    <AutoComplete value={this.state.restaurant} suggestions={this.state.filteredRestaurants} completeMethod={this.filterRestaurants} size={50} minLength={1}
                                        placeholder="Search Restaurants" dropdown={false} onChange={(e) => this.setState({ restaurant: e.value })} style={{ width: "450px" }} />
                                    <Button onClick={this.redirectToRestro} style={{ background: 'linear-gradient(45deg, #00838F 30%, #00E5FF 90%)', borderRadius: 3, border: 0, color: 'white', height: 35, padding: '0 30px', boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)' }}>
                                        <span className="text text-light">Search</span></Button><br />
                                </div>
                            </span>
                        </div>
                    </div>
                </div>
                <div className="d-block d-sm-none">
                    <div className="container" style={{ marginBottom: "20px", marginTop: "20px", position: "relative" }}>
                        <div className="row d-flex content-justify-center" style={{ margin: "15px" }}>
                            <Dropdown value={this.state.city} options={cities} size={6} onChange={this.onCityChange} placeholder="Select a City" optionLabel="name" style={{ width: "95%", margin: "5px" }} />
                            <span className="p-fluid" >
                                <div className="p-inputgroup">
                                    <AutoComplete value={this.state.restaurant} suggestions={this.state.filteredRestaurants} completeMethod={this.filterRestaurants} size={50} minLength={1}
                                        placeholder="Search Restaurants" dropdown={false} onChange={(e) => this.setState({ restaurant: e.value })} style={{ width: "95%", margin: "5px" }} />
                                </div>
                            </span>
                            <Button onClick={this.redirectToRestro} style={{ background: 'linear-gradient(45deg, #00838F 30%, #00E5FF 90%)', margin: "5px", width: "95%", borderRadius: 3, border: 0, color: 'white', height: 35, padding: '0 30px', boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)' }}>
                                <span className="text text-light">Search</span></Button>
                        </div>
                    </div>
                </div>
                <Growl ref={(el) => this.growl = el} />
            </div>
        )
    }
}
