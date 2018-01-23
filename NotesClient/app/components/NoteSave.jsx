import React from 'react';
import ReactDOM from 'react-dom';
import { NotesActions } from "../Actions.jsx";
import { Button, ButtonGroup, Alert, FormGroup, Clearfix, ControlLabel, FormControl } from "react-bootstrap";

import ModalListImages from "components/ModalListImages";
export default class NoteSave extends React.Component {
    constructor(props) {
        super(props)

        this.onClickSave = this.onClickSave.bind(this);
        this.onClickDelete = this.onClickDelete.bind(this);
        this.onClickCancel = this.onClickCancel.bind(this);
        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeText = this.onChangeText.bind(this);
        this.onHideModal = this.onHideModal.bind(this);
        this.onClickShowGallery = this.onClickShowGallery.bind(this);

        this.onSave = this.onSave.bind(this);
        this.onDelete = this.onDelete.bind(this);
        this.onFailed = this.onFailed.bind(this);

        this.state = {
            isError: false,
            isExist: this.isExist(props.note),
            show: false
        }
    }

    componentWillReceiveProps(nextProps) {
        console.log("Notesave componentWillReceiveProps", nextProps);
        this.state.isExist = this.isExist(nextProps.note);
    }

    isExist(note) {
        return note.Id != 0;
    }

    onClickSave() {
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
        if (this.props.onCancel) {
            this.props.onCancel();
        }
    }
    onClickShowGallery() {
        this.setState({ show: true });
    }

    onHideModal(){
        this.state.show = false;
    }

    onSave(note) {
        console.log("Notesave onSave", note);
        this.setState({ isError: false });
        if (this.props.onSave) {
            this.props.onSave(note);
        }
    }

    onDelete() {
        this.setState({ isError: false });
        if (this.props.onDelete) {
            this.props.onDelete();
        }
    }

    onFailed() {
        console.log("FAIL");
        this.setState({ isError: true });
    }

    onChangeTitle(e) {
        this.props.note.Title = e.target.value;
        this.forceUpdate();
    }
    onChangeText(e) {
        this.props.note.Text = e.target.value;
        this.forceUpdate();
    }


    render() {
        console.log("Notesave render", this);
        if (!this.props.note) {
            return (<div>Укажите заметку</div>);
        }
        return (
            <div>
                <ModalListImages show={this.state.show} onHideModal={this.onHideModal}/>
                {this.state.isError && <Alert bsStyle="warning">Ошибка</Alert>}
                <ButtonGroup>
                    <Button bsStyle="default" onClick={this.onClickSave}>
                        Сохранить
                        </Button>
                    {this.state.isExist &&
                        <ButtonGroup>
                            <Button bsStyle="default" onClick={this.onClickDelete}>
                                Удалить
                            </Button>
                            <Button bsStyle="default" onClick={this.onClickCancel}>
                                Отмена
                            </Button>
                        </ButtonGroup>
                    }
                </ButtonGroup>
                <form>
                    <FormGroup>
                        <ControlLabel>Заголовок</ControlLabel>
                        <FormControl type="text" value={this.props.note.Title} onChange={this.onChangeTitle} />
                    </FormGroup>
                    <FormGroup>
                        <ControlLabel>Содержимое</ControlLabel>
                        <Clearfix />
                        <FormControl componentClass="textarea" value={this.props.note.Text} onChange={this.onChangeText} style={{ resize: "vertical" }} />
                        {this.state.isExist &&
                            <Button bsStyle="default" onClick={this.onClickShowGallery}>
                                Открыть галерею
                            </Button>
                        }
                    </FormGroup>
                </form>
            </div>
        );
    }
}