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
    width: 350,
    height: 450,
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
});

class TitlebarGridList extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            currentCity:  this.props.currentCity,
            restaurantsDetails: [],
            orderNowClicked: false,
            selectedRestaurant: '',
            selectedRestaurantLoc: '',
            customerId: this.props.customerId,
            name: this.props.name
        }
        this.tileData = [];
        this.classes = props.classes;
    }

    componentDidMount=()=>{
        var currentCity = '';
        if(this.state.currentCity == "Mysuru"){
            currentCity = "Mysore"
        }
        else{
            currentCity = this.state.currentCity
        }
        axios.get("http://localhost:1050/restaurant/getRestaurantsDetails/" + currentCity).then((response)=>{
            this.setState({ restaurantsDetails: response.data.message })
        }).catch((err)=>{
            if(err){
                this.setState({ errorMessage: err.response.data.message })
            }
            else{
                this.setState({ errorMessage: "No restarunts in current city!" })
            }
        })
    }

    render(){

        if(this.state.restaurantsDetails.length>0){
            this.tileData = [
                {
                img: require('../assets/' + this.state.restaurantsDetails[0].location + '/' + this.state.restaurantsDetails[0].restaurantName + '.jpg'),
                title: this.state.restaurantsDetails[0].restaurantName,
                loc: this.state.restaurantsDetails[0].location
            },
             {
                img: require('../assets/' + this.state.restaurantsDetails[1].location + '/' + this.state.restaurantsDetails[1].restaurantName + '.jpg'),
                title: this.state.restaurantsDetails[1].restaurantName,
                loc: this.state.restaurantsDetails[1].location
            },
             {
                img: require('../assets/' + this.state.restaurantsDetails[2].location + '/' + this.state.restaurantsDetails[2].restaurantName + '.jpg'),
                title: this.state.restaurantsDetails[2].restaurantName,
                loc: this.state.restaurantsDetails[2].location
            },
             {
                img: require('../assets/' + this.state.restaurantsDetails[3].location + '/' + this.state.restaurantsDetails[3].restaurantName + '.jpg'),
                title: this.state.restaurantsDetails[3].restaurantName,
                loc: this.state.restaurantsDetails[3].location
            },
            ]
            
        if (this.state.orderNowClicked) {
            this.setState({
                orderNowClicked: false
            })
            if (this.props.customerId) {
                return <Redirect to={'/restaurant/' + this.state.selectedRestaurantLoc + '/' + this.state.selectedRestaurant + '/' + this.state.customerId + '/' + this.state.name} push/>
            }
            return <Redirect to={'/restaurant/' + this.state.selectedRestaurantLoc + '/' + this.state.selectedRestaurant} push/>
        }
            return (
                <div className={this.classes.root} style={{paddingTop:"0px"}}>
                <GridList cellHeight={180} className={this.classes.gridList}  style={{paddingTop:"0px"}}>
                    <GridListTile key="Subheader" cols={2} style={{ height: 'auto',marginTop:"0px" }} >
                    </GridListTile>
                    {this.tileData.map(tile => (
                    <GridListTile key={tile.restaurantName}>
                        <img src={tile.img} alt={tile.title} />
                        <GridListTileBar
                        title={tile.title}
                        onClick={() => { this.setState({ orderNowClicked: true, selectedRestaurant: tile.title, selectedRestaurantLoc: tile.loc }) }}
                        style={{cursor: "pointer"}}
                        />
                    </GridListTile>
                    ))}
                </GridList>
                </div>
            );
        }
        return <ProgressBar mode="indeterminate" style={{ height: "6px",marginTop:"20px" }} />
    }
}

TitlebarGridList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TitlebarGridList);