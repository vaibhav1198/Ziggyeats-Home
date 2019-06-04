import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import { ProgressBar } from "primereact/progressbar";
const styles = theme => ({
    root: {

        backgroundColor: theme.palette.background.paper,
    },
    gridList: {

        width: 313,
        height: 450,
    },
    icon: {
        color: 'rgba(255, 255, 255, 0.54)',
    },
});

class TitlebarGridList extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            currentCity: this.props.currentCity,
            restaurantsDetails: [],
            orderNowClicked: false,
            selectedRestaurant: '',
            selectedRestaurantLoc: '',
            customerId: this.props.customerId,
            name: this.props.name,
            locationError: ''
        }
        this.tileData = [];
        this.classes = props.classes;
    }

    componentDidMount = () => {
        var currentCity = '';
        if (this.state.currentCity === "Mysuru") {
            currentCity = "Mysore"
        }
        else if (this.state.currentCity === '') {
            this.setState({
                locationError: "Unable To fetch location at this moment!"
            })
        }
        else {
            currentCity = this.state.currentCity
        }
        axios.get("/restaurant/getRestaurantsByRatings/" + currentCity).then((response) => {
            this.setState({
                restaurantsDetails: response.data.message,
                errorMessage: ''
            })
        })
            .catch((err) => {
                if (err) {
                    this.setState({
                        errorMessage: err.response.data.message,
                        restaurantsDetails: []
                    })
                }
                else {
                    this.setState({
                        errorMessage: "Unable To fetch location at this moment!"
                    })
                }
            })
    }

    render() {

        if (this.state.restaurantsDetails.length > 0) {
            for (let i = 0; i < 4; i++) {
                var image
                if (this.state.restaurantsDetails[i].image === "uploaded") {
                    image = require("../assets/" + this.state.restaurantsDetails[i].location + "/" + this.state.restaurantsDetails[i].restaurantName + ".jpg")
                }
                else {
                    image = require("../assets/default-res-back.jpg")
                }
                var obj = {
                    img: image,
                    title: this.state.restaurantsDetails[i].restaurantName,
                    loc: this.state.restaurantsDetails[i].location
                }
                this.tileData.push(obj);
            }
            if (this.state.orderNowClicked) {
                this.setState({
                    orderNowClicked: false
                })
                if (this.props.customerId) {
                    return <Redirect to={'/restaurant/' + this.state.selectedRestaurantLoc + '/' + this.state.selectedRestaurant + '/' + this.state.customerId + '/' + this.state.name} push />
                }
                return <Redirect to={'/restaurant/' + this.state.selectedRestaurantLoc + '/' + this.state.selectedRestaurant} push />
            }
            return (
                <div className={this.classes.root} style={{ paddingLeft: "10px", paddingTop: "0px", paddingRight: "10px", width: 329 }}>
                    <GridList cellHeight={180} className={this.classes.gridList} style={{ paddingTop: "0px" }}>
                        <GridListTile key="Subheader" cols={2} style={{ height: 'auto', marginTop: "0px" }} >
                        </GridListTile>
                        {this.tileData.map(tile => (
                            <GridListTile key={tile.title}>
                                <img src={tile.img} alt={tile.title} />
                                <GridListTileBar title={tile.title} onClick={() => { this.setState({ orderNowClicked: true, selectedRestaurant: tile.title, selectedRestaurantLoc: tile.loc }) }} style={{ cursor: "pointer" }} />
                            </GridListTile>
                        ))}
                    </GridList>
                </div>
            );
        }
        if (this.state.currentCity !== '') {
            return <ProgressBar mode="indeterminate" style={{ height: "6px", marginTop: "20px" }} />
        }
        else {
            return <div className="text text-danger" style={{ marginTop: "20px" }} >{this.state.locationError}</div>
        }
    }
}

TitlebarGridList.propTypes = {
    classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(TitlebarGridList);