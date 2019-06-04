import React, { Component } from 'react';
import Avatar from './Avatar'

export default class WelcomePortal extends Component {
    render() {
        var t = localStorage.getItem("name")
        let n = t.split(" ")
        var r = ''
        if (n.length > 2) {
            r = n[0] + " " + n[1]
        }
        else {
            r =  localStorage.getItem('name')
        }
        return (
            <div className="container" style={{ marginTop: "10px" }} >
                <div className="row d-none d-sm-block">
                    <div className="col-md-12" style={{ paddingTop: 20, paddingBottom: 20, marginBottom: 24, marginTop: 20, background: 'none' }}>
                        <img className="card-img-top" src={require("../assets/hand-drawn-fast-food-pattern-.jpg")} style={{ opacity: 0.4 }} height="300" alt="Card imag cap" />
                        <div className="display-4 col-md-8" style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", color: "white" }}>
                            <Avatar name={this.props.name} />
                            <h5 className="display-4 text text-dark" style={{ textAlign: "center", marginLeft: "5px", textTransform: 'capitalize' }}>{r}</h5>
                        </div>
                    </div>
                </div>
                <div className="row d-block d-sm-none">
                    <div className="col-sm-12 " style={{ marginLeft: 5, marginRight: 5, paddingTop: 20, paddingBottom: 20, marginBottom: 24, marginTop: 20, background: 'none' }}>
                        <img className="card-img-top" src={require("../assets/hand-drawn-fast-food-pattern-.jpg")} style={{ opacity: 0.4 }} height="350" alt="Card imag cap" />
                        <div className="display-4 col-md-8" style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", color: "white" }}>
                        <Avatar name={this.props.name} />
                        <h5 className="display-4 text-dark" style={{ textAlign: "center", marginLeft: "5px", textTransform: 'capitalize' }}>{r}</h5>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}