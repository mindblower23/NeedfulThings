import React from "react";
import { observer } from "mobx-react";

import "../css/NTPathViewItem.css";

export default class NTPathViewItem extends React.Component {
  render(){
    return(
      <span className="pv-item">
        {this.props.store.name}
        {this.props.children}
      </span>
    );
  }
}
