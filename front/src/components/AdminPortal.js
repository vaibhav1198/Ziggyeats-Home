import React, { Component } from 'react';
import { PanelMenu } from 'primereact/panelmenu';
import { Provider, connect } from 'react-redux';
import { createStore } from 'redux';
import NavBar from './navbar';
import axios from 'axios';
import { ProgressSpinner } from 'primereact/progressspinner';
import BottomNavBar from './BottomNavbar'
import Button from '@material-ui/core/Button';
import WelcomePortal from './WelcomePortal'
import EditDetails from './EditProfile'
import MyAccount from './MyAccount'
import OrderHistory from './OrderHistory'



var initialState = {
    components: {
        myAccount: false,
        myReviews: false,
        editDetails: false,
        addRestaurant: false,
        viewRestaurant: false,
        orderHistory: false,
        myOrder: false
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
            stateCopy.components.addRestaurant = false;
            stateCopy.components.viewRestaurant = false;
            stateCopy.components.orderHistory = false;
            stateCopy.components.myOrder = false;
            return stateCopy;
        case 'MyOrder':
            stateCopy = Object.assign({}, state);
            stateCopy.components.myOrder = true;
            stateCopy.components.myAccount = false;
            stateCopy.components.myReviews = false;
            stateCopy.components.editDetails = false;
            stateCopy.components.addRestaurant = false;
            stateCopy.components.viewRestaurant = false;
            stateCopy.components.orderHistory = false;
            return stateCopy;
        case 'EditDetails':
            stateCopy = Object.assign({}, state);
            stateCopy.components.myOrder = false;
            stateCopy.components.myAccount = false;
            stateCopy.components.editDetails = true;
            stateCopy.components.myReviews = false;
            stateCopy.components.addRestaurant = false;
            stateCopy.components.viewRestaurant = false;
            stateCopy.components.orderHistory = false;
            return stateCopy;
        case 'MyReviews':
            stateCopy = Object.assign({}, state);
            stateCopy.components.myAccount = false;
            stateCopy.components.editDetails = false;
            stateCopy.components.myOrder = false;
            stateCopy.components.myReviews = true;
            stateCopy.components.addRestaurant = false;
            stateCopy.components.viewRestaurant = false;
            stateCopy.components.orderHistory = false;
            return stateCopy;


        case 'AddRestaurant':
            stateCopy = Object.assign({}, state);
            stateCopy.components.addRestaurant = true;
            stateCopy.components.viewRestaurant = false;
            stateCopy.components.orderHistory = false;
            stateCopy.components.myOrder = false;
            stateCopy.components.myAccount = false;
            stateCopy.components.myReviews = false;
            stateCopy.components.editDetails = false;
            return stateCopy;
        case 'ViewRestaurant':
            stateCopy = Object.assign({}, state);
            stateCopy.components.addRestaurant = false;
            stateCopy.components.viewRestaurant = true;
            stateCopy.components.orderHistory = false;
            stateCopy.components.myAccount = false;
            stateCopy.components.myReviews = false;
            stateCopy.components.myOrder = false;
            stateCopy.components.editDetails = false;
            return stateCopy;
        case 'OrderHistory':
            stateCopy = Object.assign({}, state);
            stateCopy.components.addRestaurant = false;
            stateCopy.components.viewRestaurant = false;
            stateCopy.components.orderHistory = true;
            stateCopy.components.myAccount = false;
            stateCopy.components.myReviews = false;
            stateCopy.components.myOrder = false;
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
                    label: 'My Orders',
                    icon: 'pi pi-info-circle',
                    items: [
                        {
                            label: 'View Orders',
                            icon: 'pi pi-clock',
                            command: () => {
                                var action = {
                                    type: 'MyOrder'
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
                            label: 'Add a Restaurant',
                            icon: 'pi pi-plus-circle',
                            command: () => {
                                var action = {
                                    type: 'AddRestaurant'
                                }
                                store.dispatch(action)
                            }
                        },
                        {
                            label: 'Order History',
                            icon: 'pi pi-pi-clock',
                            command: () => {
                                var action = {
                                    type: 'OrderHistory'
                                }
                                store.dispatch(action)
                            }
                        },
                    ]
                },
                {
                    label: 'Request list',
                    icon: 'pi pi-check',
                    items: [
                        {
                            label: 'Pending Restaurants',
                            icon: 'pi pi-plus-circle',
                            command: () => {
                                var action = {
                                    type: 'ViewRestaurant'
                                }
                                store.dispatch(action)
                            }
                        }
                    ]
                },
                {
                    label: 'All Restaurants Orders',
                    icon: 'pi pi-info-circle',
                    items: [
                        {
                            label: 'View Orders Summary',
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

class AddRestaurant extends React.Component {
    constructor() {
        super()
        this.state = {
            showAddDish: false,
            formValues: {
                restaurantName: '',
                location: '',
                dishes: 0,
                price: 0
            },
            formError: {
                restaurantName: '',
                location: '',
                dishes: '',
                price: ''
            },
            formValid: {
                restaurantName: false,
                location: false,
                dishes: false,
                price: false,
                button: false,
                dishButton: false
            },
            totalDishes: [],
            successMessage: '',
            errorMessage: '',
            clicked: false
        }
    }

    addDish = () => {
        this.setState({
            showAddDish: true
        })
    }

    addRestaurant = () => {
        this.setState({
            clicked: true
        })
        var newRestaurant = this.state.formValues;
        newRestaurant.totalDishes = this.state.totalDishes;
        axios.post('/restaurant/insertRestaurant', newRestaurant).then((response) => {
            // console.log(response)
            this.setState({ successMessage: "Restaurant Has been added!!", errorMessage: '' })
        }).catch((err) => {
            // console.log(err.response.data.message)
            if (err.response) {
                this.setState({ successMessage: '', errorMessage: "Sorry! Restaurant already present in database!" })
            }
            else {
                this.setState({ successMessage: '', errorMessage: 'server error' })
            }
        })
    }

    addDishToDB = () => {

        var formValues = this.state.formValues;
        formValues.dishes = formValues.dishes + 1;
        var totalDishes = {
            dishName: this.state.formValues.dishName,
            price: this.state.formValues.price
        }
        var totalDishesArr = this.state.totalDishes;
        totalDishesArr.push(totalDishes)
        this.setState({ showAddDish: false, formValues: formValues, totalDishes: totalDishesArr })
        var formValid = this.state.formValid
        if (formValid.restaurantName && formValid.location && this.state.formValues.dishes > 0) {
            formValid.button = true;
        }
        else {
            formValid.button = false;
        }

        this.setState({ formValid: formValid })

    }

    valdiator = (event) => {
        var formError = this.state.formError;
        var formValid = this.state.formValid;
        var formValues = this.state.formValues;
        if (event.target.name === "restaurantName") {
            if (event.target.value.length === 0) {
                formError.restaurantName = 'Field required';
                formValid.restaurantName = false;
                formValues.restaurantName = '';
                this.setState({ formError: formError, formValid: formValid, formValues: formValues })
            }
            else {
                formError.restaurantName = '';
                formValid.restaurantName = true;
                formValues.restaurantName = event.target.value;
                this.setState({ formError: formError, formValid: formValid, formValues: formValues })
            }
        }
        else if (event.target.name === "location") {
            if (event.target.value.length === 0) {
                formError.location = 'Field required';
                formValid.location = false;
                formValues.location = '';
                this.setState({ formError: formError, formValid: formValid, formValues: formValues })
            }
            else {
                formError.location = '';
                formValid.location = true;
                formValues.location = event.target.value;
                this.setState({ formError: formError, formValid: formValid, formValues: formValues })
            }
        }
        else if (event.target.name === 'dishName') {
            if (event.target.value.length === 0) {
                formError.dishes = 'Field required';
                formValid.dishes = false;
                formValues.dishName = '';
                this.setState({ formError: formError, formValid: formValid, formValues: formValues })
            }
            else {
                formError.dishes = '';
                formValid.dishes = true;
                formValues.dishName = event.target.value;
                this.setState({ formError: formError, formValid: formValid, formValues: formValues })
            }
        }
        else if (event.target.name === 'price') {
            if (event.target.value <= 0) {
                formError.price = 'Price cannot be zero';
                formValid.price = false;
                formValues.price = '';
                this.setState({ formError: formError, formValid: formValid, formValues: formValues })
            }
            else {
                formError.price = '';
                formValid.price = true;
                formValues.price = event.target.value;
                this.setState({ formError: formError, formValid: formValid, formValues: formValues })
            }
        }
        if (formValid.dishes && formValid.price) {
            formValid.dishButton = true;
        }
        else {
            formValid.dishButton = false;
        }

        if (formValid.restaurantName && formValid.location && this.state.formValues.dishes > 0) {
            formValid.button = true;
        }
        else {
            formValid.button = false;
        }
        this.setState({ formValid: formValid })
    }

    render() {

        if (!this.state.successMessage && this.state.clicked) {
            return <ProgressSpinner style={{ width: '50px', height: '50px' }} strokeWidth="8" fill="#EEEEEE" animationDuration=".5s" />
        }
        if (this.state.successMessage) {
            return (
                <div className="h3 text text-dark">
                    {this.state.successMessage}
                </div>
            )
        }
        if (this.state.errorMessage) {
            return (
                <div className="h3 text text-dark">
                    {this.state.errorMessage}
                </div>
            )
        }
        return (
            <React.Fragment>
                <div className="d-none d-sm-block">
                    {
                        (this.state.successMessage) ?
                            <h2><span className="text-success" style={{ marginLeft: "25%", marginTop: "20%" }}>{this.state.successMessage}</span></h2>
                            :
                            <div className="col-md-10 offset-md-1 jumbotron" style={{ background: 'linear-gradient(45deg, #B2EBF2 30%, #E0F7FA 90%)' }}>
                                <h3 className="text-center">Add a restaurant</h3>
                                <form >
                                    <div className="form-group">
                                        <label>Restaurant Name</label>
                                        <input className="form-control" onChange={this.valdiator} name="restaurantName" />
                                    </div>
                                    <p><span className="text-danger">{this.state.formError.restaurantName}</span></p>
                                    <div className="form-group">
                                        <label>Location:</label>
                                        <select className="form-control" name="location" onChange={this.valdiator}>
                                            <option value="">--Select location--</option>
                                            <option value="Chandigarh">Chandigarh</option>
                                            <option value="New Delhi">New Delhi</option>
                                            <option value="Mysore">Mysore</option>
                                        </select>
                                    </div>
                                    <p><span className="text-danger">{this.state.formError.location}</span></p>
                                    <div className="form-group">
                                        <label className="form-check-inline">Menu: </label>
                                        <p>Total dishes in menu: <span className="text-info">{this.state.formValues.dishes}</span></p>
                                        {(!this.state.showAddDish) ? <Button className="" onClick={this.addDish} style={{ background: "linear-gradient(45deg, #B2EBF2 30%, #4DD0E1 90%)" }}>Add a dish</Button> :
                                            <div className="jumbotron" style={{ paddingTop: "10px", paddingBottom: "10px" }}>
                                                <div className="form-group">
                                                    <label>Dish Name</label>
                                                    <input type="text" className="form-control" name="dishName" onChange={this.valdiator} />
                                                </div>
                                                <p><span className="text-danger">{this.state.formError.dishes}</span></p>
                                                <div className="form-group">
                                                    <label>Price</label>
                                                    <input type="Number" className="form-control" name="price" onChange={this.valdiator} />
                                                </div>
                                                <p><span className="text-danger">{this.state.formError.price}</span></p>
                                                <div className="form-group">
                                                    <Button style={{ background: "linear-gradient(45deg, #B2EBF2 30%, #4DD0E1 90%)" }} onClick={this.addDishToDB} disabled={!this.state.formValid.dishButton}>Add</Button>
                                                </div>
                                            </div>
                                        }
                                    </div>
                                    <Button style={{ background: "linear-gradient(45deg, #B2EBF2 30%, #4DD0E1 90%)" }} disabled={!this.state.formValid.button} onClick={this.addRestaurant}>Add</Button><br />
                                </form>
                                <p><span className="text-danger">{this.state.errorMessage}</span></p>
                            </div>}
                </div>
                <div className="d-block d-sm-none">
                    {
                        (this.state.successMessage) ?
                            <div className="col-xs-12 jumbotron" style={{ background: 'linear-gradient(45deg, #B2EBF2 30%, #E0F7FA 90%)' }}>
                                <h2><span className="text text-success" style={{ marginLeft: "25%", marginTop: "20%" }}>{this.state.successMessage}</span></h2>
                            </div>
                            :
                            <div className="col-xs-12 jumbotron" style={{ background: 'linear-gradient(45deg, #B2EBF2 30%, #E0F7FA 90%)' }}>
                                <h3 className="text-center">Add a restaurant</h3>
                                <form >
                                    <div className="form-group">
                                        <label>Restaurant Name</label>
                                        <input className="form-control" onChange={this.valdiator} name="restaurantName" />
                                    </div>
                                    <p><span className="text-danger">{this.state.formError.restaurantName}</span></p>
                                    <div className="form-group">
                                        <label>Location:</label>
                                        <select className="form-control" name="location" onChange={this.valdiator}>
                                            <option value="">--Select location--</option>
                                            <option value="Chandigarh">Chandigarh</option>
                                            <option value="New Delhi">New Delhi</option>
                                            <option value="Mysore">Mysore</option>
                                        </select>
                                    </div>
                                    <p><span className="text-danger">{this.state.formError.location}</span></p>
                                    <div className="form-group">
                                        <label className="form-check-inline">Menu: </label>
                                        <p>Total dishes in menu: <span className="text-info">{this.state.formValues.dishes}</span></p>
                                        {(!this.state.showAddDish) ? <Button className="" onClick={this.addDish} style={{ background: "linear-gradient(45deg, #B2EBF2 30%, #4DD0E1 90%)" }}>Add a dish</Button> :
                                            <div className="jumbotron" style={{ paddingTop: "10px", paddingBottom: "10px" }}>
                                                <div className="form-group">
                                                    <label>Dish Name</label>
                                                    <input type="text" className="form-control" name="dishName" onChange={this.valdiator} />
                                                </div>
                                                <p><span className="text-danger">{this.state.formError.dishes}</span></p>
                                                <div className="form-group">
                                                    <label>Price</label>
                                                    <input type="Number" className="form-control" name="price" onChange={this.valdiator} />
                                                </div>
                                                <p><span className="text-danger">{this.state.formError.price}</span></p>
                                                <div className="form-group">
                                                    <Button style={{ background: "linear-gradient(45deg, #B2EBF2 30%, #4DD0E1 90%)" }} onClick={this.addDishToDB} disabled={!this.state.formValid.dishButton}>Add</Button>
                                                </div>
                                            </div>
                                        }
                                    </div>
                                    <Button style={{ background: "linear-gradient(45deg, #B2EBF2 30%, #4DD0E1 90%)" }} disabled={!this.state.formValid.button} onClick={this.addRestaurant}>Add</Button><br />
                                </form>
                                <p><span className="text-danger">{this.state.errorMessage}</span></p>
                            </div>}
                </div>
            </React.Fragment>)
    }
}

class ViewRestaurant extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            viewRestaurant: [],
            errorMessage: '',
            successMessage: '',
            buttonClicked: false,
            loading: true,
            totalDishes: [],
        }
    }
    componentDidMount = () => {
        axios.get('/restaurant/getPendingRestaurants').then((response) => {
            // console.log(response)
            this.setState({ viewRestaurant: response.data.message, loading: false })
        })
            .catch((err) => {
                if (err) {
                    this.setState({ errorMessage: err.response.data.message, loading: false })
                }
                else {
                    this.setState({ errorMessage: "server error", loading: false })
                }
            })
    }

    restaurantAccepted = (e) => {
        this.setState({
            buttonClicked: true
        })
        var restaurantName = e.target.id.split('/')[0];
        var location = e.target.id.split('/')[1];
        var i = 0, j = 0;
        for (i = 0; i < this.state.viewRestaurant.length; i++) {
            if (this.state.viewRestaurant[i].restaurantName === restaurantName) {
                var totalDishesArr = this.state.totalDishes;
                for (j = 0; j < this.state.viewRestaurant[i].menu.length; j++) {
                    var totalDishes = {
                        dishName: this.state.viewRestaurant[i].menu[j].dishName,
                        price: this.state.viewRestaurant[i].menu[j].price
                    }
                    totalDishesArr.push(totalDishes)
                }
            }
        }
        var newRestaurant = {
            restaurantName: restaurantName,
            location: location,
            totalDishes: totalDishesArr
        }
        axios.post('/restaurant/insertRestaurant', newRestaurant).then((response) => {
            this.setState({ successMessage: "Restaurant accepted" })
        }).catch((err) => {
            this.setState({ errorMessage: "error while accepting" })
        })

        axios.delete("/restaurant/rejectRestaurantRequest/" + restaurantName).then((response) => {
            this.setState({ successMessage: "Restaurant Rejected" })
        }).catch((err) => {
            this.setState({ errorMessage: "error while rejecting" })
        })
    }

    restaurantRejected = (e) => {
        this.setState({ buttonClicked: true })
        var restaurantName = e.target.id;
        axios.delete("/restaurant/rejectRestaurantRequest/" + restaurantName).then((response) => {
            this.setState({ successMessage: "Restaurant Rejected" })
        }).catch((err) => {
            this.setState({ errorMessage: "error while rejecting" })
        })

    }

    render() {
        if (this.state.buttonClicked && !this.state.successMessage) {
            window.location.reload();
        }
        if (this.state.loading) {
            return (
                <div className="text-center" style={{ marginTop: 30, minHeight: 350 }}>
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
            return (
                <div>
                    <div className="d-none d-sm-block">
                        <div className="jumbotron" style={{ background: 'linear-gradient(45deg, #B2EBF2 30%, #E0F7FA 90%)' }}>
                            {
                                this.state.viewRestaurant.length === 0 ?
                                    <div className="h3 text text-dark">
                                        No New Requests had been made!!
                    </div>
                                    :
                                    <table className="table table-bordered">
                                        <thead>
                                            <tr>
                                                <th className="align-middle">Restaurant</th>
                                                <th className="align-middle">Location</th>
                                                <th className="align-middle">Menu Items</th>
                                                <th className="align-middle" colSpan="2">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {this.state.viewRestaurant.map((order) => {
                                                return <tr key={order._id}>
                                                    {/* <td> {order.orderId} </td> */}
                                                    <td className="align-middle"> {order.restaurantName}</td>
                                                    <td className="align-middle">{order.location}</td>
                                                    <td className="align-middle">
                                                        {order.menu.length}
                                                    </td>
                                                    <React.Fragment><td className="align-middle"><div className="d-flex justify-content-center"><button className="btn" type="button" style={{ background: "linear-gradient(45deg, #B2EBF2 30%, #4DD0E1 90%)" }} id={order.restaurantName + '/' + order.location + '/' + order.menu} onClick={(e) => this.restaurantAccepted(e)}>Accept</button></div></td>
                                                        <td className="align-middle"><div className="d-flex justify-content-center"><button className="btn" type="button" style={{ background: "linear-gradient(45deg, #B2EBF2 30%, #4DD0E1 90%)" }} id={order.restaurantName} onClick={(e) => this.restaurantRejected(e)}>Reject</button></div></td>
                                                    </React.Fragment>
                                                </tr>
                                            })
                                            }
                                        </tbody>
                                    </table>
                            }
                        </div>
                    </div>
                    <div className="d-block d-sm-none">
                        <div className="jumbotron" style={{ background: 'linear-gradient(45deg, #B2EBF2 30%, #E0F7FA 90%)' }}>
                            {
                                this.state.viewRestaurant.length === 0 ?
                                    <div className="h3 text text-dark">
                                        No New Requests had been made!!
                    </div>
                                    :
                                    <table className="table table-responsive table-bordered">
                                        <thead>
                                            <tr>
                                                <th className="align-middle">Restaurant</th>
                                                <th className="align-middle">Location</th>
                                                <th className="align-middle">Menu Items</th>
                                                <th className="align-middle" colSpan="2">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {this.state.viewRestaurant.map((order) => {
                                                return <tr key={order._id}>
                                                    {/* <td> {order.orderId} </td> */}
                                                    <td className="align-middle"> {order.restaurantName}</td>
                                                    <td className="align-middle">{order.location}</td>
                                                    <td className="align-middle">
                                                        {order.menu.length}
                                                    </td>
                                                    <React.Fragment><td className="align-middle"><button className="btn" type="button" style={{ background: "linear-gradient(45deg, #B2EBF2 30%, #4DD0E1 90%)" }} id={order.restaurantName + '/' + order.location + '/' + order.menu} onClick={(e) => this.restaurantAccepted(e)}>Accept</button></td>
                                                        <td className="align-middle"><button className="btn" type="button" style={{ background: "linear-gradient(45deg, #B2EBF2 30%, #4DD0E1 90%)" }} id={order.restaurantName} onClick={(e) => this.restaurantRejected(e)}>Reject</button></td>
                                                    </React.Fragment>
                                                </tr>
                                            })
                                            }
                                        </tbody>
                                    </table>
                            }
                        </div>
                    </div>

                </div>
            )
        }
    }
}


class AdminPortal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            customerId: this.props.customerId,
            name: this.props.name,
            userData: [],
            loading: true,
        }
    }
    componentDidMount() {
        this.setState({ userData: [], errorMessage: '' })
        axios.get('/auth/getCustomerDetails/' + this.state.customerId).then(response => {
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
        return (
            <React.Fragment>
                <WelcomePortal name={this.props.name} />
                <div className="container" style={{ marginBottom: "30px" }}>
                    <div className="row">
                        <div className="col-md-4" style={{}}>
                            <PanelMenuMain />
                        </div>
                        <div className="col-md-8" style={{}}>
                            {(this.props.addRestaurant) ? <AddRestaurant name={this.state.name} customerId={this.state.customerId} userData={this.state.userData} /> : null}
                            {(this.props.orderHistory) ? <OrderHistory name={this.state.name} customerId={this.state.customerId} userData={this.state.userData} /> : null}
                            {(this.props.myOrder) ? <OrderHistory name={this.state.name} order={this.state.userData.orders} customerId={this.state.customerId} userData={this.state.userData} myOrders={"true"} /> : null}
                            {(this.props.viewRestaurant) ? <ViewRestaurant /> : null}
                            {(this.props.myAccount) ? <MyAccount name={this.state.name} customerId={this.state.customerId} userData={this.state.userData} /> : null}
                            {(this.props.editDetails) ? <EditDetails name={this.state.name} customerId={this.state.customerId} userData={this.state.userData} /> : null}
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

class AdminHome extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            customerId: this.props.match.params.customerId,
            name: this.props.match.params.name,
        }
    }
    componentDidMount = () => {
        if (localStorage.getItem('siteAdmin') !== "true") {
            window.location.assign('/e')
        }
        //        var componentDidMount = true;
    }
    render() {
        return (
            <Provider store={store}>
                <NavBar customerId={this.state.customerId} name={this.state.name} home={false} />
                <AdminPortal name={this.state.name} customerId={this.state.customerId} />
                <BottomNavBar customerId={this.state.customerId} name={this.state.name} />
            </Provider>
        )
    }
}

function mapStateToProps(state) {
    return {
        addRestaurant: state.components.addRestaurant,
        viewRestaurant: state.components.viewRestaurant,
        orderHistory: state.components.orderHistory,
        myAccount: state.components.myAccount,
        myReviews: state.components.myReviews,
        myOrder: state.components.myOrder,
        editDetails: state.components.editDetails,
    }
}
AdminPortal = connect(mapStateToProps)(AdminPortal);
export default AdminHome;