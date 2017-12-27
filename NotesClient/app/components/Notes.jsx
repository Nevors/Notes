import React from 'react';
import ReactDOM from 'react-dom';
import ManagerNote from "./ManagerNote.jsx";

export default class Notes extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        if (this.props.notes.length == 0) {
            return (<div>Выберите заметку</div>);
        }
        var k = 0;
        return (
            <div>
                {
                    this.props.notes.map(
                        function (item) {
                            return <ManagerNote key={k++} note={item} onChangedNote={this.props.onChangedNote}/>
                        }.bind(this)
                    )
                }
            </div>
        );
    }
}