import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import Button from '@material-ui/core/Button';

class DefaultPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            customerId: this.props.customerId,
            name: this.props.name,
            red:false
        }
        this.url = '';
    }
    redd = () => {
        this.setState({red:true})
    }
    render() {
        if(this.state.red){
            this.setState({red:false})
            if(localStorage.getItem("name")){
                return <Redirect to={'/home/' + localStorage.customerId +'/' + localStorage.name} />
            }
            else{
            return <Redirect to={'/home'} />
            }
        }
        return (
            <div style={{}}>
                <div className="container jumbotron d-none d-sm-block" style={{marginTop:50, marginBottom:50, background: 'linear-gradient(45deg, #B2EBF2 30%, #E0F7FA 90%)' }}>
                    <div className="row" style={{ paddingTop: "45px", minHeight: 400 }}>
                        <div className="col-md-6 d-flex justify-content-center">
                            <img className="" src={require("../assets/error.jpg")} height="300px" width="300px" alt="Card imag cap" />
                        </div>
                        <div className="col-md-6">
                        <div className="row" style={{padding:15}}>
                            <span className="display-2 text text-dark text-center">
                                Error Code 404
                                </span>
                            <br />
                            <span className="text text-dark text-justify">
                            <span className="h6 text text-danger">
                            Please do not try to mess with the website's url.
                            </span>
                            <br/>
                                This is a 404 page and we think it's fairly clear
                                You aren't going to find what you're looking for here
                                But we know you're hungry, so don't fret or rage
                                Hit that big red button to go back to our homepage
    
                    </span>
                </div>
                <div className="row d-flex justify-content-center">
                <Button type="button" className="" style={{ background: "linear-gradient(45deg, #B2EBF2 30%, #4DD0E1 90%)" }} onClick={(e) => this.redd(e)}>Home</Button>  
                              </div>
                        </div>
                    </div>
                </div>

                <div className="container d-block d-sm-none" >
                    <div className="row" style={{ padding: "15px" }}>
                    <div className="col-xs-12 d-flex justify-content-center">
                            <img className="" src={require("../assets/error.jpg")} height="95%" width="95%" alt="Card imag cap" />
                        </div>
                        <div className="col-xs-12">
                        <div className="row" style={{padding:15}}>
                            <span className="display-4 text text-dark text-center">
                                Error Code 404
                                </span>
                            <br />
                            <span className="text text-dark text-justify">
                            <span className="h6 text text-danger">
                            Sir, Please do not try to mess with the website's url.
                            </span>
                            <br/>
                                This is a 404 page and we think it's fairly clear
                                You aren't going to find what you're looking for here
                                But we know you're hungry, so don't fret or rage
                                Hit that big red button to go back to our homepage
    
                    </span>
                </div>
                <div className="row d-flex justify-content-center">
                <Button type="button" className="" style={{marginBottom:25, background: "linear-gradient(45deg, #B2EBF2 30%, #4DD0E1 90%)" }} onClick={(e) => this.redd(e)}>Home</Button>  
                              </div>
                        </div>
                </div>
            </div>
            </div>
        )

    }


}

export default DefaultPage;