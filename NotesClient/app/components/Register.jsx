import React from 'react';
import ReactDOM from 'react-dom';
import Reflux from "reflux";
import UserStore from "../stores/UsersStore.jsx"
import { Redirect, Link } from "react-router-dom";
import { UsersActions } from "../Actions.jsx";

export default class Register extends Reflux.Component {
    constructor(props) {
        super(props)
        this.state = { hiddenMessageError: true }
        this.store = UserStore;

        this.handleSubmit = this.handleSubmit.bind(this);
        UsersActions.LogIn.failed.listen(this.onRegisterFailed.bind(this));
    }
    onRegisterFailed() {
        this.setState({ hiddenMessageError: false });
    }

    handleSubmit(e) {
        e.preventDefault();
        UsersActions.Register(this.refs.login.value, this.refs.password.value);
    }

    render() {
        if(this.state.isAuth){
            return(<Redirect to="/"/>);
        }
        return (
            <div>
                <div hidden={this.state.hiddenMessageError} className="alert alert-warning">Ошибка регистрации</div>
                <form onSubmit={this.handleSubmit} className="form-horizontal">
                    <div className="form-group">
                        <label htmlFor="login" className="col-sm-2 control-label">Email:</label>
                        <div className="col-sm-10">
                            <input ref="login" type="text" id="login" />
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="password" className="col-sm-2 control-label">Пароль:</label>
                        <div className="col-sm-10">
                            <input ref="password" type="password" id="password" />
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="col-sm-offset-2 col-sm-10">
                            <input className="btn btn-default" type="submit" value="Регистрация" />
                            <Link to="/" className="btn btn-default">Авторизация</Link>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}