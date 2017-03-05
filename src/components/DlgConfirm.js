import React, { Component } from "react";

export default class DlgConfirm extends Component {

  constructor(){
    super();
    this.state = {selectedButton: "Cancel"};
  }

  componentDidMount(){

    let dlgEnter = (e) => {
      if(e.keyCode === 37 || e.keyCode === 39)
        this.setState({selectedButton: (this.state.selectedButton === "Ok") ? "Cancel" : "Ok"});
      else if (e.keyCode === 13){
        document.removeEventListener("keydown", dlgEnter);
        if(this.state.selectedButton === "Ok")
          this.props.onOk(e);
        else
          this.props.onCancel(e);
      }
      else if (e.keyCode === 27){
        document.removeEventListener("keydown", dlgEnter);
        this.props.onCancel(e);
      }
    }

    document.addEventListener("keydown", dlgEnter);
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
