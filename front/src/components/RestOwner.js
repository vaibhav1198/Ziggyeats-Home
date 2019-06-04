import React, { Component } from 'react';
import { PanelMenu } from 'primereact/panelmenu';
import { Provider, connect } from 'react-redux';
import { createStore } from 'redux';
import NavBar from './navbar';
import axios from 'axios';
import { ProgressSpinner } from 'primereact/progressspinner';
import BottomNavBar from './BottomNavbar'
import Button from '@material-ui/core/Button';
import { ProgressBar } from "primereact/progressbar";
import WelcomePortal from './WelcomePortal'
import EditDetails from './EditProfile'
import MyAccount from './MyAccount'


var initialState = {
    components: {
        myAccount: false,
        myReviews: false,
        editDetails: false,
        editRestaurant: false,
        orderHistory: false
    }
}
// var componentDidMount = false;
function changeState(state = initialState, action) {
    var stateCopy
    switch (action.type) {
        case 'MyAccount':
            stateCopy = Object.assign({}, state);
            stateCopy.components.myAccount = true;
            stateCopy.components.myReviews = false;
            stateCopy.components.editDetails = false;
            stateCopy.components.editRestaurant = false;
            stateCopy.components.orderHistory = false;
            return stateCopy;
        case 'EditDetails':
            stateCopy = Object.assign({}, state);
            stateCopy.components.myAccount = false;
            stateCopy.components.editDetails = true;
            stateCopy.components.myReviews = false;
            stateCopy.components.editRestaurant = false;
            stateCopy.components.orderHistory = false;
            return stateCopy;
        case 'MyReviews':
            stateCopy = Object.assign({}, state);
            stateCopy.components.myAccount = false;
            stateCopy.components.editDetails = false;
            stateCopy.components.myReviews = true;
            stateCopy.components.editRestaurant = false;
            stateCopy.components.orderHistory = false;
            return stateCopy;

        case 'EditRestaurant':
            stateCopy = Object.assign({}, state);
            stateCopy.components.editRestaurant = true;
            stateCopy.components.orderHistory = false;
            stateCopy.components.myAccount = false;
            stateCopy.components.myReviews = false;
            stateCopy.components.editDetails = false;
            return stateCopy;
        case 'OrderHistory':
            stateCopy = Object.assign({}, state);
            stateCopy.components.editRestaurant = false;
            stateCopy.components.orderHistory = true;
            stateCopy.components.myAccount = false;
            stateCopy.components.myReviews = false;
            stateCopy.components.editDetails = false;
            return stateCopy;
        default:
            return state
    }
}

var store = createStore(changeState);

class PanelMenuMain extends Component {
    constructor() {
        super();
        this.state = {
            items: [
                {
                    label: 'My Account',
                    icon: 'pi pi-user',
                    items: [
                        {
                            label: 'My Details',
                            icon: 'pi pi-fw pi-file',
                            command: () => {
                                var action = {
                                    type: 'MyAccount'
                                }
                                store.dispatch(action)
                            }
                        },
                        {
                            label: 'Edit Details',
                            icon: 'pi pi-fw pi-pencil',
                            command: () => {
                                var action = {
                                    type: 'EditDetails'
                                }
                                store.dispatch(action)
                            }
                        }
                    ]
                },
                {
                    label: 'Restaurants',
                    icon: 'pi pi-circle-on',
                    items: [
                        {
                            label: 'View Details',
                            icon: 'pi pi-fw pi-file',
                            command: () => {
                                var action = {
                                    type: 'MyReviews'
                                }
                                store.dispatch(action)
                            }
                        },
                        {
                            label: 'Edit Details',
                            icon: 'pi pi-fw pi-pencil',
                            command: () => {
                                var action = {
                                    type: 'EditRestaurant'
                                }
                                store.dispatch(action)
                            }
                        }
                    ]
                },
                {
                    label: 'Orders',
                    icon: 'pi pi-info-circle',
                    items: [
                        {
                            label: 'Orders History',
                            icon: 'pi pi-clock',
                            command: () => {
                                var action = {
                                    type: 'OrderHistory'
                                }
                                store.dispatch(action)
                            }
                        }
                    ]
                }
            ]
        };
    }
    render() {
        return (
            <div>
                <div className="d-none d-sm-block">
                    <PanelMenu model={this.state.items} style={{ width: '300px' }} />
                </div>
                <div className="d-block d-sm-none">
                    <PanelMenu model={this.state.items} style={{ width: '345px', marginBottom: 24 }} />
                </div>
            </div>
        );
    }
}


class MyReviews extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: this.props.name,
            customerId: this.props.customerId,
            userData: this.props.userData,
            restaurants: this.props.restaurants,
            selectedRestaurant: ''
        }
    }
    showForm = (event) => {
        this.options = '';
        if (event.target.value) {
            axios.get('http://localhost:1050/restaurant/getRestaurantDetails/' + event.target.value)
                .then((response) => {
                    this.setState({ selectedRestaurant: response.data.message })
                }).catch((err) => {
                    if (err) {
                        this.setState({ errorMessage: "error in fetching data" })
                    }
                    else {
                        this.setState({ errorMessage: "server error" })
                    }
                })
        }
    }

    createDropdown = () => {
        this.options = <select className="form-control" name="location" onChange={this.showForm}>
            <option value="">--Select restaurant--</option>
            {this.options = this.state.restaurants.map((restaurant) => {
                //   //console.log(restaurant)
                return <option value={restaurant.restaurantName}>{restaurant.restaurantName} </option>
            })}
        </select>
    }
    render() {
        if (this.state.restaurants) {
            this.createDropdown();
        }
        if (this.state.selectedRestaurant.length !== 0) {
            return (
                <React.Fragment>
                    <div>
                        <div className="card d-none d-sm-block" style={{ background: 'linear-gradient(45deg, #B2EBF2 30%, #E0F7FA 90%)' }}>
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-md-3 text-dark" style={{ padding: 5, paddingLeft: 10 }}>
                                        Restaurant Name:
                            </div>
                                    <div className="col-md-9 text-dark" style={{ padding: 5 }}>
                                        {this.state.selectedRestaurant[0].restaurantName}
                                    </div>
                                </div>
                                <hr />
                                <div className="row">
                                    <div className="col-md-3 text-dark" style={{ padding: 5, paddingLeft: 10 }}>
                                        Category:
                            </div>
                                    <div className="col-md-9 text-dark" style={{ padding: 5 }}>
                                        {this.state.selectedRestaurant[0].category}
                                    </div>
                                </div>
                                <hr />
                                <div className="row">
                                    <div className="col-md-3 text-dark" style={{ padding: 5, paddingLeft: 10 }}>
                                        Location:
                            </div>
                                    <div className="col-md-9 text-dark" style={{ padding: 5 }}>
                                        {this.state.selectedRestaurant[0].location}
                                    </div>
                                </div>
                                <table className="table table-borderless ">
                                    <thead>
                                        <tr>
                                            <th className="align-middle">Customer Name</th>
                                            <th className="align-middle">Review</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.state.selectedRestaurant[0].reviews.map((review) => {
                                            return (<tr>
                                                <td className="align-middle">{review.reviewBy}</td>
                                                <td className="align-middle">{review.review}</td>
                                            </tr>)
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <div className="card d-block d-sm-none" style={{ background: 'linear-gradient(45deg, #B2EBF2 30%, #E0F7FA 90%)' }}>
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-xs-3 text-dark" style={{ padding: 5, paddingLeft: 10 }}>
                                        Restaurant Name:
                            </div>
                                    <div className="col-xs-9 text-dark" style={{ padding: 5 }}>
                                        {this.state.selectedRestaurant[0].restaurantName}
                                    </div>
                                </div>
                                <hr />
                                <div className="row">
                                    <div className="col-xs-3 text-dark" style={{ padding: 5, paddingLeft: 10 }}>
                                        Category:
                            </div>
                                    <div className="col-xs-9 text-dark" style={{ padding: 5 }}>
                                        {this.state.selectedRestaurant[0].category}
                                    </div>
                                </div>
                                <hr />
                                <div className="row">
                                    <div className="col-xs-3 text-dark" style={{ padding: 5, paddingLeft: 10 }}>
                                        Location:
                            </div>
                                    <div className="col-xs-9 text-dark" style={{ padding: 5 }}>
                                        {this.state.selectedRestaurant[0].location}
                                    </div>
                                </div>
                                <table className="table table-borderless table-responsive">
                                    <thead>
                                        <tr>
                                            <th className="align-middle">Customer Name</th>
                                            <th className="align-middle">Review</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.state.selectedRestaurant[0].reviews.map((review) => {
                                            return (<tr key={review.reviewBy + "564" + review.review}>
                                                <td className="align-middle">{review.reviewBy}</td>
                                                <td className="align-middle">{review.review}</td>
                                            </tr>)
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                    </div>
                </React.Fragment>)
        }
        else {
            return (
                <React.Fragment>
                    <div className="d-none d-sm-block" style={{ width: 500 }}>
                        <h3 className="text-center">Select a restaurant</h3>
                        <form >
                            <div className="text-center" style={{ marginTop: "10px" }}>
                                <span className="">{this.options}</span>
                            </div>
                        </form>
                    </div>
                    <div className="d-block d-sm-none" style={{ width: 345 }}>
                        <h3 className="text-center">Select a restaurant</h3>
                        <form >
                            <div className="text-center" style={{ marginTop: "10px" }}>
                                <span className="">{this.options}</span>
                            </div>
                        </form>
                    </div>
                </React.Fragment>
            )
        }
    }
}

class EditRestaurant extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            restaurants: this.props.restaurants,
            selectedRestaurant: '',
            selectedDishName: '',
            selectedDishPrice: '',
            showEditDishForm: false,
            userData: this.props.userData,
            formErrors: {
                overview: '',
                dishName: '',
                price: ''
            },
            formValid: {
                overview: true,
                dishName: true,
                price: true
            },
            finalObj: {
                restaurantName: '',
                location: '',
                overview: '',
                menu: [],
                price: 0
            },
            updateDishButton: true,
            updateButton: true,
            successMessage: '',
            errorMessage: '',
            clicked: false

        }
        this.options = '';
        this.editDishForm = '';
    }
    showForm = (event) => {
        this.options = '';
        if (event.target.value) {
            axios.get('http://localhost:1050/restaurant/getRestaurantDetails/' + event.target.value)
                .then((response) => {
                    this.setState({ selectedRestaurant: response.data.message })
                })
                .catch((err) => {
                    if (err) {
                        this.setState({ errorMessage: "error in fetching data" })
                    }
                    else {
                        this.setState({ errorMessage: "server error" })
                    }
                })
        }
    }

    createDropdown = () => {
        this.options = <select className="form-control" name="location" onChange={this.showForm}>
            <option value="">--Select restaurant--</option>
            {this.options = this.state.restaurants.map((restaurant) => {
                //   //console.log(restaurant)
                return <option value={restaurant.restaurantName}>{restaurant.restaurantName} </option>
            })}
        </select>
        //console.log(this.options)
    }

    updateDish = () => {
        var selectedRestaurant = this.state.selectedRestaurant;
        for (var i = 0; i < selectedRestaurant[0].menu.length; i++) {
            if (selectedRestaurant[0].menu[i].dishName === this.state.selectedDishName) {
                selectedRestaurant[0].menu[i].price = this.state.selectedDishPrice;
                this.setState({
                    selectedRestaurant: selectedRestaurant
                })
                break;
            }
        }
        this.setState({ showEditDishForm: false })
    }

    editDish = (event) => {
        if (event.target.value) {
            this.setState({
                showEditDishForm: true
            })
            var selectedDishPrice = this.state.selectedRestaurant[0].menu.find((dish) => {
                if (dish.dishName === event.target.value) {
                    return dish
                }
                return null
            })
            this.setState({ selectedDishName: event.target.value, selectedDishPrice: selectedDishPrice.price })
        }
    }

    validate = (event) => {
        var formErrors = this.state.formErrors;
        var formValid = this.state.formValid;
        if (event.target.name === "overview") {
        }
        else if (event.target.name === "price") {
            if (event.target.value <= 0) {
                formErrors.price = 'price cannot be less than zero';
                formValid.price = false;
            }
            else {
                formErrors.price = '';
                formValid.price = true;
            }
            this.setState({ selectedDishPrice: Number(event.target.value), formValid: formValid })
        }
        if (formValid.price) {
            this.setState({ updateDishButton: true })
        }
        else {

            this.setState({ updateDishButton: false })
        }

        if (formValid.overview && formValid.price) {
            this.setState({ updateButton: true })
        }
        else {
            this.setState({ updateButton: false })
        }

    }

    updateRestaurant = () => {
        this.setState({
            clicked: true
        })
        axios.put('http://localhost:1050/restaurant/updateRestaurant', this.state.selectedRestaurant[0])
            .then((response) => {
                this.setState({ successMessage: response.data.message, errorMessage: '' })
            })
            .catch((err) => {
                //console.log(err)
                if (err) {
                    this.setState({ errorMessage: err.response.message, successMessage: '' })
                }
                else {
                    this.setState({ errorMessage: "server error", successMessage: '' })
                }
            })
    }

    deleteDishButton = () => {
        var selectedRestaurant = this.state.selectedRestaurant;
        for (var i = 0; i < selectedRestaurant[0].menu.length; i++) {
            if (selectedRestaurant[0].menu[i].dishName === this.state.selectedDishName) {
                selectedRestaurant[0].menu.splice(i, 1)
                this.setState({ selectedRestaurant: selectedRestaurant })
                break;
            }
        }
        this.setState({ showEditDishForm: false })
    }

    deleteRestaurantButon = () => {
        this.setState({ clicked: true })
        axios.put('http://localhost:1050/restaurant/updateRestaurant', { "restaurantName": this.state.selectedRestaurant[0].restaurantName, "delete": true })
            .then((response) => {
                this.setState({ successMessage: response.data.message, errorMessage: '' })
            })
            .catch((err) => {
                //console.log(err)
                if (err) {
                    this.setState({ errorMessage: err.response.message, successMessage: '' })
                }
                else {
                    this.setState({ errorMessage: "server error", successMessage: '' })
                }
            })
    }

    cancelEditButton = () => {
        this.setState({ showEditDishForm: false })
    }

    render() {
        if (!this.state.successMessage && this.state.clicked) {
            return <div className="text-center" style={{ margin: "20px" }}>
                <ProgressSpinner style={{ width: '50px', height: '50px' }} strokeWidth="8" fill="#EEEEEE" animationDuration=".5s" /><p>Updating</p></div>
        }
        if (this.state.successMessage) {
            return (
                <div>
                    <div style={{ width: 500 }}><h3 className="text-center text-success d-none d-sm-block"> {this.state.successMessage}</h3> </div>
                    <div style={{ width: 345 }}><h3 className="text-center text-success d-block d-sm-none"> {this.state.successMessage}</h3> </div>
                </div>
            )
        }
        if (this.state.restaurants) {
            this.createDropdown();

        }
        if (!this.options) {
            return <div className="text-center" style={{ margin: "20px" }}>
                <ProgressSpinner style={{ width: '50px', height: '50px' }} strokeWidth="8" fill="#EEEEEE" animationDuration=".5s" /><p>Fetching restaurants</p></div>
        }
        if (this.state.selectedRestaurant) {
            return (<React.Fragment>
                <div className="col-md-10 offset-md-1 jumbotron" style={{ width: 500, background: 'linear-gradient(45deg, #B2EBF2 30%, #E0F7FA 90%)' }}>
                    <h3 className="text text-center">Edit {this.state.selectedRestaurant[0].restaurantName}</h3>
                    <form >
                        <div className="form-group">
                            <label>Restaurant Name</label>
                            <input className="form-control" name="restaurantName" value={this.state.selectedRestaurant[0].restaurantName} readOnly />
                        </div>
                        <div className="form-group">
                            <label>Location:</label>
                            <select className="form-control" name="location" value={this.state.selectedRestaurant[0].location} readOnly>
                                <option value="Chandigarh">Chandigarh</option>
                                <option value="New Delhi">New Delhi</option>
                                <option value="Mysore">Mysore</option>
                            </select>
                        </div>
                        {/* <div className="form-group">
                            <label>Overview:</label>
                            <textarea name="overview" value={this.state.selectedRestaurant[0].overview} className="form-control" onChange={this.validate} />
                        </div> */}
                        <p className="text-danger">{this.state.formErrors.overview}</p>
                        <div className="form-group">
                            <label>Menu:</label>
                            <select className="form-control" name="dishesDropdown" onChange={this.editDish}>
                                <option value="">--Select a dish--</option>
                                {this.state.selectedRestaurant[0].menu.map((menu) => {
                                    return <option value={menu.dishName}>{menu.dishName}</option>
                                })}
                            </select>
                            {/* {(this.state.showEditDishForm) ? this.editDishForm : null} */}
                            {
                                this.state.showEditDishForm ?
                                    <form className="jumbotron" style={{ paddingTop: "10px", paddingBottom: "10px" }}>
                                        <div className="form-group">
                                            <label>Dish Name</label>
                                            <input type="text" className="form-control" name="dishName" value={this.state.selectedDishName} readOnly />
                                        </div>
                                        <p><span className="text-danger">{this.state.formErrors.dishName}</span></p>
                                        <div className="form-group">
                                            <label>Price</label>
                                            <input type="Number" className="form-control" name="price" value={this.state.selectedDishPrice} onChange={this.validate} />
                                        </div>
                                        <p><span className="text-danger"></span></p>
                                        <div className="form-group">
                                            <Button style={{ background: 'linear-gradient(45deg, #B2EBF2 30%, #E0F7FA 90%)' }} onClick={this.updateDish} disabled={!this.state.updateDishButton}>Update Dish</Button> &nbsp;
                                        <Button style={{ background: 'linear-gradient(45deg, #B2EBF2 30%, #E0F7FA 90%)', height: 32 }} onClick={this.deleteDishButton}>Remove Dish</Button> &nbsp; <Button type="button" style={{ background: 'linear-gradient(45deg, #B2EBF2 30%, #E0F7FA 90%)', height: 32 }} onClick={this.cancelEditButton}>Cancel</Button>
                                        </div>
                                        <p className="text-danger">{this.state.formErrors.price}</p>
                                    </form>
                                    :
                                    null
                            }
                        </div>
                        <Button style={{ background: 'linear-gradient(45deg, #B2EBF2 30%, #E0F7FA 90%)' }} disabled={!this.state.updateButton} onClick={this.updateRestaurant}>Update</Button> <Button style={{ background: 'linear-gradient(45deg, #B2EBF2 30%, #E0F7FA 90%)', height: 32 }} onClick={this.deleteRestaurantButon}>Remove Restaurant</Button><br />
                    </form>
                </div>
            </React.Fragment>)
        }
        return (
            <React.Fragment>
                <div className="d-none d-sm-block" style={{ width: 500 }}>
                    <h3 className="text-center">Select a restaurant</h3>
                    <form >
                        <div className="text-center" style={{ marginTop: "10px" }}>
                            <span className="">{this.options}</span>
                        </div>
                    </form>
                </div>
                <div className="d-block d-sm-none" style={{ width: 345 }}>
                    <h3 className="text-center">Select a restaurant</h3>
                    <form >
                        <div className="text-center" style={{ marginTop: "10px" }}>
                            <span className="">{this.options}</span>
                        </div>
                    </form>
                </div>
            </React.Fragment>
        )
    }
}


class OrderHistory extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userData: this.props.userData,
            orderHistory: [],
            errorMessage: '',
            successMessage: '',
            buttonClicked: false,
            loading: true,
        }
    }
    componentDidMount = () => {
        axios.get('http://localhost:1050/order/getOrderHistory/' + this.state.userData.address).then((response) => {
            // console.log(response)
            this.setState({ orderHistory: response.data.message, loading: false })
        })
            .catch((err) => {
                if (err) {
                    this.setState({ errorMessage: err.response.data.message })
                }
                else {
                    this.setState({ errorMessage: "server error" })
                }
            })
    }

    orderDelivered = (e) => {
        this.setState({
            buttonClicked: true
        })
        var customerId = e.target.id.split('/')[0];
        var orderId = e.target.id.split('/')[1];
        var orderObj = {
            customerId: customerId,
            orderId: orderId,
            orderStatus: "delivered"
        }
        axios.put("http://localhost:1050/order/updateOrderStatus", orderObj).then((response) => {
            this.setState({ successMessage: "Order Delivered" })
        })
            .catch((err) => {
                this.setState({ errorMessage: "error while updating status" })
            })
        localStorage.removeItem('orderPlaced')
    }

    orderCanceled = (e) => {
        this.setState({ buttonClicked: true })
        var customerId = e.target.id.split('/')[0];
        var orderId = e.target.id.split('/')[1];
        var orderObj = {
            customerId: customerId,
            orderId: orderId,
            orderStatus: "canceled"
        }
        axios.put("http://localhost:1050/order/updateOrderStatus", orderObj).then((response) => {
            this.setState({ successMessage: "Order Cancelled! Unable to take more orders at this moment" })
        })
            .catch((err) => {
                this.setState({ errorMessage: "error while updating status" })
            })
    }

    render() {
        if (this.state.buttonClicked && !this.state.successMessage) {
            window.location.reload();
            //return <div className="text-center" style={{ margin: "20px" }}><ProgressSpinner style={{ width: '50px', height: '50px' }} strokeWidth="8" fill="#EEEEEE" animationDuration=".5s" /><p>Loading</p></div>
        }
        if (this.state.loading) {
            return (
                <div className="text-center" style={{ marginTop: 30, minHeight: 200 }}>
                    <ProgressSpinner style={{ width: '50px', height: '50px' }} strokeWidth="8" fill="#EEEEEE" animationDuration=".5s" />
                    <span className="text text-center">
                        <p>
                            Fetching Details
                                </p>
                    </span>
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
                                <table className="table table-bordered">
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
                                                    {(order.orderStatus === "inProgress") ? <React.Fragment><td><button className="btn" style={{ background: "linear-gradient(45deg, #B2EBF2 30%, #4DD0E1 90%)" }} type="button" id={order.customerId + '/' + order.orderId} onClick={(e) => this.orderDelivered(e)}>Delivered</button></td>
                                                        <td><button className="btn" type="button" style={{ background: "linear-gradient(45deg, #B2EBF2 30%, #4DD0E1 90%)" }} id={order.customerId + '/' + order.orderId} onClick={(e) => this.orderCanceled(e)}>Cancel</button></td></React.Fragment> :
                                                        (order.orderStatus === "delivered") ? <td>delivered</td> : <td>Cancelled</td>}
                                                </tr>
                                            })
                                            : null}
                                    </tbody>
                                </table>
                            </div>
                            <div className="d-block d-sm-none">
                                <table className="table table-bordered table-responsive">
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
                                                    {(order.orderStatus === "inProgress") ? <React.Fragment><td><button className="btn" style={{ background: "linear-gradient(45deg, #B2EBF2 30%, #4DD0E1 90%)" }} type="button" id={order.customerId + '/' + order.orderId} onClick={(e) => this.orderDelivered(e)}>Delivered</button></td>
                                                        <td><button className="btn" type="button" style={{ background: "linear-gradient(45deg, #B2EBF2 30%, #4DD0E1 90%)" }} id={order.customerId + '/' + order.orderId} onClick={(e) => this.orderCanceled(e)}>Cancel</button></td></React.Fragment> :
                                                        (order.orderStatus === "delivered") ? <td>delivered</td> : <td>Cancelled</td>}
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
}

class RestaurantOwner extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            customerId: this.props.customerId,
            name: this.props.name,
            restaurants: [],
            userData: this.props.userData,
            loading: true,
        }
    }
    componentDidMount() {
        // console.log(this.state.userData)
        axios.get('http://localhost:1050/restaurant/getRestaurants/' + this.state.userData.address)
            .then((restaurants) => {
                this.setState({ restaurants: restaurants.data.message, errorMessage: '' })
            })
            .catch((err) => {
                if (err) {
                    this.setState({ errorMessage: "error in fetching data" })
                }
                else {
                    this.setState({ errorMessage: "server error" })
                }
            })

    }
    render() {
        //console.log(this.props.components)
        return (
            <React.Fragment>
                <WelcomePortal name={this.props.name} />
                <div className="container" style={{ marginBottom: "30px" }}>
                    <div className="row">
                        <div className="col-md-4" style={{}}>
                            <PanelMenuMain />
                        </div>
                        <div className="col-md-8" style={{}}>
                            {(this.props.editRestaurant) ? <EditRestaurant userData={this.state.userData} restaurants={this.state.restaurants} /> : null}
                            {(this.props.orderHistory) ? <OrderHistory userData={this.state.userData} /> : null}
                            {(this.props.myAccount) ? <MyAccount name={this.state.name} customerId={this.state.customerId} userData={this.state.userData} /> : null}
                            {(this.props.myReviews) ? <MyReviews name={this.state.name} restaurants={this.state.restaurants} customerId={this.state.customerId} userData={this.state.userData} /> : null}
                            {(this.props.editDetails) ? <EditDetails name={this.state.name} customerId={this.state.customerId} userData={this.state.userData} /> : null}
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

class RestaurantOwnerHome extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            customerId: this.props.match.params.customerId,
            name: this.props.match.params.name,
            userData: [],
            loading: true
        }
    }
    componentDidMount = () => {
        if(localStorage.getItem('rOwner') !== "true"){
            window.location.assign('/e')
        }
        // var componentDidMount = true;
        this.setState({ userData: [], errorMessage: '' })
        axios.get('http://localhost:1050/auth/getCustomerDetails/' + this.state.customerId).then(response => {
            // console.log(response)
            this.setState({ userData: response.data.message[0], errorMessage: '', loading: false })
        }).catch(error => {
            if (error.response) {
                this.setState({ errorMessage: error.response.data.message, userData: [] })
            }
            else {
                this.setState({ errorMessage: 'Server Error', userData: [] })
            }
        })
    }

    render() {
        if (this.state.loading) {
            return (
                <div>
                    <NavBar customerId={this.state.customerId} name={this.state.name} home={false} />
                    <div className="text-center" style={{ minHeight: 600 }}>
                        <div className="text-center d-none d-sm-block" style={{ minHeight: 600 }}>
                            <ProgressBar mode="indeterminate" style={{ height: "7px" }} />
                        </div>
                        <div className="text-center d-block d-sm-none" style={{ minHeight: 400 }}>
                            <ProgressBar mode="indeterminate" style={{ height: "5px" }} />
                        </div>
                    </div>
                    <BottomNavBar customerId={this.state.customerId} name={this.state.name} />
                </div>
            )
        }
        else {
            return (
                <Provider store={store}>
                    <NavBar customerId={this.state.customerId} name={this.state.name} home={false} />
                    <RestaurantOwner name={this.state.name} customerId={this.state.customerId} userData={this.state.userData} />
                    <BottomNavBar customerId={this.state.customerId} name={this.state.name} />
                </Provider>
            )
        }
    }
}

function mapStateToProps(state) {
    return {
        editRestaurant: state.components.editRestaurant,
        orderHistory: state.components.orderHistory,
        myAccount: state.components.myAccount,
        myReviews: state.components.myReviews,
        editDetails: state.components.editDetails,
    }

}
RestaurantOwner = connect(mapStateToProps)(RestaurantOwner);
export default RestaurantOwnerHome;