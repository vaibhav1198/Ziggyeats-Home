import React, { Component } from 'react';

export default class MyAccount extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: this.props.name,
            customerId: this.props.customerId,
            loading: true,
            userData: this.props.userData,
            errorMessage: '',
        }
    }
    render() {
        // console.log(this.state)
        return (
            <div>
                <div className="card d-none d-sm-block" style={{ textTransform: 'capitalize', background: 'linear-gradient(45deg, #B2EBF2 30%, #E0F7FA 90%)' }}>
                    <div className="card-body">
                        <div className="row">
                            <div className="col-md-3 text-dark" style={{ padding: 5, paddingLeft: 10 }}>
                                Customer Id:
                            </div>
                            <div className="col-md-9 text-dark" style={{ padding: 5 }}>
                                {this.state.customerId}
                            </div>
                        </div>
                        <hr />
                        <div className="row">
                            <div className="col-md-3 text-dark" style={{ padding: 5, paddingLeft: 10 }}>
                                Name:
                            </div>
                            <div className="col-md-9 text-dark" style={{ padding: 5 }}>
                                {this.state.userData.name}
                            </div>
                        </div>
                        <hr />
                        <div className="row">
                            <div className="col-md-3 text-dark" style={{ padding: 5, paddingLeft: 10 }}>
                                Email:
                            </div>
                            <div className="col-md-9 text-dark" style={{ textTransform: 'none', padding: 5 }}>
                                {this.state.userData.email}
                            </div>
                        </div>
                        <hr />
                        <div className="row">
                            <div className="col-md-3 text-dark" style={{ padding: 5, paddingLeft: 10 }}>
                                Phone Number:
                            </div>
                            <div className="col-md-9 text-dark" style={{ textTransform: 'none', padding: 5 }}>
                                {this.state.userData.phone}
                            </div>
                        </div>
                        <hr />
                        <div className="row">
                            <div className="col-md-3 text-dark" style={{ padding: 5, paddingLeft: 10 }}>
                                Coupons Available:
                            </div>
                            <div className="col-md-9 text-dark" style={{ padding: 5 }}>
                                {this.state.userData.coupons}
                            </div>
                        </div>
                        {
                            localStorage.getItem('rOwner') === 'true' ?
                                <div>
                                    <hr />
                                    <div className="row">
                                        <div className="col-md-3 text-dark" style={{ padding: 5, paddingLeft: 10 }}>
                                            Head Of City:
                                            </div>
                                        <div className="col-md-9 text-dark" style={{ padding: 5 }}>
                                            {this.state.userData.address}
                                        </div>
                                    </div>
                                </div>
                                :
                                this.state.userData.address !== null || this.state.userData.address ?
                                    <div>
                                        <hr />
                                        <div className="row">
                                            <div className="col-md-3 text-dark" style={{ padding: 5, paddingLeft: 10 }}>
                                                Address:
                                            </div>
                                            <div className="col-md-9 text-dark" style={{ padding: 5 }}>
                                                {this.state.userData.address}
                                            </div>
                                        </div>
                                    </div>
                                    :
                                    null
                        }
                    </div>
                </div>
                <div className="card d-block d-sm-none" style={{ textTransform: 'capitalize', background: 'linear-gradient(45deg, #B2EBF2 30%, #E0F7FA 90%)' }}>
                    <div className="card-body">
                        <div className="row">
                            <div className="col-xs-3 text-dark" style={{ padding: 5, paddingLeft: 10 }}>
                                Customer Id:
                            </div>
                            <div className="col-xs-9 text-dark" style={{ padding: 5 }}>
                                {this.state.customerId}
                            </div>
                        </div>
                        <hr />
                        <div className="row">
                            <div className="col-xs-3 text-dark" style={{ padding: 5, paddingLeft: 10 }}>
                                Name:
                            </div>
                            <div className="col-xs-9 text-dark" style={{ padding: 5 }}>
                                {this.state.userData.name}
                            </div>
                        </div>
                        <hr />
                        <div className="row">
                            <div className="col-xs-3 text-dark" style={{ padding: 5, paddingLeft: 10 }}>
                                Email:
                            </div>
                            <div className="col-xs-9 text-dark" style={{ textTransform: 'none', padding: 5 }}>
                                {this.state.userData.email}
                            </div>
                        </div>
                        <hr />
                        <div className="row">
                            <div className="col-xs-3 text-dark" style={{ padding: 5, paddingLeft: 10 }}>
                                Phone Number:
                            </div>
                            <div className="col-xs-9 text-dark" style={{ textTransform: 'none', padding: 5 }}>
                                {this.state.userData.phone}
                            </div>
                        </div>
                        <hr />
                        <div className="row">
                            <div className="col-xs-3 text-dark" style={{ padding: 5, paddingLeft: 10 }}>
                                Coupons Available:
                            </div>
                            <div className="col-xs-9 text-dark" style={{ padding: 5 }}>
                                {this.state.userData.coupons}
                            </div>
                        </div>
                        {
                            localStorage.getItem('rOwner') === 'true' ?
                                <div>
                                    <hr />
                                    <div className="row">
                                        <div className="col-xs-3 text-dark" style={{ padding: 5, paddingLeft: 10 }}>
                                            Head Of City:
                                        </div>
                                        <div className="col-xs-9 text-dark" style={{ padding: 5 }}>
                                            {this.state.userData.address}
                                        </div>
                                    </div>
                                </div>
                                :
                                this.state.userData.address !== null || this.state.userData.address ?
                                    <div>
                                        <hr />
                                        <div className="row">
                                            <div className="col-xs-3 text-dark" style={{ padding: 5, paddingLeft: 10 }}>
                                                Address:
                                        </div>
                                            <div className="col-xs-9 text-dark" style={{ padding: 5 }}>
                                                {this.state.userData.address}
                                            </div>
                                        </div>
                                    </div>
                                    :
                                    null
                        }
                    </div>
                </div>
            </div>
        )
    }
}
