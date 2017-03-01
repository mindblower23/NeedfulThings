import React from "react";
import { observer } from "mobx-react";

export default class PathViewItem extends React.Component {

  selectCategory(){
    this.props.store.selectCategory(this.props.category);
  }

  render(){
    return(
      <span className="pv-item">
        <span onClick={this.selectCategory.bind(this)}>{this.props.category.name}</span>
        {this.props.children}
      </span>
    );
  }
}
