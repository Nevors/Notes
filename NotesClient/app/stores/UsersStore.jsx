import Reflux from "reflux";
import $ from "jquery";
import { UsersActions } from "../Actions.jsx"
import { URL_GET_TOKEN, URL_API_REGISTER } from "../const.js"

class UsersStore extends Reflux.Store {
    constructor() {
        super();
        this.state = { isAuth: false, login: "" };
        this.token = "";
        this.listenTo(UsersActions.LogIn, this.onLogIn);
        this.listenTo(UsersActions.LogOut, this.onLogOut);
        this.listenTo(UsersActions.Register, this.onRegister);
    }

    onLogIn(login, password, completed, failed) {
        $.ajax({
            url: URL_GET_TOKEN,
            type: "POST",
            data: "grant_type=password&username=" + login + "&password=" + password,
            success: function (data, textStatus, jqXHR) {
                this.token = data.token_type + " ";
                this.token += data.access_token;

                $.ajaxSetup({
                    headers: {
                        "Authorization": this.token
                    },
                });
                this.setState({ isAuth: true, login: login });
                UsersActions.LogIn.completed(/*data, textStatus, jqXHR*/);
                completed();
            }.bind(this),
            error: function (jqXHR, textStatus, errorThrown) {
                UsersActions.LogIn.failed(jqXHR, textStatus, errorThrown)
                failed(jqXHR, textStatus, errorThrown);
            }.bind(this)
        });
    }

    onLogOut() {
        $.ajaxSetup({
            headers: {},
        });

        this.setState({ isAuth: false, login: "" });
        this.token = "";
        UsersActions.LogOut.completed();
    }

    onRegister(login, password, completed, failed) {
        $.ajax({
            url: URL_API_REGISTER,
            type: "POST",
            data: {
                Email: login,
                Password: password,
                ConfirmPassword: password
            },
            success: function (data, textStatus, jqXHR) {
                UsersActions.Register.completed(/*data, textStatus, jqXHR*/);
                completed();
                onLogIn(login, password);
            }.bind(this),
            error: function (jqXHR, textStatus, errorThrown) {
                UsersActions.LogIn.failed(jqXHR, textStatus, errorThrown);
                failed(jqXHR, textStatus, errorThrown);
            }.bind(this)
        });
    }
}

export default Reflux.initStore(UsersStore);