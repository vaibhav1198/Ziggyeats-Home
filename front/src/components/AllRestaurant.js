import { DataScroller } from 'primereact/datascroller';
import React, { Component } from 'react';
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import NavBar from './navbar';
import '../index.css'
import axios from 'axios';
import { Link } from 'react-router-dom';
import BottomNavBar from './BottomNavbar';
import { ProgressBar } from "primereact/progressbar";
import { Rating } from 'primereact/rating';
import DefaultPage from './DefaultPage'
import SearchBar from './SearchBar'


export default class AllRestaurant extends Component {
    constructor(props) {
        super(props)
        this.state = {
            customerId: this.props.match.params.customerId,
            location: this.props.match.params.location,
            name: this.props.match.params.name,
            temp: false,
            restaurants: [],
            loading: true,
            localLoggedIn: false,
            pathChangeError: false
        }
        this.restaurantsList = this.restaurantsList.bind(this);
    }
    getLocation() {

        axios.get('http://localhost:1050/restaurant/getRestaurantsDetails/' + this.state.location).then(res => {
            //console.log(res.data)

            this.setState({ restaurants: res.data.message, errorMessage: "", loading: false, temp: true })
        }).catch(error => {
            if (error.res) {
                this.setState({ errorMessage: error.res.data.message, pathChangeError: true })
            }
            else {
                this.setState({ errorMessage: "Server Error", pathChangeError: true })
            }
        })
    }

    componentDidMount() {
        window.scrollTo(0, 0);
        if (Number(this.state.customerId)) {
            this.setState({
                localLoggedIn: true,
            })
        }
        this.setState({
            restaurants: []
        })
        let citi = ["Chandigarh", "Mysore", "New Delhi"]
        let f = 0
        for (let i = 0; i < 3; i++) {
            if (citi[i] === this.props.match.params.location) {
                f = 1
            }
        }
        // console.log("sjdfihsidhihi")
        if (f !== 1) {
            this.setState({ pathChangeError: true })
        }
        else {
            this.getLocation()
        }
    }

    restaurantsList(restaurant) {
        // //console.log(restaurant)

        if (!restaurant) {
            return (
                <div className="text text-danger text-center">
                    {this.state.errorMessage}
                </div>
            )
        }
        if (this.state.temp) {
            this.setState({ temp: false })
        }
        return (
            <div>
                {(this.state.localLoggedIn) ?
                    <div>
                        <div className="d-none d-sm-block" >
                            <Link style={{ textDecoration: "none" }} to={"/restaurant/" + this.state.location + '/' + restaurant.restaurantName + '/' + this.state.customerId + '/' + this.state.name} >
                                <div className="card" key={restaurant.restaurantName} style={{ marginBottom: 25, Height: 300, overflow: "auto", background: 'linear-gradient(45deg, #B2EBF2 30%, #E0F7FA 90%)' }}  >
                                    <div className="card-body" style={{ padding: 10 }}>
                                        <div className="row" style={{ margin: 10 }}>
                                            <div className="col-md-3">
                                                {
                                                    restaurant.image === 'uploaded' ?
                                                        <img src={require("../assets/" + restaurant.location + '/' + restaurant.restaurantName + ".jpg")} height="100" width="120" alt="Card imag cap" style={{ float: "left" }} />
                                                        :
                                                        <img src={require("../assets/default-res-back.jpg")} height="100" width="120" alt="Card imag cap" style={{ float: "left" }} />
                                                }
                                            </div>
                                            <div className="col-md-1">
                                            </div>
                                            <div className="col-md-8" style={{ paddingTop: 5 }}>
                                                <span className="text text-dark text-decoration-none align-middle" style={{ fontSize: 22, fontWeight: "bold", textTransform: 'capitalize' }}>{restaurant.restaurantName}</span>
                                                <br />
                                                <span className="text text-dark text-decoration-none align-middle" style={{ fontSize: 15, textTransform: 'capitalize' }}>{restaurant.location}</span>
                                                <span className="text-muted">&nbsp;&#8226;&nbsp;</span> <span className="text text-dark text-decoration-none align-middle" style={{ fontSize: 15, textTransform: 'capitalize' }}>{restaurant.category}</span>
                                                <span className="text text-dark text-decoration-none align-middle" style={{ marginTop: "10px" }}><Rating style={{ marginTop: "10px", color: "yellow" }} value={parseInt((restaurant.ratings) / 20)} readonly={true} stars={5} cancel={false} /> </span>
                                            </div>
                                        </div>
                                        <hr />
                                        <div style={{ marginTop: 10, marginBottom: 10, marginLeft: 20, marginRight: 20 }}>
                                            <table className="table-sm .table-borderless">
                                                <tbody>
                                                    <tr>
                                                        <td className="text text-dark text-decoration-none align-middle" style={{ fontSize: 18, textTransform: 'capitalize' }} >specialty:</td>
                                                        <td className="text text-dark text-decoration-none align-middle" style={{ fontSize: 18, textTransform: 'capitalize' }}>{restaurant.menu[0].dishName}</td>
                                                    </tr>
                                                    <tr>
                                                        <td className="text text-dark text-decoration-none align-middle" style={{ fontSize: 18, textTransform: 'capitalize' }} >Cuisines:</td>
                                                        <td className="text text-dark text-decoration-none align-middle" style={{ fontSize: 18, textTransform: 'capitalize' }}>North Indian, Chinese, Pizza</td>
                                                    </tr>
                                                    <tr>
                                                        {/* <td className="text text-dark text-decoration-none align-middle" style={{ fontSize: 18 }}>Available at ZiggyEats</td> */}
                                                        <td className="text text-dark text-decoration-none align-middle" style={{ fontSize: 15, textTransform: 'capitalize' }} colSpan={2}>{restaurant.meals.map((meal) => { return <span key={restaurant.restaurantName + meal}> &#8226;{meal} </span> })}</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </div>

                        <div className="d-block d-sm-none" >
                            <Link style={{ textDecoration: "none" }} to={"/restaurant/" + this.state.location + '/' + restaurant.restaurantName + '/' + this.state.customerId + '/' + this.state.name} >
                                <div className="card" key={restaurant.restaurantName} style={{ marginBottom: 25, Height: 300, overflow: "auto", background: 'linear-gradient(45deg, #B2EBF2 30%, #E0F7FA 90%)' }}  >
                                    <div className="card-body" style={{ padding: 10 }}>
                                        <div className="row" style={{ margin: 10 }}>
                                            <div className="col-md-3">
                                                {
                                                    restaurant.image === 'uploaded' ?
                                                        <img src={require("../assets/" + restaurant.location + '/' + restaurant.restaurantName + ".jpg")} height="100" width="160" alt="Card imag cap" style={{ float: "left" }} />
                                                        :
                                                        <img src={require("../assets/default-res-back.jpg")} height="100" width="160" alt="Card imag cap" style={{ float: "left" }} />
                                                }
                                            </div>
                                            <div className="col-md-1">
                                            </div>
                                            <div className="col-md-8" style={{ paddingTop: 5 }}>
                                                <span className="text text-dark text-decoration-none align-middle" style={{ fontSize: 22, fontWeight: "bold", textTransform: 'capitalize' }}>{restaurant.restaurantName}</span>
                                                <br />
                                                <span className="text text-dark text-decoration-none align-middle" style={{ fontSize: 15, textTransform: 'capitalize' }}>{restaurant.location}</span>
                                                <span className="text-muted">&nbsp;&#8226;&nbsp;</span> <span className="text text-dark text-decoration-none align-middle" style={{ fontSize: 15, textTransform: 'capitalize' }}>{restaurant.category}</span>
                                                <span className="text text-dark text-decoration-none align-middle" style={{ marginTop: "10px" }}><Rating style={{ marginTop: "10px", color: "yellow" }} value={parseInt((restaurant.ratings) / 20)} readonly={true} stars={5} cancel={false} /> </span>
                                            </div>
                                        </div>
                                        <hr />
                                        <div style={{ marginTop: 10, marginBottom: 10, marginLeft: 20, marginRight: 20 }}>
                                            <table className="table-sm .table-borderless">
                                                <tbody>
                                                    <tr>
                                                        <td className="text text-dark text-decoration-none align-middle" style={{ fontSize: 18, textTransform: 'capitalize' }} >specialty:</td>
                                                        <td className="text text-dark text-decoration-none align-middle" style={{ fontSize: 18, textTransform: 'capitalize' }}>{restaurant.menu[0].dishName}</td>
                                                    </tr>
                                                    <tr>
                                                        <td className="text text-dark text-decoration-none align-middle" style={{ fontSize: 18, textTransform: 'capitalize' }} >Cuisines:</td>
                                                        <td className="text text-dark text-decoration-none align-middle" style={{ fontSize: 18, textTransform: 'capitalize' }}>North Indian, Chinese, Pizza</td>
                                                    </tr>
                                                    <tr>
                                                        {/* <td className="text text-dark text-decoration-none align-middle" style={{ fontSize: 18 }}>Available at ZiggyEats</td> */}
                                                        <td className="text text-dark text-decoration-none align-middle" style={{ fontSize: 15, textTransform: 'capitalize' }} colSpan={2}>{restaurant.meals.map((meal) => { return <span key={restaurant.restaurantName + meal}> &#8226;{meal} </span> })}</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    </div>
                    :
                    <div>
                        <div className="d-none d-sm-block">
                            <Link to={"/restaurant/" + this.state.location + '/' + restaurant.restaurantName} style={{ textDecoration: "none" }}>
                                <div className="card" key={restaurant.restaurantName} style={{ marginBottom: 25, Height: 300, overflow: "auto", background: 'linear-gradient(45deg, #B2EBF2 30%, #E0F7FA 90%)' }} >
                                    <div className="card-body" style={{ padding: 10 }}>
                                        <div className="row" style={{ margin: 10 }}>
                                            <div className="col-md-3">
                                                {
                                                    restaurant.image === 'uploaded' ?
                                                        <img src={require("../assets/" + restaurant.location + '/' + restaurant.restaurantName + ".jpg")} height="100" width="120" alt="Card imag cap" style={{ float: "left" }} />
                                                        :
                                                        <img src={require("../assets/default-res-back.jpg")} height="100" width="120" alt="Card imag cap" style={{ float: "left" }} />
                                                }
                                            </div>
                                            <div className="col-md-1">
                                            </div>
                                            <div className="col-md-8" style={{ paddingTop: 5 }}>
                                                <span className="text text-dark text-decoration-none align-middle" style={{ fontSize: 22, fontWeight: "bold", textTransform: 'capitalize' }}>{restaurant.restaurantName}</span>
                                                <br />
                                                <span className="text text-dark text-decoration-none align-middle" style={{ fontSize: 15, textTransform: 'capitalize' }}>{restaurant.location}</span>
                                                <span className="text-muted">&nbsp;&#8226;&nbsp;</span> <span className="text text-dark text-decoration-none align-middle" style={{ fontSize: 15, textTransform: 'capitalize' }}>{restaurant.category}</span>
                                                <span className="text text-dark text-decoration-none align-middle" style={{ marginTop: "10px" }}><Rating style={{ marginTop: "10px", color: "yellow" }} value={parseInt((restaurant.ratings) / 20)} readonly={true} stars={5} cancel={false} /> </span>
                                            </div>
                                        </div>
                                        <hr />
                                        <div style={{ marginTop: 10, marginBottom: 10, marginLeft: 20, marginRight: 20 }}>
                                            <table className="table-sm .table-borderless">
                                                <tbody>
                                                    <tr>
                                                        <td className="text text-dark text-decoration-none align-middle" style={{ fontSize: 18, textTransform: 'capitalize' }} >specialty:</td>
                                                        <td className="text text-dark text-decoration-none align-middle" style={{ fontSize: 18, textTransform: 'capitalize' }}>{restaurant.menu[0].dishName}</td>
                                                    </tr>
                                                    <tr>
                                                        <td className="text text-dark text-decoration-none align-middle" style={{ fontSize: 18, textTransform: 'capitalize' }} >Cuisines:</td>
                                                        <td className="text text-dark text-decoration-none align-middle" style={{ fontSize: 18, textTransform: 'capitalize' }}>North Indian, Chinese, Pizza</td>
                                                    </tr>
                                                    <tr>
                                                        {/* <td className="text text-dark text-decoration-none align-middle" style={{ fontSize: 18 }}>Available at ZiggyEats</td> */}
                                                        <td className="text text-dark text-decoration-none align-middle" style={{ fontSize: 15, textTransform: 'capitalize' }} colSpan={2}>{restaurant.meals.map((meal) => { return <span key={restaurant.restaurantName + meal}> &#8226;{meal} </span> })}</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </div>

                        <div className="d-block d-sm-none" >
                            <Link to={"/restaurant/" + this.state.location + '/' + restaurant.restaurantName} style={{ textDecoration: "none" }}>
                                <div className="card" key={restaurant.restaurantName} style={{ marginBottom: 25, Height: 300, overflow: "auto", background: 'linear-gradient(45deg, #B2EBF2 30%, #E0F7FA 90%)' }}  >
                                    <div className="card-body" style={{ padding: 10 }}>
                                        <div className="row" style={{ margin: 10 }}>
                                            <div className="col-md-3">
                                                {
                                                    restaurant.image === 'uploaded' ?
                                                        <img src={require("../assets/" + restaurant.location + '/' + restaurant.restaurantName + ".jpg")} height="100" width="160" alt="Card imag cap" style={{ float: "left" }} />
                                                        :
                                                        <img src={require("../assets/default-res-back.jpg")} height="100" width="160" alt="Card imag cap" style={{ float: "left" }} />
                                                }
                                            </div>
                                            <div className="col-md-1">
                                            </div>
                                            <div className="col-md-8" style={{ paddingTop: 5 }}>
                                                <span className="text text-dark text-decoration-none align-middle" style={{ fontSize: 22, fontWeight: "bold", textTransform: 'capitalize' }}>{restaurant.restaurantName}</span>
                                                <br />
                                                <span className="text text-dark text-decoration-none align-middle" style={{ fontSize: 15, textTransform: 'capitalize' }}>{restaurant.location}</span>
                                                <span className="text-muted">&nbsp;&#8226;&nbsp;</span> <span className="text text-dark text-decoration-none align-middle" style={{ fontSize: 15, textTransform: 'capitalize' }}>{restaurant.category}</span>
                                                <span className="text text-dark text-decoration-none align-middle" style={{ marginTop: "10px" }}><Rating style={{ marginTop: "10px", color: "yellow" }} value={parseInt((restaurant.ratings) / 20)} readonly={true} stars={5} cancel={false} /> </span>
                                            </div>
                                        </div>
                                        <hr />
                                        <div style={{ marginTop: 10, marginBottom: 10, marginLeft: 20, marginRight: 20 }}>
                                            <table className="table-sm .table-borderless">
                                                <tbody>
                                                    <tr>
                                                        <td className="text text-dark text-decoration-none align-middle" style={{ fontSize: 18, textTransform: 'capitalize' }} >specialty:</td>
                                                        <td className="text text-dark text-decoration-none align-middle" style={{ fontSize: 18, textTransform: 'capitalize' }}>{restaurant.menu[0].dishName}</td>
                                                    </tr>
                                                    <tr>
                                                        <td className="text text-dark text-decoration-none align-middle" style={{ fontSize: 18, textTransform: 'capitalize' }} >Cuisines:</td>
                                                        <td className="text text-dark text-decoration-none align-middle" style={{ fontSize: 18, textTransform: 'capitalize' }}>North Indian, Chinese, Pizza</td>
                                                    </tr>
                                                    <tr>
                                                        {/* <td className="text text-dark text-decoration-none align-middle" style={{ fontSize: 18 }}>Available at ZiggyEats</td> */}
                                                        <td className="text text-dark text-decoration-none align-middle" style={{ fontSize: 15, textTransform: 'capitalize' }} colSpan={2}>{restaurant.meals.map((meal) => { return <span key={restaurant.restaurantName + meal}> &#8226;{meal} </span> })}</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    </div>
                }
            </div>
        );
    }

    render() {
        if (localStorage.getItem('reloadPage') === "redirect") {
            localStorage.removeItem('reloadPage')
            window.location.reload()
        }
        // console.log(this.state)
        if (this.state.pathChangeError) {
            // this.setState({ pathChangeError: false })
            return (
                <div style={{ minHeight: 500 }}>
                    <NavBar customerId={this.state.customerId} name={this.state.name} home={false} />
                    <DefaultPage customerId={this.props.customerId} name={this.props.name} />
                    <BottomNavBar customerId={this.state.customerId} name={this.state.name} />
                </div>
            );
        }
        else if (this.state.restaurants.length === 0 && this.state.pathChangeError) {
            this.getLocation()
        }
        else if (this.state.loading && !this.state.pathChangeError) {
            return (
                <div>
                    <NavBar customerId={this.state.customerId} name={this.state.name} home={false} />
                    <div className="" style={{ marginTop: 0, minHeight: "420px" }}>
                        {/* <span className="display-4 d-none d-sm-block" style={{ marginLeft: 50 }}>Restaurants in {this.state.location}</span> */}
                        {/* <span className="h4 text-muted d-block d-sm-none" style={{ padding: 10, fontSize: 28 }}>Restaurants in {this.state.location}</span> */}
                        {/* <span className="h4 text-muted d-block d-sm-none" style={{ padding: 10, fontSize: 27 }}>Restaurants in {this.state.location}</span> */}
                        <div className="text-center d-none d-sm-block" style={{ marginTop: 0, minHeight: 600 }}>
                            <ProgressBar mode="indeterminate" style={{ height: "7px" }} />
                        </div>
                        <div className="text-center d-block d-sm-none" style={{ marginTop: 0, minHeight: 400 }}>
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
                    <div className="container-fluid d-none d-sm-block" style={{ marginTop: 30, minHeight: 620 }}>
                        <span className="display-4" style={{ marginLeft: 50 }}>Restaurants in {this.state.location}</span>
                        <div className="row" style={{ marginTop: 50 }}>
                            <div className="col-md-5" style={{ marginLeft: 80 }}>
                                <DataScroller id="datasc" className="p-datascroller-content" value={this.state.restaurants} itemTemplate={this.restaurantsList}
                                    rows={10} buffer={0.4} />
                            </div>
                            <div className="col-md-5 offset-md-1 jumbotron" style={{ background: 'linear-gradient(45deg, #E0F7FA 30%, #E0F7FA 90%)', marginLeft: 5 }}>
                                {/* Cafes */}
                                <h4 className="text-muted" style={{ paddingTop: "2px", paddingBottom: "10px" }}>
                                    Cafes in {this.state.location}
                                </h4>
                                <div className="card-columns">
                                    {this.state.restaurants.map((restaurant) => {
                                        if (restaurant.category === "Cafe" && this.state.customerId) {

                                            return (<Link to={"/restaurant/" + this.state.location + '/' + restaurant.restaurantName + '/' + this.state.customerId + '/' + this.state.name} key={restaurant.restaurantName + restaurant.category + this.state.customerId}>

                                                <div className="card bg-light" style={{ height: "160px" }}>
                                                    {
                                                        restaurant.image === 'uploaded' ?
                                                            <img className="card-img-top" src={require("../assets/" + restaurant.location + '/' + restaurant.restaurantName + ".jpg")} height="65%" alt="Card imag cap" />
                                                            :
                                                            <img className="card-img-top" src={require("../assets/default-res-back.jpg")} height="65%" alt="Card imag cap" />
                                                    }
                                                    {/* <img className="card-img-top" src={require("../assets/" + restaurant.location + "/" + restaurant.restaurantName + ".jpg")} height="65%" /> */}
                                                    <span style={{ marginBottom: "0px" }}>
                                                        <span style={{ fontSize: "2vh", paddingLeft: "2px" }} className="text-muted">
                                                            <strong> {restaurant.restaurantName} </strong>
                                                        </span>
                                                        <br />
                                                        <Rating style={{ marginTop: "2px", color: "yellow" }} value={parseInt((restaurant.ratings) / 20)} readonly={true} stars={5} cancel={false} />
                                                    </span>
                                                </div></Link>
                                            )
                                        }
                                        else if (restaurant.category === "Cafe") {
                                            return (<Link to={"/restaurant/" + this.state.location + '/' + restaurant.restaurantName} key={restaurant.restaurantName + restaurant.category}>

                                                <div className="card bg-light" style={{ height: "160px" }}>
                                                    {
                                                        restaurant.image === 'uploaded' ?
                                                            <img className="card-img-top" src={require("../assets/" + restaurant.location + '/' + restaurant.restaurantName + ".jpg")} height="65%" alt="Card imag cap" />
                                                            :
                                                            <img className="card-img-top" src={require("../assets/default-res-back.jpg")} height="65%" alt="Card imag cap" />
                                                    }
                                                    {/* <img className="card-img-top" src={require("../assets/" + restaurant.location + "/" + restaurant.restaurantName + ".jpg")} height="65%" /> */}
                                                    <div style={{ marginBottom: "0px" }}>
                                                        <span style={{ fontSize: "2vh", paddingLeft: "2px" }} className="text-muted">
                                                            <strong> {restaurant.restaurantName} </strong>
                                                        </span>
                                                        <br />
                                                        <Rating style={{ marginTop: "2px", color: "yellow" }} value={parseInt((restaurant.ratings) / 20)} readonly={true} stars={5} cancel={false} />
                                                    </div>
                                                </div></Link>)
                                        }
                                        return null
                                    })}
                                </div>
                                {/* fine dining */}
                                <h4 className="text-muted" style={{ paddingTop: "2px", paddingBottom: "6px" }}>
                                    Pocket Friendly in {this.state.location}
                                </h4>
                                <div className="card-columns">
                                    {this.state.restaurants.map((restaurant) => {
                                        if (restaurant.category === "Pocket Friendly" && this.state.customerId) {
                                            return (<Link to={"/restaurant/" + this.state.location + '/' + restaurant.restaurantName + '/' + this.state.customerId + '/' + this.state.name} key={restaurant.restaurantName + restaurant.category + this.state.customerId}>
                                                <div className="card bg-light" style={{ height: "160px" }}>
                                                    {
                                                        restaurant.image === 'uploaded' ?
                                                            <img className="card-img-top" src={require("../assets/" + restaurant.location + '/' + restaurant.restaurantName + ".jpg")} height="65%" alt="Card imag cap" />
                                                            :
                                                            <img className="card-img-top" src={require("../assets/default-res-back.jpg")} height="65%" alt="Card imag cap" />
                                                    }
                                                    {/* <img className="card-img-top" src={require("../assets/" + restaurant.location + "/" + restaurant.restaurantName + ".jpg")} height="65%" /> */}
                                                    <span style={{ marginBottom: "0px" }}>
                                                        <span style={{ fontSize: "2vh", paddingLeft: "2px" }} className="text-muted">
                                                            <strong> {restaurant.restaurantName} </strong>
                                                        </span>
                                                        <br />
                                                        <Rating style={{ marginTop: "2px", color: "yellow" }} value={parseInt((restaurant.ratings) / 20)} readonly={true} stars={5} cancel={false} />
                                                    </span>
                                                </div></Link>
                                            )
                                        }
                                        else if (restaurant.category === "Pocket Friendly") {
                                            return (<Link to={"/restaurant/" + this.state.location + '/' + restaurant.restaurantName} key={restaurant.restaurantName + restaurant.category}>
                                                <div className="card bg-light" style={{ height: "160px" }}>
                                                    {
                                                        restaurant.image === 'uploaded' ?
                                                            <img className="card-img-top" src={require("../assets/" + restaurant.location + '/' + restaurant.restaurantName + ".jpg")} height="65%" alt="Card imag cap" />
                                                            :
                                                            <img className="card-img-top" src={require("../assets/default-res-back.jpg")} height="65%" alt="Card imag cap" />
                                                    }
                                                    <div style={{ marginBottom: "0px" }}>
                                                        <span style={{ fontSize: "2vh", paddingLeft: "2px" }} className="text-muted">
                                                            <strong> {restaurant.restaurantName} </strong>
                                                        </span>
                                                        <br />
                                                        <Rating style={{ marginTop: "2px", color: "yellow" }} value={parseInt((restaurant.ratings) / 20)} readonly={true} stars={5} cancel={false} />
                                                    </div>
                                                </div></Link>)
                                        }
                                        return null
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* small screen */}
                    <div className="container-fluid d-block d-sm-none" style={{ marginTop: 30, minHeight: 620 }}>
                        <span className="h4 text-muted" style={{ padding: 10, fontSize: 28 }}>Restaurants in {this.state.location}</span>
                        <div className="row" style={{ marginTop: 20 }}>
                            <div className="col-xs-5" style={{ padding: 5 }}>
                                <DataScroller id="datasc" className="p-datascroller-content" value={this.state.restaurants} itemTemplate={this.restaurantsList}
                                    rows={10} buffer={0.4} />
                            </div>
                            <div className="col-xs-5 offset-xs-1 jumbotron" style={{ background: 'linear-gradient(45deg, #E0F7FA 30%, #E0F7FA 90%)', marginLeft: 15, marginRight: 15 }}>
                                {/* Cafes */}
                                <span className="h4 text-muted" style={{ paddingTop: "2px", paddingBottom: "10px" }}>
                                    Cafes in {this.state.location}
                                </span>
                                <div className="card-columns">
                                    {this.state.restaurants.map((restaurant) => {
                                        if (restaurant.category === "Cafe" && this.state.customerId) {
                                            return (<Link to={"/restaurant/" + this.state.location + '/' + restaurant.restaurantName + '/' + this.state.customerId + '/' + this.state.name} key={restaurant.restaurantName + restaurant.category + this.state.customerId}>
                                                <div className="card bg-light" style={{ height: "200px" }}>
                                                    {
                                                        restaurant.image === 'uploaded' ?
                                                            <img className="card-img-top" src={require("../assets/" + restaurant.location + '/' + restaurant.restaurantName + ".jpg")} height="65%" alt="Card imag cap" />
                                                            :
                                                            <img className="card-img-top" src={require("../assets/default-res-back.jpg")} height="65%" alt="Card imag cap" />
                                                    }
                                                    {/* <img className="card-img-top" src={require("../assets/" + restaurant.location + "/" + restaurant.restaurantName + ".jpg")} height="65%" /> */}
                                                    <span style={{ marginBottom: "0px" }}>
                                                        <span style={{ fontSize: "3vh", paddingLeft: "4px" }} className="text-muted">
                                                            <strong> {restaurant.restaurantName} </strong>
                                                        </span>
                                                        <br />
                                                        <Rating style={{ marginTop: "10px", color: "yellow" }} value={parseInt((restaurant.ratings) / 20)} readonly={true} stars={5} cancel={false} />
                                                    </span>
                                                </div></Link>
                                            )
                                        }
                                        else if (restaurant.category === "Cafe") {
                                            return (<Link to={"/restaurant/" + this.state.location + '/' + restaurant.restaurantName} key={restaurant.restaurantName + restaurant.category}>

                                                <div className="card bg-light" style={{ height: "200px" }}>
                                                    {
                                                        restaurant.image === 'uploaded' ?
                                                            <img className="card-img-top" src={require("../assets/" + restaurant.location + '/' + restaurant.restaurantName + ".jpg")} height="65%" alt="Card imag cap" />
                                                            :
                                                            <img className="card-img-top" src={require("../assets/default-res-back.jpg")} height="65%" alt="Card imag cap" />
                                                    }
                                                    {/* <img className="card-img-top" src={require("../assets/" + restaurant.location + "/" + restaurant.restaurantName + ".jpg")} height="65%" /> */}
                                                    <div style={{ marginBottom: "0px" }}>
                                                        <span style={{ fontSize: "3vh", paddingLeft: "4px" }} className="text-muted">
                                                            <strong> {restaurant.restaurantName} </strong>
                                                        </span>
                                                        <br />
                                                        <Rating style={{ marginTop: "10px", color: "yellow" }} value={parseInt((restaurant.ratings) / 20)} readonly={true} stars={5} cancel={false} />
                                                    </div>
                                                </div></Link>)
                                        }
                                        return null
                                    })}
                                </div>
                                {/* fine dining */}
                                <h4 className="text-muted" style={{ marginTop: "15px", paddingBottom: "10px" }}>
                                    Pocket Friendly in {this.state.location}
                                </h4>
                                <div className="card-columns">
                                    {this.state.restaurants.map((restaurant) => {
                                        if (restaurant.category === "Pocket Friendly" && this.state.customerId) {
                                            return (<Link to={"/restaurant/" + this.state.location + '/' + restaurant.restaurantName + '/' + this.state.customerId + '/' + this.state.name} key={restaurant.restaurantName + restaurant.category + this.state.customerId}>

                                                <div className="card bg-light" style={{ height: "180px" }}>
                                                    {
                                                        restaurant.image === 'uploaded' ?
                                                            <img className="card-img-top" src={require("../assets/" + restaurant.location + '/' + restaurant.restaurantName + ".jpg")} height="65%" alt="Card imag cap" />
                                                            :
                                                            <img className="card-img-top" src={require("../assets/default-res-back.jpg")} height="65%" alt="Card imag cap" />
                                                    }
                                                    {/* <img className="card-img-top" src={require("../assets/" + restaurant.location + "/" + restaurant.restaurantName + ".jpg")} height="65%" /> */}
                                                    <div style={{ marginBottom: "0px" }}>
                                                        <span style={{ fontSize: "3vh", paddingLeft: "4px" }} className="text-muted">
                                                            <strong> {restaurant.restaurantName} </strong>
                                                        </span>
                                                        <br />
                                                        <Rating style={{ marginTop: "10px", color: "yellow" }} value={parseInt((restaurant.ratings) / 20)} readonly={true} stars={5} cancel={false} />
                                                    </div>
                                                </div></Link>
                                            )
                                        }
                                        else if (restaurant.category === "Pocket Friendly") {
                                            return (<Link to={"/restaurant/" + this.state.location + '/' + restaurant.restaurantName} key={restaurant.restaurantName + restaurant.category}>
                                                <div className="card bg-light" style={{ height: "180px" }}>
                                                    {
                                                        restaurant.image === 'uploaded' ?
                                                            <img className="card-img-top" src={require("../assets/" + restaurant.location + '/' + restaurant.restaurantName + ".jpg")} height="65%" alt="Card imag cap" />
                                                            :
                                                            <img className="card-img-top" src={require("../assets/default-res-back.jpg")} height="65%" alt="Card imag cap" />
                                                    }
                                                    <div style={{ marginBottom: "0px" }}>
                                                        <span style={{ fontSize: "3vh", paddingLeft: "4px" }} className="text-muted">
                                                            <strong> {restaurant.restaurantName} </strong>
                                                        </span>
                                                        <br />
                                                        <Rating style={{ marginTop: "10px", color: "yellow" }} value={parseInt((restaurant.ratings) / 20)} readonly={true} stars={5} cancel={false} />
                                                    </div>
                                                </div></Link>)
                                        }
                                        return null
                                    })}
                                </div>

                            </div>
                        </div>
                    </div>
                    <BottomNavBar customerId={this.state.customerId} name={this.state.name} />
                </div>
            )
        }
    }
}