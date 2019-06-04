import React, { Component } from 'react';
import { PanelMenu } from 'primereact/panelmenu';
import { Provider, connect } from 'react-redux';
import { createStore } from 'redux';
import NavBar from './navbar';
import axios from 'axios';
import BottomNavBar from './BottomNavbar'
import { ProgressBar } from 'primereact/progressbar';
import SearchBar from './SearchBar'
import WelcomePortal from './WelcomePortal'
import EditDetails from './EditProfile'
import MyAccount from './MyAccount'
import MyOrders from './OrderHistory'

var initialState = {
    components: {
        myAccount: false,
        myOrders: false,
        myReviews: false,
        editDetails: false,
    }
}

function changeState(state = initialState, action) {
    var stateCopy
    switch (action.type) {
        case 'MyAccount':
            stateCopy = Object.assign({}, state);
            stateCopy.components.myAccount = true;
            stateCopy.components.myOrders = false;
            stateCopy.components.myReviews = false;
            stateCopy.components.editDetails = false;
            return stateCopy;
        case 'EditDetails':
            stateCopy = Object.assign({}, state);
            stateCopy.components.myAccount = false;
            stateCopy.components.myOrders = false;
            stateCopy.components.editDetails = true;
            stateCopy.components.myReviews = false;
            return stateCopy;
        case 'MyOrders':
            stateCopy = Object.assign({}, state);
            stateCopy.components.myAccount = false;
            stateCopy.components.myOrders = true;
            stateCopy.components.myReviews = false;
            stateCopy.components.editDetails = false;
            return stateCopy;
        case 'MyReviews':
            stateCopy = Object.assign({}, state);
            stateCopy.components.myAccount = false;
            stateCopy.components.editDetails = false;
            stateCopy.components.myOrders = false;
            stateCopy.components.myReviews = true;
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
                    icon: 'pi pi-shopping-cart',
                    items: [
                        {
                            label: 'My Order',
                            icon: 'pi pi-shopping-cart',
                            command: () => {
                                var action = {
                                    type: 'MyOrders'
                                }
                                store.dispatch(action)
                            }
                        }
                    ]
                },
                {
                    label: 'My Reviews',
                    icon: 'pi pi-info-circle',
                    items: [
                        {
                            label: 'My Reviews',
                            icon: 'pi pi-fw pi-file',
                            command: () => {
                                var action = {
                                    type: 'MyReviews'
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
                    <PanelMenu model={this.state.items} style={{ width: '340px', marginBottom: 24 }} />
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
            reviews: this.props.userData.reviews
        }
    }

    render() {
        return (
            <div className="container-fluid jumbotron" style={{ background: 'linear-gradient(45deg, #B2EBF2 30%, #E0F7FA 90%)' }}>
                {
                    this.state.reviews.length === 0 ?
                        <div className="h3 text text-dark">
                            You have not given any Review yet!!
                         </div>
                        :
                        <table className="table table-bordered ">
                            <thead>
                                <tr>
                                    <th className="align-middle">Restaurant name</th>
                                    <th className="align-middle">Review</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.reviews.map((review) => {
                                    return (<tr>
                                        <td className="align-middle">{review.restaurantName}</td>
                                        <td className="align-middle">{review.review}</td>
                                    </tr>)
                                })}
                            </tbody>
                        </table>
                }
            </div>
        )
    }
}

class CustomerPortal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: this.props.name,
            customerId: this.props.customerId,
            userData: [],
            loading: true,
        }
    }
    componentDidMount() {
        this.setState({
            userData: [],
            errorMessage: '',
            successMessage: ''
        })
        axios.get('http://localhost:1050/auth/getCustomerDetails/' + this.state.customerId).then(response => {
            // console.log(response.data.message[0].orders)
            this.setState({ userData: response.data.message[0], errorMessage: '', loading: false })
            //console.log(this.state.userData)
        }).catch(error => {
            //console.log(error.response.data.message)
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
                <div className="text-center" style={{ minHeight: 400 }}>
                    <ProgressBar mode="indeterminate" style={{ height: "6px" }} />
                </div>
            )
        }
        return (
            <React.Fragment>
                <div className="d-block d-sm-none">
                    <SearchBar />
                </div>
                <WelcomePortal name={this.props.name} />
                <div className="container" style={{ marginBottom: "30px" }}>
                    <div className="row">
                        <div className="col-md-4" style={{}}>
                            <PanelMenuMain />
                        </div>
                        <div className="col-md-8" style={{}}>
                            {(this.props.myAccount) ? <MyAccount name={this.state.name} customerId={this.state.customerId} userData={this.state.userData} /> : null}
                            {(this.props.myOrders) ? <MyOrders name={this.state.name} order={this.state.userData.orders} customerId={this.state.customerId} userData={this.state.userData} /> : null}
                            {(this.props.myReviews) ? <MyReviews name={this.state.name} customerId={this.state.customerId} userData={this.state.userData} /> : null}
                            {(this.props.editDetails) ? <EditDetails name={this.state.name} customerId={this.state.customerId} userData={this.state.userData} /> : null}
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}
class CustomerHome extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            customerId: this.props.match.params.customerId,
            name: this.props.match.params.name,
        }
    }
    componentDidMount = () => {
        if (localStorage.getItem('siteAdmin') !== "false" && localStorage.getItem('rOwner') !== "false") {
            window.location.assign('/e')
        }
    }
    render() {
        return (
            <Provider store={store}>
                <NavBar customerId={this.state.customerId} name={this.state.name} home={false} />
                <CustomerPortal name={this.state.name} customerId={this.state.customerId} />
                <BottomNavBar customerId={this.state.customerId} name={this.state.name} />
            </Provider>
        )
    }
}

function mapStateToProps(state) {
    return {
        myAccount: state.components.myAccount,
        myOrders: state.components.myOrders,
        myReviews: state.components.myReviews,
        editDetails: state.components.editDetails,
    }
}
CustomerPortal = connect(mapStateToProps)(CustomerPortal);
export default CustomerHome;