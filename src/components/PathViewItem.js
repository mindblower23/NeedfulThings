import React from "react";
import { observer } from "mobx-react";

export default class PathViewItem extends React.Component {
  render(){
    return(
      <span className="pv-item">
        <span onClick={() => this.props.onSelectCategory(this.props.store)}>{this.props.store.name}</span>
        {this.props.children}
      </span>
    );
  }
}
