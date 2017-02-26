import React from "react";
import { observer } from "mobx-react";

import "../css/NTPathViewItem.css";

export default class NTPathViewItem extends React.Component {
  render(){
    return(
      <span className="pv-item">
        <span onClick={() => this.props.onSelectCategory(this.props.store)}>{this.props.store.name}</span>
        {this.props.children}
      </span>
    );
  }
}
