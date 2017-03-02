import React from "react"

export default class ContextMenuCategory extends React.Component {

  render(){

    console.log("NodeContext: " + this.props.category.id);

    return(
      <div className="tv-node-context" style={this.props.contextMenuPosition}>
        <div className="tv-node-context-item">Rename ...</div>
        <div className="tv-node-context-item">Add Category ...</div>
        <div className="tv-node-context-item">Delete Category ...</div>
      </div>
    );

  }

}
