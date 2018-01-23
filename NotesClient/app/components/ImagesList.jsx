import React from 'react';
import ReactDOM from 'react-dom';
import Reflux from "reflux";

import ImagesStore from "stores/ImagesStore.jsx"
import UsersStore from "stores/UsersStore.jsx"

import ImageManager from "components/ImageManager";

import { ImagesActions } from "Actions.jsx";

import { Redirect, Link } from "react-router-dom";

import { Row, Thumbnail, Image, Col } from 'react-bootstrap';

export default class ImagesList extends Reflux.Component {
    constructor(props) {
        super(props)
        this.stores = [ImagesStore, UsersStore];
    }

    componentDidMount() {
        ImagesActions.GetList(() => { }, () => { });
    }

    render() {
        console.log("ImagesList render", this.state);
        if (!this.state.isAuth) {
            return (<Redirect to="/" />);
        }
        return (
            <Row>
                {this.state.list.length > 0 ?
                    this.state.list.map(
                        function (item) {
                            return (
                                <Col key={item} xs={12} sm={6} md={4}>
                                    <Thumbnail >
                                        <ImageManager imageId={item} />
                                    </Thumbnail>
                                </Col>
                            )
                        }
                    )
                    :
                    <div>Галерея пустая</div>
                }
            </Row>
        );
    }
}