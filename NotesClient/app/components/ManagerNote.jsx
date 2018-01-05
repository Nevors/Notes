import React from 'react';
import ReactDOM from 'react-dom';
import NoteInfo from "./NoteInfo.jsx";
import NoteSave from "./NoteSave.jsx";

export const STATES = {
    None:0 ,
    Save: 1,
    View: 2
}

export default class ManagerNote extends React.Component {
    constructor(props) {
        super(props)

        this.onClickEdit = this.onClickEdit.bind(this);
        this.onSaveNote = this.onSaveNote.bind(this);
        this.onDeleteNote = this.onDeleteNote.bind(this);
        this.onCancelSave = this.onCancelSave.bind(this);
    }

    componentWillReceiveProps(nextProps){
        this.setState({state: nextProps.startState ? nextProps.startState : STATES.View });
    }

    onClickEdit() {
        this.setState({ state: STATES.Save });
    }

    onSaveNote(note) {
        console.log("ManagerNote onSaveNote", note);
        this.setState({ state: STATES.View });
        if (this.props.onSaveNote) {
            this.props.onSaveNote(note);
        }
    }

    onDeleteNote() {
        console.log("ManagerNote onDeleteNote");
        this.setState({ state: STATES.None });
        if (this.props.onDeleteNote) {
            this.props.onDeleteNote();
        }
    }

    onCancelSave(){
        console.log("ManagerNote onCancelSave");
        this.setState({ state: STATES.View });
    }

    render() {
        if (this.props.note && this.state.state != STATES.None) {
            if (this.state.state == STATES.View) {
                return (
                    <div>
                        <button className="btn btn-default" onClick={this.onClickEdit}>
                            Редактировать
                        </button>
                        <NoteInfo note={this.props.note} />
                    </div>
                );
            }
            if (this.state.state == STATES.Save) {
                return (
                    <NoteSave 
                        note={this.props.note} 
                        onSave={this.onSaveNote} 
                        onDelete={this.onDeleteNote} 
                        onCancel={this.onCancelSave}/>
                );
            }
        }
        return (<div>Укажите заметку</div>);
    }
}