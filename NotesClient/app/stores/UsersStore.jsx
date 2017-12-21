import Reflux from "reflux";
import { UsersActions } from "../Actions.jsx"

class UsersStore extends Reflux.Store {
    constructor() {
        super();
        this.state = { isAuth: false, isSuccess: false, token: "" };

        this.listenTo(UsersActions.LogIn, this.onLogIn);
        this.listenTo(UsersActions.LogOut, this.onLogOut);
        this.listenTo(UsersActions.Register, this.onRegister);
    }

    onLogIn(login, password) {

    }

    onLogOut() {

    }
    
    onRegister(login, password) {

    }
}