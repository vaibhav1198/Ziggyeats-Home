import React, { Component } from 'react';
import NavBar from './navbar'
import BottomNavBar from './BottomNavbar'

class About extends Component {
    constructor(props) {
        super(props);
        this.state = {
            customerId: this.props.match.params.customerId,
            name: this.props.match.params.name,
        }
        this.url = '';
    }
    render() {
        return (
            <div style={{}}>
                <NavBar customerId={this.state.customerId} name={this.state.name} home={false} />
                <div className="container" >
                    <div className="row" style={{ paddingTop: "35px", paddingBottom: "25px" }}>
                        <div className="col-md-8">
                            <span className="display-3 text text-dark text-center">
                                About ZiggyEats
</span>
                        </div>
                    </div>
                    <div className="d-none d-sm-block">
                        <div className="row">
                            <div className="col-md-12" style={{ paddingBottom: "20px", textAlign: "center", position: "relative" }} >
                                <img src={require("../assets/bg-about.webp")} className="col-md-12" style={{ height: "280px" }} alt="image1"/>
                                <p className="display-4 col-md-8" style={{ position: "absolute", top: "22%", left: "50%", transform: "translate(-50%, -50%)", color: "white" }}><b>Our mission is to ensure nobody has a bad meal.</b></p>
                                <br /><br />
                                <h4 style={{ paddingBottom: "10px" }}>We do this by</h4>
                                <h6><b>Helping people discover great places around them.</b></h6>
                                <p className="text-center text text-justify">Our team gathers information from every restaurant on a regular basis to ensure our data is fresh. Our vast community of food lovers share their reviews and photos, so you have all that you need to make an informed choice.</p>
                                <h6><b>Building amazing experiences around dining.</b></h6>
                                <p className="text text-center text-justify">Starting with information for over 1 million restaurants (and counting) globally, we're making dining smoother and more enjoyable with services like online ordering and table reservations.</p>
                                <h6><b>Enabling restaurants to create amazing experiences.</b></h6>
                                <p className="text text-center text-justify">With dedicated engagement and management tools, we're enabling restaurants to spend more time focusing on food itself, which translates directly to better dining experiences.</p>
                            </div>
                        </div>
                    </div>
                    <div className="d-block d-sm-none">
                        <div className="row">
                            <div className="col-xs-12" style={{ paddingBottom: "20px", textAlign: "center", position: "relative", margin:5 }}>
                                <img src={require("../assets/bg-about.webp")} className="col-xs-12" style={{ height: "250px", width: "95%", padding: 10, backgroundSize: "cover" }} alt="image2"/>
                                <p className="h4 col-xs-8" style={{ position: "absolute", top: "15%", left: "50%", transform: "translate(-50%, -50%)", color: "white" }}>
                                    <b>Our mission is to ensure nobody has a bad meal.</b>
                                    </p>
                                <br /><br />
                                <h4 style={{ paddingBottom: "10px" }}>We do this by</h4>
                                <h6><b>Helping people discover great places around them.</b></h6>
                                <p className="text-center text text-justify">Our team gathers information from every restaurant on a regular basis to ensure our data is fresh. Our vast community of food lovers share their reviews and photos, so you have all that you need to make an informed choice.</p>
                                <h6><b>Building amazing experiences around dining.</b></h6>
                                <p className="text text-center text-justify">Starting with information for over 1 million restaurants (and counting) globally, we're making dining smoother and more enjoyable with services like online ordering and table reservations.</p>
                                <h6><b>Enabling restaurants to create amazing experiences.</b></h6>
                                <p className="text text-center text-justify">With dedicated engagement and management tools, we're enabling restaurants to spend more time focusing on food itself, which translates directly to better dining experiences.</p>
                            </div>
                        </div>
                    </div>
                </div>
                <BottomNavBar customerId={this.state.customerId} name={this.state.name} />
            </div>
        )
    }
}
export default About;