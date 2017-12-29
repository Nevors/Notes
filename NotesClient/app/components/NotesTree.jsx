import React from 'react';
import ReactDOM from 'react-dom';
import Reflux from "reflux";
//import NotesStore from "../stores/NotesStore.jsx"
import $ from 'jquery';
import { NotesActions } from "../Actions.jsx";
import ReactTree from "./ReactTree.jsx";

export default class NotesTree extends Reflux.Component {
    constructor(props) {
        super(props)

        this.failed = this.failed.bind(this);
        this.sendData = this.sendData.bind(this);
        this.refresh = this.refresh.bind(this);

        var core = {
            data: function (obj, cb) {
                //console.log(obj);
                var id = obj.parent == null ? 0 : obj.original.id;

                var completed = (data) => {
                    console.log(data);
                    this.sendData(data, cb);
                };

                NotesActions.GetChildren(id, completed, this.failed);
            }.bind(this)
        };

        this.state = { core: core, hiddenMessageError: true }

        NotesActions.Create.completed.listen(this.refresh);
        NotesActions.Edit.completed.listen(this.refresh);
        NotesActions.Delete.completed.listen(this.refresh);
    }

    sendData(data, callBack) {
        var arr = data.map((n) => {
            return {
                id: n.Id,
                text: n.Title,
                state: {
                    loaded: !n.IsHaveChildren
                }
            };
        });
        callBack.call(this, arr);

        this.setState({ hiddenMessageError: true });
    }

    failed() {
        this.setState({ hiddenMessageError: false });
    }

    getTree() {
        return this.refs.reactTree;
    }

    refresh(data) {
        this.refs.reactTree.refresh();
    }

    render() {
        return (
            <div>
                <div hidden={this.state.hiddenMessageError}>Ошибка загрузки</div>
                <ReactTree ref="reactTree" core={this.state.core} onChanged={this.props.onChanged} />
            </div>
        );
    }
};
