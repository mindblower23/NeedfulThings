import React from "react";
import Devtools from "mobx-react-devtools"

import "../css/Finder.css";

import IconStore from "./IconStore";
import TreeView from "./TreeView";
import ListView from "./ListView";
import PathView from "./PathView";
import Dialog from "./Dialog";
import ContextMenu from "./ContextMenu";

import Killme from "./Killme";


export default class Finder extends React.Component {

  componentDidMount() {
    this.props.store.initStartUp();
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

    return(
        <div className="fi-container">
          <Devtools />
          <div className="fi-header">
            {IconStore.brain}
          </div>
          <div className="fi-container-sub">
            <div className="fi-treeview">
              <div className="fi-buttonbox"></div>
              <TreeView store={this.props.store} />
            </div>
            <div className="fi-divider" onMouseDown={this.resizeTreeView}></div>
            <div className="fi-listview">
              <PathView store={this.props.store} />
              <ListView store={this.props.store} />
            </div>
          </div>
          <Dialog store={this.props.store.dialog} />
          <ContextMenu store={this.props.store} />
        </div>
    );

  }

}
