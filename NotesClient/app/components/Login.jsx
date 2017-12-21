import React from 'react';
import ReactDOM from 'react-dom';

export default class Login extends React.Component {
    constructor(props) {
        super(props)

    }

    handleSubmit(e) {

    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label htmlFor="login">Email:</label>
                <input ref="login" type="text" id="login" />
                <label htmlFor="password">Пароль:</label>
                <input ref="password" type="password" id="password" />
                <input type="submit" value="Вход" />
            </form>
        );
    }
}