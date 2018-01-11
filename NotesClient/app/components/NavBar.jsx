import React from 'react';
import ReactDOM from 'react-dom';
import Reflux from 'reflux';
import { Navbar, NavItem, Nav, NavDropdown, MenuItem } from "react-bootstrap";
import UserStore from "../stores/UsersStore.jsx"

import { LinkContainer } from 'react-router-bootstrap';
import { Link } from 'react-router-dom';

export default class NavBar extends Reflux.Component {
    constructor(props) {
        super(props)
        this.store = UserStore;
    }
    render() {
        return (
            <Navbar fluid collapseOnSelect>
                <Navbar.Header>
                    <Navbar.Brand>
                        <Link to="/">Главная</Link>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse>
                    <Nav>
                        {this.state.isAuth ?
                            <LinkContainer>
                                <NavItem>Выход</NavItem>
                            </LinkContainer>
                            :
                            <Nav>
                                <LinkContainer to="/login">
                                    <NavItem>Вход</NavItem>
                                </LinkContainer>
                                <LinkContainer to="/reg">
                                    <NavItem>Регистрация</NavItem>
                                </LinkContainer>
                            </Nav>
                        }
                        <NavDropdown eventKey={3} title="Dropdown" id="basic-nav-dropdown" >
                            <MenuItem eventKey={3.1}>Action</MenuItem>
                            <MenuItem eventKey={3.2}>Another action</MenuItem>
                            <MenuItem eventKey={3.3}>Something else here</MenuItem>
                            <MenuItem divider />
                            <MenuItem eventKey={3.4}>Separated link</MenuItem>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}