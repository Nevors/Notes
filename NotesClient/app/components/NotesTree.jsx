import React from 'react';
import ReactDOM from 'react-dom';
import Reflux from "reflux";
//import NotesStore from "../stores/NotesStore.jsx"
import $ from 'jquery';
import { NotesActions } from "../Actions.jsx";
import  ReactTree  from "./ReactTree.jsx";

export default class NotesTree extends Reflux.Component {
    constructor(props) {
        super(props)

        var core = {
            data: function (obj, cb) {
                console.log(obj);
                var r = NotesActions.GetChildren.completed.listen((data)=>{
                    this.completed(data,cb);
                    r();
                });
                if (obj.parent == null) {
                    console.log(obj);
                    NotesActions.GetChildren(0);
                } else {
                    NotesActions.GetChildren(obj.original.id);
                }
            }.bind(this)
        };

        this.state = { core: core, hiddenMessageError: true }
        this.failed = this.failed.bind(this);
        this.completed = this.completed.bind(this);

        NotesActions.GetChildren.failed.listen(this.failed);
        NotesActions.GetChildren.completed.listen(this.failed);
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

    render() {
        return (
            <div>
                <div hidden={this.state.hiddenMessageError}>Ошибка загрузки</div>
                <ReactTree core={this.state.core} onChanged={this.props.onChanged} />
            </div>
        );
    }
};
