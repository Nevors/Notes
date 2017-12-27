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

        var core = {
            data: function (obj, cb) {
                //console.log(obj);
                var id = obj.parent == null ? 0 : obj.original.id;

                var r = NotesActions.GetChildren.completed.listen(
                    (data) => {
                        console.log(data);
                        if (data[0].ParentId == id || data[0].ParentId == null) {
                            this.completed(data, cb);
                            r();
                        }
                    }
                );

                NotesActions.GetChildren(id);
            }.bind(this)
        };

        this.state = { core: core, hiddenMessageError: true }
        this.failed = this.failed.bind(this);
        this.completed = this.completed.bind(this);
        this.refresh = this.refresh.bind(this);

        NotesActions.GetChildren.failed.listen(this.failed);
        NotesActions.GetChildren.completed.listen(this.failed);

        NotesActions.Create.completed.listen(this.refresh);
        NotesActions.Edit.completed.listen(this.refresh);
        NotesActions.Delete.completed.listen(this.refresh);
    }

    completed(data, callBack) {
        var arr = data.map((n) => {
            return {
                id: n.Id,
                text: n.Text,
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

    refresh(data){
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
