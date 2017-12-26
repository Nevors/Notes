import React from 'react';
import ReactDOM from 'react-dom';
import NoteInfo from "./NoteInfo.jsx";

export default class Notes extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        if (this.props.notes.length > 0) {
            return (
                <div>
                    {
                        this.props.notes.map(function (item) {
                            return <NoteInfo key={item.Id} note={item} />
                        })
                    }
                </div>
            );
        }
        return (<div>Выберите заметку</div>);
    }
}