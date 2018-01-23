import React from 'react';
import ReactDOM from 'react-dom';

import ImageList from "components/ImagesList.jsx";
import ImageUpload from "components/ImageUpload.jsx";
import { ImagesActions } from "Actions.jsx";

import { ButtonToolbar, Row, Col, Button, Image, DropdownButton, MenuItem, FormControl, FormGroup, Glyphicon } from 'react-bootstrap';

import { URL_API_IMAGES } from "const.js";

import css from "./styles.css";

export default class ImageManager extends React.Component {
    constructor(props) {
        super(props)
        this.onClickDelete = this.onClickDelete.bind(this);
        this.onClickCopy = this.onClickCopy.bind(this);
    }

    onClickDelete() {
        ImagesActions.Delete(this.props.imageId, () => { }, () => { });
    }
    onClickCopy() {
        var bufInputValue = this.inputUrl.value;

        var a = document.createElement("a");
        a.href = bufInputValue;
        a.target = "_blank";
        var img = document.createElement("img");
        img.src = bufInputValue;
        img.width = "200";

        a.appendChild(img);

        this.inputUrl.value = a.outerHTML;

        this.inputUrl.select();
        var result = document.execCommand('copy');
        this.inputUrl.value = bufInputValue;
        console.log("ImageManager onClickCopy", result);
    }

    render() {
        //console.log(`ImageManager render `);
        var url = URL_API_IMAGES + "/" + this.props.imageId;
        return (
            <div >
                <span className="center-block">
                    <a href={url} target="_blank">
                        <Image className={`center-block ${css.image}`} responsive src={url} />
                    </a>
                </span>
                <span className={`center-block ${css.panel}`}>
                    <Button className={css.btnDelete} bsStyle="danger" onClick={this.onClickDelete}>
                        <Glyphicon glyph="glyphicon glyphicon-trash" />
                    </Button>

                    <input ref={(e) => this.inputUrl = e} className={`form-control ${css.inputUrl}`} type="text" value={url} onChange={() => { }} />

                    <Button className={css.btnCopy} bsStyle="success" onClick={this.onClickCopy}>
                        <Glyphicon glyph="glyphicon glyphicon-copy" />
                    </Button>
                </span>
            </div>
        );
    }
}