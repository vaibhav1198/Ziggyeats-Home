import React from "react";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Fade from "@material-ui/core/Fade";
import classNames from "classnames";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import cyan from "@material-ui/core/colors/cyan";
// import ls from 'local-storage';
import { Redirect } from 'react-router-dom';



const styles = theme => ({
    margin: {
        margin: "10 25 10 25"
    },
    cssRoot: {
        color: theme.palette.getContrastText(cyan[500]),
        background: "linear-gradient(45deg, #B2EBF2 30%, #4DD0E1 90%)",
        "&:hover": {
            backgroundColor: cyan[700]
        }
    }
});

class FadeMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            anchorEl: null,
            name: "",
            customerId: localStorage.getItem("customerId"),
            // customerId: this.props.customerId,
            type: this.props.type,
            rtype: this.props.rtype,
            redirectProfile: false,
            redirectLogout: false
        };
        this.classes = this.props.classes
        //console.log(this.props)
    }
    componentDidMount = () => {
        var t = localStorage.getItem("name")
        let n = t.split(" ")
        if (n.length > 2) {
            let r = n[0] + " " + n[1]
            // console.log(r)
            this.setState({ name: r })
        }
        else {
            this.setState({ name: localStorage.getItem('name') })
        }
    }

    handleClick = event => {
        this.setState({ anchorEl: event.currentTarget });
    };


    handleClose = () => {
        this.setState({ anchorEl: null });
    };

    handleProfile = () => {
        this.setState({ redirectProfile: true, anchorEl: null });
    };

    handleLogout = () => {
        //console.log("logout")
        var currentCity = localStorage.getItem('currentCity');
        localStorage.clear()
        localStorage.setItem('currentCity', currentCity)
        this.setState({ redirectLogout: true, anchorEl: null });
    };

    render() {
        // console.log(this.state)
        const { anchorEl } = this.state;
        const open = Boolean(anchorEl);
        if (this.state.redirectLogout) {
            this.setState({ redirectLogout: false })
            return <Redirect to='/' />
        }
        if (this.state.redirectProfile) {
            this.setState({ redirectProfile: false })
            if (this.state.type === "true" && this.state.rtype === "false") {
                return (
                    <div>
                        <Redirect to={'/adminportal/' + this.props.customerId + '/' + this.props.name} />
                    </div>
                )
            }
            else if (this.state.rtype === "true" && this.state.type === "false") {
                return (
                    <div>
                        <Redirect to={'/restaurantOwner/' + this.props.customerId + '/' + this.props.name} />
                    </div>
                )
            }
            else {
                return (
                    <div>
                        <Redirect to={'/customerportal/' + this.props.customerId + '/' + this.props.name} />
                    </div>
                )
            }
        }
        return (
            <div>
                <Button
                    // variant="anchorEl ? 'simple-menu' : undefined"                    
                    aria-haspopup="true"
                    onClick={this.handleClick}
                    // onmou={this.handleLeave}
                    className={classNames(this.classes.margin, this.classes.cssRoot)}
                >
                    {this.state.name}
                </Button>
                <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={this.handleClose}
                    TransitionComponent={Fade}
                >
                    <MenuItem onClick={this.handleProfile}>Profile</MenuItem>
                    {/* <MenuItem onClick={this.handleProfile}>Profile</MenuItem> */}
                    <MenuItem onClick={this.handleLogout}>Logout</MenuItem>
                </Menu>
            </div>
        );
    }
}

FadeMenu.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(FadeMenu);
