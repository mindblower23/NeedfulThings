import React from "react";
import Devtools from "mobx-react-devtools"

import "../css/Finder.css";

import IconStore from "./IconStore";
import TreeView from "./TreeView";
import ListView from "./ListView";
import PathView from "./PathView";

import Killme from "./Killme";


export default class Finder extends React.Component {

  constructor(){
    super();
  }

  componentDidMount() {
    this.props.store.initStartUp();
  }

  selectCategory(item){
    console.log("selectItem: " + item.id);
    this.props.store.selectCategory(item);
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
          {/*<Devtools />*/}
          <div className="fi-header">
            {IconStore.brain}
          </div>
          <div className="fi-container-sub">
            <div className="fi-treeview">
              <div className="fi-buttonbox"></div>
              <TreeView onSelectCategory={this.selectCategory.bind(this)} store={this.props.store.categories} />
            </div>
            <div className="fi-divider" onMouseDown={this.resizeTreeView}></div>
            <div className="fi-listview">
              <PathView onSelectCategory={this.selectCategory.bind(this)} store={this.props.store.categoriesPath} />
              <ListView onSelectCategory={this.selectCategory.bind(this)} store={this.props.store.listViewStore} />
            </div>
          </div>
        </div>

    );

  }

}
