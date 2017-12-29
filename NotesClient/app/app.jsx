import React from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';

import "bootstrap/dist/css/bootstrap.min.css";
import "../style/site.css";

import App from "./components/App.jsx";
import Login from "./components/Login.jsx";
import Register from "./components/Register.jsx";
ReactDOM.render(
    <Router>
        <Switch>
            <Route exact path="/" component={App} />
            <Route path="/reg" component={Register} />
            <Route component={App} />
        </Switch>
    </Router>,
    document.getElementById('app')
);
//import UserStore from "../stores/UsersStore.jsx"