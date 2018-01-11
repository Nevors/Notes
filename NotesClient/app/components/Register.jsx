import React from 'react';
import ReactDOM from 'react-dom';
import Reflux from "reflux";
import UserStore from "../stores/UsersStore.jsx"
import { Redirect, Link } from "react-router-dom";
import { UsersActions } from "../Actions.jsx";

import { Grid, Row, Col, Button, ButtonGroup, Alert, FormGroup, Clearfix, ControlLabel, FormControl } from "react-bootstrap";

export default class Register extends Reflux.Component {
    constructor(props) {
        super(props)
        this.state = { isError: false }
        this.store = UserStore;

        this.onClickSubmit = this.onClickSubmit.bind(this);
        UsersActions.Register.failed.listen(this.onRegisterFailed.bind(this));
        UsersActions.Register.completed.listen(this.onRegisterCompleted.bind(this));
    }
    onRegisterFailed() {
        this.setState({ isError: true, error: "Ошибка регистрации" });
    }
    onRegisterCompleted() {
        this.props.history.push('/');
    }

    onClickSubmit(e) {
        console.log("Register onClickSubmit", e);

        if (this.refs.password.value != this.refs.confirmPassword.value) {
            this.setState({ isError: true, error: "Пароли не совпадают" });
        } else {
            UsersActions.Register(this.refs.login.value, this.refs.password.value);
        }
    }

    render() {
        if (this.state.isAuth) {
            return (<Redirect to="/" />);
        }
        return (
            <Grid>
                <Row>
                    <Col sm={6} smOffset={3} md={4} mdOffset={4} xs={8} xsOffset={2}>
                        {this.state.isError && <Alert bsStyle="warning">{this.state.error}</Alert>}
                        <form onSubmit={this.onClickSubmit}>
                            <FormGroup>
                                <ControlLabel>Email:</ControlLabel>
                                <input ref="login" className="form-control" type="text" />
                            </FormGroup>
                            <FormGroup>
                                <ControlLabel>Пароль:</ControlLabel>
                                <input ref="password" className="form-control" type="password" />
                            </FormGroup>
                            <FormGroup>
                                <ControlLabel>Повторите пароль:</ControlLabel>
                                <input ref="confirmPassword" className="form-control" type="password" />
                            </FormGroup>
                            <FormGroup>
                                <Button bsStyle="primary" bsSize="lg" block onClick={this.onClickSubmit}>Реситрация</Button>
                            </FormGroup>
                        </form>
                    </Col>
                </Row>
            </Grid>
        );
    }
}