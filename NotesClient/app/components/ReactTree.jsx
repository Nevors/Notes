import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import 'jstree';

export default class ReactTree extends React.Component {
    componentDidMount() {
        $(ReactDOM.findDOMNode(this))
            .on('changed.jstree', (e, data) => {
                if (this.props.onChanged) {
                    this.props.onChanged(data.selected.map(
                        item => data.instance.get_node(item)
                    ));
                }
            })
            .on('close_node.jstree', (e, data) => {
                console.log(data);
                data.node.state.loaded = false;
            })
            .jstree({
                core: this.props.core
            });
    }

    render() {
        return (<div></div>);
    }
}