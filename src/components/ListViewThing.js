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
    this.props.store.dialog.dialogTag = "ThingEditor";
    this.props.store.dialog.isOpen = true;
  }
  openMenu(e){
    e.preventDefault();

    this.setState({
      contextMenu : true,
      style : {
        left : e.pageX,
        top : e.pageY
      }
    });

    document.body.onmousedown = () => {
      this.setState({contextMenu : false});
    };
  }

  render(){

    let contextMenu = null;
    if(this.state.contextMenu)
      contextMenu = <div className="context-menu" style={this.state.style}></div>

    return(
      <div className="lv-item lv-thing" onContextMenu={this.openMenu.bind(this)} >
        {contextMenu}
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
