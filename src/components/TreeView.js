import React from "react";
import { observer } from "mobx-react";

import "../css/TreeView.css"

import TreeViewNode from "./TreeViewNode"

@observer
export default class TreeView extends React.Component {

  render() {
    let tree = this.props.appState.categories.map(item => (
      <TreeViewNode appState={this.props.appState} key={item.id} category={item} />
    ));

    return (
      <div className="tv-container">
        {tree}
      </div>
    );
  }

}
