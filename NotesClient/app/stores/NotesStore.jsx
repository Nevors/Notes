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

    Get(id,completed,failed) {
        $.ajax({
            url: URL_API_NOTES_GET + "/" + id,
            type: "GET",
            success: function (data, textStatus, jqXHR) {
                NotesActions.Get.completed(data, textStatus, jqXHR);
                completed(data, textStatus, jqXHR);
            }.bind(this),
            error: function (jqXHR, textStatus, errorThrown) {
                NotesActions.Get.failed(jqXHR, textStatus, errorThrown)
                failed(jqXHR, textStatus, errorThrown);
            }.bind(this)
        });
    }

    GetChildren(id,completed,failed) {
        console.log(id);
        $.ajax({
            url: URL_API_NOTES_GET_CHILDREN + "/" + id,
            type: "GET",
            success: function (data, textStatus, jqXHR) {
                NotesActions.GetChildren.completed(data, textStatus, jqXHR);
                completed(data, textStatus, jqXHR);
            }.bind(this),
            error: function (jqXHR, textStatus, errorThrown) {
                NotesActions.GetChildren.failed(zjqXHR, textStatus, errorThrown);
                failed(jqXHR, textStatus, errorThrown);
            }.bind(this)
        });
    }

    Create(data,completed,failed) {
        $.ajax({
            url: URL_API_NOTES_CREATE,
            type: "POST",
            data: data,
            success: function (data, textStatus, jqXHR) {
                NotesActions.Create.completed(data, textStatus, jqXHR);
                completed(data, textStatus, jqXHR);
            }.bind(this),
            error: function (jqXHR, textStatus, errorThrown) {
                NotesActions.Create.failed(jqXHR, textStatus, errorThrown);
                failed(jqXHR, textStatus, errorThrown);
            }.bind(this)
        });
    }

    Edit(data,completed,failed) {
        $.ajax({
            url: URL_API_NOTES_EDIT,
            type: "POST",
            data: data,
            success: function (data, textStatus, jqXHR) {
                NotesActions.Edit.completed(data, textStatus, jqXHR);
                completed(data, textStatus, jqXHR);
            }.bind(this),
            error: function (jqXHR, textStatus, errorThrown) {
                NotesActions.Edit.failed(jqXHR, textStatus, errorThrown);
                failed(jqXHR, textStatus, errorThrown);
            }.bind(this)
        });
    }

    Delete(id,completed,failed) {
        $.ajax({
            url: URL_API_NOTES_DELETE + "/" + id,
            type: "POST",
            success: function (data, textStatus, jqXHR) {
                NotesActions.Delete.completed(data, textStatus, jqXHR);
                completed(data, textStatus, jqXHR);
            }.bind(this),
            error: function (jqXHR, textStatus, errorThrown) {
                NotesActions.Delete.failed(jqXHR, textStatus, errorThrown);
                failed(jqXHR, textStatus, errorThrown);
            }.bind(this)
        });
    }
}
export default Reflux.initStore(NotesStore);