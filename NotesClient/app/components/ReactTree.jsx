import 'jstree/dist/themes/default/style.min.css';
import 'jstree/dist/themes/default-dark/style.min.css';

import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import 'jstree';

export default class ReactTree extends React.Component {
    componentDidMount() {
        this.tree = $(ReactDOM.findDOMNode(this))
            .on('changed.jstree', (e, data) => {
                if (this.props.onChanged) {
                    this.props.onChanged(data.selected.map(
                        item => {
                            return data.instance.get_node(item)
                        }
                    ));
                }
            })
            .on('close_node.jstree', (e, data) => {
                //console.log(data);
                data.node.state.loaded = false;
            })
            .jstree({
                core: this.props.core
            })
            .jstree();

        this.tree.hide_icons();
        this.refresh = this.refresh.bind(this);
    }

    refresh() {
        this.tree.refresh();
    }

    getJsTree(){
        return this.tree;
    }

    render() {
        return (<div></div>);
    }
}