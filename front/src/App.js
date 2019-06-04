import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import Home from './components/Home';
import AdminPortal from './components/AdminPortal';
// import Login from './component/logIn';
// import { Button } from 'primereact/button'
import CustomerPortal from './components/CustomerPortal';
// import { link, lstat } from 'fs';
// import ls from 'local-storage'
import Restaurant from './components/restaurant';
import About from './components/About'
import AllRestaurant from './components/AllRestaurant'
// import BottomNavBar from './components/BottomNavbar'
import LocationList from './components/LocationList'
import Contact from './components/Contact';
import Privacy from './components/Privacy';
import Terms from  './components/Terms';
import OrderSummary from './components/OrderSummary';
import QuickSearch from './components/QuickSearch';
import AddRestaurant from './components/RequestAddRestaurant'
// import DefaultPage from './components/DefaultPage'
import CategoryList from './components/CategoryList'
import RestroOwner from './components/RestOwner'
class App extends Component {

    constructor() {
        super();
        this.state = {
            showNavigation: false
        }
    }

    componentDidMount = () => {
        var linkOfPage = window.location.href;
        console.log(linkOfPage)
        let tempArr = linkOfPage.split('/');
        if (tempArr[tempArr.length - 1].length === 0) {
            this.setState({
                showNavigation: !this.state.showNavigation
            })
        }
    }

    render() {
        return (
            <div>
                <BrowserRouter>
                    <Switch>
                        <Route exact path="/adminPortal/:customerId/:name" component={AdminPortal} />
                        <Route exact path="/customerportal/:customerId/:name" component={CustomerPortal} />
                        <Route exact path="/restaurantOwner/:customerId/:name" component={RestroOwner} />
                        <Route exact path="/home" component={Home} />
                        <Route exact path="/" render={()=> (<Redirect to='/home'/>)}/>
                        <Route exact path="/home/:customerId/:name" component={Home} />
                        <Route exact path='/locationList' component={LocationList} />
                        <Route exact path='/locationList/:customerId/:name' component={LocationList} />
                        <Route exact path='/restaurantList/:location' component={AllRestaurant} />
                        <Route exact path='/restaurantList/:location/:customerId/:name' component={AllRestaurant} />
                        <Route exact path='/restaurant/:location/:restaurantName' component={Restaurant} />
                        <Route exact path='/restaurant/:location/:restaurantName/:customerId/:name' component={Restaurant} />
                        <Route exact path='/about' component={About} />
                        <Route exact path='/about/:customerId/:name' component={About} />
                        <Route exact path='/contact' component={Contact} />
                        <Route exact path='/contact/:customerId/:name' component={Contact} />
                        <Route exact path='/privacy' component={Privacy} />
                        <Route exact path='/privacy/:customerId/:name' component={Privacy} />
                        <Route exact path='/terms' component={Terms} />
                        <Route exact path='/terms/:customerId/:name' component={Terms} />
                        <Route exact path='/order/:customerId/:name' component={OrderSummary} />
                        <Route exact path='/quicksearch/:location/:key' component={QuickSearch} />
                        <Route exact path='/quicksearch/:location/:key/:customerId/:name' component={QuickSearch} />
                        <Route exact path='/addRestaurant/:customerId/:name' component={AddRestaurant} />
                        <Route exact path='/categoryList/' component={CategoryList} />
                        <Route exact path='/categoryList/:customerId/:name' component={CategoryList} />
                        {/* <Route exact path='/*' component={DefaultPage} /> */}
                        
                    </Switch>
                </BrowserRouter>
            </div>
        )
    }
}

export default App;
