import React, { Component } from 'react';
import NavBar from './navbar'
import BottomNavBar from './BottomNavbar'

class Contact extends Component {
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
                <div className="d-none d-sm-block">
                    <div className="container jumbotron" style={{ marginTop: 25, marginBottom: 25 }}>
                        <div className="row" style={{ marginTop: "35px", paddingBottom: "25px" }}>
                            <div className="col-md-12" style={{ textAlign: "center" }}>
                                <span className="display-3 text text-dark">
                                    GET IN TOUCH
                        </span>
                            </div>
                        </div>
                        <div className="row" style={{ textAlign: "center" }}>
                            <div className="col-md-4" >
                                <h4 className="text text-dark">ADDRESS</h4>
                                <h5>Chandigarh Office</h5>
                                <address><span className="h6">ZiggyEats Pvt. Ltd.</span><br />350, Sector 34<br />Chandigarh 160034</address>
                            </div>
                            <div className="col-md-4">
                                <h4 className="text text-dark">PHONE</h4>
                                <h5>Chandigarh Office</h5>
                                <p>Phone: 9876440871</p>
                            </div>
                            <div className="col-md-4">
                                <h4 className="text text-dark">EMAIL</h4>
                                <h5>Request for Proposal</h5>
                                <p>info@ziggyeats.com</p>
                                <h5>Employment Opportunities</h5>
                                <p>careers@ziggyeats.com</p>
                            </div>
                        </div>
                        <div className="row" style={{ textAlign: "center", marginBottom: 35 }}>
                            <div className="col-md-12" >
                                <h2 className="text text-dark">We would love to hear from you!</h2>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="d-block d-sm-none">
                    <div className="container jumbotron" style={{ margin:5, marginTop: 15, marginBottom: 15, paddingTop:15 }}>
                        <div className="row" style={{ marginTop: "35px", paddingBottom: "25px" }}>
                            <div className="col-md-12" style={{ textAlign: "center" }}>
                                <span className="display-4 text text-dark">
                                    GET IN TOUCH
                        </span>
                            </div>
                        </div>
                        <div className="row" style={{ textAlign: "center" }}>
                            <div className="col-md-4" >
                                <h4 className="text text-dark">ADDRESS</h4>
                                <h5>Chandigarh Office</h5>
                                <address><span className="h6">ZiggyEats Pvt. Ltd.</span><br />350, Sector 34<br />Chandigarh 160034</address>
                            </div>
                            <div className="col-md-4">
                                <h4 className="text text-dark">PHONE</h4>
                                <h5>Chandigarh Office</h5>
                                <p>Phone: 9876440871</p>
                            </div>
                            <div className="col-md-4">
                                <h4 className="text text-dark">EMAIL</h4>
                                <h5>Request for Proposal</h5>
                                <p>info@ziggyeats.com</p>
                                <h5>Employment Opportunities</h5>
                                <p>careers@ziggyeats.com</p>
                            </div>
                        </div>
                        <div className="row" style={{ textAlign: "center", marginBottom: 35 }}>
                            <div className="col-md-12" >
                                <h2 className="text text-dark">We would love to hear from you!</h2>
                            </div>
                        </div>
                    </div>
                </div>
                <BottomNavBar customerId={this.state.customerId} name={this.state.name} />
            </div>
        )

    }


}

export default Contact;

