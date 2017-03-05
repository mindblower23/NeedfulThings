import React from "react";
import { observer } from "mobx-react";

import "../css/Dialog.css";

import ThingEditor from "./ThingEditor";

@observer
export default class Dialog extends React.Component{

  close(){
    if(!this.props.appState.dialog.buttonsOnly)
      this.props.appState.dialog.dialogComponent = null;
  }

  render(){

    if (this.props.appState.dialog.dialogComponent !== null){
      return(
        <div className="m-backdrop" onClick={this.close.bind(this)} >
          {this.props.appState.dialog.dialogComponent}
        </div>
      );
    } else {
      return null;
    }
  }
}
