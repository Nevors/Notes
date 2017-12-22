import React from 'react';
import ReactDOM from 'react-dom';
import Reflux from "reflux";
import UserStore from "../stores/UsersStore.jsx"
import { Redirect, Link } from 'react-router-dom';

export default class App extends Reflux.Component {
    constructor(props) {
        super(props);

        this.state = { isAuth: false };
        this.store = UserStore;
    }

    render() {
        if(!this.state.isAuth){
            return (<Redirect to="/login"/>);
        }
        return (
            <div>132</div>
        );
    }

}