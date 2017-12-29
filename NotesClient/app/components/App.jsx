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
        this.onClickNewRoot = this.onClickNewRoot.bind(this);
        this.onChangedSelectNote = this.onChangedSelectNote.bind(this);

        this.lastSelectNote = {};
    }

    onChangedSelectNote(data) {
        this.setState({ selectNotes: [] });
        for (var note of data) {
            this.lastSelectNote = note.original;
            NotesActions.Get(note.original.id, this.onGetNote);
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
    onClickNewRoot() {
        this.setState({ selectNotes: [{ id: 0, Text: "", ParentId: 0 }] });
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
                                <NotesTree ref="tree" onChanged={this.onChangedSelectNote} />
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-7 col-xs-12 panel">
                        <Notes notes={this.state.selectNotes} />
                    </div>
                </div>
            </div>
        );
    }
}