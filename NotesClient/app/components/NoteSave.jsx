import React from 'react';
import ReactDOM from 'react-dom';
import { NotesActions } from "../Actions.jsx"

export default class NoteSave extends React.Component {
    constructor(props) {
        super(props)

        this.onSave = this.onSave.bind(this);
        this.onDelete = this.onDelete.bind(this);
        this.onCancel = this.onCancel.bind(this);
        this.onCompleted = this.onCompleted.bind(this);
        this.onFailed = this.onFailed.bind(this);

        this.state = { hiddenMessageError: true }

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
        this.props.note.Title = this.refs.title.value;
        if (this.props.note.id == 0) {
            NotesActions.Create(this.props.note, this.onCompleted, this.onFailed);
        } else {
            NotesActions.Edit(this.props.note, this.onCompleted, this.onFailed);
        }
    }

    onDelete() {
        NotesActions.Delete(this.props.note.Id, this.onCompleted, this.onFailed);
    }

    onCancel() {
        this.onDone();
    }

    onCompleted() {
        this.setState({ hiddenMessageError: true });
        this.onDone();
    }

    onFailed() {
        console.log("FAIL");
        this.setState({ hiddenMessageError: false });
    }

    render() {
        if (!this.props.note) {
            return (<div>Укажите заметку</div>);
        }
        return (
            <div>
                <div>
                    <button className="btn btn-default" onClick={this.onSave}>
                        Сохранить
                    </button>
                    <button className="btn btn-default" onClick={this.onDelete}>
                        Удалить
                    </button>
                    <button className="btn btn-default" onClick={this.onCancel}>
                        Отмена
                    </button>
                </div>
                <div hidden={this.state.hiddenMessageError} className="alert alert-warning">Ошибка</div>
                <div>Заголовок</div>
                <input ref="title" type="text" defaultValue={this.props.note.Title} />
                <div>Содержимое</div>
                <textarea ref="text" defaultValue={this.props.note.Text} style={{ width: "100%", height: "100%" }} />
            </div>
        );
    }
}