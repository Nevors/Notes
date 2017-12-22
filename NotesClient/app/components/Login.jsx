import React from 'react';
import ReactDOM from 'react-dom';
import Reflux from "reflux";
import UserStore from "../stores/UsersStore.jsx"
import { Redirect, Link } from "react-router-dom";
import { UsersActions } from "../Actions.jsx";

export default class Login extends Reflux.Component {
    constructor(props) {
        super(props)
        this.state = { hiddenMessageError: true }
        this.store = UserStore;

        this.handleSubmit = this.handleSubmit.bind(this);
        UsersActions.LogIn.failed.listen(this.onLogInFailed.bind(this));
    }
    onLogInFailed() {
        this.setState({ hiddenMessageError: false });
    }

    handleSubmit(e) {
        e.preventDefault();
        UsersActions.LogIn(this.refs.login.value, this.refs.password.value);
    }

    render() {
        if (this.state.isAuth) {
            return (<Redirect to="/" />);
        }
        return (
            <div>
                <div hidden={this.state.hiddenMessageError}>Логин или пароль неверны</div>
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor="login">Email:</label>
                    <input ref="login" type="text" id="login" />
                    <label htmlFor="password">Пароль:</label>
                    <input ref="password" type="password" id="password" />
                    <input type="submit" value="Вход" />
                </form>
            </div>
        );
    }
}