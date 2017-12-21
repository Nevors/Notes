import React from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';

import App from "./components/App.jsx"
import Login from "./components/Login.jsx"

ReactDOM.render(
    <Router>
        <Switch>
            <Route exact path="/" component={App} />
            <Route path="/login" component={Login} />
            <Route component={App} />
        </Switch>
    </Router>,
    document.getElementById('app')
);