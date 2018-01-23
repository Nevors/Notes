import React from 'react';
import ReactDOM from 'react-dom';

import ImageList from "./ImagesList.jsx";
import ImageUpload from "./ImageUpload.jsx";

export default class ImageGallery extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div>
                <ImageUpload />
                <ImageList />
            </div>
        );
    }
}