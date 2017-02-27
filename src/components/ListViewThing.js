import React from "react";
import { observer } from "mobx-react";

import IconStore from "./IconStore";

@observer
export default class ListViewThing extends React.Component {

  render(){

    return(
      <div className="lv-item lv-thing">
        <span className="lv-iconbox">
          {IconStore["thing"]}
        </span>
        <span className="lv-thing-title">
        {this.props.store.title}
        </span>
        <span className="lv-thing-break"></span>
        <span className="lv-iconbox">
        </span>
        <span className="lv-thing-text">
          {this.props.store.text}
        </span>
      </div>
    );
  }
}
