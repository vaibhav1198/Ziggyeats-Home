import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import '../index.css'
import { Dialog } from 'primereact/dialog';
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import axios from 'axios';
import ls from 'local-storage';
import { Dropdown } from 'primereact/dropdown';
import { AutoComplete } from 'primereact/autocomplete';
import SplitB from './mui/SplitButtons'
import Button from '@material-ui/core/Button';
import { Growl } from 'primereact/growl';
import CheckLogin from './checkLogin'
import { ProgressSpinner } from 'primereact/progressspinner';
import SearchBar from './SearchBar'

class NavBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            customerId: null,
            username: null,
            visible1: false,
            visible2: false,
            accType: false,
            rOwner: false,
            signUpForm: {
                name: "",
                email: "",
                password: "",
                rPassword: "",
                phone: ""
            },
            logInForm: {
                email: "",
                password: ""
            },
            signUpFormErrorMessage: {
                name: "",
                email: "",
                password: "",
                rPassword: "",
                phone: ''
            },
            logInFormErrorMessage: {
                email: "",
                password: ""
            },
            signUpFormValid: {
                name: false,
                email: false,
                password: false,
                rPassword: false,
                buttonActive: false,
                phone: false,
            },
            logInFormValid: {
                email: false,
                password: false,
                buttonActive: false
            },
            result: [],
            customerRedirect: false,
            signUpRedirect: false,
            successMessage: '',
            LerrorMessage: '',
            checkCustId: false,
            localLoggedIn: false,
            splitRedirect: false,
            checkLogin: {
                errorMessage: '',
                successMessage: ''
            },
            firstTimeLogin: '',
            accountClick: false,
            city: null,
            filteredRestaurants: null,
            buttonActive: false,
            restaurants: [],
            restaurant: null,
            restaurantNameError: null,
            reload: false,
            snackBarError: false,
            red: false,
            red2: false,
            red3: false,
            SerrorMessage: '',
            loginload: false,
            supload: false,

        };
        this.showRestaurantError = this.showRestaurantError.bind(this);
        this.showCityError = this.showCityError.bind(this);
        this.classes = this.props.classes
        this.onClick1 = this.onClick1.bind(this);
        this.onHide1 = this.onHide1.bind(this);
        this.onClick2 = this.onClick2.bind(this);
        this.onHide2 = this.onHide2.bind(this);
        this.onClick3 = this.onClick3.bind(this);
        this.onClick4 = this.onClick4.bind(this);
        this.onCityChange = this.onCityChange.bind(this);
        this.filterRestaurants = this.filterRestaurants.bind(this);
    }

    onClick1(event) {
        this.setState({ visible1: true });
    }
    onClick2(event) {
        this.setState({ visible2: true });
    }

    onClick3(event) {
        this.setState({
            localLoggedIn: false,
            logOut: true,
            customerId: null
        })
        axios.delete('http://localhost:1050/auth/deleteLoginUser/' + this.props.customerId)
    }

    // redirect to resp portal
    onClick4(event) {
        this.setState({
            localLoggedIn: true,
            logOut: false,
            splitRedirect: true,
        })
    }
    // hide signup
    onHide1(event) {
        let signup = this.state.signUpFormErrorMessage
        signup.name = ''
        signup.email = ''
        signup.password = ''
        signup.phone = ''
        this.setState({ visible1: false, SerrorMessage: '', successMessage: '', signUpFormErrorMessage: signup });
    }
    //hide login
    onHide2(event) {
        let login = this.state.logInFormErrorMessage
        login.email = ''
        login.password = ''
        this.setState({ visible2: false, LerrorMessage: '', logInFormErrorMessage: login, successMessage: '' });
    }

    signUpHandleChange = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        const { signUpForm } = this.state;
        this.setState({ signUpForm: { ...signUpForm, [name]: value } });
        this.signUpValidateField(name, value);
    }
    logInHandleChange = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        const { logInForm } = this.state;
        this.setState({ logInForm: { ...logInForm, [name]: value } });
        this.logInValidateField(name, value);
    }

    jsUcfirst = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    signUpValidateField = (fieldName, value) => {
        this.setState({ SerrorMessage: '' })
        let fieldValidationErrors = this.state.signUpFormErrorMessage;
        let formValid = this.state.signUpFormValid;

        switch (fieldName) {
            case "name":
                value = this.jsUcfirst(value)
                // console.log(value)
                const nameRegex = /^([A-z]|[ ])+$/
                if (value === "") {
                    fieldValidationErrors.name = "field required";
                    formValid.name = false;
                } else if (!value.match(nameRegex)) {
                    fieldValidationErrors.name = "Customer Name must contain only Alphabets";
                    formValid.name = false;
                } else {
                    fieldValidationErrors.name = "";
                    formValid.name = true;
                }
                break;

            case "email":
                const emailRegex = /^[A-z][\w\W\d\D]+@[a-z]+\.com$/
                if (value === "") {
                    fieldValidationErrors.email = "field required";
                    formValid.email = false;
                } else if (!value.match(emailRegex)) {
                    fieldValidationErrors.email = "Eg - abc09@xyz.com";
                    formValid.email = false;
                } else {
                    fieldValidationErrors.email = "";
                    formValid.email = true;
                }
                break;

            case "password":
                const passwordRegex = "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
                if (value === "") {
                    fieldValidationErrors.password = "field required";
                    formValid.password = false;
                } else if (!value.match(passwordRegex)) {
                    fieldValidationErrors.password = "Use strong password. Eg - Password45#$";
                    formValid.password = false;
                } else {
                    fieldValidationErrors.password = "";
                    formValid.password = true;
                }
                break;

            case "phone":
                const phoneReg = /^[6-9][0-9]{9}$/
                if (value === "") {
                    fieldValidationErrors.phone = "field required";
                    formValid.phone = false;
                } else if (!value.match(phoneReg)) {
                    fieldValidationErrors.phone = "Enter Valid Phone Number";
                    formValid.phone = false;
                } else {
                    fieldValidationErrors.phone = "";
                    formValid.phone = true;
                }
                break;

            default:
                break;
        }
        formValid.buttonActive = formValid.password && formValid.email && formValid.name && formValid.phone
        this.setState({ signUpFormErrorMessage: fieldValidationErrors, signUpFormValid: formValid, errorMessage: "" })
    }
    logInValidateField = (fieldName, value) => {
        this.setState({ LerrorMessage: '' })
        let fieldValidationErrors = this.state.logInFormErrorMessage;
        let formValid = this.state.logInFormValid;

        switch (fieldName) {
            case "email":
                if (value === "") {
                    fieldValidationErrors.email = "field required";
                    formValid.email = false;
                } else {
                    fieldValidationErrors.email = "";
                    formValid.email = true;
                }
                break;

            case "password":
                if (value === "") {
                    fieldValidationErrors.password = "field required";
                    formValid.password = false;
                } else {
                    fieldValidationErrors.password = "";
                    formValid.password = true;
                }
                break;
            default:
                break;
        }
        formValid.buttonActive = formValid.password && formValid.email
        this.setState({ logInFormErrorMessage: fieldValidationErrors, logInFormValid: formValid, errorMessage: "" })
    }

    customerLogin = (event) => {
        this.setState({
            loginload: true,
            customerRedirect: false,
            result: [],
            errorMessage: "",
            firstTimeLogin: true,
            LerrorMessage: ""
        })
        axios.post('http://localhost:1050/auth/login', this.state.logInForm).then((response) => {
            if (response.length !== 0) {
                this.setState({ result: response.data[0], customerId: response.data[0].customerId, errorMessage: "", SerrorMessage: '', loginload: false, LerrorMessage: '', customerRedirect: true, accType: response.data[0].admin, rOwner: response.data[0].rOwner, })
                localStorage.setItem('admin', response.data[0].admin)
                localStorage.setItem('siteAdmin', response.data[0].admin)
                localStorage.setItem('rOwner', response.data[0].rOwner)
                localStorage.setItem('customerId', response.data[0].customerId)
                localStorage.setItem('name', response.data[0].name)
            }
        })
            .catch((error) => {
                if (error.response) {
                    this.setState({ customerRedirect: false, loginload: false, result: [], LerrorMessage: error.response.data.message })
                }
                else {
                    this.setState({ customerRedirect: false, result: [], loginload: false, LerrorMessage: "Server Error" })
                }
            });
    }

    customerSignup = (event) => {
        event.preventDefault()
        this.setState({ supload: true, customerRedirect: false, successMessage: "", errorMessage: "", SerrorMessage: "" })
        axios.post('http://localhost:1050/auth/register', this.state.signUpForm).then((response) => {
            this.setState({ successMessage: "Registration Successful", errorMessage: "", SerrorMessage: '', LerrorMessage: '', reload: true, })
        })
            .catch((error) => {
                if (error.response) {
                    this.setState({ SerrorMessage: error.response.data.message, successMessage: '', supload: false })
                }
                else {
                    this.setState({ SerrorMessage: "Server Error", successMessage: '', supload: false })
                }
            });
    }
    componentDidMount() {
        CheckLogin()
        if (Number(this.props.customerId)) {
            this.setState({
                localLoggedIn: true,
                accType: localStorage.getItem('admin'),
                rOwner: localStorage.getItem('rOwner'),
                customerId: localStorage.getItem('customerId'),
            })
        }
    }

    onCityChange(e) {
        this.setState({ city: e.target.value, restaurant: '', restaurants: [], buttonActive: true, ifLocation: true });
    }

    filterRestaurants(event) {
        setTimeout(() => {
            const restaurantList = this.state.restaurants.map(item => item.restaurantName)
            let results;
            if (event.query.length === 0) {
                results = restaurantList
            }
            else {
                results = restaurantList.filter((restaurant) => {
                    return restaurant.toLowerCase().startsWith(event.query.toLowerCase());
                });
            }

            this.setState({ filteredRestaurants: results });
        }, 10);
    }

    showRestaurantError() {
        this.growl.show({ severity: 'error', summary: 'Restaurant Name Not found in Database', detail: '' });
    }
    showCityError() {
        this.growl.show({ severity: 'error', summary: 'Please Select a City first', detail: '' });
    }

    redirectToRestro = () => {
        if (this.state.city === null) {
            this.showCityError()
        }
        else if (this.state.restaurant === null || this.state.restaurant === '') {
            this.setState({ red: true })
        }
        else {
            let f = 0
            let rn = null
            this.state.restaurants.map(name => {
                let n = name.restaurantName.toLowerCase()
                if (this.state.restaurant.toLowerCase() === n) {
                    f = 1
                    rn = name.restaurantName
                }
                return null;
            })
            if (f === 1) {
                this.setState({ red: true, restaurantNameError: "", restaurant: rn })
            }
            else {
                this.showRestaurantError()
            }
        }
    }

    getLocation() {
        axios.get('http://localhost:1050/restaurant/getRestaurants/' + this.state.city.code).then(res => {
            this.setState({ restaurants: res.data.message, errorMessage: "" })
        }).catch(error => {
            if (error.res) {
                this.setState({ errorMessage: error.res.data.message })
            }
            else {
                this.setState({ errorMessage: "Server Error" })
            }
        })
    }
    render() {
        if (localStorage.getItem('firstTimeLogin') === "true") {
            localStorage.setItem('firstTimeLogin', "false");
            window.location.reload()
        }
        if (this.state.reload) {
            this.onHide1()
            this.onHide2()
            this.setState({ reload: false })
            var login = this.state.logInForm
            login.email = this.state.signUpForm.email
            login.password = this.state.signUpForm.password
            this.setState({ logInForm: login })
            this.customerLogin()
        }
        if (this.state.ifLocation) {
            this.getLocation()
            this.setState({ ifLocation: false })
        }
        if (this.state.red && (this.state.restaurant === '' || this.state.restaurant === null)) {
            this.setState({ redirect: false })
            return <Redirect to={"/restaurantList/" + this.state.city.code} push />
        }
        if (this.state.red && this.state.restaurant === '' && this.state.localLoggedIn) {
            this.setState({ redirect: false })
            return <Redirect to={"/restaurantList/" + this.state.city.code + '/' + this.props.customerId + '/' + this.props.name} push />
        }
        if (this.state.red && this.state.restaurant !== '') {
            this.setState({ redirect: false })
            return <Redirect to={"/restaurant/" + this.state.city.code + "/" + this.state.restaurant} push />
        }
        if (this.state.localLoggedIn && this.state.red && this.state.restaurant !== '') {
            this.setState({ redirect: false })
            return <Redirect to={"/restaurant/" + this.state.city.code + "/" + this.state.restaurant + '/' + this.props.customerId + '/' + this.props.name} push />
        }

        const cities = [
            { name: 'Chandigarh', code: 'Chandigarh' },
            { name: 'New Delhi', code: 'New Delhi' },
            { name: 'Mysore', code: 'Mysore' },
        ];

        if (this.state.accountClick) {
            this.setState({
                accountClick: false
            })
            var admin = localStorage.getItem('admin');
            var rOwner = localStorage.getItem('rOwner');
            if (admin === "true" && rOwner === "false") {
                return <Redirect to={'/adminportal/' + this.props.customerId + '/' + this.props.name} push />
            }
            else if (admin === "false" && rOwner === "true") {
                return <Redirect to={'/restaurantOwner/' + this.props.customerId + '/' + this.props.name} push />
            }
            else {
                return <Redirect to={'/customerportal/' + this.props.customerId + '/' + this.props.name} push />
            }
        }
        const footer1 = (
            <div>
                <Button disabled={!this.state.signUpFormValid.buttonActive} onClick={this.customerSignup} style={{ paddingLeft: "20px" }} >
                    SignUp &nbsp;
                {
                        this.state.supload ?
                            <ProgressSpinner style={{ width: '15px', height: '15px' }} strokeWidth="8" fill="#EEEEEE" animationDuration=".5s" />
                            :
                            <span style={{ padding: "7.5px" }}></span>
                    }
                </Button>
            </div>
        );
        const footer2 = (
            <div>
                <Button disabled={!this.state.logInFormValid.buttonActive} onClick={this.customerLogin} style={{ paddingLeft: "20px" }}>
                    Login &nbsp;
                {
                        this.state.loginload ?
                            <ProgressSpinner style={{ width: '15px', height: '15px' }} strokeWidth="8" fill="#EEEEEE" animationDuration=".5s" />
                            :
                            <span style={{ padding: "7.5px" }}></span>
                    }
                </Button>
            </div>
        );
        if (this.state.logOut) {
            this.setState({
                logOut: false
            })
            ls.clear()
            return <Redirect to='/' />
        }
        if (this.state.customerRedirect || this.state.splitRedirect) {
            this.setState({ errorMessage: "", customerRedirect: false, visible2: false, splitRedirect: false })
            var urlArr
            var url
            if (this.state.result.admin) {

                urlArr = window.location.href.split('herokuapp.com')
                url = urlArr[1];
                localStorage.setItem('firstTimeLogin', "true")
                return <Redirect to={url + '/' + this.state.customerId + '/' + this.state.result.name} push />
                //  return <Redirect to={url} push/>

            }
            else {
                urlArr = window.location.href.split('herokuapp.com')
                url = urlArr[1];
                localStorage.setItem('firstTimeLogin', "true")
                // return <Redirect to={url} push/>
                return <Redirect to={url + '/' + this.state.customerId + '/' + this.state.result.name} push />
            }
        }
        return (
            <div>

                {(this.props.home) ?
                    <nav className="navbar navbar-expand-md navbarHome navbarHomeImg">
                        <div className="container-fluid" style={{ textAlign: "center" }}>
                            <img alt="" src={require("../assets/logo.png")} className="img-fluid d-none d-md-block" id="logoImage" />

                            <div className="row" style={{ marginLeft: "23%", marginTop: "25%", position: "relative" }}>
                                <div className="col-md-2 d-none d-md-block" >
                                    <Dropdown value={this.state.city} options={cities} size={6} onChange={this.onCityChange} placeholder="Select a City" optionLabel="name" style={{ width: "200px" }} />
                                </div>
                                <div className="col-md-8 offset-md-2 d-none d-md-block" style={{ marginLeft: "90px" }}>
                                    <span className="p-fluid" >
                                        <div className="p-inputgroup">
                                            <AutoComplete value={this.state.restaurant} suggestions={this.state.filteredRestaurants} completeMethod={this.filterRestaurants} size={80} minLength={1}
                                                placeholder="Search Restaurants" dropdown={false} onChange={(e) => this.setState({ restaurant: e.value })} />
                                            <Button onClick={this.redirectToRestro} style={{ background: 'linear-gradient(45deg, #00838F 30%, #00E5FF 90%)', borderRadius: 3, border: 0, color: 'white', height: 35, padding: '0 30px', boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)' }}>
                                                <span className="text text-light">Search</span></Button><br />
                                        </div>
                                    </span>
                                </div>
                                {/* for small screens */}

                            </div>
                            <img alt="" src={require("../assets/logo.png")} className="img-fluid d-block d-md-none" id="logoImageRes" />
                            <div className="row">

                                {/* for small screens */}
                                <div className="col-xs-12 d-block d-md-none" style={{ marginLeft: "16px", marginBottom: "5px" }}>
                                    <Dropdown value={this.state.city} options={cities} size={6} onChange={this.onCityChange} placeholder="Select a City" optionLabel="name" style={{ width: "340px" }} />
                                </div>
                                <div className="col-xs-12 d-block d-md-none">
                                    <span className="p-fluid" >
                                        <div className="p-inputgroup" style={{ paddingLeft: 10, paddingRight: 10 }}>
                                            <AutoComplete value={this.state.restaurant} suggestions={this.state.filteredRestaurants} completeMethod={this.filterRestaurants} size={80} minLength={1}
                                                placeholder="Search Restaurants" dropdown={false} onChange={(e) => this.setState({ restaurant: e.value })} style={{ width: "340px", margin: "5px" }} />
                                        </div>
                                    </span>
                                    <Button onClick={this.redirectToRestro} style={{ background: 'linear-gradient(45deg, #00838F 30%, #00E5FF 90%)', margin: "5px", width: "340px", borderRadius: 3, border: 0, color: 'white', height: 35, padding: '0 30px', boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)' }}>
                                        <span className="text text-light">Search</span></Button><br />
                                </div>
                            </div>
                            <Growl ref={(el) => this.growl = el} />
                        </div>
                        <div className="content-section implementation">
                            <Dialog header="Ziggy Eats" visible={this.state.visible2} id="dialogBox" footer={footer2} onHide={this.onHide2}>
                                {/* Background Image */}
                                <div className="container-fluid loginBG " >
                                    <div className="row">
                                        <div className="col-md-10 offset-1" >
                                            <div className="card bg-light text-dark picOpacity">
                                                <div className="card-header">
                                                    <h4 style={{ textAlign: "center" }}>Login Form</h4>
                                                </div>
                                                <div className="card-body text-left">
                                                    <form className="logIn">
                                                        <div className="form-group">
                                                            <label htmlFor="email1">Email Address</label>
                                                            <input type="email" name="email" id="email1" placeholder="Enter Email Address" onChange={this.logInHandleChange} className="form-control" />
                                                            {this.state.logInFormErrorMessage.email ?
                                                                <span name="emailError" className="text-danger">
                                                                    {this.state.logInFormErrorMessage.email}
                                                                </span>
                                                                :
                                                                <br />
                                                            }
                                                        </div>
                                                        <div className="form-group">
                                                            <label htmlFor="password1">Password</label>
                                                            <input type="password" name="password" id="password1" placeholder="Enter Password" onChange={this.logInHandleChange} className="form-control" />
                                                            {this.state.logInFormErrorMessage.password ?
                                                                <span name="passwordError" className="text-danger">
                                                                    {this.state.logInFormErrorMessage.password}
                                                                </span>
                                                                :
                                                                <br />}
                                                        </div>
                                                    </form>
                                                    {this.state.LerrorMessage ?
                                                        <span className="text text-danger" style={{ paddingTop: 0 }}>
                                                            {this.state.LerrorMessage}
                                                            <br />
                                                            <div className="text text-info signupred" onClick={this.onClick1}>Click Here to Register</div>
                                                        </span>
                                                        :
                                                        <div>
                                                            <br />
                                                            <br />
                                                        </div>
                                                    }
                                                </div>
                                            </div>
                                        </div></div></div>
                            </Dialog>
                            <Dialog header="Ziggy Eats" visible={this.state.visible1} id="dialogBox" footer={footer1} onHide={this.onHide1}>
                                {/* Background Image */}
                                <div className="signUp registerBG ">
                                    <div className="row">
                                        <div className="col-md-10 offset-1" >
                                            <div className="card bg-light text-dark picOpacity">
                                                <div className="card bg-light text-dark">
                                                    <div className="card-header">
                                                        <h4 style={{ textAlign: "center" }}>SignUp Form</h4>
                                                    </div>
                                                    <div className="card-body text-left">
                                                        <form className="signup">
                                                            <div className="form-group">
                                                                <label htmlFor="name1">Full Name</label>
                                                                <input type="text" name="name" id="name1" placeholder="Enter full name" onChange={this.signUpHandleChange} className="form-control" />
                                                                {
                                                                    this.state.signUpFormErrorMessage.name ?
                                                                        <span name="nameError" className="text-danger">
                                                                            {this.state.signUpFormErrorMessage.name}
                                                                        </span>
                                                                        :
                                                                        <br />
                                                                }
                                                            </div>
                                                            <div className="form-group">
                                                                <label htmlFor="email2">Email Address</label>
                                                                <input type="email" name="email" id="email2" placeholder="Enter Email Address" onChange={this.signUpHandleChange} className="form-control" />
                                                                {
                                                                    this.state.signUpFormErrorMessage.email ?
                                                                        <span name="emailError" className="text-danger">
                                                                            {this.state.signUpFormErrorMessage.email}
                                                                        </span>
                                                                        :
                                                                        <br />
                                                                }
                                                            </div>
                                                            <div className="form-group">
                                                                <label htmlFor="password2">Password</label>
                                                                <input type="password" name="password" id="password2" placeholder="Enter Password" onChange={this.signUpHandleChange} className="form-control" />
                                                                {
                                                                    this.state.signUpFormErrorMessage.password ?
                                                                        <span name="passwordError" className="text-danger">
                                                                            {this.state.signUpFormErrorMessage.password}
                                                                        </span>
                                                                        :
                                                                        <br />
                                                                }
                                                            </div>
                                                            <div className="form-group">
                                                                <label htmlFor="phone1">Phone Number</label>
                                                                <input type="number" name="phone" id="phone1" placeholder="Enter Phone Number" onChange={this.signUpHandleChange} className="form-control" />
                                                                {
                                                                    this.state.signUpFormErrorMessage.phone ?
                                                                        <span name="nameError" className="text-danger">
                                                                            {this.state.signUpFormErrorMessage.phone}
                                                                        </span>
                                                                        :
                                                                        <br />
                                                                }
                                                            </div>
                                                        </form>
                                                        {
                                                            (this.state.SerrorMessage || this.state.successMessage) ?
                                                                <div>
                                                                    <span className="text-danger">{this.state.SerrorMessage}</span>
                                                                    <span className="text-success">{this.state.successMessage}</span>
                                                                </div>
                                                                :
                                                                <br />
                                                        }
                                                    </div>
                                                </div>
                                            </div></div></div></div>
                            </Dialog>
                        </div>
                        {(!this.state.localLoggedIn) ? <button className="navbar-toggler navbar-toggler-right" data-toggle="collapse" data-target="#collapsibleNavbar" style={{ position: "relative", top: 0, right: 0 }}>
                            <img alt="" src={require('../assets/usericon.png')} width="70px" />
                        </button> : null}
                        {(!this.state.localLoggedIn) ?
                            <div className="collapse navbar-collapse" id="collapsibleNavbar"> <ul className="navbar-nav" style={{ "paddingBottom": 280, "paddingRight": 20, "paddingTop": 20 }}>
                                <li className="nav-item" style={{ "paddingLeft": 5, "paddingRight": 5 }}>
                                    <Button onClick={this.onClick2} className="customize-login-button" style={{ borderRadius: 3, border: 0, height: 40, width: 120, padding: '0 30px' }}>
                                        <span className="text text-light" >Login</span></Button>
                                </li>
                                <li className="nav-item"  >
                                    <Button onClick={this.onClick1} type="button" className="customize-button-register" style={{ background: 'linear-gradient(45deg, #B2EBF2 30%, #4DD0E1 90%)', borderRadius: 3, border: 0, color: 'white', height: 40, width: 120, padding: '0 30px', boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)', }}>
                                        <strong className="text text-dark"> Register</strong>
                                    </Button>
                                </li>
                                {/* logout button         */}
                            </ul> </div> :
                            <ul className="navbar-nav ml-auto" id="logoutRes" style={{ "paddingBottom": 280, "paddingRight": 25, "paddingTop": 20 }}>
                                <li className="nav-item">
                                    <SplitB customerId={this.state.customerId} name={this.props.name} type={this.state.accType} rtype={this.state.rOwner} />
                                </li>
                            </ul>
                        }
                    </nav>
                    :
                    <nav className="navbar navbar-expand-md bg-dark" style={{ height: "100px", background: 'linear-gradient(45deg, #00B8D4 30%, #18FFFF 90%)' }}>
                        {(this.props.customerId) ? <ul className="navbar-nav">
                            <li><Link to={'/home/' + this.props.customerId + '/' + this.props.name}><img alt="" src={require("../assets/logo.png")} className="navbar-brand" id="logoImage2" /></Link></li>
                        </ul> : <ul className="navbar-nav">
                                <li><Link to={'/home'}><img alt="" src={require("../assets/logo.png")} className="navbar-brand" id="logoImage2" /></Link></li>
                            </ul>}
                        <div className="d-none d-md-block" style={{ width: "100%" }}>
                            <SearchBar />
                        </div>
                        <div className="content-section implementation">
                            <Dialog header="Ziggy Eats" visible={this.state.visible2} id="dialogBox2" footer={footer2} onHide={this.onHide2}>
                                {/* Background Image */}
                                <div className="container-fluid loginBG" >
                                    <div className="row">
                                        <div className="col-md-10 offset-1" >
                                            <div className="card bg-light text-dark picOpacity">
                                                <div className="card-header">
                                                    <h4 style={{ textAlign: "center" }}>Login Form</h4>
                                                </div>
                                                <div className="card-body text-left">
                                                    <form className="logIn" style={{ marginBottom: 0 }}>
                                                        <div className="form-group">
                                                            <label htmlFor="email3">Email Address</label>
                                                            <input type="email" name="email" id="email3" placeholder="Enter Email Address" onChange={this.logInHandleChange} className="form-control" />
                                                            {this.state.logInFormErrorMessage.email ?
                                                                <span name="emailError" className="text-danger">
                                                                    {this.state.logInFormErrorMessage.email}
                                                                </span>
                                                                :
                                                                <br />
                                                            }
                                                        </div>
                                                        <div className="form-group">
                                                            <label htmlFor="password3">Password</label>
                                                            <input type="password" name="password" id="password3" placeholder="Enter Password" onChange={this.logInHandleChange} className="form-control" />
                                                            {this.state.logInFormErrorMessage.password ?
                                                                <span name="passwordError" className="text-danger">
                                                                    {this.state.logInFormErrorMessage.password}
                                                                </span>
                                                                :
                                                                <br />}
                                                        </div>
                                                    </form>
                                                    {this.state.LerrorMessage ?
                                                        <span className="text text-danger" style={{ paddingTop: 0 }}>
                                                            {this.state.LerrorMessage}
                                                            <br />
                                                            <div className="text text-info signupred" onClick={this.onClick1}>Click Here to Register</div>
                                                        </span>
                                                        :
                                                        <div>
                                                            <br />
                                                            <br />
                                                        </div>
                                                    }
                                                </div>
                                            </div>
                                        </div></div></div>
                            </Dialog>
                            <Dialog header="Ziggy Eats" visible={this.state.visible1} id="dialogBox2" footer={footer1} onHide={this.onHide1}>
                                {/* Background Image */}
                                <div className="signUp registerBG">
                                    <div className="row">
                                        <div className="col-md-10 offset-1" >
                                            <div className="card bg-light text-dark picOpacity">
                                                <div className="card-header">
                                                    <h4 style={{ textAlign: "center" }}>SignUp Form</h4>
                                                </div>
                                                <div className="card-body text-left">
                                                    <form className="signup">
                                                        <div className="form-group">
                                                            <label htmlFor="name2">Full Name</label>
                                                            <input type="text" name="name" id="name2" placeholder="Enter full name" onChange={this.signUpHandleChange} className="form-control" />
                                                            {
                                                                this.state.signUpFormErrorMessage.name ?
                                                                    <span name="nameError" className="text-danger">
                                                                        {this.state.signUpFormErrorMessage.name}
                                                                    </span>
                                                                    :
                                                                    <br />
                                                            }
                                                        </div>
                                                        <div className="form-group">
                                                            <label htmlFor="email4">Email Address</label>
                                                            <input type="email" name="email" id="email4" placeholder="Enter Email Address" onChange={this.signUpHandleChange} className="form-control" />
                                                            {
                                                                this.state.signUpFormErrorMessage.email ?
                                                                    <span name="emailError" className="text-danger">
                                                                        {this.state.signUpFormErrorMessage.email}
                                                                    </span>
                                                                    :
                                                                    <br />
                                                            }
                                                        </div>
                                                        <div className="form-group">
                                                            <label htmlFor="password4">Password</label>
                                                            <input type="password" name="password" id="password4" placeholder="Enter Password" onChange={this.signUpHandleChange} className="form-control" />
                                                            {
                                                                this.state.signUpFormErrorMessage.password ?
                                                                    <span name="passwordError" className="text-danger">
                                                                        {this.state.signUpFormErrorMessage.password}
                                                                    </span>
                                                                    :
                                                                    <br />
                                                            }
                                                        </div>
                                                        <div className="form-group">
                                                            <label htmlFor="phone2">Phone Number</label>
                                                            <input type="number" name="phone" id="phone2" placeholder="Enter Phone Number" onChange={this.signUpHandleChange} className="form-control" />
                                                            {
                                                                this.state.signUpFormErrorMessage.phone ?
                                                                    <span name="nameError" className="text-danger">
                                                                        {this.state.signUpFormErrorMessage.phone}
                                                                    </span>
                                                                    :
                                                                    <br />
                                                            }
                                                        </div>
                                                    </form>
                                                    {
                                                        (this.state.SerrorMessage || this.state.successMessage) ?
                                                            <div>
                                                                <span className="text-danger">{this.state.SerrorMessage}</span>
                                                                <span className="text-success">{this.state.successMessage}</span>
                                                            </div>
                                                            :
                                                            <br />
                                                    }
                                                </div>
                                            </div>
                                        </div></div></div>
                            </Dialog>
                        </div>
                        {(!this.state.localLoggedIn) ? <button className="navbar-toggler navbar-toggler-right" id="navbar-togglerSmallNav" data-toggle="collapse" data-target="#collapsibleNavbar2" style={{ position: "relative", top: 0, right: 0 }}>
                            <img alt="" src={require('../assets/usericon.png')} width="70px" />
                        </button> : null}

                        {(!this.state.localLoggedIn) ? <div className="collapse navbar-collapse" id="collapsibleNavbar2"> <ul className="navbar-nav ml-auto" style={{ "paddingBottom": 280, "paddingRight": 20, "paddingTop": "250px" }}>
                            <li className="nav-item" style={{ "paddingLeft": 5, "paddingRight": 5 }}>
                                <Button onClick={this.onClick2} className="customize-button-login" style={{ "paddingLeft": 30, "paddingRight": 30 }}>
                                    <strong className="text text-light">Login</strong>
                                </Button>
                            </li>
                            <li className="nav-item">
                                <Button onClick={this.onClick1} className="customize-button-login btn-outline-light" style={{ "paddingLeft": 30, "paddingRight": 30 }}>
                                    <strong> Register</strong>
                                </Button>
                            </li>
                            {/* logout button         */}
                        </ul> </div> :
                            <ul className="navbar-nav ml-auto">
                                <li className="nav-item">
                                    <SplitB customerId={this.state.customerId} name={this.props.name} type={this.state.accType} rtype={this.state.rOwner} />
                                </li>
                            </ul>
                        }
                    </nav>
                }
            </div>
        )
    }
}
export default NavBar;