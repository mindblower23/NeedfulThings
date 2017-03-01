import React from "react";



export default class Modalizer extends React.Component {


  render(){

    let display = this.props.isOpen ? "block" : "none";
    let style = {"display" : display};

    return(
      <div className="m-backdrop" style={style}>
        {this.props.children}
        </div>
      );
  }

}
