import Reflux from "reflux";
import $ from "jquery";
import { UsersActions } from "../Actions.jsx"
import { URL_GET_TOKEN, URL_API_REGISTER } from "../const.js"

class UsersStore extends Reflux.Store {
    constructor() {
        super();
        this.state = { isAuth: false };
        this.token = "";
        this.listenTo(UsersActions.LogIn, this.onLogIn);
        this.listenTo(UsersActions.LogOut, this.onLogOut);
        this.listenTo(UsersActions.Register, this.onRegister);
    }

    onLogIn(login, password) {
        $.ajax({
            url: URL_GET_TOKEN,
            type:"POST",
            data: "grant_type=password&username=" + login + "&password=" + password,
            success: function (data, textStatus, jqXHR) {
                this.token = data.token_type + " ";
                this.token += data.access_token;
                this.setState({ isAuth: true });
                UsersActions.LogIn.completed(/*data, textStatus, jqXHR*/);
            }.bind(this),
            error: function (jqXHR, textStatus, errorThrown) {
                UsersActions.LogIn.failed(jqXHR, textStatus, errorThrown)
                this.setState({ isAuth: false });
            }.bind(this)
        });
    }

    onLogOut() {
        this.setState({ isAuth: false });
        this.token = "";
        UsersActions.LogOut.completed();
    }

    onRegister(login, password) {
        $.ajax({
            url: URL_API_REGISTER,
            type:"POST",
            data: {
                Email: login,
                Password: password,
                ConfirmPassword: password
            },
            success: function (data, textStatus, jqXHR) {
                UsersActions.Register.completed(/*data, textStatus, jqXHR*/);
                onLogIn(login, password);
            }.bind(this),
            error: function (jqXHR, textStatus, errorThrown) {
                this.setState({ isAuth: false });
                UsersActions.LogIn.failed(jqXHR, textStatus, errorThrown)
            }.bind(this)
        });
    }
}

export default Reflux.initStore(UsersStore);