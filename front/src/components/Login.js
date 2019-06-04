import React from 'react';
// import ReactDOM from 'react-dom';
// import { Link, BrowserRouter, Switch, Route } from 'react-router-dom';

class LogIn extends React.Component {

    render() {
        return (
        <form className="form-check">
            <div className="form-group">
                <label htmlFor="form-check-label" name="username">Username</label>
                <input type="text" className="form-control" name="username" />
            </div>
            <div className="form-group">
                <label htmlFor="form-check-label" name="password">Password</label>
                <input type="password" className="form-control" name="password" />
            </div>
        </form>
        )
    }
}

export default LogIn;
