import Reflux from "reflux";
import $ from "jquery";
import { NotessActions } from "../Actions.jsx"
import { 
    URL_API_NOTES_CREATE, 
    URL_API_NOTES_EDIT,
    URL_API_NOTES_DELETE, 
    URL_API_NOTES_GET,
    URL_API_NOTES_GET_CILDREN
} from "../const.js"

class NotesStore extends Reflux.Store {
    constructor() {
        super();
        this.state = {};
        this.listenToMany(NotessActions);
    }

    Get() {

    }

    GetChildren() {

    }

    Create() {

    }

    Edit() {

    }

    Delete() {

    }
}