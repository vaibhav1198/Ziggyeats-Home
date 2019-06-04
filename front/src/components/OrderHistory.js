import React, { Component } from 'react';
import axios from 'axios';
import { Dropdown } from 'primereact/dropdown';

export default class OrderHistory extends Component {

    constructor(props) {
        super(props);
        this.state = {
            customerId: this.props.customerId,
            name: this.props.name,
            orderHistory: [],
            errorMessage: '',
            successMessage: '',
            buttonClicked: false,
            loading: true,
            userData:this.props.userData,
            userOrders: this.props.order,
            myOrders: this.props.myOrders,
            city: '',
            redHome: false            
        }
    }

    cancelMyOrder = (e) => {
        this.setState({
            buttonClicked: true
        })
        localStorage.setItem('cancelButton', "cancelled")
        var orderId = Number(e.target.id);
        var orderObj = {
            customerId: this.state.customerId,
            orderId: orderId,
            orderStatus: "cancelled"
        }
        axios.put("/order/updateOrderStatus", orderObj).then((response) => {
            this.setState({ successMessage: "Order Cancelled!", redHome: true })
        }).catch((err) => {
                this.setState({ errorMessage: "error while updating status" })
            })

    }
    onCityChange = (e) => {
        this.setState({ city: e.target.value, buttonActive: true, ifLocation: true });
        // console.log(e.target.value.code)
        axios.get('/order/getOrderHistory/' + e.target.value.code).then((response) => {
            // console.log(response)
            this.setState({ orderHistory: response.data.message, loading: false })
        }).catch((err) => {
                if (err) {
                    this.setState({ errorMessage: err.response.data.message })
                }
                else {
                    this.setState({ errorMessage: "server error" })
                }
            })
    }

    render() {
        const cities = [
            { name: 'Chandigarh', code: 'Chandigarh' },
            { name: 'New Delhi', code: 'New Delhi' },
            { name: 'Mysore', code: 'Mysore' },
        ];
        if (this.state.buttonClicked && !this.state.successMessage) {
            alert("Your Order has been cancelled")
            window.location.assign('/home');
        }
        if (localStorage.getItem('admin') === 'true' && this.state.myOrders !== "true") {
            if (this.state.loading) {
                return (
                    <div className="container" style={{ marginBottom: "20px", marginTop: "20px", position: "relative" }}>
                        <div className="row d-flex content-justify-center" style={{ marginLeft: "15%" }}>
                            <Dropdown value={this.state.city} options={cities} size={6} onChange={this.onCityChange} placeholder="Select a City" optionLabel="name" style={{ width: "250px", marginRight: "5px" }} />
                        </div>
                    </div>

                )
            }
            else {
                return <div className="jumbotron" style={{ background: 'linear-gradient(45deg, #B2EBF2 30%, #E0F7FA 90%)' }}>
                    {
                        this.state.orderHistory.length === 0 ?
                            <div className="h3 text text-dark">
                                No Orders Placed yet!!
                    </div>
                            :
                            <div>
                                <div className="d-none d-sm-block">
                                    <table className="table table-borderless">
                                        <thead>
                                            <tr>
                                                <th className="align-middle">Order Id</th>
                                                <th className="align-middle">Restaurant</th>
                                                <th className="align-middle">price</th>
                                                <th className="align-middle">Customer Id</th>
                                                <th className="align-middle" colSpan="2">Status</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {(this.state.orderHistory.length > 0) ?
                                                this.state.orderHistory.map((order) => {
                                                    return <tr key={order.orderId}>
                                                        <td> {order.orderId} </td>
                                                        <td> {order.orderRestaurantName}</td>
                                                        <td>{order.orderPrice}</td>
                                                        <td>{order.customerId}</td>
                                                        <td>
                                                            {(order.orderStatus === "inProgress") ? <span>Order in progress</span>
                                                                : (order.orderStatus === "delivered") ? <span className="text-success">Delivered</span> : <span className="text-danger">cancelled</span>}
                                                        </td>
                                                    </tr>
                                                })
                                                : null}
                                        </tbody>
                                    </table>
                                </div>

                                <div className="d-block d-sm-none">
                                    <table className="table table-borderless table-responsive">
                                        <thead>
                                            <tr>
                                                <th className="align-middle">Order Id</th>
                                                <th className="align-middle">Restaurant</th>
                                                <th className="align-middle">price</th>
                                                <th className="align-middle">Customer Id</th>
                                                <th className="align-middle" colSpan="2">Status</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {(this.state.orderHistory.length > 0) ?
                                                this.state.orderHistory.map((order) => {
                                                    return <tr key={order.orderId}>
                                                        <td> {order.orderId} </td>
                                                        <td> {order.orderRestaurantName}</td>
                                                        <td>{order.orderPrice}</td>
                                                        <td>{order.customerId}</td>
                                                        <td>
                                                            {(order.orderStatus === "inProgress") ? <span>Order in progress</span>
                                                                : (order.orderStatus === "delivered") ? <span className="text-success">Delivered</span> : <span className="text-danger">cancelled</span>}
                                                        </td>
                                                    </tr>
                                                })
                                                : null}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                    }
                </div>
            }
        }
        else if (localStorage.getItem('admin') === 'false' || this.state.myOrders === "true") {
            return (
                <div className="container-fluid jumbotron" style={{ background: 'linear-gradient(45deg, #B2EBF2 30%, #E0F7FA 90%)' }}>
                    {(this.state.userOrders.length > 0) ?
                        <div>
                            <div className="d-none d-sm-block" style={{ textTransform: 'capitalize' }}>
                                <table className="table table-borderless">
                                    <thead>
                                        <tr>
                                            <th className="align-middle">Order Id</th>
                                            <th className="align-middle">Restaurant</th>
                                            <th className="align-middle">price</th>
                                            <th className="align-middle">items</th>
                                            <th className="align-middle" colSpan="2">Order status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.state.userOrders.map((order) => {
                                            return <tr key={order.orderId + " " + order.orderRestaurantName}>
                                                <td className="align-middle"> {order.orderId} </td>
                                                <td className="align-middle"> {order.orderRestaurantName}</td>
                                                <td className="align-middle">{order.orderPrice}</td>
                                                <td className="align-middle"><ul className="list-group list-group-flush" style={{ background: 'none' }}>{order.order.map((item) => {
                                                    return <li key={order.orderId + " " + order.orderRestaurantName + " " + item} className="list-group-item" style={{ background: 'none' }}>{item}</li>
                                                })}</ul></td>
                                                <td className="align-middle">
                                                    {(order.orderStatus === "inProgress") ? <span>Order in progress</span>
                                                        : (order.orderStatus === "delivered") ? <span className="text-success">Delivered</span> : <span className="text-danger">cancelled</span>}
                                                </td>
                                                {
                                                    (Number(order.time) + 300000 > Number(new Date().getTime()) && order.orderStatus === "inProgress") ?
                                                        <td className="align-middle">
                                                            <button type="button" id={order.orderId} onClick={(e) => this.cancelMyOrder(e)} className="btn btn-danger">Cancel</button>
                                                        </td>
                                                        :
                                                         null
                                                }
                                            </tr>
                                        })
                                        }
                                    </tbody>
                                </table>
                            </div>
                            <div className="d-block d-sm-none" style={{ textTransform: 'capitalize' }}>
                                <table className="table table-borderless table-responsive">
                                    <thead>
                                        <tr>
                                            <th className="align-middle">Order Id</th>
                                            <th className="align-middle">Restaurant</th>
                                            <th className="align-middle">price</th>
                                            <th className="align-middle">items</th>
                                            <th className="align-middle" colSpan="2">Order status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.state.userOrders.map((order) => {
                                            return <tr key={order.orderRestaurantName + order.orderId}>
                                                <td> {order.orderId} </td>
                                                <td> {order.orderRestaurantName}</td>
                                                <td>{order.orderPrice}</td>
                                                <td><ul className="list-group list-group-flush" style={{ background: 'none' }}>{order.order.map((item) => {
                                                    return <li key={order+item+"1"} className="list-group-item" style={{ background: 'none' }}>{item}</li>
                                                })}</ul></td>
                                                <td>
                                                    {(order.orderStatus === "inProgress") ? <span>Order in progress</span>
                                                        : (order.orderStatus === "delivered") ? <span className="text-success">Delivered</span> : <span className="text-danger">cancelled</span>}
                                                </td>
                                                {
                                                    (Number(order.time) + 300000 > Number(new Date().getTime()) && order.orderStatus === "inProgress") ?
                                                        <td className="align-middle">
                                                            <button type="button" id={order.orderId} onClick={(e) => this.cancelMyOrder(e)} className="btn btn-danger">Cancel</button>
                                                        </td>
                                                        :
                                                         null
                                                }
                                            </tr>
                                        })
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        :
                        <span className="text h3 text-dark">
                            No Orders Made yet!!
                            </span>
                    }
                </div>
            )
        }
    }
}
