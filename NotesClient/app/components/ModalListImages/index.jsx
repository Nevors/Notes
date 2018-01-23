import React from 'react';
import ReactDOM from 'react-dom';

import ImagesList from "components/ImagesList";

import { Modal, Button } from 'react-bootstrap';

export default class ModalListImages extends React.Component {
    constructor(props) {
        super(props);
        this.state = { show: props.show ? props.show : false };
        this.handleHide = this.handleHide.bind(this);
    }
    handleHide() {
        this.setState({ show: false })
        if(this.props.onHideModal){
            this.props.onHideModal();
        }
    }
    componentWillReceiveProps(nextProps) {
        console.log("ModalListImages componentWillReceiveProps", nextProps);
        this.state.show = nextProps.show;
    }

    render() {
        return (
            <div>
                <Modal
                    show={this.state.show}
                    onHide={this.handleHide}
                    container={this}
                    bsSize="lg"
                >
                    <Modal.Header closeButton>
                        <Modal.Title >
                            Галерея
						</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <ImagesList />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.handleHide}>Закрыть</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}