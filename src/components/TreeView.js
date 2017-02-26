import React from "react";
import { observer } from "mobx-react";

import "../css/TreeView.css"

import TreeViewNode from "./TreeViewNode"

@observer
export default class TreeView extends React.Component {

  render() {
    console.log("TreeView: RENDER!");
    //console.log("TreeView Store: " + JSON.stringify(this.props.store));

    let tree = this.props.store.map(item => (
      <TreeViewNode onSelectCategory={this.props.onSelectCategory} key={item.id} collapsed={item.isCollapsed} store={item} />
    ));

    return (
      <div className="tv-container">
        {tree}
      </div>
    );
  }

}
