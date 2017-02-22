import React from "react";
import { observer } from "mobx-react";

import "../css/NTTreeView.css"

import NTTreeViewNode from "./NTTreeViewNode"

@observer
export default class NTTreeView extends React.Component {

  selectItem(itemId){
    this.props.onSelectItem(itemId);
  }

  render() {
    console.log("NTTreeView: RENDER!");
    //console.log("NTTreeView Store: " + JSON.stringify(this.props.store));

    let tree = this.props.store.map(item => (
      <NTTreeViewNode onSelectItem={this.props.onSelectItem} key={item.id} collapsed={false} store={item} />
    ));

    return (
      <div className="NTTreeView">
        {tree}
      </div>
    );
  }

}
