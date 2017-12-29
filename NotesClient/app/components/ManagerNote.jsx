import React from 'react';
import ReactDOM from 'react-dom';
import NoteInfo from "./NoteInfo.jsx";
import NoteSave from "./NoteSave.jsx";

export const STATES = {
    Save: 1,
    View: 2
}

export default class ManagerNote extends React.Component {
    constructor(props) {
        super(props)
        this.state = { state: this.props.state ? this.props.state : STATES.View }

        this.onClickEdit = this.onClickEdit.bind(this);
        this.onEndSave = this.onEndSave.bind(this);
    }

    onClickEdit() {
        this.setState({ state: STATES.Save });
    }

    onEndSave(note) {
        console.log(note);
        this.setState({ state: STATES.View });
        if (this.props.onChangedNote) {
            this.props.onChangedNote(note);
        }
    }

    render() {
        if (this.props.note) {
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
                    <NoteSave note={this.props.note} onDone={this.onEndSave} />
                );
            }
        }
        return (<div>Укажите заметку</div>);
    }
}