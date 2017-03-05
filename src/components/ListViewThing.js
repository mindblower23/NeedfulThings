import React from "react";
import { observer } from "mobx-react";

import IconStore from "./IconStore";

@observer
export default class ListViewThing extends React.Component {

  constructor(){
    super();
    this.state = {contextMenu : false, style : {}};
  }

  editThing(){
    console.log("editThing !!!!!!!");
    this.props.appState.dialog.dialogTag = "ThingEditor";
    this.props.appState.dialog.isOpen = true;
  }

  render(){

    return(
      <div onMouseOver={this.props.onSelect} className={this.props.selected ? "lv-item lv-thing lv-item-selected" : "lv-item lv-thing"}>
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
