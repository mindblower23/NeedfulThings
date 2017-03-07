import React from "react";

import "../css/ContextMenu.css";

export default class ContextMenuCategory extends React.Component {

  constructor(){
    super();
    this.state = {selectedItem: 0};
  }

  componentWillMount(){
    this.props.appState.shortCutPool.addHandler("ContextMenu", this.handleKeys, true);
  }

  componentWillUnmount(){
    this.props.appState.shortCutPool.removeHandler("ContextMenu");
  }

  handleKeys = (e) => {
    let state = this.state;

    if (e.keyCode === 40)
      this.setState({selectedItem: (state.selectedItem < this.props.items.length - 1) ? (state.selectedItem + 1) : 0});
    else if (e.keyCode === 38)
      this.setState({selectedItem: (state.selectedItem > 0) ? (state.selectedItem - 1) : this.props.items.length - 1});
    else if (e.keyCode === 13){
      this.props.appState.shortCutPool.removeHandler("ContextMenu");
      this.props.items[state.selectedItem].handler(e);
      //this.props.appState.contextMenu.contextMenuComponent = null;
    }
    else if (e.keyCode === 27)
      this.props.appState.contextMenu.contextMenuComponent = null;
  };

  render(){

    let items = this.props.items.map((item, i) => (
      <div
        key={i}
        onMouseOver={() => this.setState({selectedItem: i})}
        onClick={(e) => item.handler(e)}
        className={(this.state.selectedItem === i) ? "context-menu-item context-menu-item-sel" : "context-menu-item"}>
        {item.text}
      </div>
    ))

    return(
      <div className="context-menu" style={this.props.position}>
        {items}
      </div>

    );
  }

}
