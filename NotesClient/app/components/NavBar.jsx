import React from 'react';
import ReactDOM from 'react-dom';
import Reflux from 'reflux';
import { Navbar, NavItem, Nav, NavDropdown, MenuItem } from "react-bootstrap";
import UserStore from "../stores/UsersStore.jsx"
import { UsersActions } from "../Actions.jsx"

import { LinkContainer } from 'react-router-bootstrap';
import { Link } from 'react-router-dom';

export default class NavBar extends Reflux.Component {
    constructor(props) {
        super(props)
        this.store = UserStore;
        this.onSelect = this.onSelect.bind(this);
    }

    onSelect(eventKey, event) {
        switch (eventKey) {
            case 3.1:
                break;
            case 3.2:
                break;
            case 3.3:
            console.log("NavBar onSelect",eventKey);
                UsersActions.LogOut();
                break;
        }
    }

    render() {
        return (
            <Navbar fluid collapseOnSelect onSelect={this.onSelect}>
                <Navbar.Header>
                    <Navbar.Brand>
                        <Link to="/">Главная</Link>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse>
                    <Nav pullRight>
                        {!this.state.isAuth &&
                            <LinkContainer to="/login">
                                <NavItem>Вход</NavItem>
                            </LinkContainer>
                        }
                        {!this.state.isAuth &&
                            <LinkContainer to="/reg">
                                <NavItem>Регистрация</NavItem>
                            </LinkContainer>
                        }
                        {this.state.isAuth &&
                            <NavDropdown eventKey={3} title={this.state.login} id="nav-dropdown">
                                <MenuItem eventKey={3.1}>Профиль</MenuItem>
                                <LinkContainer to="/images">
                                    <MenuItem eventKey={3.2}>Галерея</MenuItem>
                                </LinkContainer>
                                <MenuItem divider />
                                <MenuItem eventKey={3.3}>Выход</MenuItem>
                            </NavDropdown>
                        }
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}