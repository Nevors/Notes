import Reflux from "reflux";
import $ from "jquery";

import { ImagesActions } from "../Actions.jsx";
import {
    URL_API_IMAGES,
    URL_API_IMAGES_LIST
} from "../const.js";

class ImagesStore extends Reflux.Store {
    constructor() {
        super();
        this.state = { list: [] };
        this.listenToMany(ImagesActions);
    }

    Get(id, completed, failed) {

    }

    GetList(completed, failed) {
        $.ajax({
            url: URL_API_IMAGES_LIST,
            type: "GET",
            success: function (data, textStatus, jqXHR) {
                console.log("ImagesStore GetList",data);
                this.setState({ list: data });
                ImagesActions.Create.completed(data, textStatus, jqXHR);
                if (completed) {
                    completed(data, textStatus, jqXHR);
                }
            }.bind(this),
            error: function (jqXHR, textStatus, errorThrown) {
                ImagesActions.Create.failed(jqXHR, textStatus, errorThrown);
                failed(jqXHR, textStatus, errorThrown);
            }.bind(this)
        });
    }

    Create(data, completed, failed) {
        console.log(data);
        $.ajax({
            url: URL_API_IMAGES,
            type: "POST",
            contentType: false,
            processData: false,
            data: data,
            success: function (data, textStatus, jqXHR) {
                var newList = this.state.list;
                for(var item of data){
                    newList.push(item);
                }
                this.setState({ list: newList });
                ImagesActions.Create.completed(data, textStatus, jqXHR);
                completed(data, textStatus, jqXHR);
            }.bind(this),
            error: function (jqXHR, textStatus, errorThrown) {
                ImagesActions.Create.failed(jqXHR, textStatus, errorThrown);
                failed(jqXHR, textStatus, errorThrown);
            }.bind(this)
        });
    }

    Delete(id, completed, failed) {
        $.ajax({
            url: URL_API_IMAGES + "/" + id,
            type: "DELETE",
            success: function (data, textStatus, jqXHR) {
                var newList = this.state.list.filter(value => value != id);
                this.setState({ list: newList });
                ImagesActions.Delete.completed(data, textStatus, jqXHR);
                completed(data, textStatus, jqXHR);
            }.bind(this),
            error: function (jqXHR, textStatus, errorThrown) {
                ImagesActions.Delete.failed(jqXHR, textStatus, errorThrown);
                failed(jqXHR, textStatus, errorThrown);
            }.bind(this)
        });
    }
}
export default Reflux.initStore(ImagesStore);