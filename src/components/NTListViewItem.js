import React from "react";
import { observer } from "mobx-react";

import "../css/NTListViewItem.css";

import IconStore from "./IconStore";

@observer
export default class NTListViewItem extends React.Component {

  render(){

    return(
      <div className="NTListViewItem" onDoubleClick={() => {this.props.onCategorySelect(this.props.store)}}>
        <span className="lv-iconbox">
          {IconStore[this.props.itemType]}
        </span>
        {this.props.store.name}
      </div>
    );
  }
}
