import Reflux from "reflux";
import $ from "jquery";

import UserStore from "../stores/UsersStore.jsx";

import { NotesActions } from "../Actions.jsx"
import {
    URL_API_NOTES_CREATE,
    URL_API_NOTES_EDIT,
    URL_API_NOTES_DELETE,
    URL_API_NOTES_GET,
    URL_API_NOTES_GET_CHILDREN
} from "../const.js"

class NotesStore extends Reflux.Store {
    constructor() {
        super();
        this.listenToMany(NotesActions);
    }

    Get(id) {
        $.ajax({
            url: URL_API_NOTES_GET + "/" + id,
            type: "GET",
            success: function (data, textStatus, jqXHR) {
                NotesActions.Get.completed(data, textStatus, jqXHR);
            }.bind(this),
            error: function (jqXHR, textStatus, errorThrown) {
                NotesActions.Get.failed(jqXHR, textStatus, errorThrown)
            }.bind(this)
        });
    }

    GetChildren(id) {
        console.log(id);
        $.ajax({
            url: URL_API_NOTES_GET_CHILDREN + "/" + id,
            type: "GET",
            success: function (data, textStatus, jqXHR) {
                NotesActions.GetChildren.completed(data, textStatus, jqXHR);
            }.bind(this),
            error: function (jqXHR, textStatus, errorThrown) {
                NotesActions.GetChildren.failed(jqXHR, textStatus, errorThrown)
            }.bind(this)
        });
    }

    Create(data) {
        $.ajax({
            url: URL_API_NOTES_CREATE,
            type: "POST",
            data: data,
            success: function (data, textStatus, jqXHR) {
                NotesActions.Create.completed(data, textStatus, jqXHR);
            }.bind(this),
            error: function (jqXHR, textStatus, errorThrown) {
                NotesActions.Create.failed(jqXHR, textStatus, errorThrown)
            }.bind(this)
        });
    }

    Edit(data) {
        $.ajax({
            url: URL_API_NOTES_EDIT,
            type: "POST",
            data: data,
            success: function (data, textStatus, jqXHR) {
                NotesActions.Edit.completed(data, textStatus, jqXHR);
            }.bind(this),
            error: function (jqXHR, textStatus, errorThrown) {
                NotesActions.Edit.failed(jqXHR, textStatus, errorThrown)
            }.bind(this)
        });
    }

    Delete(id) {
        $.ajax({
            url: URL_API_NOTES_DELETE,
            type: "POST",
            data: { id: id },
            success: function (data, textStatus, jqXHR) {
                NotesActions.Delete.completed(data, textStatus, jqXHR);
            }.bind(this),
            error: function (jqXHR, textStatus, errorThrown) {
                NotesActions.Delete.failed(jqXHR, textStatus, errorThrown)
            }.bind(this)
        });
    }
}
export default Reflux.initStore(NotesStore);