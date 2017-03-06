import React, { Component } from "react";

export default class DlgConfirm extends Component {

  constructor(){
    super();
    this.state = {selectedButton: "Cancel"};
  }

  componentWillMount(){
    this.props.appState.shortCutPool.addHandler("DlgConfirm", this.handleKeys, true);
  }
  componentWillUnmount(){
    this.props.appState.shortCutPool.removeHandler("DlgConfirm");
  }

  handleKeys = (e) => {
    if(e.keyCode === 37 || e.keyCode === 39)
      this.setState({selectedButton: (this.state.selectedButton === "Ok") ? "Cancel" : "Ok"});
    else if (e.keyCode === 13){
      if(this.state.selectedButton === "Ok")
        this.props.onOk(e);
      else
        this.props.onCancel(e);
    }
    else if (e.keyCode === 27)
      this.props.onCancel(e);
  }

  render(){
    return(

      <div className="dlg-confirm" >
        <div className="dlg-confirm-text">
          {this.props.text}
        </div>
        <div className="dlg-confirm-button-box">
          <button
            type="button"
            className={(this.state.selectedButton === "Ok") ? "dlg-confirm-button dlg-confirm-button-sel" : "dlg-confirm-button"}
            onClick={this.props.onOk}>
            Ok
          </button>
          <div className="dlg-confirm-button-separator"></div>
          <button
            type="button"
            className={(this.state.selectedButton === "Cancel") ? "dlg-confirm-button dlg-confirm-button-sel" : "dlg-confirm-button"}
            onClick={this.props.onCancel}>
            Cancel
          </button>
        </div>
      </div>

    );
  }
}
