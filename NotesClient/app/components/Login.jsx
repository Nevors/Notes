import React from 'react';
import ReactDOM from 'react-dom';
import Reflux from "reflux";
import UserStore from "../stores/UsersStore.jsx"
import { Redirect, Link } from "react-router-dom";
import { UsersActions } from "../Actions.jsx";
import { Grid, Row, Col, Button, ButtonGroup, Alert, FormGroup, Clearfix, ControlLabel, FormControl } from "react-bootstrap";

export default class Login extends Reflux.Component {
    constructor(props) {
        super(props)
        this.state = { isError: false }
        this.store = UserStore;

        this.onClickSubmit = this.onClickSubmit.bind(this);
        this.onLogInCompleted = this.onLogInCompleted.bind(this);
        this.onLogInFailed = this.onLogInFailed.bind(this);
    }
    onLogInFailed() {
        console.log("Login onLogInFailed");
        this.setState({ isError: true });
    }
    onLogInCompleted() {
        console.log("Login onLogInCompleted");
        this.props.history.push('/');
    }

    onClickSubmit() {
        UsersActions.LogIn(this.refs.login.value, this.refs.password.value, this.onLogInCompleted, this.onLogInFailed);
    }

    render() {
        if (this.state.isAuth) {
            return (<Redirect to="/" />);
        }
        return (
            <Grid>
                <Row>
                    <Col sm={6} smOffset={3} md={4} mdOffset={4} xs={8} xsOffset={2}>
                        {this.state.isError && <Alert bsStyle="warning">Логин или пароль неверны</Alert>}
                        <form >
                            <FormGroup>
                                <ControlLabel>Email:</ControlLabel>
                                <input ref="login" className="form-control" type="text" id="login" />
                            </FormGroup>
                            <FormGroup>
                                <ControlLabel htmlFor="password">Пароль:</ControlLabel>
                                <input ref="password" className="form-control" type="password" id="password" />
                            </FormGroup>
                            <FormGroup>
                                <Button bsStyle="primary" bsSize="lg" block onClick={this.onClickSubmit}>Вход</Button>
                            </FormGroup>
                        </form>
                    </Col>
                </Row>
            </Grid>
        );
    }
}