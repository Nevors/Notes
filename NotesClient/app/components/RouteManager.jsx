import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';

import App from "./App.jsx";
import Login from "./Login.jsx";
import NavBar from "./NavBar.jsx";
import Register from "./Register.jsx";


export default class RouteManager extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {

        return (
            <div>
                <NavBar />
                <Switch>
                    <Route exact path="/" component={App} />
                    <Route path="/login" component={Login} />
                    <Route path="/reg" component={Register} />
                    <Route component={App} />
                </Switch>
            </div>
        );
    }
}