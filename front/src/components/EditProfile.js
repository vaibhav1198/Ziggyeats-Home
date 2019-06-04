import React, { Component } from 'react';
import axios from 'axios';
import Button from '@material-ui/core/Button';


export default class EditDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: this.props.name,
            customerId: this.props.customerId,
            loading: true,
            userData: this.props.userData,
            editForm: {
                name: this.props.name,
                email: this.props.userData.email,
                address: "",
                cpassword: "",
                password: "",
                rPassword: "",
                phone: "",
            },
            editFormErrorMessage: {
                address: "",
                cpassword: "",
                password: "",
                rPassword: "",
                phone: "",
            },
            editFormValid: {
                address: false,
                cpassword: false,
                password: false,
                rPassword: false,
                buttonActive: false,
                phone: false,
            },
            errorMessage: '',
            successMessage: '',
            epass: '',

        }
    }
    updateData = (event) => {
        event.preventDefault()
        this.setState({ customerRedirect: false, successMessage: "", errorMessage: "" })
        axios.post('http://localhost:1050/auth/updateDetails', this.state.editForm).then((response) => {
            //console.log(response.data.message);
            this.setState({ successMessage: response.data.message, errorMessage: "" })
        }).catch((error) => {
            //console.log(error.response.data.message)
            if (error.response) {
                this.setState({ errorMessage: error.response.data.message, successMessage: '' })
            }
            else {
                this.setState({ errorMessage: "Server Error", successMessage: '' })
            }
        });
        localStorage.setItem('updateData', 'reload')
    }
    componentDidMount = () => {
        let editError = this.state.editFormErrorMessage
        editError.password = ''
        editError.cpassword = ''
        editError.rpassword = ''
        editError.phone = ''
        editError.address = ''
        this.setState({ successMessage: '', errorMessage: '', editFormErrorMessage: editError })
    }

    editHandleChange = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        const { editForm } = this.state;
        this.setState({ editForm: { ...editForm, [name]: value } });
        this.editValidateField(name, value);
    }
    editValidateField = (fieldName, value) => {
        let fieldValidationErrors = this.state.editFormErrorMessage;
        let formValid = this.state.editFormValid;

        switch (fieldName) {
            case "cpassword":
                const passwordRege = this.state.userData.password
                if (value === "") {
                    fieldValidationErrors.cpassword = "field required";
                    formValid.password = false;
                } else if (!(value === passwordRege)) {
                    fieldValidationErrors.cpassword = "Password not equal to current password";
                    formValid.cpassword = false;
                } else {
                    fieldValidationErrors.cpassword = "";
                    formValid.cpassword = true;
                }
                break;

            case "password":
                const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/
                if (value === "") {
                    fieldValidationErrors.password = "field required";
                    formValid.password = false;
                } else if (!value.match(passwordRegex)) {
                    fieldValidationErrors.password = "Password must contain at least 1 lowercase, 1 uppercase, 1 special character";
                    formValid.password = false;
                } else {
                    fieldValidationErrors.password = "";
                    formValid.password = true;
                }
                break;

            case "rPassword":
                const rPasswordRegex = this.state.editForm.password
                if (value === "") {
                    fieldValidationErrors.rPassword = "field required";
                    formValid.password = false;
                } else if (!value.match(rPasswordRegex)) {
                    fieldValidationErrors.rPassword = "Both Passwords should match";
                    formValid.rPassword = false;
                } else {
                    fieldValidationErrors.rPassword = "";
                    formValid.rPassword = true;
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
            case "address":
                const addressRege = /^([0-9]|[ ]|[,]|[A-z]|\n)*$/
                if (value === "") {
                    fieldValidationErrors.address = "field required";
                    formValid.address = false;
                } else if (!value.match(addressRege)) {
                    fieldValidationErrors.address = "Enter Valid Address";
                    formValid.address = false;
                } else {
                    fieldValidationErrors.address = "";
                    formValid.address = true;
                }
                break;

            default:
                break;
        }
        formValid.buttonActive = (formValid.cpassword && formValid.password && formValid.rPassword) || formValid.phone || formValid.address
        this.setState({ editFormErrorMessage: fieldValidationErrors, editFormValid: formValid, errorMessage: "" })
    }
    render() {
        // console.log(this.state)
        if (localStorage.getItem('updateData') === "reload") {
            localStorage.removeItem('updateData')
            window.location.reload()
        }
        return (
            <div>
                <div className="card" style={{ background: 'linear-gradient(45deg, #B2EBF2 30%, #E0F7FA 90%)' }}>
                    <div className="card-body">
                        {this.state.successMessage === "" ?
                            <div>
                                <form className="edit">
                                    <div className="form-group">
                                        <label htmlFor="name">Full Name</label>
                                        <input disabled type="text" name="name" id="name" placeholder="Enter full name" value={this.state.userData.name} onChange={this.editHandleChange} className="form-control" />
                                        {
                                            this.state.editFormErrorMessage.name ?
                                                <span name="nameError" className="text-danger">
                                                    {this.state.editFormErrorMessage.name}
                                                </span>
                                                :
                                                <br />
                                        }
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="email">Email Address</label>
                                        <input disabled type="email" name="email" id="email" placeholder="Enter Email Address" value={this.state.userData.email} onChange={this.editHandleChange} className="form-control" />
                                        {
                                            this.state.editFormErrorMessage.email ?
                                                <span name="emailError" className="text-danger">
                                                    {this.state.editFormErrorMessage.email}
                                                </span>
                                                :
                                                <br />
                                        }
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="cpassword">Current Password</label>
                                        <input type="password" name="cpassword" id="cpassword" placeholder="Enter Current Password" value={this.state.editForm.cpassword} onChange={this.editHandleChange} className="form-control" />
                                        {
                                            this.state.editFormErrorMessage.cpassword ?
                                                <span name="cpasswordError" className="text-danger">
                                                    {this.state.editFormErrorMessage.cpassword}
                                                </span>
                                                :
                                                <br />
                                        }
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="password">Password</label>
                                        <input type="password" name="password" id="password" placeholder="Enter Password" value={this.state.editForm.password} onChange={this.editHandleChange} className="form-control" />
                                        {
                                            this.state.editFormErrorMessage.password ?
                                                <span name="passwordError" className="text-danger">
                                                    {this.state.editFormErrorMessage.password}
                                                </span>
                                                :
                                                <br />
                                        }
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="rPassword">Confirm Password</label>
                                        <input type="password" name="rPassword" id="rPassword" placeholder="Enter Password" value={this.state.editForm.rPassword} onChange={this.editHandleChange} className="form-control" />
                                        {
                                            this.state.editFormErrorMessage.rPassword ?
                                                <span name="rPasswordError" className="text-danger">
                                                    {this.state.editFormErrorMessage.rPassword}
                                                </span>
                                                :
                                                <br />
                                        }
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="phone">Phone Number</label>
                                        <input type="number" name="phone" id="phone" placeholder="Enter Phone Number" value={this.state.editForm.phone} onChange={this.editHandleChange} className="form-control" />
                                        {
                                            this.state.editFormErrorMessage.phone ?
                                                <span name="nameError" className="text-danger">
                                                    {this.state.editFormErrorMessage.phone}
                                                </span>
                                                :
                                                <br />
                                        }
                                    </div>
                                    {
                                        localStorage.getItem('rOwner') === 'false' ?
                                            <div className="form-group">
                                                <label htmlFor="address">Full Address</label>
                                                <textarea className="form-control" name="address" onChange={this.editHandleChange} placeholder="Enter full address" id="address" cols="30" rows="3"></textarea>
                                                {
                                                    this.state.editFormErrorMessage.address ?
                                                        <span name="nameError" className="text-danger" style={{}}>
                                                            {this.state.editFormErrorMessage.address}
                                                        </span>
                                                        :
                                                        <br />
                                                }
                                            </div>
                                            :
                                            null
                                    }
                                </form>
                                <div className="d-flex justify-content-center">
                                    <Button style={{ background: "linear-gradient(45deg, #B2EBF2 30%, #4DD0E1 90%)" }} disabled={!this.state.editFormValid.buttonActive} onClick={this.updateData}>Update</Button><br />
                                </div>
                            </div>
                            :
                            this.state.successMessage
                        }
                    </div>
                </div>
            </div>
        )
    }
}