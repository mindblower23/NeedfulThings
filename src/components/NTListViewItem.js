import React from "react";
import { observer } from "mobx-react";

import "../css/NTListViewItem.css";

import IconStore from "./IconStore";

@observer
export default class NTListViewItem extends React.Component {

  render(){

    return(
      <div className="lv-item" onDoubleClick={() => {this.props.onSelectCategory(this.props.store)}}>
        <span className="lv-iconbox">
          {IconStore[this.props.itemType]}
        </span>
        {this.props.store.name}
      </div>
    );
  }
}
