import React from "react"

export default class ContextMenuCategory extends React.Component {

  render(){

      return(
        <div className={this.props.className} style={this.props.style}>
          <div onClick={this.props.store.contextMenu.actions.onRename} className="context-menu-item">Rename ...</div>
          <div onClick={this.props.store.contextMenu.actions.onAdd} className="context-menu-item">Add Category ...</div>
          <div onClick={this.props.store.contextMenu.actions.onDelete} className="context-menu-item">Delete Category ...</div>
        </div>
      );
  }

}
