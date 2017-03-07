import React from "react";
import Devtools from "mobx-react-devtools"

import "../css/Finder.css";

import IconStore from "./IconStore";
import TreeView from "./TreeView";
import ListView from "./ListView";
import PathView from "./PathView";
import Dialog from "./Dialog";
import ContextMenu from "./ContextMenu";

export default class Finder extends React.Component {

  appState = null;

  componentWillMount() {
    this.appState = this.props.appState;
    this.appState.initStartUp();
  }

  click(e){
    //call the event handler function provided by appState
    if(this.appState.finder.onClick !== null)
      this.appState.finder.onClick(e);
  }
  rightClick(e){
    //call the event handler function provided by appState
    if(this.appState.finder.onContextMenu !== null)
      this.appState.finder.onContextMenu(e);
  }

  resizeTreeView(ev){
    let treeView = document.querySelector(".fi-treeview");
    document.body.onmousemove = (e) => {
      treeView.style.flexBasis = e.pageX + "px";
    }
    document.body.onmouseup = (e) => {
      document.body.onmousemove = null;
    }
  }

  render(){
    console.log(JSON.stringify(this.appState));

    return(
        <div onClick={this.click.bind(this)} onContextMenu={this.rightClick.bind(this)} className="fi-container">
          <Devtools />
          <div className="fi-header">
            {IconStore.brain}
          </div>
          <div className="fi-container-sub">
            <div className="fi-treeview">
              <div className="fi-buttonbox"></div>
              <TreeView appState={this.appState} />
            </div>
            <div className="fi-divider" onMouseDown={this.resizeTreeView}></div>
            <div className="fi-listview">
              <PathView appState={this.appState} />
              <ListView appState={this.appState} />
            </div>
          </div>
          <Dialog appState={this.appState} />
          <ContextMenu appState={this.appState} />
        </div>
    );

  }

}
