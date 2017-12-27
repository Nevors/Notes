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

        this.state = { selectNotes: [] };

        this.onGetNote = this.onGetNote.bind(this);
        this.onClickNew = this.onClickNew.bind(this);
        this.onChangedNote = this.onChangedNote.bind(this);
        this.onClickRefresh = this.onClickRefresh.bind(this);
        this.onClickDeselect = this.onClickDeselect.bind(this);
        this.onChangedSelectNote = this.onChangedSelectNote.bind(this);

        NotesActions.Get.completed.listen(this.onGetNote);

        this.lastSelectNote = {};
    }

    onChangedSelectNote(data) {
        this.setState({ selectNotes: [] });
        for (var note of data) {
            this.lastSelectNote = note.original;
            NotesActions.Get(note.original.id);
        }
    }

    onChangedNote(note) {
        console.log(note);
        // this.refs.tree.getTree().tree.refresh_node(note.ParentId);
        //this.refs.tree.getTree().refresh();
    }

    onGetNote(item) {
        this.state.selectNotes.push(item);
        this.forceUpdate();
    }

    onClickNew() {
        this.setState({ selectNotes: [{ id: 0, Text: "", ParentId: this.lastSelectNote.id }] })
    }

    onClickRefresh() {
        this.refs.tree.getTree().refresh();
    }
    onClickDeselect() {
        this.refs.tree.getTree().getJsTree().deselect_all();
    }

    render() {
        if (!this.state.isAuth) {
            return (<Login />);
        }
        return (
            <div>
                <input type="button" value="Создать" onClick={this.onClickNew} />
                <input type="button" value="Обновить" onClick={this.onClickRefresh} />
                <input type="button" value="Снять выделение" onClick={this.onClickDeselect} />
                <NotesTree ref="tree" onChanged={this.onChangedSelectNote} />
                <Notes notes={this.state.selectNotes} />
            </div>
        );
    }
}