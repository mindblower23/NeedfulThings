import React from "react";
import { observer } from "mobx-react";

import "../css/NTTreeView.css"

import NTTreeViewNode from "./NTTreeViewNode"

@observer
export default class NTTreeView extends React.Component {

  render() {
    console.log("NTTreeView: RENDER!");
    //console.log("NTTreeView Store: " + JSON.stringify(this.props.store));

    let tree = this.props.store.map(item => (
      <NTTreeViewNode onSelectCategory={this.props.onSelectCategory} key={item.id} collapsed={item.isCollapsed} store={item} />
    ));

    return (
      <div className="tv-container">
        {tree}
      </div>
    );
  }

}
