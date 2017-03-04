import React from "react";
import { observer } from "mobx-react";

import "../css/Dialog.css";

import ThingEditor from "./ThingEditor";

@observer
export default class Dialog extends React.Component{

  close(){
    this.props.appState.dialog.isOpen = false;
  }
  render(){
    let componet = null;

    switch (this.props.appState.dialog.dialogTag) {
      case "ThingEditor":
        componet = <ThingEditor appState={this.props.appState} />
        break;
      default:
        componet = null;
    }

    let display = this.props.appState.dialog.isOpen ? "block" : "none";
    let style = {"display" : display};

    return(
      <div className="m-backdrop" style={style} onClick={this.close.bind(this)} >
        {componet}
      </div>
    );
  }
}
