import Reflux from "reflux";

function CreateAction(name){
    var result =  {};
    result[name] =  { 
        asyncResult: true
    }
    return result;
}

export var UsersActions = Reflux.createActions(
    [
        CreateAction("LogIn"),
        CreateAction("LogOut"), 
        CreateAction("Register")
    ]
);

export var NotesActions = Reflux.createActions(
    [
        CreateAction("Get"), 
        CreateAction("GetChildren"), 
        CreateAction("Create"), 
        CreateAction("Edit"), 
        CreateAction("Delete")
    ]
);

export var ImagesActions = Reflux.createActions(
    [
        CreateAction("Get"), //?
        CreateAction("Delete"), 
        CreateAction("Create"),
        CreateAction("GetList")
    ]
);

export var AccessCardActions = Reflux.createActions(
    [
        CreateAction("GetList"), 
        CreateAction("Delete"), 
        CreateAction("Create")
    ]
);