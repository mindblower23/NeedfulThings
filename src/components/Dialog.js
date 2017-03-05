import React from "react";
import { observer } from "mobx-react";

import "../css/Dialog.css";

import ThingEditor from "./ThingEditor";

@observer
export default class Dialog extends React.Component{

  close(){
    if(!this.props.appState.dialog.buttonsOnly)
      this.props.appState.dialog.isVisible = false;
  }

  render(){

    let display = this.props.appState.dialog.isVisible ? "block" : "none";
    let style = {"display" : display};

    return(
      <div className="m-backdrop" style={style} onClick={this.close.bind(this)} >
        {this.props.appState.dialog.dialogComponent}
      </div>
    );
  }
}
