import Reflux from "reflux";

export var UsersActions = Reflux.createActions(["LogIn", "LogOut", "Register"]);
export var NotesActions = Reflux.createActions(["Get", "GetChildren", "Create", "Edit", "Delete"]);
export var ImagesActions = Reflux.createActions(["Get", "Delete", "Create"]);