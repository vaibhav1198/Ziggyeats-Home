import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';


const styles = theme => ({
    ava: {
        margin: 10,
        height: 180,
        width: 180,
        color: "white",
        background: 'linear-gradient(45deg, #00B8D4 30%, #18FFFF 90%)'
    }
})

class LetterAvatars extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: this.props.name,
        }
        this.classes = props.classes
    }
    render() {
        let n = this.state.name.split(' ')
        let r = ''
        if (n.length === 2) {
            for (let i = 0; i < 2; i++) {
                r = r + " " + n[i][0]
            }
        }
        else if (n.length > 2) {
            for (let i = 0; i < 3; i++) {
                r = r + " " + n[i][0]
            }
        }
        else {
            r = n[0][0]
        }
        return (
            <Grid container justify="center" alignItems="center">
                <Avatar className={this.classes.ava}>
                    <span style={{ fontSize: 60, textTransform: 'capitalize' }}>{r}</span>
                </Avatar>
            </Grid>
        );
    }
}

LetterAvatars.propTypes = {
    classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(LetterAvatars);
