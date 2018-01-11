import React from 'react';
import ReactDOM from 'react-dom';
import Reflux from "reflux";

import UserStore from "../stores/UsersStore.jsx";
import NotesStore from "../stores/NotesStore.jsx";

import { NotesActions } from "../Actions.jsx";

import ManagerNote from "./ManagerNote.jsx";
import NavBar from "./NavBar.jsx";
import { STATES } from "./ManagerNote.jsx";
import Login from "./Login.jsx";
import NotesTree from "./NotesTree.jsx";

import { Redirect } from 'react-router';

import { Glyphicon, Panel, ButtonToolbar, Grid, Row, Col, Button, ButtonGroup, Alert, FormGroup, Clearfix, ControlLabel, FormControl } from "react-bootstrap";

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
        console.log("App onClickRefresh");
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
        var content;
        if (!this.state.isAuth) {
            content = (<Redirect to="/login" />);
        } else {
            content = (
                <Row className="row-flex">
                    <Col sm={5} xs={12} className="panel">
                        <ButtonToolbar>
                            <ButtonGroup>
                                <Button>
                                    <Glyphicon glyph="refresh" onClick={this.onClickRefresh} />
                                </Button>
                                <Button onClick={this.onClickNew}>
                                    Создать
                                        </Button>
                                <Button onClick={this.onClickNewRoot}>
                                    Создать в корне
                                        </Button>
                            </ButtonGroup>
                        </ButtonToolbar>
                        <NotesTree ref="treeNotes" onChanged={this.onChangedSelectNote} />
                    </Col>
                    <Col sm={7} xs={12} className="panel">
                        <ManagerNote
                            note={this.state.note}
                            startState={this.state.startStateManager}
                            onSaveNote={this.onSaveNote}
                            onDeleteNote={this.onDeleteNote}
                        />
                    </Col>
                </Row>
            );
        }
        return (
            <Grid>
                {content}
            </Grid>
        );

    }
}