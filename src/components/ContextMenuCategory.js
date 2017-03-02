import React from "react"

export default class ContextMenuCategory extends React.Component {

  render(){

      return(
        <div className={this.props.className} style={this.props.style}>
          <div className="context-menu-item">Rename ...</div>
          <div className="context-menu-item">Add Category ...</div>
          <div className="context-menu-item">Delete Category ...</div>
        </div>
      );
  }

}
