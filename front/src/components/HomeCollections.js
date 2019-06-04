import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import TrendingGrid from './TrendingGrid';
import PopularGrid from './PopularGrid';
import { ProgressBar } from 'primereact/progressbar';
import CurrentCityPopular from './CurrentCityPopular';
import PopularGridRes from './PopularGridRes';


class HomeCollections extends Component {
    constructor(props) {
        super(props);
        this.state = {
            customerId: this.props.customerId,
            name: this.props.name,
            currentCity: '',
            flag1: true,
            flag2: false,
            key: '',
            trendingRestaurants: [],
            popularRestaurants:[]
        }
        this.url = '';
    }

    getRestaurants = () => {
        axios.get('/restaurant/getRestaurantsByTrendCountLoc/' + this.state.currentCity).then((response) => {
           this.setState({ trendingRestaurants :response.data.message })
        })

        axios.get('/restaurant/getRestaurantsByRatings/' + this.state.currentCity).then((response) => {
            //console.log("++++", response.data.message)
            this.setState({ popularRestaurants :response.data.message })
        })
    }

    componentDidMount() {
        if (!localStorage.getItem('currentCity')) {
            this.getlocation()
        }
        else {
            this.setState({ currentCity: localStorage.getItem('currentCity') })
        }
    }

    getlocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(this.showPosition);
        }
    }

    showPosition = (position) => {
        fetch("https://maps.googleapis.com/maps/api/geocode/json?address=" + position.coords.latitude + "," + position.coords.longitude + "&key=AIzaSyCGom0cqFuYl0kdnV5TkVfaeHxa_um5Ta4")
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson)
                // var currentCity =  responseJson.results[0].address_components[3].short_name;
                var currentCity = "Mysuru";
                localStorage.setItem('currentCity', currentCity)
                this.setState({ currentCity: currentCity })
            }).catch(error => {
                console.log("location error", error.data)
            })
    }

    navigateQuickSearch = (key) => {
        this.setState({
            flag2: true,
            key: key
        })
    }

    render() {
        if (this.state.flag2) {
            this.setState({
                flag2: false
            })
            if (this.state.customerId) {
                return <Redirect to={'/quicksearch/' + this.state.currentCity + '/' + this.state.key + '/' + this.state.customerId + '/' + this.state.name} push />
            }
            return <Redirect to={'/quicksearch/' + this.state.currentCity + '/' + this.state.key} push />
        }

        if (this.state.currentCity && this.state.flag1) {
            this.setState({
                flag1: false
            })
            this.getRestaurants()
        }
        
        if (this.state.trendingRestaurants.length === 0 || this.state.popularRestaurants.length === 0) {
            return <ProgressBar mode="indeterminate" style={{ height: "10px" }} />
        }
        else if (this.state.trendingRestaurants.length > 0 && this.state.popularRestaurants.length > 0) {
            if (this.props.customerId) {
                this.url = "/restaurant/" + this.state.trendingRestaurant1Loc + '/' + this.state.trendingRestaurant1 + '/' + this.props.customerId + '/' + this.props.name;
            }
            else {
                this.url = "/restaurant/" + this.state.trendingRestaurant1Loc + '/' + this.state.trendingRestaurant1;
            }
            return (
                <div className="container-fluid" >
                    <div className="row" style={{ paddingTop: "45px" }}>
                        <div className="col-md-8 offset-md-1  d-none d-md-block" style={{ paddingTop: "0", marginLeft: "50px", paddingRight: "40px" }}>
                            {/*Trending restairants*/}
                            <p className="h2" style={{ paddingTop: "10px", marginBottom: "0px" }}>TRENDING IN {this.state.currentCity.toUpperCase()}</p>
                            <h5 style={{ marginBottom: "10px" }}><small className="text-muted">Top trending restaurants with most orders on ZiggyEats in your city.</small></h5>
                            {/* <TrendingGrid trendingRestaurant1={this.state.trendingRestaurant1} trendingRestaurant1Loc={this.state.trendingRestaurant1Loc} trendingRestaurant2={this.state.trendingRestaurant2} trendingRestaurant2Loc={this.state.trendingRestaurant2Loc} trendingRestaurant3={this.state.trendingRestaurant3} trendingRestaurant3Loc={this.state.trendingRestaurant3Loc} trendingRestaurant4={this.state.trendingRestaurant4} trendingRestaurant4Loc={this.state.trendingRestaurant4Loc} trendingRestaurant5={this.state.trendingRestaurant5} trendingRestaurant5Loc={this.state.trendingRestaurant5Loc} trendingRestaurant1Ratings={this.state.trendingRestaurant1Ratings} trendingRestaurant2Ratings={this.state.trendingRestaurant2Ratings} trendingRestaurant3Ratings={this.state.trendingRestaurant3Ratings} trendingRestaurant4Ratings={this.state.trendingRestaurant4Ratings} trendingRestaurant5Ratings={this.state.trendingRestaurant5Ratings} customerId={this.props.customerId} name={this.state.name} /> */}
                            <TrendingGrid restaurants = {this.state.trendingRestaurants} customerId={this.props.customerId} name={this.state.name}/>
                            {/*Popular restairants*/}
                            <p className="h2" style={{ paddingTop: "20px", marginBottom: "0px" }}>POPULAR IN {this.state.currentCity.toUpperCase()}</p>
                            <h5><small className="text-muted">Most popular restaurants with highest ratings on ZiggyEats in your city.</small></h5>
                            {/* <PopularGrid popularRestaurant1={this.state.popularRestaurant1} popularRestaurant1Loc={this.state.popularRestaurant1Loc} popularRestaurant2={this.state.popularRestaurant2} popularRestaurant2Loc={this.state.popularRestaurant2Loc} popularRestaurant3={this.state.popularRestaurant3} popularRestaurant3Loc={this.state.popularRestaurant3Loc} popularRestaurant4={this.state.popularRestaurant4} popularRestaurant4Loc={this.state.popularRestaurant4Loc} popularRestaurant5={this.state.popularRestaurant5} popularRestaurant5Loc={this.state.popularRestaurant5Loc} popularRestaurant1Ratings={this.state.popularRestaurant1Ratings} popularRestaurant2Ratings={this.state.popularRestaurant2Ratings} popularRestaurant3Ratings={this.state.popularRestaurant3Ratings} popularRestaurant4Ratings={this.state.popularRestaurant4Ratings} popularRestaurant5Ratings={this.state.popularRestaurant5Ratings} customerId={this.props.customerId} name={this.state.name} /> */}
                            <PopularGrid  restaurants = {this.state.popularRestaurants}  customerId={this.props.customerId} name={this.state.name}/>
                        </div>
                        <div className="col-md-3 d-none d-md-block" style={{ paddingTop: "40px", textAlign: "center", paddingLeft: "70px" }}>
                            <div className="h2 text-center" style={{ marginTop: "20px", marginBottom: "10px" }}>Quick Searches</div>
                            {/*<h5 style={{marginBottom: "-10px" }}><small className="text-muted">Some of the best restaurants in {this.state.currentCity}</small></h5>
                            <CurrentCityPopular currentCity = {this.state.currentCity} style={{paddingTop:"0px"}} customerId={this.props.customerId} name ={this.state.name}/> */}
                            <div className="row" style={{ paddingTop: "20px" }}>
                                <div className="col-md-5" onClick={() => { localStorage.setItem("key", "Breakfast")
                                     this.navigateQuickSearch("Breakfast") }} style={{ cursor: "pointer" }}>
                                    <img alt="" src={require("../assets/breakfast_quick.webp")} style={{ width: "80px", marginRight: "30px" }} />
                                    <h4 className="text-muted">Breakfast</h4>
                                </div>
                                <div className="col-md-5 offset-md-1" onClick={() => { this.navigateQuickSearch("Lunch") }} style={{ cursor: "pointer" }}>
                                    <img alt="" src={require("../assets/lunch_quick.webp")} style={{ width: "80px", marginRight: "30px" }} />
                                    <h4 className="text-muted">Lunch</h4>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-5" onClick={() => { this.navigateQuickSearch("Dinner") }} style={{ cursor: "pointer" }}>
                                    <img alt="" src={require("../assets/dinner_quick.webp")} style={{ width: "80px", marginRight: "30px" }} />
                                    <h4 className="text-muted">Dinner</h4>
                                </div>
                                <div className="col-md-5 offset-md-1" onClick={() => { this.navigateQuickSearch("Cafes") }} style={{ cursor: "pointer" }}>
                                    <img alt="" src={require("../assets/cafes_quick.webp")} style={{ width: "80px", marginRight: "30px" }} />
                                    <h4 className="text-muted">Cafes</h4>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-5" onClick={() => { this.navigateQuickSearch("Pocket") }} style={{ cursor: "pointer" }}>
                                    <img alt="" src={require("../assets/pocket_quick.webp")} style={{ width: "80px", marginRight: "30px" }} />
                                    <h4 className="text-muted">Pocket</h4>
                                </div>
                                <div className="col-md-5 offset-md-1" onClick={() => { this.navigateQuickSearch("Dining") }} style={{ cursor: "pointer" }}>
                                    <img alt="" src={require("../assets/breakfast_quick.webp")} style={{ width: "80px", marginRight: "30px" }} />
                                    <h4 className="text-muted">Dining</h4>
                                </div>

                            </div>
                        </div>
                        {/* small screen*/}
                        <div className="row" style={{ marginLeft: "30px" }}>
                            <div className="col-xs-11 offset-xs-1 d-block d-md-none" >
                                <div className="h2" style={{ paddingTop: "10px", marginBottom: "2px" }}>TRENDING IN {this.state.currentCity.toUpperCase()}</div>
                                <CurrentCityPopular currentCity={this.state.currentCity} style={{ paddingTop: "0px", paddingLeft: "70px" }} customerId={this.props.customerId} name={this.state.name} />
                            </div>
                            <div className="col-xs-11 offset-xs-1 d-block d-md-none" >
                                <div className="h2" style={{ paddingTop: "20px", marginBottom: "2px" }}>POPULAR IN {this.state.currentCity.toUpperCase()}</div>
                                <PopularGridRes currentCity={this.state.currentCity} style={{ paddingTop: "0px", paddingLeft: "70px" }} customerId={this.props.customerId} name={this.state.name} />
                            </div>
                        </div>
                        <div className="col-xs-12 d-block d-md-none" style={{ paddingLeft: "10px" }}>
                            <h2 style={{ marginTop: "25px", marginBottom: "5px", textAlign: "center", marginLeft: "65px" }}>Quick Searches</h2>
                            <div className="row" style={{ paddingTop: "20px", marginLeft: "90px" }}>
                                <div className="col-xs-4 col-xs-2" onClick={() => { this.navigateQuickSearch("Breakfast") }} style={{ cursor: "pointer" }}>
                                    <img alt="" src={require("../assets/breakfast_quick.webp")} style={{ width: "80px", marginRight: "30px" }} />
                                    <h4 className="text-muted">Breakfast</h4>
                                </div>
                                <div className="col-xs-5 offset-xs-1" onClick={() => { this.navigateQuickSearch("Lunch") }} style={{ cursor: "pointer" }}>
                                    <img alt="" src={require("../assets/lunch_quick.webp")} style={{ width: "80px", marginRight: "30px" }} />
                                    <h4 className="text-muted">Lunch</h4>
                                </div>
                            </div>
                            <div className="row" style={{ marginLeft: "90px" }}>
                                <div className="col-xs-5" onClick={() => { this.navigateQuickSearch("Dinner") }} style={{ cursor: "pointer" }}>
                                    <img alt="" src={require("../assets/dinner_quick.webp")} style={{ width: "80px", marginRight: "30px" }} />
                                    <h4 className="text-muted">Dinner</h4>
                                </div>
                                <div className="col-xs-5 offset-xs-1" onClick={() => { this.navigateQuickSearch("Cafes") }} style={{ cursor: "pointer" }}>
                                    <img alt="" src={require("../assets/cafes_quick.webp")} style={{ width: "80px", marginRight: "30px" }} />
                                    <h4 className="text-muted">Cafes</h4>
                                </div>
                            </div>
                            <div className="row" style={{ marginLeft: "90px" }}>
                                <div className="col-xs-5" onClick={() => { this.navigateQuickSearch("Pocket") }} style={{ cursor: "pointer" }}>
                                    <img alt="" src={require("../assets/pocket_quick.webp")} style={{ width: "80px", marginRight: "30px" }} />
                                    <h4 className="text-muted">Pocket</h4>
                                </div>
                                <div className="col-xs-5 offset-xs-1" onClick={() => { this.navigateQuickSearch("Dining") }} style={{ cursor: "pointer" }}>
                                    <img alt="" src={require("../assets/breakfast_quick.webp")} style={{ width: "80px", marginRight: "30px" }} />
                                    <h4 className="text-muted">Dining</h4>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
    }
}

export default HomeCollections;
