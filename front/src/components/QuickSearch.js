import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Rating } from "primereact/rating";
import NavBar from "./navbar";
import BottomNavBar from './BottomNavbar';
import { ProgressBar } from 'primereact/progressbar';
import DefaultPage from './DefaultPage'
import SearchBar from './SearchBar'
class QuickSearch extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            customerId: this.props.match.params.customerId,
            name: this.props.match.params.name,
            location: this.props.match.params.location,
            key: this.props.match.params.key,
            restaurants: [],
            result: [],
            flag1: true,
            loading: true,
            pathChangeError: false
        }
    }
    componentDidMount = () => {
        let location = this.state.location
        if (this.state.location === "Mysuru") {
            location = "Mysore"
        }
        let citi = ["Chandigarh", "Mysore", "New Delhi"]
        let f = 0
        for (let i = 0; i < 3; i++) {
            if (citi[i] === location) {
                f = 1
            }
        }
        if (f !== 1) {
            this.setState({ pathChangeError: true })
        }
        else {
            axios.get("/restaurant/getRestaurantsDetails/" + location).then((response) => {
                // console.log(response)
                this.setState({ restaurants: response.data.message, loading: false })
            }).catch((err) => {
                if (err.response) {
                    // console.log(err.response.data.message)
                    this.setState({ errorMessage: err.response.data.message })
                }
                else {
                    this.setState({ errorMessage: "server error" })
                }
            })
        }
    }

    filterResult = () => {
        var result = []
        if (this.state.key === "Breakfast") {
            for (let i = 0; i < this.state.restaurants.length; i++) {
                if (this.state.restaurants[i].meals.includes("Breakfast")) {
                    result.push(this.state.restaurants[i])
                }
            }
        }
        if (this.state.key === "Lunch") {
            for (let i = 0; i < this.state.restaurants.length; i++) {
                if (this.state.restaurants[i].meals.includes("Lunch")) {
                    result.push(this.state.restaurants[i])
                }
            }
        }

        if (this.state.key === "Dinner") {
            for (let i = 0; i < this.state.restaurants.length; i++) {
                if (this.state.restaurants[i].meals.includes("Dinner")) {
                    result.push(this.state.restaurants[i])
                }
            }
        }

        if (this.state.key === "Cafes") {
            for (let i = 0; i < this.state.restaurants.length; i++) {
                if (this.state.restaurants[i].category === "Cafe") {
                    result.push(this.state.restaurants[i])
                }
            }
        }

        if (this.state.key === "Dining") {
            for (let i = 0; i < this.state.restaurants.length; i++) {
                if (this.state.restaurants[i].category === "Fine Dining") {
                    result.push(this.state.restaurants[i])
                }
            }
        }

        if (this.state.key === "Pocket") {
            for (let i = 0; i < this.state.restaurants.length; i++) {
                if (this.state.restaurants[i].category === "Pocket Friendly") {
                    result.push(this.state.restaurants[i])
                }
            }
        }
        if (result.length === 0) {
            this.setState({ pathChangeError: true })
        }
        else {
            this.setState({ result: result })
        }
    }

    render() {
        if (this.state.pathChangeError) {
            return (
                <div style={{ minHeight: 500 }}>
                    <NavBar customerId={this.state.customerId} name={this.state.name} home={false} />
                    <DefaultPage customerId={this.props.customerId} name={this.props.name} />
                    <BottomNavBar customerId={this.state.customerId} name={this.state.name} />
                </div>
            );
        }
        else if (this.state.restaurants.length > 0 && this.state.flag1) {
            this.setState({
                flag1: false
            })
            this.filterResult()
        }
        if (this.state.loading) {
            return (
                <div>
                    <NavBar customerId={this.state.customerId} name={this.state.name} home={false} />
                    <div style={{ minHeight: "450px" }}>
                        <ProgressBar mode="indeterminate" style={{ height: "6px" }} />
                    </div>
                    <BottomNavBar customerId={this.state.customerId} name={this.state.name} />
                </div>
            )
        }
        else {
            return (
                <React.Fragment>
                    <NavBar customerId={this.state.customerId} name={this.state.name} home={false} />
                    <div className="d-block d-sm-none">
                        <SearchBar />
                    </div>
                    <div className="container jumbotron" style={{ marginBottom: 40, marginTop: 40, paddingTop: 25, background: 'linear-gradient(45deg, #E0F7FA 30%, #E0F7FA 90%)' }}>
                        <div className="row">
                            <div className="col-md-12 d-none d-sm-block">
                                <div className="display-4 text-center text-dark" style={{ marginLeft: 40, paddingLeft: 40, marginTop: 15, marginBottom: 15 }}>{this.state.key} in {this.state.location}</div><br />
                                <div className="card-columns">
                                    {(this.state.customerId) ? this.state.result.map((restaurant) => {
                                        return (
                                            <Link to={'/restaurant/' + restaurant.location + '/' + restaurant.restaurantName + '/' + this.state.customerId + '/' + this.state.name} key={restaurant.restaurantName}>
                                                <div className="card bg-light">
                                                    {
                                                        restaurant.image === 'uploaded' ?
                                                            <img alt="" className="card-img-top" src={require('../assets/' + restaurant.location + '/' + restaurant.restaurantName + ".jpg")} height="180" />
                                                            :
                                                            <img src={require("../assets/default-res-back.jpg")} height="180" className="card-img-top" alt="Card imag cap" />
                                                    }
                                                    <div style={{ paddingTop: 5 }}>
                                                        <div className="card-body" style={{ padding: 10 }}>
                                                            <span className="text text-dark text-decoration-none align-middle" style={{ fontSize: 25, fontWeight: "bold" }}>{restaurant.restaurantName}</span>
                                                            <br />
                                                            <span className="text text-dark text-decoration-none align-middle" style={{ fontSize: 19, textTransform: 'capitalize' }}>{restaurant.category}</span>
                                                            <span className="text text-dark text-decoration-none align-middle" style={{ marginTop: "10px" }}>
                                                                <Rating style={{ marginTop: "10px", color: "yellow" }} value={parseInt((restaurant.ratings) / 20)} readonly={true} stars={5} cancel={false} /> </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Link>
                                        )
                                    })
                                        :
                                        this.state.result.map((restaurant) => {
                                            return (
                                                <Link to={'/restaurant/' + restaurant.location + '/' + restaurant.restaurantName}>
                                                    <div className="card bg-light" key={restaurant.restaurantName + restaurant.ratings + "15"}>
                                                        {
                                                            restaurant.image === 'uploaded' ?
                                                                <img alt="" className="card-img-top" src={require('../assets/' + restaurant.location + '/' + restaurant.restaurantName + ".jpg")} height="180" />
                                                                :
                                                                <img src={require("../assets/default-res-back.jpg")} height="180" className="card-img-top" alt="Card imag cap" />
                                                        }
                                                        <div style={{ paddingTop: 5 }}>
                                                            <div className="card-body" style={{ padding: 10 }}>
                                                                <span className="text text-dark text-decoration-none align-middle" style={{ fontSize: 25, fontWeight: "bold" }}>{restaurant.restaurantName}</span>
                                                                <br />
                                                                <span className="text text-dark text-decoration-none align-middle" style={{ fontSize: 19, textTransform: 'capitalize' }}>{restaurant.category}</span>
                                                                <span className="text text-dark text-decoration-none align-middle" style={{ marginTop: "10px" }}>
                                                                    <Rating style={{ marginTop: "10px", color: "yellow" }} value={parseInt((restaurant.ratings) / 20)} readonly={true} stars={5} cancel={false} /> </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Link>
                                            )
                                        })}
                                </div>
                            </div>
                            <div className="col-xs-12 d-block d-sm-none" style={{}}>
                                <div className="text-dark" style={{ fontSize: 30, marginLeft: 30, paddingLeft: 40, marginTop: 15, marginBottom: 10 }}>{this.state.key} in {this.state.location}</div><br />
                                <div className="card-columns">
                                    {
                                        (this.state.customerId) ?
                                            this.state.result.map((restaurant) => {
                                                return (
                                                    <Link to={'/restaurant/' + restaurant.location + '/' + restaurant.restaurantName + '/' + this.state.customerId + '/' + this.state.name} key={restaurant.restaurantName}>
                                                        <div className="card bg-light" style={{ margin: 10 }}>
                                                            {
                                                                restaurant.image === 'uploaded' ?
                                                                    <img alt="" className="card-img-top" src={require('../assets/' + restaurant.location + '/' + restaurant.restaurantName + ".jpg")} height="180" />
                                                                    :
                                                                    <img src={require("../assets/default-res-back.jpg")} className="card-img-top" height="180" alt="Card imag cap" />
                                                            }
                                                            <div style={{ paddingTop: 5 }}>
                                                                <div className="card-body" style={{ padding: 10 }}>
                                                                    <span className="text text-dark text-decoration-none align-middle" style={{ fontSize: 25, fontWeight: "bold" }}>{restaurant.restaurantName}</span>
                                                                    <br />
                                                                    <span className="text text-dark text-decoration-none align-middle" style={{ fontSize: 19, textTransform: 'capitalize' }}>{restaurant.category}</span>
                                                                    <span className="text text-dark text-decoration-none align-middle" style={{ marginTop: "10px" }}>
                                                                        <Rating style={{ marginTop: "10px", color: "yellow" }} value={parseInt((restaurant.ratings) / 20)} readonly={true} stars={5} cancel={false} /> </span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </Link>
                                                )
                                            })
                                            :
                                            this.state.result.map((restaurant) => {
                                                return (
                                                    <Link to={'/restaurant/' + restaurant.location + '/' + restaurant.restaurantName}>
                                                        <div className="card bg-light">
                                                            {
                                                                restaurant.image === 'uploaded' ?
                                                                    <img alt="" className="card-img-top" src={require('../assets/' + restaurant.location + '/' + restaurant.restaurantName + ".jpg")} height="180" />
                                                                    :
                                                                    <img src={require("../assets/default-res-back.jpg")} className="card-img-top" height="180" alt="Card imag cap" />
                                                            }
                                                            <div style={{ paddingTop: 5 }}>
                                                                <div className="card-body" style={{ padding: 10 }}>
                                                                    <span className="text text-dark text-decoration-none align-middle" style={{ fontSize: 25, fontWeight: "bold" }}>{restaurant.restaurantName}</span>
                                                                    <br />
                                                                    <span className="text text-dark text-decoration-none align-middle" style={{ fontSize: 19, textTransform: 'capitalize' }}>{restaurant.category}</span>
                                                                    <span className="text text-dark text-decoration-none align-middle" style={{ marginTop: "10px" }}>
                                                                        <Rating style={{ marginTop: "10px", color: "yellow" }} value={parseInt((restaurant.ratings) / 20)} readonly={true} stars={5} cancel={false} /> </span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </Link>
                                                )
                                            })}
                                </div>
                            </div>
                        </div>
                    </div>
                    <BottomNavBar customerId={this.state.customerId} name={this.state.name} home={false} />
                </React.Fragment>)
        }
    }
}
export default QuickSearch;