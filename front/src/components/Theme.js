import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
// import { PanelMenu } from 'primereact/panelmenu';
// import { Provider, connect } from 'react-redux';
// import { createStore } from 'redux';
// import { withStyles } from '@material-ui/core/styles';
// import Avatar from '@material-ui/core/Avatar';
// import deepOrange from '@material-ui/core/colors/deepOrange';
// import deepPurple from '@material-ui/core/colors/deepPurple';
// import cyan from '@material-ui/core/colors/cyan';
// import Grid from '@material-ui/core/Grid';
// import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Fade from '@material-ui/core/Fade';
import PropTypes from 'prop-types';
// import classNames from 'classnames';
// import { withStyles, MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
// import purple from '@material-ui/core/colors/purple';
// import green from '@material-ui/core/colors/green';

  

class FadeMenu extends Component {
  state = {
    anchorEl: null,
  };

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);

    return (
      <div>
        <Button
          aria-owns={open ? 'fade-menu' : undefined}
          aria-haspopup="true"
          onClick={this.handleClick}
        >
          Open with fade transition
        </Button>
        <Menu
          id="fade-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={this.handleClose}
          TransitionComponent={Fade}
        >
          <MenuItem onClick={this.handleClose}>Profile</MenuItem>
          <MenuItem onClick={this.handleClose}>My account</MenuItem>
          <MenuItem onClick={this.handleClose}>Logout</MenuItem>
        </Menu>
      </div>
    );
  }
}

export default FadeMenu;
