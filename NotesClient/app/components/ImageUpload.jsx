import React from 'react';
import ReactDOM from 'react-dom';
import Reflux from "reflux";

import { ImagesActions } from "../Actions.jsx";

import { Redirect, Link } from "react-router-dom";

import { Grid, FormGroup, Alert, Button, Row, Col, ControlLabel } from 'react-bootstrap';

import { URL_API_IMAGES } from "../const.js";

export default class ImageUpload extends React.Component {
    constructor(props) {
        super(props)

        this.state = { isError: false,errorMessage:"Ошибка загрузки", isSuccess: false };

        this.onCompletedCreate = this.onCompletedCreate.bind(this);
        this.onFailedCreate = this.onFailedCreate.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        ImagesActions.GetList(() => { }, () => { });
    }

    handleSubmit(e) {
        console.log("ImageUpload handleSubmit",this);
        e.preventDefault();
        var formData = new FormData();
        for (var file of this.refs.file.files) {
            console.log(file);
            formData.append(file.name, file, file.name);
        }
        ImagesActions.Create(formData, this.onCompletedCreate, this.onFailedCreate)
    }

    onCompletedCreate() {
        this.setState({ isError: false, isSuccess: true });
    }

    onFailedCreate() {
        this.setState({ isError: true, isSuccess: false });
    }

    render() {
        return (
            <div>
                {this.state.isError && <Alert bsStyle="warning"> {this.state.errorMessage}</Alert>}
                {this.state.isSuccess && <Alert bsStyle="success"> Изображение загружено </Alert>}
                <form onSubmit={this.handleSubmit}>
                    <Row>
                        <Col xs={6}>
                            <ControlLabel htmlFor="file" className="btn btn-default btn-block">
                                Выбрать
                                <input ref="file" type="file" style={{ display: "none" }} id="file" onChange={console.log(this.refs)} multiple/>
                            </ControlLabel> 
                        </Col>
                        <Col xs={6}>
                            <FormGroup>
                                <input className="form-control" type="submit" value="Загрузить" />
                            </FormGroup>
                        </Col>
                    </Row>
                </form>
            </div>
        );
    }
}