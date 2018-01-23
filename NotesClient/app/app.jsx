import React from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';

import "bootstrap/dist/css/bootstrap.min.css";
//import "bootstrap/dist/css/bootstrap-theme.min.css";

import "../style/site.css";

import App from "./components/App.jsx";
import Login from "./components/Login.jsx";
import NavBar from "./components/NavBar.jsx";
import Register from "./components/Register.jsx";
import ImageGallery from "./components/ImageGallery.jsx";
import ModalListImages from "./components/ModalListImages";

import { Grid } from "react-bootstrap";

ReactDOM.render(

    <Router>
        <Grid>
            <NavBar />
            <Switch>
                <Route exact path="/" component={App} />
                <Route path="/login" component={Login} />
                <Route path="/reg" component={Register} />
                <Route path="/images" component={ImageGallery} />
                <Route path="/modal" component={ModalListImages} />
                <Route component={App} />
            </Switch>
        </Grid>
    </Router>,
    document.getElementById('app')
);
//import UserStore from "../stores/UsersStore.jsx"