import React, { Component } from 'react';
import NavBar from './navbar';
import axios from 'axios';
import BottomNavBar from './BottomNavbar'
import Button from '@material-ui/core/Button';
import { ProgressBar } from "primereact/progressbar";

export default class AddRestaurant extends Component {
    constructor(props) {
        super(props)
        this.state = {
            customerId: this.props.match.params.customerId,
            name: this.props.match.params.name,
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
            clicked: false,
            currentCity: '',
            cityLoading: true,
            loggedin: false
        }
    }
    addDish = () => {
        this.setState({
            showAddDish: true
        })
    }
    componentDidMount = () => {
        if (!localStorage.getItem("admin")) {
            this.setState({ loggedin: true })
        }
    }
    addMenu = () => {
        this.setState({ clicked: true })
        var newRestaurant = this.state.formValues;
        newRestaurant.totalDishes = this.state.totalDishes;
        axios.post('http://localhost:1050/restaurant/insertRestaurantRequest', newRestaurant)
            .then((response) => {
                this.setState({ successMessage: 'Request Received', errorMessage: '' })
            }).catch((err) => {
                // console.log(err.response.data.message)
                if (err.response) {
                    // console.log(err.response.data.message)
                    this.setState({ successMessage: '', errorMessage: "You have already requested for " + this.state.formValues.restaurantName + "! Please wait for a while!" })
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
                this.setState({
                    formError: formError,
                    formValid: formValid,
                    formValues: formValues
                })
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
        if (this.state.successMessage) {
        }
        return (
            <React.Fragment>
                <NavBar customerId={this.state.customerId} name={this.state.name} home={false} />
                <div className="d-none d-sm-block">
                    <div className="row">
                        <div className="col-md-6 offset-md-3 jumbotron" style={{ marginTop: 50, background: 'linear-gradient(45deg, #B2EBF2 30%, #E0F7FA 90%)' }}>
                            {
                                (!this.state.successMessage && this.state.clicked) && (!this.state.errorMessage && this.state.clicked) ?
                                    <ProgressBar mode="indeterminate" style={{ height: "6px", marginTop: "10px" }} />
                                    :
                                    this.state.successMessage ?
                                        <div style={{}}><span className="h3 text-dark d-flex content-justify-center" style={{}}>{this.state.successMessage}</span></div>
                                        :
                                        this.state.errorMessage ?
                                            <div style={{}}><span className="h3 text-dark d-flex content-justify-center" style={{}}>{this.state.errorMessage}</span></div>
                                            :
                                            <div>
                                                <h3 className="text-center">Request Form</h3>
                                                <form >
                                                    <div className="form-group">
                                                        <label>Restaurant Name</label>
                                                        <input className="form-control" onChange={this.valdiator} name="restaurantName" />
                                                    </div>
                                                    <div><span className="text-danger">{this.state.formError.restaurantName}</span></div>
                                                    <div className="form-group">
                                                        <label>Location:</label>
                                                        <select className="form-control" name="location" onChange={this.valdiator}>
                                                            <option value="">--Select location--</option>
                                                            <option value="Chandigarh">Chandigarh</option>
                                                            <option value="New Delhi">New Delhi</option>
                                                            <option value="Mysore">Mysore</option>
                                                        </select>
                                                    </div>
                                                    <div><span className="text-danger">{this.state.formError.location}</span></div>
                                                    <div className="form-group">
                                                        <label className="form-check-inline">Menu: </label>
                                                        <div>Total dishes in menu: <span className="text-info">{this.state.formValues.dishes}</span></div>
                                                        {(!this.state.showAddDish) ? <Button className="" onClick={this.addDish} style={{ background: "linear-gradient(45deg, #B2EBF2 30%, #4DD0E1 90%)" }}>Add a dish</Button> :
                                                            <div className="jumbotron" style={{ paddingTop: "10px", paddingBottom: "10px" }}>
                                                                <div className="form-group">
                                                                    <label>Dish Name</label>
                                                                    <input type="text" className="form-control" name="dishName" onChange={this.valdiator} />
                                                                </div>
                                                                <div><span className="text-danger">{this.state.formError.dishes}</span></div>
                                                                <div className="form-group">
                                                                    <label>Price</label>
                                                                    <input type="Number" className="form-control" name="price" onChange={this.valdiator} />
                                                                </div>
                                                                <div><span className="text-danger">{this.state.formError.price}</span></div>
                                                                <div className="form-group">
                                                                    <Button style={{ background: "linear-gradient(45deg, #B2EBF2 30%, #4DD0E1 90%)" }} onClick={this.addDishToDB} disabled={!this.state.formValid.dishButton}>Add Dish</Button>
                                                                </div>
                                                            </div>
                                                        }
                                                    </div>
                                                    <Button style={{ background: "linear-gradient(45deg, #B2EBF2 30%, #4DD0E1 90%)" }} disabled={!this.state.formValid.button} onClick={this.addMenu}>Send Request</Button><br />
                                                </form>
                                                <div><span className="text-danger">{this.state.errorMessage}</span></div>
                                            </div>
                            }
                        </div>
                    </div>
                </div>
                <div className="d-block d-sm-none">
                    <div className="col-xs-12 jumbotron" style={{ margin: 15, background: 'linear-gradient(45deg, #B2EBF2 30%, #E0F7FA 90%)' }}>
                        {
                            !this.state.successMessage && this.state.clicked ?
                                <ProgressBar mode="indeterminate" style={{ height: "6px", marginTop: "10px" }} />
                                :
                                this.state.successMessage ?
                                    <div style={{}}><span className="h3 text-dark" style={{ marginLeft: "25%", marginTop: "20%" }}>{this.state.successMessage}</span></div>
                                    :
                                    <div>
                                        <h3 className="text-center">Request Form</h3>
                                        <form >
                                            <div className="form-group">
                                                <label>Restaurant Name</label>
                                                <input className="form-control" onChange={this.valdiator} name="restaurantName" />
                                            </div>
                                            <div><span className="text-danger">{this.state.formError.restaurantName}</span></div>
                                            <div className="form-group">
                                                <label>Location:</label>
                                                <select className="form-control" name="location" onChange={this.valdiator}>
                                                    <option value="">--Select location--</option>
                                                    <option value="Chandigarh">Chandigarh</option>
                                                    <option value="New Delhi">New Delhi</option>
                                                    <option value="Mysore">Mysore</option>
                                                </select>
                                            </div>
                                            <div><span className="text-danger">{this.state.formError.location}</span></div>
                                            <div className="form-group">
                                                <label className="form-check-inline">Menu: </label>
                                                <div>Total dishes in menu: <span className="text-info">{this.state.formValues.dishes}</span></div>
                                                {(!this.state.showAddDish) ? <Button className="" onClick={this.addDish} style={{ background: "linear-gradient(45deg, #B2EBF2 30%, #4DD0E1 90%)" }}>Add a dish</Button> :
                                                    <div className="jumbotron" style={{ paddingTop: "10px", paddingBottom: "10px" }}>
                                                        <div className="form-group">
                                                            <label>Dish Name</label>
                                                            <input type="text" className="form-control" name="dishName" onChange={this.valdiator} />
                                                        </div>
                                                        <div><span className="text-danger">{this.state.formError.dishes}</span></div>
                                                        <div className="form-group">
                                                            <label>Price</label>
                                                            <input type="Number" className="form-control" name="price" onChange={this.valdiator} />
                                                        </div>
                                                        <div><span className="text-danger">{this.state.formError.price}</span></div>
                                                        <div className="form-group">
                                                            <Button style={{ background: "linear-gradient(45deg, #B2EBF2 30%, #4DD0E1 90%)" }} onClick={this.addDishToDB} disabled={!this.state.formValid.dishButton}>Add Dish</Button>
                                                        </div>
                                                    </div>
                                                }
                                            </div>
                                            <Button style={{ background: "linear-gradient(45deg, #B2EBF2 30%, #4DD0E1 90%)" }} disabled={!this.state.formValid.button} onClick={this.addMenu}>Send Request</Button><br />
                                        </form>
                                        <div><span className="text-danger">{this.state.errorMessage}</span></div>
                                    </div>
                        }
                    </div>
                </div>
                <BottomNavBar customerId={this.state.customerId} name={this.state.name} home={false} />
            </React.Fragment>
        )
    }
}