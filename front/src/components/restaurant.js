import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { Provider, connect } from "react-redux";
import { createStore } from "redux";
import NavBar from "./navbar";
import "primereact/resources/themes/nova-light/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import { Rating } from "primereact/rating";
import axios from "axios";
import { Button } from "primereact/button";
import { ProgressSpinner } from "primereact/progressspinner";
import BottomNavBar from "./BottomNavbar";
import { TabView, TabPanel } from "primereact/tabview";
import { OverlayPanel } from "primereact/overlaypanel";
import { ProgressBar } from "primereact/progressbar";
import { withRouter } from "react-router";
import { Growl } from 'primereact/growl';
import DefaultPage from './DefaultPage'
import SearchBar from './SearchBar'

var initialState = {
  components: {
    overview: true,
    menu: false,
    reviews: false
  }
};

function changeState(state = initialState, action) {
  var stateCopy
  switch (action.type) {
    case "Overview":
      stateCopy = Object.assign({}, state);
      stateCopy.components.overview = true;
      stateCopy.components.menu = false;
      stateCopy.components.reviews = false;
      return stateCopy;
    case "Menu":
      stateCopy = Object.assign({}, state);
      stateCopy.components.overview = false;
      stateCopy.components.menu = true;
      stateCopy.components.reviews = false;
      return stateCopy;
    case "Reviews":
      stateCopy = Object.assign({}, state);
      stateCopy.components.overview = false;
      stateCopy.components.menu = false;
      stateCopy.components.reviews = true;
      return stateCopy;
    default:
      return state;
  }
}

var store = createStore(changeState);
class Overview extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      restaurantData: this.props.restaurantData
    }
  }
  render() {
    if (this.state.restaurantData.length) {
      return (
        <div className="text-center" style={{ margin: "20px" }}>
          <ProgressSpinner style={{ width: "50px", height: "50px" }} strokeWidth="8" fill="#EEEEEE" animationDuration=".5s" />
          <span>Loading</span>
        </div>
      )
    }
    else {
      return (
        <React.Fragment>
          <div className="card" style={{ marginTop: 0, marginBottom: 40, border: "0px" }} >
            <div className="card-body" style={{ textAlign: "center" }}>
              <h3 className="card-title" style={{ textAlign: "left" }}>
                <table className="table table-sm table-borderless" >
                  <tbody >
                    <tr>
                      <td>
                        <span className="text text-dark text-justify" style={{ fontSize: "20px" }}>{this.state.restaurantData.overview[0].heading}</span><br />
                        <hr />
                        <span className="text text-dark text-justify" style={{ fontSize: "15px" }}><strong> Phone number : </strong>{this.state.restaurantData.overview[0].phone}</span><br />
                        <span className="text text-dark text-justify" style={{ fontSize: "15px" }}><strong> Price For Two : </strong>{this.state.restaurantData.overview[0].priceForTwo}</span><br />
                        <span className="text text-dark text-justify" style={{ fontSize: "15px" }}><strong> Payment types : </strong>{this.state.restaurantData.overview[0].paymentType}</span><br />
                        <span className="text text-dark text-justify" style={{ fontSize: "15px" }}><strong> More info : </strong>{this.state.restaurantData.overview[0].extra}</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </h3>
            </div>
          </div>
        </React.Fragment>
      );
    }
  }
}

class Menu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cart: {},
      price: {},
      btnDelete: {},
      buttonActive: false,
      totalQuantity: 0,
      buttonDelete: false,
      orderButtonClick: false,
      customerId: this.props.customerId,
      name: this.props.name,
      restaurantName: this.props.restaurantName,
      showLoginForm: false,
      form: {
        email: '',
        password: ''
      },
      formError: {
        email: '',
        password: ''
      },
      formValid: {
        email: false,
        password: false
      },
      successMessage: '',
      errorMessage: ''
    };
    // this.props.menu.map(item => {
    //   this.state.cart[item.dishName] = 0;
    //   this.state.price[item.dishName] = 0;
    //   return null
    // });
  }

  componentWillMount() {
    var cart = this.state.cart;
    var price = this.state.price
    this.props.menu.map(item => {
      cart[item.dishName] = 0;
      price[item.dishName] = 0;
      return null
    });
    this.setState({})
  }

  placeOrder = () => {
    let f = 0
    this.props.menu.map(item => {
      if (this.state.cart[item.dishName] > 4) {
        f = 1
      }
      return null
    });
    if (f !== 1) {
      var currentCity = '';
      if (localStorage.getItem('currentCity') === "Mysuru") {
        currentCity = 'Mysore';
      }
      else {
        currentCity = localStorage.getItem('currentCity');
      }
      if (currentCity !== this.props.location) {
        this.showLocationError()
      }
      else if (localStorage.getItem('rOwner') === "true") {
        this.showRownerError()
      }
      else if (localStorage.getItem('orderPlaced') === "true") {
        this.showPlacedError()
      }
      else if (!localStorage.getItem("admin")) {
        this.showLoginError()
      } else {
        localStorage.setItem("cart", JSON.stringify(this.state.cart));
        localStorage.setItem("price", JSON.stringify(this.state.price));
        localStorage.setItem("restaurantName", this.state.restaurantName);
        this.setState({
          orderButtonClick: true
        });
      }
    }
    else {
      this.showOrderError()
    }
  };
  showRownerError = () => {
    this.growl.show({ severity: 'error', summary: "Head of city's restaurants cannot order", detail: '' });
  }

  showLocationError = () => {
    this.growl.show({ severity: 'error', summary: 'Sorry you can not order from ' + this.props.location + ' when you are in ' + localStorage.getItem('currentCity') + "!", detail: '' });
  }
  showLoginError = () => {
    this.growl.show({ severity: 'error', summary: 'Please Sign in first to place a order', detail: '' });
  }
  showOrderError = () => {
    this.growl.show({ severity: 'error', summary: 'Atmost 4 of each item is allowed', detail: '' });
  }
  showPlacedError = () => {
    this.growl.show({ severity: 'error', summary: 'You have already have a order in progress', detail: '' });
  }

  customerLogin = (event) => {
    event.preventDefault();
    var loginObj = {
      email: this.state.form.email,
      password: this.state.form.password
    }
    axios.post('/auth/login', loginObj).then((response) => {
      this.setState({ successMessage: response.data[0], errorMessage: '', name: response.data[0].name, customerId: response.data[0].customerId, showLoginForm: false })
      localStorage.setItem('admin', response.data[0].admin)
      localStorage.setItem('customerId', response.data[0].customerId)
      //console.log("login", response.data)
    })
      .catch((error) => {
        if (error.response) {
          this.setState({ customerRedirect: false, errorMessage: error.response.data.message })
        }
        else {
          this.setState({ customerRedirect: false, errorMessage: "Server Error" })
        }
      });
  }

  render() {
    if (this.state.orderButtonClick) {
      return (
        <React.Fragment>
          {" "}
          <Redirect to={"/order/" + this.state.customerId + "/" + this.state.name} push />
        </React.Fragment>
      );
    }

    return (
      <div className="card" style={{ marginTop: 40, marginBottom: 40 }}>
        <h3 className="card-header" style={{ textAlign: "center" }}>
          Menu
        </h3>
        <div className="card-body" style={{ textAlign: "center" }}>
          {this.props.menu.length > 0 ? (
            <div>
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>Dish Name</th>
                    <th>Price</th>
                    <th>Order</th>
                  </tr>
                </thead>
                <tbody>
                  {this.props.menu.map(item => {
                    var t = item.dishName;
                    return (
                      <tr key={item.dishName} style={{ paddingTop: 60, textTransform: 'capitalize' }}>
                        <td className="text align-middle">{item.dishName}</td>
                        <td className="text align-middle">{item.price}</td>
                        <td>
                          <div className="btn-group btn-group-sm">
                            <button className="btn btn-success" name={item.dishName} value={item.price} onClick={event => {
                              let temp = this.state.cart;
                              let price = this.state.price;
                              let btn = this.state.btnDelete;
                              btn[event.target.name] = true;
                              temp[event.target.name] += 1;
                              price[event.target.name] =
                                temp[event.target.name] * event.target.value;
                              this.setState({ cart: temp, price: price, buttonActive: true, totalQuantity: this.state.totalQuantity + 1, btnDelete: btn }); }} >
                              {" "}
                              +{" "}
                            </button>
                            <button className="btn btn-light" style={{ width: 35 }} id={item.dishName} >
                              <span className="text text-dark">
                                {this.state.cart[t]}
                              </span>
                            </button>
                            <button className="btn btn-danger" name={item.dishName} value={item.price} disabled={!this.state.btnDelete[item.dishName]} onClick={event => {
                              let temp = this.state.cart;
                              let price = this.state.price;
                              let btn = this.state.btnDelete;
                              if (temp[event.target.name] > 1) {
                                temp[event.target.name] -= 1;
                                price[event.target.name] =
                                  temp[event.target.name] *
                                  event.target.value;
                                this.setState({ cart: temp, price: price, totalQuantity: this.state.totalQuantity - 1 });
                              } else if (temp[event.target.name] === 1) {
                                btn[event.target.name] = false;
                                temp[event.target.name] = 0;
                                price[event.target.name] =
                                  temp[event.target.name] *
                                  event.target.value;
                                this.setState({ cart: temp, price: price, totalQuantity: this.state.totalQuantity - 1, btnDelete: btn });
                              }
                              if (this.state.totalQuantity === 1) {
                                this.setState({ buttonActive: false }); } }} >
                              {" "}
                              -{" "}
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              <br />
              <button className="btn btn-primary" disabled={!this.state.buttonActive} onClick={this.placeOrder} >
                Order
              </button>
              <Growl ref={(el) => this.growl = el} />
            </div>
          ) : null}
        </div>
      </div>
    );
  }
}
class Reviews extends React.Component {
  render() {
    return (
      <div>
        {this.props.reviews
          ? this.props.reviews.map(review => {
            return (
              <div className="container" key={review._id + "2"}>
                <div className="row" style={{ marginTop: 40, marginBottom: 40 }} key={review._id + "1"}>
                  <div className="col-sm-1" />
                  <div className="col-sm-10">
                    <div className="card" key={review._id}>
                      <div className="card-body">
                        <blockquote className="blockquote">
                          <p>{review.review}</p>
                          <footer style={{ textTransform: 'capitalize' }} className="blockquote-footer text-right" key={review._id} >
                            {review.reviewBy}
                          </footer>
                        </blockquote>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-1" />
                </div>
              </div>
            );
          })
          : null}
      </div>
    );
  }
}

class AddReview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      addReviewSuccessMessage: "",
      addReviewErrorMessage: "",
      validateAddReview: false,
      addReview: "",
      validateAddReviewButton: false,
      review: "",
      addReviewButtonClicked: false
    };
  }
  valdiateAddReview = event => {
    if (!localStorage.getItem('admin')) {
     this.setState({ addReviewErrorMessage: 'You are not logged in' })
    }
    else if (event.target.value.length < 5) {
      this.setState({ addReviewSuccessMessage: "", addReviewErrorMessage: "Review should consist of atleast 5 characters", validateAddReview: false });
    } else {
      this.setState({ addReviewErrorMessage: "", validateAddReview: true, review: event.target.value });
    }
    if (this.state.validateAddReview && localStorage.getItem('admin')) {
      this.setState({ validateAddReviewButton: true });
    } else {
      this.setState({ validateAddReviewButton: false });
    }
  };

  addReview = () => {
    this.setState({ addReviewButtonClicked: true });
    const reviewObj = {
      review: this.state.review,
      reviewBy: this.props.name,
      customerId: localStorage.getItem('customerId')
    };
    axios.post( "/restaurant/insertReview/" + this.props.restaurantName, reviewObj ).then(response => {
        this.setState({ addReviewSuccessMessage: response.data.message });
      }).catch(err => {
        if (err) {
          this.setState({ addReviewErrorMessage: err.response.data.message, addReviewSuccessMessage: "" });
        } else {
          this.setState({ addReviewErrorMessage: "server error", addReviewSuccessMessage: "" });
        }
      });
  };

  render() {
    return (
      <div className="container">
        <div className="row" style={{ marginTop: 40, marginBottom: 40 }}>
          <div className="col-sm-1" />
          <div className="col-sm-10">
            <div className="card" style={{ border: "0px" }}>
              <div className="card-body">
                {!this.state.addReviewSuccessMessage && !this.state.addReviewButtonClicked ?
                  (
                    <blockquote className="blockquote">
                      <div className="form-group shadow-textarea">
                        <label htmlFor="exampleFormControlTextarea6">
                          Add a review
                      </label>
                        <textarea className="form-control z-depth-1" id="reviewTextBox" rows="3" onChange={this.valdiateAddReview} placeholder="Write something here..." />
                        <span className="text-danger">
                          {this.state.addReviewErrorMessage}
                        </span>
                      </div>
                      <footer className="text-right">
                        <button type="button" className="btn btn-success" disabled={!this.state.validateAddReviewButton} onClick={this.addReview} >
                          Add review
                      </button>
                      </footer>
                    </blockquote>
                  )
                  :
                  !this.state.addReviewSuccessMessage && this.state.addReviewButtonClicked ?
                    (
                      <div className="text-center" style={{ margin: "20px" }}>
                        <ProgressSpinner style={{ width: "50px", height: "50px" }} strokeWidth="8" fill="#EEEEEE" animationDuration=".5s" />
                        <p>Adding your review</p>
                      </div>
                    )
                    :
                    (
                      <div className="text-center" style={{ margin: "20px" }}>
                        <h2 className="text-success display-4">
                          {this.state.addReviewSuccessMessage}
                          {window.location.reload()}
                        </h2>
                      </div>
                    )}
              </div>
            </div>
          </div>
          <div className="col-sm-1" />
        </div>
      </div>
    );
  }
}

export class TabViewDemo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeIndex: 1,
      restaurantData: this.props.restaurantData,
      customerId: this.props.customerId,
      name: this.props.name
    };
  }
  render() {
    return (
      <div>
        <div className="content-section implementation">
          <TabView renderActiveOnly={false}>
            <TabPanel header="Overview" leftIcon="pi pi-calendar" style={{ headStyle: "100%" }} >
              {this.props.restaurantData ? (
                <Overview restaurantData={this.props.restaurantData} />
              )
                :
                (
                  <div className="text-center" style={{ margin: "20px" }}>
                    <ProgressSpinner style={{ width: "50px", height: "50px" }} strokeWidth="8" fill="#EEEEEE" animationDuration=".5s" />
                    <p>Loading overview</p>
                  </div>
                )}
            </TabPanel>
            <TabPanel header="Menu" rightIcon="pi pi-user">
              {this.props.restaurantData.menu ? (
                <Menu menu={this.props.restaurantData.menu} customerId={this.props.customerId} name={this.props.name} restaurantName={this.props.restaurantName} location={this.props.restaurantData.location} />) :
                (
                  <div className="text-center" style={{ margin: "20px" }}>
                    <ProgressSpinner style={{ width: "50px", height: "50px" }} strokeWidth="8" fill="#EEEEEE" animationDuration=".5s" />
                    <p>Loading Menu</p>
                  </div>
                )}
            </TabPanel>
          </TabView>
        </div>
      </div>
    );
  }
}

class ShowRate extends React.Component {
  constructor() {
    super();
    this.state = {
      val2: null,
      ratingReadOnly: false,
      starValue: null,
      successMessage: "",
      items: [
        {
          label: "File",
          icon: "pi pi-fw pi-file",
          items: [
            {
              label: "New",
              icon: "pi pi-fw pi-plus",
              items: [
                {
                  label: "Bookmark",
                  icon: "pi pi-fw pi-bookmark"
                },
                {
                  label: "Video",
                  icon: "pi pi-fw pi-video"
                }
              ]
            }
          ]
        }
      ]
    };
  }

  giveRating = event => {
    this.setState({
      val2: event.target.value,
      ratingReadOnly: true,
      starValue: event.target.value
    });
    var ratingObj = {
      ratings: (event.target.value - 1) * 25
    };
    axios.post("/restaurant/giveRating/" + this.props.restaurantName, ratingObj).then(response => {
        this.setState({ successMessage: response.data.message });
      }).catch(err => {
      });
  };

  render() {
    if (this.state.val2) {
    }
    return (
      <div className="container">
        <div className="row d-none d-md-block">
          <div className="col-md-12">
            <Rating value={this.state.val2} cancel={false} disabled={this.state.ratingReadOnly} onChange={this.giveRating} >
              {" "}
            </Rating>
            {!this.state.successMessage && this.state.val2 ? (
              <ProgressSpinner style={{ width: "30px", height: "30px" }} strokeWidth="8" fill="#EEEEEE" animationDuration=".5s" />) : !this.state.val && this.state.successMessage ? (
                <span className="text-muted">
                  {" "}
                  {this.state.successMessage + " " + this.state.val2 + " star"}
                </span>
              ) : null}
          </div>
        </div>
        <div className="row d-block d-md-none" >
          <div className="col-xs-7">
            <Rating value={this.state.val2} cancel={false} disabled={this.state.ratingReadOnly} onChange={this.giveRating} >
              {" "}
            </Rating>
          </div>
          <div className="col-xs-5" style={{ padding: "0px" }}>
            {!this.state.successMessage && this.state.val2 ? (
              <ProgressSpinner style={{ width: "30px", height: "30px" }} strokeWidth="8" fill="#EEEEEE" animationDuration=".5s" />) : !this.state.val && this.state.successMessage ? (
                <span className="text-muted">
                  {" "}
                  {this.state.successMessage + " " + this.state.val2 + " star"}
                </span>
              ) : null}
          </div>
        </div>
      </div>
    );
  }
}

class Restaurant extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      val1: null,
      restaurantData: [],
      loading: true,
      location: this.props.location,
      parLocation: '',
      restaurantName: this.props.restaurantName,
      showReviews: false,
      addReview: false,
      showRate: false,
      sideviewRestaurantByLoc: [],
      sideviewRestaurantByLocMod: [],
      clicked: false,
      sideviewRestaurantByCat: [],
      pathChangeError: false,
      defaultLoading: true
    };
    this.sideviewRestaurantByLocMod = [];
    this.sideviewRestaurantByCat = [];
  }
  componentWillUnmount() {
    this.setState({ overview: true, menu: false, review: false })
  }

  componentDidMount() {
    let url = window.location.href.split('/')
    this.setState({ parLocation: url[4] })
    if (Number(this.props.customerId)) {
      this.setState({
        restaurantData: [],
        localLoggedIn: true
      });
    }
    axios.get("/restaurant/getRestaurantDetails/" + this.props.restaurantName).then(res => {
      // console.log(res.data)
      this.setState({ restaurantData: res.data.message[0], errorMessage: "", loading: false, defaultLoading: false });
    }).catch(error => {
      if (error.response) {
        // console.log(error.response.data.message)
        this.setState({ errorMessage: error.response.data.message, loading: false, pathChangeError: true, defaultLoading: false });
      } else {
        this.setState({ errorMessage: "Server Error", loading: false, defaultLoading: false });
      }
    });
    let citi = ["Chandigarh", "Mysore", "New Delhi"]
    let f = 0
    for (let i = 0; i < 3; i++) {
      if (citi[i] === this.state.location) {
        f = 1
      }
    }
    if (f !== 1) {
      this.setState({ pathChangeError: true })
    }

    axios.get("/restaurant/getRestaurantsDetails/" + this.props.location).then(response => {
      for (let i = 0; i < response.data.message.length; i++) {
        if (
          response.data.message[i].restaurantName !== this.props.restaurantName && response.data.message[i].restaurantName.length <= 15) {
          this.sideviewRestaurantByLocMod.push(response.data.message[i]);
        }
      }
      for (let i = 0; i < response.data.message.length; i++) {
        if (
          response.data.message[i].category === this.state.restaurantData.category && response.data.message[i].restaurantName !== this.props.restaurantName && response.data.message[i].restaurantName.length <= 15) {
          this.sideviewRestaurantByCat.push(response.data.message[i]);
        }
      }
      this.setState({ defaultLoading: false, sideviewRestaurantByLoc: this.sideviewRestaurantByLocMod, sideviewRestaurantByCat: this.sideviewRestaurantByCat });
    })
      .catch(err => {
        //console.log("error while getting restaurants for sideview", err);
      });
  }

  componentDidUpdate = () => {
    if (this.state.clicked) {
      window.location.reload();
      this.setState({
        clicked: false
      });
    }
    return true;
  };

  showReviews = () => {
    this.setState({ showReviews: !this.state.showReviews, addReview: false, showRate: false });
  };

  addReview = () => {
    this.setState({ addReview: !this.state.addReview, showReviews: false, showRate: false });
  };
  rate = e => {
    this.op.toggle(e);
    this.setState({ addReview: false, showReviews: false, showRate: !this.state.showRate });
  };

  render() {
    // console.log(this.state)
    if (this.state.clicked) {
      this.setState({ clicked: false });
    }
    if (this.state.loading) {
      return (
        <div style={{ minHeight: 500 }}>
          <ProgressBar mode="indeterminate" style={{ height: "6px" }} />
        </div>
      );
    }
    else if (!this.state.restaurantData.category && this.state.sideviewRestaurantByCat.length === 0 && this.state.defaultLoading) {
      return (
        <div style={{ minHeight: 500 }}>
          <ProgressBar mode="indeterminate" style={{ height: "6px" }} />
        </div>
      );
    }
    else if (this.state.pathChangeError) {
      return (
        <div style={{ minHeight: 500 }}>
          <DefaultPage customerId={this.props.customerId} name={this.props.name} />
        </div>
      );
    }
    else {
      return (
        <div>
          <div className="d-block d-sm-none">
            <SearchBar />
          </div>
          <div className="content-section introduction">
            <div className="feature-intro">
              <br />
            </div>
          </div>
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-1 d-none d-md-block" />
              <div className="col-md-7">
                {
                  this.state.restaurantData.image === 'uploaded' ?
                    <img className="card-img-top" src={require("../assets/" + this.state.location + '/' + this.props.restaurantName + ".jpg")} height="300" alt="Card imag cap" />
                    :
                    <img className="card-img-top" src={require("../assets/default-res-back.jpg")} height="300" alt="Card imag cap" />
                }
                <div className="card-body" style={{ paddingTop: "5px" }} id="tabviewCard">
                  <h2 className="card-title">{this.props.restaurantName} </h2>{" "}
                  <button className="btn btn-success" style={{ position: "absolute", top: 305, right: 8, height: 40, paddingTop: "0px" }} >
                    {" "}
                    <span style={{ fontSize: "25px" }}>
                      {" "}
                      <strong>
                        {(this.state.restaurantData.ratings / 20).toFixed(1)}
                      </strong>
                    </span>
                  </button>
                  <p className="card-text" style={{ display: "inline", textTransform: 'capitalize' }}>
                    <span className="text-muted"> {this.state.location}</span>{" "}
                    <span className="text-muted">&#8226;&nbsp;</span>
                    <span className="text-muted">
                      {this.state.restaurantData.category}
                    </span>
                  </p>
                  <hr />
                  <div className="content-section implementation">
                    <Button label="Reviews" icon="pi pi-file" className="p-button-secondary" style={{ borderColor: "#DEDEDE" }} onClick={this.showReviews} />{" "}
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <Button label="Add a review" className="p-button-secondary" style={{ borderColor: "#DEDEDE" }} icon="pi pi-comment" onClick={this.addReview} />
                    &nbsp;&nbsp;&nbsp;&nbsp;{" "}
                    <Button label="Rate" className="p-button-secondary" style={{ borderColor: "#DEDEDE" }} icon="pi pi-star" onClick={this.rate} id="rateButton" />
                    &nbsp;&nbsp;&nbsp;&nbsp;{" "}
                    <OverlayPanel ref={el => (this.op = el)} id="wop">
                      <ShowRate restaurantName={this.state.restaurantName} name={this.props.name} />
                    </OverlayPanel>
                  </div>
                  {this.state.showReviews ? (<Reviews reviews={this.state.restaurantData.reviews} />) : null}
                  {this.state.addReview ? (<AddReview restaurantName={this.state.restaurantName} name={this.props.name} />) : null}
                  {/* {(this.state.showRate) ? <ShowRate restaurantName={this.state.restaurantName} name={this.props.name}/> : null} */}
                  <hr />
                  <TabViewDemo restaurantData={this.state.restaurantData} customerId={this.props.customerId} name={this.props.name} restaurantName={this.state.restaurantName} id="tabviewDemo" />
                </div>
              </div>
              <div className="col-md-4" style={{ paddingRight: "40px" }}>
                <h4 className="text-muted">
                  More restaurants in {this.props.location}
                </h4>
                {this.state.sideviewRestaurantByLoc.length > 0 &&
                  !this.props.customerId ? (
                    <div className="card-columns">
                      <Link to={"/restaurant/" + this.state.sideviewRestaurantByLoc[0].location + "/" + this.state.sideviewRestaurantByLoc[0].restaurantName} onClick={() => { this.setState({ clicked: true }); }} >
                        {" "}
                        <div className="card bg-light" style={{ height: "160px" }}>
                          <img alt="" className="card-img-top" src={require("../assets/" + this.state.sideviewRestaurantByLoc[0].location + "/" + this.state.sideviewRestaurantByLoc[0].restaurantName + ".jpg")} height="65%" />
                          <p style={{ marginBottom: "0px" }}>
                            <span style={{ fontSize: "2vh", paddingLeft: "2px" }} className="text-muted" >
                              <strong>
                                {
                                  this.state.sideviewRestaurantByLoc[0]
                                    .restaurantName
                                }
                              </strong>
                            </span>
                            <br />
                            <span style={{ fontSize: "2vh", paddingLeft: "2px" }} className="text-muted" >
                              {this.state.sideviewRestaurantByLoc[0].category}
                            </span>
                          </p>
                        </div>{" "}
                      </Link>
                      <Link to={"/restaurant/" + this.state.sideviewRestaurantByLoc[1].location + "/" + this.state.sideviewRestaurantByLoc[1].restaurantName} onClick={() => { this.setState({ clicked: true }); }} >
                        {" "}
                        <div className="card bg-light" style={{ height: "160px" }}>
                          <img alt="" className="card-img-top" src={require("../assets/" + this.state.sideviewRestaurantByLoc[1].location + "/" + this.state.sideviewRestaurantByLoc[1].restaurantName + ".jpg")} height="65%" />
                          <p>
                            <span style={{ fontSize: "2vh", paddingLeft: "2px" }} className="text-muted" >
                              <strong>
                                {
                                  this.state.sideviewRestaurantByLoc[1]
                                    .restaurantName
                                }
                              </strong>
                            </span>
                            <br />
                            <span style={{ fontSize: "2vh", paddingLeft: "2px" }} className="text-muted" >
                              {this.state.sideviewRestaurantByLoc[1].category}
                            </span>
                          </p>
                        </div>{" "}
                      </Link>
                      <Link to={"/restaurant/" + this.state.sideviewRestaurantByLoc[2].location + "/" + this.state.sideviewRestaurantByLoc[2].restaurantName} onClick={() => { this.setState({ clicked: true }); }} >
                        {" "}
                        <div className="card bg-light" style={{ height: "160px" }}>
                          <img alt="" className="card-img-top" src={require("../assets/" + this.state.sideviewRestaurantByLoc[2].location + "/" + this.state.sideviewRestaurantByLoc[2].restaurantName + ".jpg")} height="65%" />
                          <p>
                            <span style={{ fontSize: "2vh", paddingLeft: "2px" }} className="text-muted"  >
                              <strong>
                                {
                                  this.state.sideviewRestaurantByLoc[2]
                                    .restaurantName
                                }
                              </strong>
                            </span>
                            <br />
                            <span style={{ fontSize: "2vh", paddingLeft: "2px" }} className="text-muted" >
                              {this.state.sideviewRestaurantByLoc[2].category}
                            </span>
                          </p>
                        </div>{" "}
                      </Link>
                      <Link to={"/restaurant/" + this.state.sideviewRestaurantByLoc[3].location + "/" + this.state.sideviewRestaurantByLoc[3].restaurantName} onClick={() => { this.setState({ clicked: true }); }} >
                        {" "}
                        <div className="card bg-light" style={{ height: "160px" }}>
                          <img alt="" className="card-img-top" src={require("../assets/" + this.state.sideviewRestaurantByLoc[3].location + "/" + this.state.sideviewRestaurantByLoc[3].restaurantName + ".jpg")} height="65%" />
                          <p>
                            <span style={{ fontSize: "2vh", paddingLeft: "2px" }} className="text-muted" >
                              <strong>
                                {
                                  this.state.sideviewRestaurantByLoc[3]
                                    .restaurantName
                                }
                              </strong>
                            </span>
                            <br />
                            <span style={{ fontSize: "2vh", paddingLeft: "2px" }} className="text-muted" >
                              {this.state.sideviewRestaurantByLoc[3].category}
                            </span>
                          </p>
                        </div>{" "}
                      </Link>
                      <Link to={"/restaurant/" + this.state.sideviewRestaurantByLoc[4].location + "/" + this.state.sideviewRestaurantByLoc[4].restaurantName} onClick={() => { this.setState({ clicked: true }); }} >
                        {" "}
                        <div className="card bg-light" style={{ height: "160px" }}>
                          <img alt="" className="card-img-top" src={require("../assets/" + this.state.sideviewRestaurantByLoc[4].location + "/" + this.state.sideviewRestaurantByLoc[4].restaurantName + ".jpg")} height="65%" />
                          <p>
                            <span style={{ fontSize: "2vh", paddingLeft: "2px" }} className="text-muted" >
                              <strong>
                                {
                                  this.state.sideviewRestaurantByLoc[4]
                                    .restaurantName
                                }
                              </strong>
                            </span>
                            <br />
                            <span
                              style={{ fontSize: "2vh", paddingLeft: "2px" }}
                              className="text-muted"
                            >
                              {this.state.sideviewRestaurantByLoc[4].category}
                            </span>
                          </p>
                        </div>{" "}
                      </Link>
                      <Link to={"/restaurant/" + this.state.sideviewRestaurantByLoc[5].location + "/" + this.state.sideviewRestaurantByLoc[5].restaurantName} onClick={() => { this.setState({ clicked: true }); }} >
                        {" "}
                        <div className="card bg-light" style={{ height: "160px" }}>
                          <img alt="" className="card-img-top" src={require("../assets/" + this.state.sideviewRestaurantByLoc[5].location + "/" + this.state.sideviewRestaurantByLoc[5].restaurantName + ".jpg")} height="65%" />
                          <p>
                            <span style={{ fontSize: "2vh", paddingLeft: "2px" }} className="text-muted" >
                              <strong>
                                {
                                  this.state.sideviewRestaurantByLoc[5]
                                    .restaurantName
                                }
                              </strong>
                            </span>
                            <br />
                            <span style={{ fontSize: "2vh", paddingLeft: "2px" }} className="text-muted" >
                              {this.state.sideviewRestaurantByLoc[5].category}
                            </span>
                          </p>
                        </div>{" "}
                      </Link>
                    </div>
                  ) : this.state.sideviewRestaurantByLoc.length > 0 &&
                    this.props.customerId ? (
                      <div className="card-columns">
                        <Link to={"/restaurant/" + this.state.sideviewRestaurantByLoc[0].location + "/" + this.state.sideviewRestaurantByLoc[0].restaurantName + "/" + this.props.customerId + "/" + this.props.name} onClick={() => { this.setState({ clicked: true }); }} >
                          {" "}
                          <div className="card bg-light" style={{ height: "160px" }}>
                            <img alt="" className="card-img-top" src={require("../assets/" + this.state.sideviewRestaurantByLoc[0].location + "/" + this.state.sideviewRestaurantByLoc[0].restaurantName + ".jpg")} height="65%" />
                            <p style={{ marginBottom: "0px" }}>
                              <span style={{ fontSize: "2vh", paddingLeft: "2px" }} className="text-muted" >
                                <strong>
                                  {
                                    this.state.sideviewRestaurantByLoc[0]
                                      .restaurantName
                                  }
                                </strong>
                              </span>
                              <br />
                              <span style={{ fontSize: "2vh", paddingLeft: "2px" }} className="text-muted" >
                                {this.state.sideviewRestaurantByLoc[0].category}
                              </span>
                            </p>
                          </div>{" "}
                        </Link>
                        <Link to={"/restaurant/" + this.state.sideviewRestaurantByLoc[1].location + "/" + this.state.sideviewRestaurantByLoc[1].restaurantName + "/" + this.props.customerId + "/" + this.props.name} onClick={() => { this.setState({ clicked: true }); }} >
                          {" "}
                          <div className="card bg-light" style={{ height: "160px" }}>
                            <img alt="" className="card-img-top" src={require("../assets/" + this.state.sideviewRestaurantByLoc[1].location + "/" + this.state.sideviewRestaurantByLoc[1].restaurantName + ".jpg")} height="65%" />
                            <p>
                              <span style={{ fontSize: "2vh", paddingLeft: "2px" }} className="text-muted" >
                                <strong>
                                  {
                                    this.state.sideviewRestaurantByLoc[1]
                                      .restaurantName
                                  }
                                </strong>
                              </span>
                              <br />
                              <span style={{ fontSize: "2vh", paddingLeft: "2px" }} className="text-muted" >
                                {this.state.sideviewRestaurantByLoc[1].category}
                              </span>
                            </p>
                          </div>{" "}
                        </Link>
                        <Link to={"/restaurant/" + this.state.sideviewRestaurantByLoc[2].location + "/" + this.state.sideviewRestaurantByLoc[2].restaurantName + "/" + this.props.customerId + "/" + this.props.name} onClick={() => { this.setState({ clicked: true }); }} >
                          {" "}
                          <div className="card bg-light" style={{ height: "160px" }}>
                            <img alt="" className="card-img-top" src={require("../assets/" + this.state.sideviewRestaurantByLoc[2].location + "/" + this.state.sideviewRestaurantByLoc[2].restaurantName + ".jpg")} height="65%" />
                            <p>
                              <span style={{ fontSize: "2vh", paddingLeft: "2px" }} className="text-muted" >
                                <strong>
                                  {
                                    this.state.sideviewRestaurantByLoc[2]
                                      .restaurantName
                                  }
                                </strong>
                              </span>
                              <br />
                              <span style={{ fontSize: "2vh", paddingLeft: "2px" }} className="text-muted" >
                                {this.state.sideviewRestaurantByLoc[2].category}
                              </span>
                            </p>
                          </div>{" "}
                        </Link>
                        <Link to={"/restaurant/" + this.state.sideviewRestaurantByLoc[3].location + "/" + this.state.sideviewRestaurantByLoc[3].restaurantName + "/" + this.props.customerId + "/" + this.props.name} onClick={() => { this.setState({ clicked: true }); }} >
                          {" "}
                          <div className="card bg-light" style={{ height: "160px" }}>
                            <img alt="" className="card-img-top" src={require("../assets/" + this.state.sideviewRestaurantByLoc[3].location + "/" + this.state.sideviewRestaurantByLoc[3].restaurantName + ".jpg")} height="65%" />
                            <p>
                              <span style={{ fontSize: "2vh", paddingLeft: "2px" }} className="text-muted" >
                                <strong>
                                  {
                                    this.state.sideviewRestaurantByLoc[3]
                                      .restaurantName
                                  }
                                </strong>
                              </span>
                              <br />
                              <span style={{ fontSize: "2vh", paddingLeft: "2px" }} className="text-muted" >
                                {this.state.sideviewRestaurantByLoc[3].category}
                              </span>
                            </p>
                          </div>{" "}
                        </Link>
                        <Link to={"/restaurant/" + this.state.sideviewRestaurantByLoc[4].location + "/" + this.state.sideviewRestaurantByLoc[4].restaurantName + "/" + this.props.customerId + "/" + this.props.name} onClick={() => { this.setState({ clicked: true }); }} >
                          {" "}
                          <div className="card bg-light" style={{ height: "160px" }}>
                            <img alt="" className="card-img-top" src={require("../assets/" + this.state.sideviewRestaurantByLoc[4].location + "/" + this.state.sideviewRestaurantByLoc[4].restaurantName + ".jpg")} height="65%" />
                            <p>
                              <span style={{ fontSize: "2vh", paddingLeft: "2px" }} className="text-muted" >
                                <strong>
                                  {
                                    this.state.sideviewRestaurantByLoc[4].restaurantName
                                  }
                                </strong>
                              </span>
                              <br />
                              <span style={{ fontSize: "2vh", paddingLeft: "2px" }} className="text-muted" >
                                {this.state.sideviewRestaurantByLoc[4].category}
                              </span>
                            </p>
                          </div>{" "}
                        </Link>
                        <Link to={"/restaurant/" + this.state.sideviewRestaurantByLoc[5].location + "/" + this.state.sideviewRestaurantByLoc[5].restaurantName + "/" + this.props.customerId + "/" + this.props.name} onClick={() => { this.setState({ clicked: true }); }} >
                          {" "}
                          <div className="card bg-light" style={{ height: "160px" }}>
                            <img alt="" className="card-img-top" src={require("../assets/" + this.state.sideviewRestaurantByLoc[5].location + "/" + this.state.sideviewRestaurantByLoc[5].restaurantName + ".jpg")} height="65%" />
                            <p>
                              <span style={{ fontSize: "2vh", paddingLeft: "2px" }} className="text-muted">
                                <strong>
                                  {
                                    this.state.sideviewRestaurantByLoc[5].restaurantName
                                  }
                                </strong>
                              </span>
                              <br />
                              <span style={{ fontSize: "2vh", paddingLeft: "2px" }} className="text-muted">
                                {this.state.sideviewRestaurantByLoc[5].category}
                              </span>
                            </p>
                          </div>{" "}
                        </Link>
                      </div>
                    ) : null}
              </div>
            </div>
          </div>
          <br />
        </div>
      );
    }
  }
}

class RestaurantHome extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      customerId: this.props.match.params.customerId,
      name: this.props.match.params.name,
      location: this.props.match.params.location,
      restaurantName: this.props.match.params.restaurantName,
      redRes: false
    };
  }
  componentDidMount = () => {
    window.scrollTo(0, 0)
    if (Number(this.state.customerId)) {
      this.setState({
        localLoggedIn: true
      });
      axios.get('/auth/getCustomerDetails/' + this.props.match.params.customerId).then((response) => {
        if (response.data.message[0].orders.length > 0) {
          if (response.data.message[0].orders[response.data.message[0].orders.length - 1].orderStatus === "inProgress") {
            localStorage.setItem('orderPlaced', true)
          }
          else if (response.data.message[0].orders[response.data.message[0].orders.length - 1].orderStatus === "delivered" || response.data.message[0].orders[response.data.message[0].orders.length - 1].orderStatus === "cancelled") {
            localStorage.removeItem('orderPlaced')
          }
        }
      })

    }
  };
  render() {
    if (localStorage.getItem('reloadPage') === "redirect") {
      localStorage.removeItem('reloadPage')
      window.location.reload()
    }
    return (
      <Provider store={store}>
        <NavBar customerId={this.state.customerId} name={this.state.name} home={false} location={this.state.location} restaurantName={this.state.restaurantName} />
        <Restaurant customerId={this.state.customerId} name={this.state.name} home={false} location={this.state.location} restaurantName={this.state.restaurantName} />
        <BottomNavBar customerId={this.state.customerId} name={this.state.name} />
      </Provider>
    );
  }
}

function mapStateToProps(state) {
  return {
    overview: state.components.overview,
    menuTab: state.components.menu,
    reviews: state.components.reviews
  };
}
Restaurant = connect(mapStateToProps)(Restaurant);
export default withRouter(RestaurantHome);
