import React from 'react';
import ReactDOM from 'react-dom';
import { NotesActions } from "../Actions.jsx"

export default class NoteSave extends React.Component {
    constructor(props) {
        super(props)

        this.onClickSave = this.onClickSave.bind(this);
        this.onClickDelete = this.onClickDelete.bind(this);
        this.onClickCancel = this.onClickCancel.bind(this);
        this.onSave = this.onSave.bind(this);
        this.onDelete = this.onDelete.bind(this);
        this.onFailed = this.onFailed.bind(this);

        this.state = { hiddenMessageError: true, isNotExist: this.isNoteExist(props.note) }
    }

    componentWillReceiveProps(nextProps) {
        console.log("Notesave componentWillReceiveProps",nextProps);
        this.refs.text.value = nextProps.note.Text;
        this.refs.title.value = nextProps.note.Title;
        this.state.isNotExist= this.isNoteExist(nextProps.note);
    }

    isNoteExist(note) {
        return note.Id == 0;
    }

    onClickSave() {
        this.props.note.Text = this.refs.text.value;
        this.props.note.Title = this.refs.title.value;
        if (this.props.note.Id == 0) {
            NotesActions.Create(this.props.note, this.onSave, this.onFailed);
        } else {
            NotesActions.Edit(this.props.note, this.onSave, this.onFailed);
        }
    }

    onClickDelete() {
        NotesActions.Delete(this.props.note.Id, this.onDelete, this.onFailed);
    }

    onClickCancel() {
        console.log("Notesave onClickCancel");
        if(this.props.onCancel){
            this.props.onCancel();
        }
    }

    onSave(note){
        console.log("Notesave onSave",note);
        this.setState({ hiddenMessageError: true });
        if(this.props.onSave){
            this.props.onSave(note);
        }
    }

    onDelete(){
        this.setState({ hiddenMessageError: true });
        if(this.props.onDelete){
            this.props.onDelete();
        }
    }

    onFailed() {
        console.log("FAIL");
        this.setState({ hiddenMessageError: false });
    }

    render() {
        console.log("Notesave render", this);
        if (!this.props.note) {
            return (<div>Укажите заметку</div>);
        }
        return (
            <div>
                <div>
                    <button className="btn btn-default" onClick={this.onClickSave}>
                        Сохранить
                    </button>
                    <span hidden={this.state.isNotExist}>
                        <button className="btn btn-default" onClick={this.onClickDelete}>
                            Удалить
                        </button>
                        <button className="btn btn-default" onClick={this.onClickCancel}>
                            Отмена
                        </button>
                    </span>
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