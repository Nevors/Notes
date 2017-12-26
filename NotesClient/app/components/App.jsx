import React from 'react';
import ReactDOM from 'react-dom';
import Reflux from "reflux";

import UserStore from "../stores/UsersStore.jsx";
import NotesStore from "../stores/NotesStore.jsx";

import { NotesActions } from "../Actions.jsx";

import Notes from "./Notes.jsx";
import Login from "./Login.jsx";
import NotesTree from "./NotesTree.jsx";

export default class App extends Reflux.Component {
    constructor(props) {
        super(props);
        this.stores = [UserStore];

        this.state = {selectNotes:[]};

        this.onGetNote = this.onGetNote.bind(this);
        this.onChangedNote = this.onChangedNote.bind(this);

        NotesActions.Get.completed.listen(this.onGetNote);
    }

    onChangedNote(data) {
        console.log(data);
        for(var note of data){
            NotesActions.Get(note.original.id);
        }
        this.setState({selectNotes:[]});
    }

    onGetNote(item){
        this.state.selectNotes.push(item);
        this.forceUpdate();
    }

    render() {
        if (!this.state.isAuth) {
            return (<Login />);
        }
        return (
            <div>
                <NotesTree onChanged={this.onChangedNote} />
                <Notes notes={this.state.selectNotes} />
            </div>
        );
    }
}