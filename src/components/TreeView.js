import React from "react";
import { observer } from "mobx-react";

import "../css/TreeView.css"

import TreeViewNode from "./TreeViewNode"

@observer
export default class TreeView extends React.Component {

  render() {
    console.log("TreeView: RENDER!");
    //console.log("TreeView Store: " + JSON.stringify(this.props.store));

    let tree = this.props.store.categories.map(item => (
      <TreeViewNode store={this.props.store} key={item.id} category={item} />
    ));

    return (
      <div className="tv-container">
        {tree}
      </div>
    );
  }

}
