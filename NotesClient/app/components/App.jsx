import React from 'react';
import ReactDOM from 'react-dom';
import Reflux from "reflux";

import UserStore from "../stores/UsersStore.jsx";
import NotesStore from "../stores/NotesStore.jsx";

import { NotesActions } from "../Actions.jsx";

import ManagerNote from "./ManagerNote.jsx";
import { STATES } from "./ManagerNote.jsx";
import Login from "./Login.jsx";
import NotesTree from "./NotesTree.jsx";


export default class App extends Reflux.Component {
    constructor(props) {
        super(props);
        this.stores = [UserStore];

        this.state = { note: null, startStateManager: null };

        this.newNote = this.newNote.bind(this);
        this.onGetNote = this.onGetNote.bind(this);
        this.onClickNew = this.onClickNew.bind(this);
        this.onDeleteNote = this.onDeleteNote.bind(this);
        this.onSaveNote = this.onSaveNote.bind(this);
        this.onClickRefresh = this.onClickRefresh.bind(this);
        this.onClickNewRoot = this.onClickNewRoot.bind(this);
        this.onChangedSelectNote = this.onChangedSelectNote.bind(this);

        this.lastSelectNote = {};
    }

    onChangedSelectNote(data) {
        if (data.length > 0) {
            const note = data[0];
            var tree = this.refs.treeNotes.getTree().getJsTree();
            this.lastSelectNote = note.original;
            NotesActions.Get(note.original.id, this.onGetNote);
        }
    }

    onDeleteNote() {
        console.log("App onDeleteNote", this.state.note);
        this.refs.treeNotes.getTree().getJsTree().delete_node(this.state.note.Id);
    }

    onSaveNote(note) {
        console.log("App onSaveNote", note, this.state.note);
        var tree = this.refs.treeNotes.getTree().getJsTree();
        if (!note) {
            var note = this.state.note;
            tree.rename_node(note.Id, note.Title);
            return;
        }

        var parentNode = tree.get_node(note.ParentId);

        if (parentNode) {
            tree.deselect_node(parentNode);
        } else {
            parentNode = null;
        }

        if (!parentNode || parentNode.state.loaded) {
            console.log("App onSaveNote", parentNode);
            tree.create_node(parentNode, { id: note.Id, text: note.Title });
            tree.select_node(note.Id);
        }

        this.setState({ note: note, startStateManager: STATES.View });
    }

    onGetNote(note) {
        console.log("App onGetNote", note);
        this.setState({ note: note, startStateManager: STATES.View });
    }

    onClickNew() {
        this.newNote(this.lastSelectNote.id);
    }

    onClickRefresh() {
        this.lastSelectNote = {};
        this.refs.treeNotes.getTree().refresh();
    }

    onClickNewRoot() {
        this.newNote();
    }

    newNote(parentId) {
        this.setState({ note: { Id: 0, Title: "", Text: "", ParentId: parentId }, startStateManager: STATES.Save });
    }

    render() {
        if (!this.state.isAuth) {
            return (<Login />);
        }
        return (
            <div className="wrapper container app">
                <div className="row row-flex">
                    <div className="col-sm-5 col-xs-12 panel">
                        <div >
                            <button className="btn btn-default" onClick={this.onClickRefresh}>
                                <span className="glyphicon glyphicon-refresh" />
                            </button>
                            <button className="btn btn-default" onClick={this.onClickNew}>
                                Создать
                            </button>
                            <button className="btn btn-default" onClick={this.onClickNewRoot}>
                                Создать в корне
                            </button>
                        </div>
                        <div className="row">
                            <div className="col-sm-12">
                                <NotesTree ref="treeNotes" onChanged={this.onChangedSelectNote} />
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-7 col-xs-12 panel">
                        <ManagerNote
                            note={this.state.note}
                            startState={this.state.startStateManager}
                            onSaveNote={this.onSaveNote}
                            onDeleteNote={this.onDeleteNote}
                        />
                    </div>
                </div>
            </div>
        );
    }
}