import React from "react"

export default class ContextMenuCategory extends React.Component {

  render(){

      return(
        <div className="context-menu" style={this.props.position}>
          <div onClick={(e) => this.props.onRename(e, this.props.connectedObject)} className="context-menu-item">Rename ...</div>
          <div onClick={(e) => this.props.onAdd(e, this.props.connectedObject)} className="context-menu-item">Add Category ...</div>
          <div onClick={(e) => this.props.onDelete(e, this.props.connectedObject)} className="context-menu-item">Delete Category ...</div>
        </div>
      );
  }

}
