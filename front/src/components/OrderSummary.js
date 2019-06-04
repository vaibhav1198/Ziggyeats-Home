import React, { Component } from 'react';
import NavBar from './navbar';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { ProgressSpinner } from 'primereact/progressspinner';
import { Accordion, AccordionTab } from 'primereact/accordion';
import { Redirect } from 'react-router-dom';
import { setTimeout } from 'timers';

class OrderSummary extends Component {

    constructor(props) {
        super(props)

        this.state = {
            customerId: this.props.match.params.customerId,
            name: this.props.match.params.name,
            customerDetails: '',
            cart: {},
            price: {},
            dishArr: [],
            quantityArr: [],
            priceArr: [],
            successMessage: '',
            errorMessage: '',
            orderButtonClicked: false,
            couponApplied: false,
            updatePrice: ''
        }
        this.price = 0;
        this.quantity = 0;
        this.dishArr = [];
        this.quantityArr = [];
        this.priceArr = [];
    }

    componentDidMount() {
        if (localStorage.getItem('currentCity') === 'Mysuru') {
            this.setState({ currentCity: 'Mysore' })
        }
        else {
            this.setState({ currentCity: localStorage.getItem('currentCity') })
        }
        axios.get('/auth/getdetails/' + this.state.customerId)
            .then((response) => {
                // //console.log(response)
                this.setState({ customerDetails: response.data.message, errorMessage: '' })
            })
            .catch((err) => {
                if (err) {
                    this.setState({ customerDetails: '', errorMessage: err.response.data.message })
                }
            })
        this.setState({
            cart: JSON.parse(localStorage.getItem('cart')),
            price: JSON.parse(localStorage.getItem('price'))
        })
    }

    placeOrder = () => {
        localStorage.setItem('orderPlaced', true)
        setTimeout(() => {
            localStorage.setItem('orderPlaced', false)
        }, 8000)
        this.setState({ orderButtonClicked: true })
        var orderedDishes = []
        for (var i = 0; i < this.dishArr.length; i++) {
            orderedDishes.push(this.dishArr[i])
        }
        var order = {
            orderRestaurantName: localStorage.getItem('restaurantName'),
            quantity: this.quantity,
            order: orderedDishes,
            orderStatus: "inProgress",
            customerId: this.state.customerId,
            time: Number(new Date().getTime()),
            location: this.state.currentCity
        }
        if (this.state.updatePrice && this.state.couponApplied) {
            order.price = this.state.updatePrice
        }
        else {
            order.price = this.price
        }
        axios.post('/order/insertOrder/' + this.state.customerId, order)
            .then((response) => {
                this.setState({ successMessage: "Order placed!", errorMessage: '' })
            }).catch((err) => {
                if (err) {
                    this.setState({ successMessage: '', errorMessage: err.response.data.message })
                }
                else {
                    this.setState({ successMessage: '', errorMessage: 'server error' })
                }
            })
        if (this.state.couponApplied) {
            axios.post('/auth/decreaseCoupons/' + this.state.customerId)
                .then((response) => {
                    //console.log("success",response.data.message)
                }).catch((err) => {
                    if (err) {
                        //console.log("error", err.response.data.message)
                    }
                    else {
                        //console.log("server error")
                    }
                })
        }
        localStorage.removeItem("cart")
        localStorage.removeItem("price")
        localStorage.removeItem("restaurantName")
    }

    createRow = (dishArr, quantityArr, priceArr) => {
        var row = [];
        for (var i = 0; i < dishArr.length; i++) {
            row.push(<tr key={i + " " + dishArr}>
                <td>{dishArr[i]}</td>
                <td>{quantityArr[i]}</td>
                <td><span style={{ marginLeft: "20px" }}></span>{priceArr[i]}</td>
            </tr>)
        }
        return row;
    }

    createTable = () => {
        //console.log(this.state.customerDetails.coupons)
        this.quantityArr = [];
        this.dishArr = [];
        this.priceArr = [];
        for (var dish in this.state.cart) {
            if (this.state.cart[dish] > 0) {
                this.quantityArr.push(this.state.cart[dish]);
                this.dishArr.push(dish);
                this.priceArr.push(this.state.price[dish]);
            }
        }
        var rows = this.createRow(this.dishArr, this.quantityArr, this.priceArr);
        this.price = 0;
        this.quantity = 0;
        for (var i = 0; i < this.priceArr.length; i++) {
            this.price = this.price + this.priceArr[i]
            this.quantity = this.quantity + this.quantityArr[i];
        }
        var table = <React.Fragment>
            <table className="table table-sm table-borderless">
                <tbody>{rows.map((row) => {
                    return row
                })}
                </tbody>
                <tbody className="h4">
                    {
                        (this.state.couponApplied) ?
                            <tr>
                                <td> Total </td>
                                <td>{this.quantity}</td>
                                <td><span style={{ marginLeft: "20px", textDecoration: "line-through" }}>{this.price}</span></td>
                            </tr>
                            :
                            <tr>
                                <td>Total</td>
                                <td>{this.quantity}</td>
                                <td><span style={{ marginLeft: "20px" }}>{this.price}</span></td>
                            </tr>
                    }
                    {
                        (this.state.couponApplied) ?
                            <tr>
                                <td>New Total</td>
                                <td>{this.quantity}</td>
                                <td><span style={{ marginLeft: "20px" }}><strong>{this.state.updatePrice}</strong></span></td>
                            </tr>
                            :
                            <tr>
                                <td colSpan="3"><br /></td>
                            </tr>
                    }
                    <tr style={{ marginTop: "0px" }}>
                        <td></td>
                        <td></td>
                        <td ><button className="btn btn-success" onClick={this.placeOrder}>Order</button></td>
                    </tr>
                </tbody>
            </table>
            <br />
            <div className="d-none d-sm-block">
                <Accordion>
                    <AccordionTab header="Apply coupons" >
                        {(this.state.customerDetails.coupons > 0) ?
                            <div className="card" style={{ maxWidth: "100%", border: "0px" }}>
                                {
                                    (this.price > 150) ?
                                        <div className="card-body text-center" onClick={() => { this.setState({ couponApplied: !this.state.couponApplied, updatePrice: this.price - 100 }) }} style={{ cursor: "pointer", height: "80px" }}>
                                            {
                                                (this.state.couponApplied) ?
                                                    <div style={{ fontSize: "20px" }}> Remove Coupon</div>
                                                    :
                                                    <p style={{ fontSize: "20px" }}> Rs. 100 discount on minimum order of Rs. 150</p>}</div>
                                        :
                                        null
                                }
                            </div>
                            :
                            <div className="card-body text-center"> <p style={{ fontSize: "20px" }}> No ziggyeats coupons left!</p></div>
                        }
                    </AccordionTab>
                </Accordion>
            </div>
            <div className="d-block d-sm-none">
                <Accordion>
                    <AccordionTab header="Apply coupons" >
                        {(this.state.customerDetails.coupons > 0) ?
                            <div className="card" style={{ maxWidth: "100%", border: "0px", height: "120px" }}>
                                {
                                    (this.price > 150) ?
                                        <div className="card-body text-center" onClick={() => { this.setState({ couponApplied: !this.state.couponApplied, updatePrice: this.price - 100 }) }} style={{ cursor: "pointer", height: "80px" }}>
                                            {
                                                (this.state.couponApplied) ?
                                                    <div style={{ fontSize: "20px", paddingTop: "25px" }}> Remove Coupon</div>
                                                    :
                                                    <p style={{ fontSize: "20px" }}> Rs. 100 discount on minimum order of Rs. 150</p>}</div>
                                        :
                                        null
                                }
                            </div>
                            :
                            <div className="card-body text-center"> <p style={{ fontSize: "20px" }}> No ziggyeats coupons left!</p></div>
                        }
                    </AccordionTab>
                </Accordion>
            </div>
        </React.Fragment >

        return table;
    }
    render() {
        if (localStorage.getItem('orderPlaced') && !this.state.orderButtonClicked) {
            return <Redirect to={'/home/' + this.state.customerId + '/' + this.state.name} />
        }
        return (
            <React.Fragment>
                <NavBar customerId={this.state.customerId} name={this.state.name} home={false} />
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-6 offset-lg-1">
                            <div className="card" style={{ maxWidth: "100%", marginTop: "15px", minHeight: "535px" }}>
                                <div className="card-body">
                                    <h5 style={{ marginBottom: "0px" }}><small className="text-muted">ORDER FOOD ONLINE FROM</small></h5>
                                    <h3 className="display-4" style={{ marginTop: "0px" }}>{localStorage.getItem("restaurantName")}</h3>

                                    {(!this.state.orderButtonClicked) ? this.createTable() :
                                        (this.state.orderButtonClicked && !this.state.successMessage) ? <div className="text-center" style={{ margin: "20px" }}>
                                            <ProgressSpinner style={{ width: '50px', height: '50px' }} strokeWidth="8" fill="#EEEEEE" animationDuration=".5s" />
                                            <p>Placing your order</p></div>
                                            :
                                            <div>
                                                <div className="text-center d-none d-sm-block">
                                                    <div className="text text-dark h2" style={{ marginTop: "100px", marginBottom: "70px", textTransform: 'capitalize' }}>{this.state.successMessage}</div>
                                                    <br />
                                                    {
                                                        (localStorage.getItem('admin') === "true") ?
                                                            <Link className="text text-dark text-decoration-none" to={'/adminportal/' + this.state.customerId + '/' + this.state.name}><span>View your Order status</span></Link>
                                                            :
                                                            <Link className="text text-dark text-decoration-none" to={'/customerportal/' + this.state.customerId + '/' + this.state.name}><span>View your Order status</span></Link>
                                                    }
                                                    <br />
                                                    <Link className="text text-dark text-decoration-none" to={'/restaurant/' + this.state.currentCity + '/' + this.state.customerId + '/' + this.state.name}><span>View more restaurants in {this.state.currentCity}</span></Link>
                                                </div>
                                                <div className="text-center d-block d-sm-none">
                                                    <div className="text text-dark h3" style={{ marginTop: "70px", marginBottom: "70px", textTransform: 'capitalize' }}>{this.state.successMessage}</div>
                                                    <br />
                                                    {
                                                        (localStorage.getItem('admin') === "true") ?
                                                            <Link className="text text-dark text-decoration-none" to={'/adminportal/' + this.state.customerId + '/' + this.state.name}><span>View your Order status</span></Link>
                                                            :
                                                            <Link className="text text-dark text-decoration-none" to={'/customerportal/' + this.state.customerId + '/' + this.state.name}><span>View your Order status</span></Link>
                                                    }
                                                    <br />
                                                    <Link className="text text-dark text-decoration-none" to={'/restaurant/' + this.state.currentCity + '/' + this.state.customerId + '/' + this.state.name}><span>View more restaurants in {this.state.currentCity}</span></Link>
                                                </div>
                                            </div>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}
export default OrderSummary;