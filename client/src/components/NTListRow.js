import React from "react";

export default class NTFinderRow extends React.Component{

  render(){

    console.log(Object.keys(this.props.store).length);
    
    const row = Object.keys(this.props.store).map(key => (
      <div key={this.props.store[key]} className="NTFinderRowItem">{this.props.store[key]}</div>
    ))

    console.log(row);

    return(
      <div className="NTFinderRow">
        {row}
      </div>
    );

  }

}
