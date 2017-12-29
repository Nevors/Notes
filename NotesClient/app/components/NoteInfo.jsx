import React from 'react';
import ReactDOM from 'react-dom';
import { markdown } from 'markdown';
export default class NoteInfo extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        if (!this.props.note) {
            return (<div>Укажите заметку</div>);
        }

        var html = markdown.toHTML(this.props.note.Text);

        return (
            <div>
                <div>Заголовок</div>
                <div>{this.props.note.Title}</div>
                <div>Содержимое</div>
                <div dangerouslySetInnerHTML={{__html: html}} ></div>
            </div>
        );
    }
}