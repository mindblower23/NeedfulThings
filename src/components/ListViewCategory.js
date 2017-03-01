import React from "react";
import { observer } from "mobx-react";

import IconStore from "./IconStore";

@observer
export default class ListViewCategory extends React.Component {

  selectCategory(){
    this.props.store.selectCategory(this.props.category);
  }
  render(){

    return(
      <div className="lv-item lv-category" onDoubleClick={this.selectCategory.bind(this)}>
        <span className="lv-iconbox">
          {IconStore["category"]}
        </span>
        {this.props.category.name}
      </div>
    );
  }
}
