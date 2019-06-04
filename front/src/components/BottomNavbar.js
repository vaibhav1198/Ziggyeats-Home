import React, { Component } from 'react';
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import { Link } from 'react-router-dom';

export default class BottomNavBar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            customerId: this.props.customerId,
            name: this.props.name,
        }
    }
    render() {
        return (
            <div className="bg-dark" style={{ paddingBottom: 40, background: 'linear-gradient(45deg, #00838F 30%, #00E5FF 90%)' }}>
                <div className="container">
                    <div className="row">
                        <ul className="nav">
                            {(this.state.customerId) ?
                                <li className="nav-item">
                                    <Link className="nav-link" to={"/home/" + this.state.customerId + '/' + this.state.name}>
                                        <span className="text text-light" style={{ fontSize: 26, fontWeight: "bold" }}>
                                            ZiggyEats
                                    </span>
                                    </Link>
                                </li>
                                :
                                <li className="nav-item">
                                    <Link className="nav-link" to="/home">
                                        <span className="text text-light" style={{ fontSize: 26, fontWeight: "bold" }}>
                                            ZiggyEats
                                    </span>
                                    </Link>
                                </li>
                            }
                        </ul>
                    </div>
                    <hr style={{ borderTop: "1px solid #808080" }} />
                    <div className="row">
                        <div className="col-sm-4">
                            <ul className="nav flex-column">
                                <li className="nav-item">
                                    {(this.state.customerId) ?
                                        <Link className="nav-link" to={"/about/" + this.state.customerId + '/' + this.state.name}>
                                            <span className="text text-light" style={{ fontSize: 18, fontWeight: "bold" }}>
                                                About ZiggyEats
                                    </span>
                                        </Link>
                                        :
                                        <Link className="nav-link" to="/about">
                                            <span className="text text-light" style={{ fontSize: 18, fontWeight: "bold" }}>
                                                About ZiggyEats
                                    </span>
                                        </Link>
                                    }
                                </li>
                                <li className="nav-item">
                                    {(this.state.customerId) ?
                                        <Link className="nav-link" to={"/addRestaurant/" + this.state.customerId + '/' + this.state.name}>
                                            <span className="text text-light" style={{ fontSize: 14 }}>
                                                Request to Add Restaurant
                                    </span>
                                        </Link>
                                        :
                                        null
                                    }
                                </li>
                                <li className="nav-item">
                                    {(this.state.customerId) ?
                                        <Link className="nav-link" to={"/about/" + this.state.customerId + '/' + this.state.name}>
                                            <span className="text text-light" style={{ fontSize: 14 }}>
                                                About Us
                                    </span>
                                        </Link>
                                        :
                                        <Link className="nav-link" to="/about">
                                            <span className="text text-light" style={{ fontSize: 14 }}>
                                                About Us
                                    </span>
                                        </Link>
                                    }
                                </li>
                                <li className="nav-item">
                                    {(this.state.customerId) ?
                                        <Link className="nav-link" to={"/contact/" + this.state.customerId + '/' + this.state.name}>
                                            <span className="text text-light" style={{ fontSize: 14 }}>
                                                Contact
                                    </span>
                                        </Link>
                                        :
                                        <Link className="nav-link" to="/contact">
                                            <span className="text text-light" style={{ fontSize: 14 }}>
                                                Contact
                                    </span>
                                        </Link>
                                    }
                                </li>
                            </ul>
                        </div>
                        <div className="col-sm-4">
                            <ul className="nav flex-column">
                                <li className="nav-item">
                                    {(this.state.customerId) ?
                                        <Link className="nav-link" to={"/locationList/" + this.state.customerId + '/' + this.state.name}>
                                            <span className="text text-light" style={{ fontSize: 18, fontWeight: "bold" }}>
                                                Locations
                                    </span>
                                        </Link>
                                        :
                                        <Link className="nav-link" to="/locationList">
                                            <span className="text text-light" style={{ fontSize: 18, fontWeight: "bold" }}>
                                                Locations
                                    </span>
                                        </Link>
                                    }
                                </li>
                                <li className="nav-item" onClick={() => { window.location.reload() }}>
                                    {(this.state.customerId) ?
                                        <Link className="nav-link" to={"/restaurantList/Chandigarh/" + this.state.customerId + '/' + this.state.name}>
                                            <span className="text text-light" style={{ fontSize: 14 }}>
                                                Chandigarh
                                    </span>
                                        </Link>
                                        :
                                        <Link className="nav-link" to="/restaurantList/Chandigarh">
                                            <span className="text text-light" style={{ fontSize: 14 }}>
                                                Chandigarh
                                    </span>
                                        </Link>
                                    }
                                </li>
                                <li className="nav-item" onClick={() => { window.location.reload() }}>
                                    {(this.state.customerId) ?
                                        <Link className="nav-link" to={"/restaurantList/New Delhi/" + this.state.customerId + '/' + this.state.name}>
                                            <span className="text text-light" style={{ fontSize: 14 }}>
                                                New Delhi
                                    </span>
                                        </Link>
                                        :
                                        <Link className="nav-link" to="/restaurantList/New Delhi">
                                            <span className="text text-light" style={{ fontSize: 14 }}>
                                                New Delhi
                                    </span>
                                        </Link>
                                    }
                                </li>
                                <li className="nav-item" onClick={() => { window.location.reload() }}>
                                    {(this.state.customerId) ?
                                        <Link className="nav-link" to={"/restaurantList/Mysore/" + this.state.customerId + '/' + this.state.name}>
                                            <span className="text text-light" style={{ fontSize: 14 }}>
                                                Mysore
                                    </span>
                                        </Link>
                                        :
                                        <Link className="nav-link" to="/restaurantList/Mysore">
                                            <span className="text text-light" style={{ fontSize: 14 }}>
                                                Mysore
                                    </span>
                                        </Link>
                                    }
                                </li>
                            </ul>
                        </div>
                        <div className="col-sm-4">
                            <ul className="nav flex-column">
                                <li className="nav-item" onClick={() => { window.location.reload() }}>
                                    {(this.state.customerId) ?
                                            <Link className="nav-link" to={"/categoryList/" + this.state.customerId + '/' + this.state.name}>
                                                <span className="text text-light" style={{ fontSize: 18, fontWeight: "bold" }}>
                                                    Categories
                                                </span>
                                            </Link>
                                            :
                                           <Link className="nav-link" to={"/categoryList"}>
                                            <span className="text text-light" style={{ fontSize: 18, fontWeight: "bold" }}>
                                                Categories
                                            </span>
                                           </Link>
                                        }
                                    
                                </li>
                                <li className="nav-item" onClick={() => { window.location.reload() }}>

                                {(this.state.customerId) ?
                                        <Link className="nav-link" to={"/quicksearch/" + localStorage.getItem('currentCity') + '/Dining/' +  this.state.customerId + '/' + this.state.name}>
                                        <span className="text text-light" style={{ fontSize: 14 }}>
                                            Casual Dining
                                    </span>
                                    </Link>
                                        :
                                        <Link className="nav-link" to={"/quicksearch/" + localStorage.getItem('currentCity') + '/Dining'}>
                                        <span className="text text-light" style={{ fontSize: 14 }}>
                                            Casual Dining
                                    </span>
                                    </Link>
                                    }
                                    
                                </li>
                                <li className="nav-item" onClick={() => { window.location.reload() }}>
                                     {(this.state.customerId) ?
                                        <Link className="nav-link" to={"/quicksearch/" + localStorage.getItem('currentCity') + '/Pocket/' +  this.state.customerId + '/' + this.state.name}>
                                        <span className="text text-light" style={{ fontSize: 14 }}>
                                            Pocket Friendly
                                    </span>
                                    </Link>
                                        :
                                        <Link className="nav-link" to={"/quicksearch/" + localStorage.getItem('currentCity') + '/Pocket'}>
                                        <span className="text text-light" style={{ fontSize: 14 }}>
                                            Pocket Friendly
                                    </span>
                                    </Link>
                                    }
                                    
                                </li>
                                <li className="nav-item"  onClick={() => { window.location.reload() }}>
                                    {(this.state.customerId) ?
                                        <Link className="nav-link" to={"/quicksearch/" + localStorage.getItem('currentCity') + '/Cafes/' +  this.state.customerId + '/' + this.state.name}>
                                        <span className="text text-light" style={{ fontSize: 14 }}>
                                            Cafes
                                    </span>
                                    </Link>
                                        :
                                        <Link className="nav-link" to={"/quicksearch/" + localStorage.getItem('currentCity') + '/Cafes'}>
                                        <span className="text text-light" style={{ fontSize: 14 }}>
                                            Cafes
                                    </span>
                                    </Link>
                                    }
                                    
                                </li>
                            </ul>
                        </div>
                    </div>
                    <hr style={{ borderTop: "1px solid #808080" }} />
                    <div className="row d-none d-sm-block">
                        <ul className="nav flex justify-content-center">
                            <li className="nav-item">
                                {(this.state.customerId) ?
                                    <Link className="nav-link" to={"/privacy/" + this.state.customerId + '/' + this.state.name}>
                                        <small className="text text-light" >
                                            Privacy
                                    </small>
                                    </Link>
                                    :
                                    <Link className="nav-link" to="/privacy">
                                        <small className="text text-light" >
                                            Privacy
                                    </small>
                                    </Link>
                                }
                            </li>
                            <li className="nav-item">

                                {(this.state.customerId) ?
                                    <Link className="nav-link" to={"/terms/" + this.state.customerId + '/' + this.state.name}>
                                        <small className="text text-light" >
                                            Terms
                                    </small>
                                    </Link>
                                    :
                                    <Link className="nav-link" to="/terms">
                                        <small className="text text-light" >
                                            Terms
                                    </small>
                                    </Link>
                                }
                            </li>
                        </ul>
                    </div>

                    <div className="row d-block d-sm-none">
                        <ul className="nav flex justify-content-center">
                            <li className="nav-item">
                                {(this.state.customerId) ?
                                    <Link className="nav-link" to={"/privacy/" + this.state.customerId + '/' + this.state.name}>
                                        <small className="text text-light" >
                                            Privacy
                                    </small>
                                    </Link>
                                    :
                                    <Link className="nav-link" to="/privacy">
                                        <small className="text text-light" >
                                            Privacy
                                    </small>
                                    </Link>
                                }
                            </li>
                            <li className="nav-item">

                                {(this.state.customerId) ?
                                    <Link className="nav-link" to={"/terms/" + this.state.customerId + '/' + this.state.name}>
                                        <small className="text text-light" >
                                            Terms
                                    </small>
                                    </Link>
                                    :
                                    <Link className="nav-link" to="/terms">
                                        <small className="text text-light" >
                                            Terms
                                    </small>
                                    </Link>
                                }
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}