import React from "react";
import { observer } from "mobx-react";

import IconStore from "./IconStore";

@observer
export default class ListViewThing extends React.Component {

  editThing(){
    console.log("editThing !!!!!!!");
    this.props.store.dialog.dialogTag = "ThingEditor";
    this.props.store.dialog.isOpen = true;
  }

  render(){

    return(
      <div className="lv-item lv-thing">
        <span className="lv-iconbox" onClick={this.editThing.bind(this)}>
          {IconStore["thing"]}
        </span>
        <span className="lv-thing-title">
        {this.props.thing.title}
        </span>
        <span className="lv-thing-break"></span>
        <span className="lv-iconbox">
        </span>
        <span className="lv-thing-text">
          {this.props.thing.text}
        </span>
      </div>
    );
  }
}
