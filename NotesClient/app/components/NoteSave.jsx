import React from 'react';
import ReactDOM from 'react-dom';
import { NotesActions } from "../Actions.jsx"

export default class NoteSave extends React.Component {
    constructor(props) {
        super(props)

        this.onSave = this.onSave.bind(this);
        this.onDelete = this.onDelete.bind(this);
        this.onCancel = this.onCancel.bind(this);

        if (this.props.onDone) {
            this.onDone = function () {
                this.props.onDone(this.props.note);
            }.bind(this);
        } else {
            this.onDone = function () { }.bind(this);
        }
    }
    onSave() {
        this.props.note.Text = this.refs.text.value;
        if (this.props.note.id == 0) {
            NotesActions.Create(this.props.note);
        } else {
            NotesActions.Edit(this.props.note);
        }
        this.onDone();
    }

    onDelete() {
        NotesActions.Delete(this.props.note.Id);
        this.onDone();
    }

    onCancel() {
        this.onDone();
    }

    render() {
        if (!this.props.note) {
            return (<div>Укажите заметку</div>);
        }
        return (
            <div>
                <div>
                    <input type="button" value="Сохранить" onClick={this.onSave} />
                    <input type="button" value="Удалить" onClick={this.onDelete} />
                    <input type="button" value="Отмена" onClick={this.onCancel} />
                </div>
                <textarea ref="text" defaultValue={this.props.note.Text} style={{ width: "100%", height: "100%" }} />
            </div>
        );
    }
}