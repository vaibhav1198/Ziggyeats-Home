import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import NavBar from './navbar'
import BottomNavBar from './BottomNavbar'
import { ProgressBar } from "primereact/progressbar";
import SearchBar from './SearchBar'

class LocationList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            customerId: this.props.match.params.customerId,
            location: ['Chandigarh', 'New Delhi', 'Mysore'],
            name: this.props.match.params.name,
            temp: false,
            restaurants: {},
            loading: true,
            localLoggedIn: false,
        }

        this.restaurantsList = this.restaurantsList.bind(this);
    }
    componentDidMount() {
        if (Number(this.state.customerId)) {
            this.setState({
                localLoggedIn: true
            })
        }
        this.getLocation()
    }

    getLocation() {
        this.state.location.map(location => {
            let restaurants = this.state.restaurants
            axios.get('http://localhost:1050/restaurant/getRestaurantsDetails/' + location).then(res => {
                restaurants[location] = res.data.message
                this.setState({ restaurants: restaurants, errorMessage: "", loading: false, temp: true })
            }).catch(error => {
                if (error.res) {
                    this.setState({ errorMessage: error.res.data.message })
                }
                else {
                    this.setState({ errorMessage: "Server Error" })
                }
            })
            return null
        })
    }

    restaurantsList(restaurant) {
        return (
            <div key={restaurant.restaurantName}>
                <div className="d-none d-sm-block">
                    <div key={restaurant.restaurantName}>
                        {(this.state.localLoggedIn) ?
                            <div>
                                <div className="col-md-4" style={{}}>
                                    <Link style={{ textDecoration: "none" }} to={"/restaurant/" + restaurant.location + '/' + restaurant.restaurantName + '/' + this.state.customerId + '/' + this.state.name}>
                                        <div className="card" key={restaurant.restaurantName} style={{ marginBottom: 25, width: 350, overflow: "auto" }} >
                                            {
                                                restaurant.image === 'uploaded' ?
                                                    <img className="card-img-top" src={require("../assets/" + restaurant.location + '/' + restaurant.restaurantName + ".jpg")} height="180" alt="Card imag cap" />
                                                    :
                                                    <img className="card-img-top" src={require("../assets/default-res-back.jpg")} height="180" alt="Card imag cap" />
                                            }
                                            {/* <img className="card-img-top" src={require("../assets/" + restaurant.location + '/' + restaurant.restaurantName + ".jpg")} height="180" alt="Card imag cap" /> */}
                                            <div style={{ paddingTop: 5 }}>
                                                <div className="card-body" style={{ padding: 10 }}>
                                                    <span className="text text-dark text-decoration-none align-middle" style={{ fontSize: 20, fontWeight: "bold", textTransform: 'capitalize' }}>{restaurant.restaurantName}</span>
                                                    <br />
                                                    <span className="text text-muted text-decoration-none align-middle" style={{ fontSize: 12, textTransform: 'capitalize' }}>{restaurant.location}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                            :
                            <div>
                                <div className="col-md-4" style={{}}>
                                    <Link to={"/restaurant/" + restaurant.location + '/' + restaurant.restaurantName} style={{ textDecoration: "none" }} >
                                        <div className="card" key={restaurant.restaurantName} style={{ marginBottom: 25, width: 350, overflow: "auto" }} >
                                            {
                                                restaurant.image === 'uploaded' ?
                                                    <img className="card-img-top" src={require("../assets/" + restaurant.location + '/' + restaurant.restaurantName + ".jpg")} height="180" alt="Card imag cap" />
                                                    :
                                                    <img className="card-img-top" src={require("../assets/default-res-back.jpg")} height="180" alt="Card imag cap" />
                                            }
                                            {/* <img className="card-img-top" src={require("../assets/" + restaurant.location + '/' + restaurant.restaurantName + ".jpg")} height="180" alt="Card imag cap" /> */}
                                            <div style={{ paddingTop: 5 }}>
                                                <div className="card-body" style={{ padding: 10 }}>
                                                    <span className="text text-dark text-decoration-none align-middle" style={{ fontSize: 20, fontWeight: "bold", textTransform: 'capitalize' }}>{restaurant.restaurantName}</span>
                                                    <br />
                                                    <span className="text text-muted text-decoration-none align-middle" style={{ fontSize: 12, textTransform: 'capitalize' }}>{restaurant.location}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        }
                    </div>
                </div>
                <div className="d-block d-sm-none">
                    <div key={restaurant.restaurantName}>
                        {(this.state.localLoggedIn) ?
                            <div>
                                <div className="col-xs-10" style={{padding:15}}>
                                    <Link style={{ textDecoration: "none" }} to={"/restaurant/" + restaurant.location + '/' + restaurant.restaurantName + '/' + this.state.customerId + '/' + this.state.name}>
                                        <div className="card" key={restaurant.restaurantName} style={{ marginBottom: 25, width: "95%", overflow: "auto" }} >
                                            {
                                                restaurant.image === 'uploaded' ?
                                                    <img className="card-img-top" src={require("../assets/" + restaurant.location + '/' + restaurant.restaurantName + ".jpg")} height="180" alt="Card imag cap" />
                                                    :
                                                    <img className="card-img-top" src={require("../assets/default-res-back.jpg")} height="180" alt="Card imag cap" />
                                            }
                                            {/* <img className="card-img-top" src={require("../assets/" + restaurant.location + '/' + restaurant.restaurantName + ".jpg")} height="180" alt="Card imag cap" /> */}
                                            <div style={{ paddingTop: 5 }}>
                                                <div className="card-body" style={{ padding: 10 }}>
                                                    <span className="text text-dark text-decoration-none align-middle" style={{ fontSize: 20, fontWeight: "bold", textTransform: 'capitalize' }}>{restaurant.restaurantName}</span>
                                                    <br />
                                                    <span className="text text-muted text-decoration-none align-middle" style={{ fontSize: 12, textTransform: 'capitalize' }}>{restaurant.location}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                            :
                            <div>
                                <div className="col-xs-10 " style={{padding:15}}>
                                    <Link to={"/restaurant/" + restaurant.location + '/' + restaurant.restaurantName} style={{ textDecoration: "none" }} >
                                        <div className="card" key={restaurant.restaurantName} style={{ marginBottom: 25, width: "95%", overflow: "auto" }} >
                                            {
                                                restaurant.image === 'uploaded' ?
                                                    <img className="card-img-top" src={require("../assets/" + restaurant.location + '/' + restaurant.restaurantName + ".jpg")} height="180" alt="Card imag cap" />
                                                    :
                                                    <img className="card-img-top" src={require("../assets/default-res-back.jpg")} height="180" alt="Card imag cap" />
                                            }
                                            {/* <img className="card-img-top" src={require("../assets/" + restaurant.location + '/' + restaurant.restaurantName + ".jpg")} height="180" alt="Card imag cap" /> */}
                                            <div style={{ paddingTop: 5 }}>
                                                <div className="card-body" style={{ padding: 10 }}>
                                                    <span className="text text-dark text-decoration-none align-middle" style={{ fontSize: 20, fontWeight: "bold", textTransform: 'capitalize' }}>{restaurant.restaurantName}</span>
                                                    <br />
                                                    <span className="text text-muted text-decoration-none align-middle" style={{ fontSize: 12, textTransform: 'capitalize' }}>{restaurant.location}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        }
                    </div>
                </div>
            </div>
        );
    }

    tempData = (item) => {

        var cardy = []
        Object.size = function (obj) {
            var size = 0, key;
            for (key in obj) {
                if (obj.hasOwnProperty(key)) size++;
            }
            return size;
        };
        var size = Object.size(item)

        if (size <= 6) {
            for (let i = 0; i < size; i++) {
                cardy.push(this.restaurantsList(item[i]))
            }
        }
        else {
            for (let i = 0; i < 6; i++) {
                cardy.push(this.restaurantsList(item[i]))
            }
        }
        return cardy
    }

    render() {
        if (this.state.restaurants.length === 0) {
            this.getLocation()
        }
        if (this.state.loading) {
            return (
                <div>
                    <NavBar customerId={this.state.customerId} name={this.state.name} home={false} />
                    <div className="text-center" style={{ minHeight: 600 }}>
                        <div className="text-center d-none d-sm-block" style={{ minHeight: 600 }}>
                            <ProgressBar mode="indeterminate" style={{ height: "7px" }} />
                        </div>
                        <div className="text-center d-block d-sm-none" style={{ minHeight: 400 }}>
                            <ProgressBar mode="indeterminate" style={{ height: "5px" }} />
                        </div>
                    </div>
                    <BottomNavBar customerId={this.state.customerId} name={this.state.name} />
                </div>
            )
        }
        else {
            return (
                <div style={{}}>
                    <NavBar customerId={this.state.customerId} name={this.state.name} home={false} />
                    <div className="d-block d-sm-none">
                        <SearchBar />
                    </div>
                    <div className="container d-none d-sm-block" style={{ marginTop: 30, minHeight: 620, marginBottom: 50 }}>
                        {this.state.location.map(location => {
                            return (
                                <div key={location}>
                                    <div className="row" style={{ paddingTop: 5, paddingBottom: 10, marginTop: 10, marginBottom: 50, background: 'linear-gradient(45deg, #E0F7FA 30%, #E0F7FA 90%)' }}>
                                        <div className="display-4 text text-dark d-none d-md-block" style={{ marginLeft: 40, paddingLeft: 40, marginTop: 15, marginBottom: 15 }}>Famous Restaurants in {location}</div><br />
                                        {this.tempData(this.state.restaurants[location])}
                                    </div>
                                </div>
                            )
                        })
                        }
                    </div>

                    <div className="container d-block d-sm-none" style={{ marginTop: 30, minHeight: 620, marginBottom: 50, marginLeft: 10, marginRight: 10 }}>
                        {this.state.location.map(location => {
                            return (
                                <div key={location}>
                                    <div className="row" style={{ paddingTop: 5, paddingBottom: 10, paddingLeft: 10, paddingRight: 10, marginTop: 10, marginBottom: 50, background: 'linear-gradient(45deg, #E0F7FA 30%, #E0F7FA 90%)' }}>
                                        <div className="text-dark text-center d-block d-sm-none" style={{ fontSize: 22, marginTop: 15, marginBottom: 15 }}>Famous Restaurants in {location}</div><br />
                                        {this.tempData(this.state.restaurants[location])}
                                    </div>
                                </div>
                            )
                        })
                        }
                    </div>
                    <BottomNavBar customerId={this.state.customerId} name={this.state.name} />
                </div>
            )
        }
    }
}
export default LocationList;