import React from "react";
import { observer } from "mobx-react";

import IconStore from "./IconStore";

@observer
export default class ListViewCategory extends React.Component {

  render(){

    return(
      <div className="lv-item" onDoubleClick={() => {this.props.onSelectCategory(this.props.store)}}>
        <span className="lv-iconbox">
          {IconStore["category"]}
        </span>
        {this.props.store.name}
      </div>
    );
  }
}
