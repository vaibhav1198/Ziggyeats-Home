import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import NavBar from './navbar'
import BottomNavBar from './BottomNavbar'
import { ProgressBar } from "primereact/progressbar";
import SearchBar from './SearchBar'

class CategoryList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            customerId: this.props.match.params.customerId,
            location: localStorage.getItem('currentCity'),
            category: ['Bakery', 'Fine Dining', 'Cafe', 'Buffet', 'Pocket Friendly'],
            name: this.props.match.params.name,
            temp: false,
            restaurants: {},
            restro: [],
            loading: true,
            localLoggedIn: false,
        }
        this.temp = this.state.restaurants
        this.state.category.map(cat => {
            this.temp[cat] = [];
            return null
        })
        this.setState({ restaurants: this.temp })
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
        axios.get('/restaurant/getRestaurantsDetails/' + this.state.location).then(res => {
            // console.log(res.data.message)
            this.setState({ restro: res.data.message, errorMessage: "", loading: false, temp: true })
        }).catch(error => {
            if (error.res) {
                this.setState({ errorMessage: error.res.data.message })
            }
            else {
                this.setState({ errorMessage: "Server Error" })
            }
        })
    }

    catList = () => {
        this.state.category.map(category => {
            let restaurants = this.state.restaurants
            // console.log(restaurants)
            this.state.restro.map(rest => {
                if (category === rest.category) {
                    restaurants[category].push(rest)
                }
                return null;
            })
            this.setState({ restaurants: restaurants })
            return null
        })
        this.setState({ temp: false })
    }

    restaurantsList = (restaurant) => {
        // console.log(restaurant)
        return (
            <div key={restaurant.restaurantName + " "+ restaurant.trendCount + "14" + restaurant.ratings}>
                <div className="d-none d-sm-block">
                    <div key={restaurant.restaurantName + "14" + restaurant.ratings}>
                        {(this.state.localLoggedIn) ?
                            <div key={restaurant.restaurantName + " "+ restaurant.trendCount + "14" + restaurant.ratings}>
                                <div className="col-md-4" style={{}}>
                                    <Link style={{ textDecoration: "none" }} to={"/restaurant/" + restaurant.location + '/' + restaurant.restaurantName + '/' + this.state.customerId + '/' + this.state.name}>
                                        <div className="card" key={restaurant.restaurantName} style={{ marginBottom: 25, width: 320, overflow: "auto" }} >
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
                            <div key={restaurant.trendCount + " " + restaurant.restaurantName +  "14" + restaurant.ratings}>
                                <div className="col-md-4" style={{}}>
                                    <Link to={"/restaurant/" + restaurant.location + '/' + restaurant.restaurantName} style={{ textDecoration: "none" }} >
                                        <div className="card" key={restaurant.restaurantName} style={{ marginBottom: 25, width: 320, overflow: "auto" }} >
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
                    <div key={restaurant.restaurantName + "14" + restaurant.ratings}>
                        {(this.state.localLoggedIn) ?
                            <div key={restaurant.restaurantName + " " + restaurant.trendCount + "14" + restaurant.ratings}>
                                <div className="col-xs-12" style={{ padding: 15 }}>
                                    <Link style={{ textDecoration: "none" }} to={"/restaurant/" + restaurant.location + '/' + restaurant.restaurantName + '/' + this.state.customerId + '/' + this.state.name}>
                                        <div className="card" key={restaurant.restaurantName} style={{ marginBottom: 25, width: "100%", overflow: "auto" }} >
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
                            <div key={restaurant.restaurantName + "14" + restaurant.ratings + restaurant.trendCount}>
                                <div className="col-xs-12" style={{ padding: 15 }}>
                                    <Link to={"/restaurant/" + restaurant.location + '/' + restaurant.restaurantName} style={{ textDecoration: "none" }} >
                                        <div className="card" key={restaurant.restaurantName} style={{ marginBottom: 25, width: "100%", overflow: "auto" }} >
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
        if (this.state.temp && !this.state.loading) {
            this.catList()
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
                    <div className="row">
                        <div className="display-3 container text text-center text-dark" style={{ background: "none", marginTop: 15, marginBottom: 15 }}>{this.state.location}</div><br />
                    </div>
                    <div className="container d-none d-sm-block" style={{ marginTop: 10, minHeight: 620, marginBottom: 15 }}>
                        {this.state.category.map(category => {
                            return (
                                <div className="jumbotron" key={category} style={{ paddingTop: 10, marginTop: 10, marginBottom: 10, background: 'linear-gradient(45deg, #E0F7FA 30%, #E0F7FA 90%)' }}>
                                    <div className="row">
                                        <div className="display-4 text text-dark d-none d-md-block" style={{ marginTop: 15, marginBottom: 15 }}>{category}</div><br />
                                    </div>
                                    <div className="row">
                                        {this.tempData(this.state.restaurants[category])}
                                    </div>
                                </div>
                            )
                        })
                        }
                    </div>

                    <div className="container d-block d-sm-none" style={{ margin: 5, minHeight: 320 }}>
                        {this.state.category.map(category => {
                            return (
                                <div className="jumbotron" key={category} style={{ paddingTop: 10, marginTop: 10, marginBottom: 10, background: 'linear-gradient(45deg, #E0F7FA 30%, #E0F7FA 90%)' }}>
                                    <div className="row">
                                        <div className="h4 text text-dark container" style={{ marginTop: 15, marginBottom: 15 }}>{category}</div><br />
                                    </div>
                                    <div className="row">
                                        {this.tempData(this.state.restaurants[category])}
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
export default CategoryList;