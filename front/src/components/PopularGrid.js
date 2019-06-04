import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import Button from '@material-ui/core/Button';
import { Redirect } from 'react-router-dom';

const styles = theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
    },
    gridList: {
        flexWrap: 'nowrap',
        // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
        transform: 'translateZ(0)',
    },
    title: {
        color: "#DEDEDE",
        fontSize: "20px"
    },
    titleBar: {
        background:
            'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
    },
    button: {
        marginRight: "5px",
        backgroundColor: "green"
    }
});

class SingleLineGridList extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            orderNowClicked: false,
            selectedRestaurant: '',
            selectedRestaurantLoc: '',
            customerId: this.props.customerId,
            name: this.props.name
        }
        this.tileData = props.restaurants.map((restaurant) => {
            var image
            if (restaurant.image === "uploaded") {
                image = require("../assets/" + restaurant.location + "/" + restaurant.restaurantName + ".jpg")
            }
            else {
                image = require("../assets/default-res-back.jpg")
            }
            var obj = {
                img: image,
                title: restaurant.restaurantName,
                ratings: restaurant.ratings,
                loc: restaurant.location
            }
            return obj;
        })
        this.classes = props.classes;
    }

    render() {
        console.log(this.props)
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
            <div className={this.classes.root}>
                <GridList className={this.classes.gridList} cols={2.5}>
                    {this.tileData.map(tile => (
                        <GridListTile key={tile.img + tile.title + tile.customerId + "49"}>
                            <div className="imgContainer">
                                <img src={tile.img} alt={tile.title} />
                                <button className="btn" style={{ paddingTop: "0px", paddingBottom: "0px" }}><span className="text-muted" style={{ fontSize: "20px" }}><big><strong>{((tile.ratings) / 20).toFixed(1)}</strong></big></span></button>
                            </div>
                            <GridListTileBar title={tile.title} classes={{ root: this.classes.titleBar, title: this.classes.title, }} actionIcon={
                                    <Button variant="contained" color="primary" className={this.classes.button} onClick={() => { this.setState({ orderNowClicked: true, selectedRestaurant: tile.title, selectedRestaurantLoc: tile.loc }) }}>
                                        Order Now
                                          </Button>
                                } />
                        </GridListTile>
                    ))}
                </GridList>
            </div>
        );
    }
}
SingleLineGridList.propTypes = {
    classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(SingleLineGridList);