import React from 'react';
import ReactDOM from 'react-dom';
import Reflux from "reflux";
//import NotesStore from "../stores/NotesStore.jsx"
import { NotesActions } from "../Actions.jsx";

export default class NotesTree extends Reflux.Component {
    constructor(props) {
        super(props)
        this.state = { core: {}, hiddenMessageError: true }
        this.success = this.success.bind(this);
        this.failed = this.failed.bind(this);
    }

    configAjax(url, cb) {
        return {
            url: url,
            success: function (data) {
                success(data, cb);
            },
            error: this.failed
        }
    }

    success(data, callBack) {
        var arr = data.map((n) => {
            return {
                id: n.Id,
                text: n.Text,
                state: {
                    loaded: !n.IsHaveChildren
                }
            };
        });
        cb.call(this, arr);
        this.setState({ hiddenMessageError: true });
    }

    failed() {
        this.setState({ hiddenMessageError: false });
    }

    render() {
        return (
            <div>

            </div>
        );
    }
};
