import React from "react";
import { observer } from "mobx-react";

import "../css/Dialog.css";

@observer
export default class Dialog extends React.Component{

  close(){
    if(!this.props.appState.dialog.buttonsOnly)
      this.props.appState.dialog.dialogComponent = null;
  }

  render(){

    if (this.props.appState.dialog.dialogComponent !== null){

      let DlgComponent = React.cloneElement(
        this.props.appState.dialog.dialogComponent,
        {appState: this.props.appState}
      )

      return(
        <div className="m-backdrop" onClick={this.close.bind(this)} >
          {DlgComponent}
        </div>
      );
    } else {
      return null;
    }
  }
}
