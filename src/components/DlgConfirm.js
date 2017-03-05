import React, { Component } from "react";

export default class DlgConfirm extends Component {

  keyDown(e){
    console.log("keyDown!!!!");
    if (e.keyCode === 13)
      this.props.onOk(e);
    else if (e.keyCode === 27)
      this.props.onCancel(e);
  }

  render(){
    return(

        <div className="dlg-confirm" tabIndex="0" autoFocus onKeyDown={this.keyDown.bind(this)}>
          <div className="dlg-confirm-text">
            {this.props.text}
          </div>
          <div className="dlg-confirm-button-box">
            <button type="button" onClick={this.props.onOk}>Ok</button>
            <div className="dlg-confirm-button-separator"></div>
            <button type="button" onClick={this.props.onCancel}>Cancel</button>
          </div>
        </div>

    );
  }
}
