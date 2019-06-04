import React, { Component } from 'react';
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import NavBar from './navbar';
import '../index.css'
import HomeCollections from './HomeCollections';
import BottomNavBar from './BottomNavbar'
class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            customerId: this.props.match.params.customerId,
            city: null,
            name: this.props.match.params.name,
            restaurants: [],
            filteredRestaurants: null,
            ifLocation: false,
            red: false,
            localLoggedIn: false,
        }
    }
    componentDidMount() {
        if (Number(this.state.customerId)) {
            this.setState({
                localLoggedIn: true
            })
        }
    }
    redirectToRestro = () => {
        this.setState({ red: true })
    }

    render() {
        if (this.state.ifLocation) {
            this.getLocation()
            this.setState({ ifLocation: false })
        }
        return <React.Fragment>
            <NavBar customerId={this.state.customerId} name={this.state.name} home={true} />
            <HomeCollections customerId={this.state.customerId} name={this.state.name} />
            <div className="container-fluid jumbotron d-none d-sm-block" style={{ marginTop: '10px', marginBottom: "0px" }}>
                <div className="row offset-1" style={{ paddingTop: "20px", paddingBottom: "40px" }} >
                    <div className="column">
                        <img src={require("../assets/no-minimum-order.png")} alt="no-minimum-order" style={{ width: "70%" }} />
                    </div>
                    <div className="column">
                        <img src={require("../assets/home-quality.png")} alt="home-quality" style={{ width: "70%" }} />
                    </div>
                    <div className="column">
                        <img src={require("../assets/fast-delivery.png")} alt="fast-delivery" style={{ width: "70%" }} />
                    </div>
                </div>
            </div>
            <div className="container-fluid jumbotron d-block d-sm-none" style={{ marginTop: '10px', marginBottom: "0px" }}>
                <div className="row offset-1" style={{ paddingTop: "10px", paddingBottom: "10px" }} >
                    <div className="col-xs-12" style={{ margin: '10px' }}>
                        <img src={require("../assets/no-minimum-order.png")} alt="no-minimum-order" style={{ width: "85%" }} />
                    </div>
                    <div className="col-xs-12" style={{ margin: '10px' }}>
                        <img src={require("../assets/home-quality.png")} alt="home-quality" style={{ width: "85%" }} />
                    </div>
                    <div className="col-xs-12" style={{ margin: '10px' }}>
                        <img src={require("../assets/fast-delivery.png")} alt="fast-delivery" style={{ width: "85%" }} />
                    </div>
                </div>
            </div>
            <div className="container-fluid d-none d-sm-block" style={{ minHeight: "601px", marginBottom: "0px", paddingBottom: "0px" }}>
                <div className="row">
                    <div className="col-md-4">

                        <h2 style={{ marginTop: "40%", marginLeft: "20%" }}>Coming soon on your Android and IOS!</h2>
                        <p className="text-muted" style={{ marginLeft: "20%" }}>Order food from your favorite restaurants when ZiggyEats Android and IOS app is launched</p>
                    </div>
                    <div className="col-md-8">
                        <img alt="no-minimum-order" src={require('../assets/mobileapp1.webp')} style={{ height: "500px", position: "absolute", top: "0px", right: "400px" }} />
                        <img alt="no-minimum-order" src={require('../assets/mobileapp2.webp')} style={{ height: "500px", position: "absolute", top: "100px", right: "50px" }} />
                    </div>
                </div>

            </div>
            <BottomNavBar customerId={this.state.customerId} name={this.state.name} />
        </React.Fragment>
    }
}

export default Home;
