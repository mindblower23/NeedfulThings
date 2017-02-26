import React from "react";
import Devtools from "mobx-react-devtools"

import "../css/NTFinder.css";

import NTTreeView from "./NTTreeView"
import NTListView from "./NTListView"
import NTPathView from "./NTPathView";

import Killme from "./Killme";


export default class NTFinder extends React.Component {

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

  render(){

    return(
      <div className="fi-container">
        <Devtools />
        <div className="fi-treeview">
          <NTTreeView onSelectCategory={this.selectCategory.bind(this)} store={this.props.store.categories} />
        </div>
        <div className="fi-divider"></div>
        <div className="fi-listview">
          <NTPathView onSelectCategory={this.selectCategory.bind(this)} store={this.props.store.categoriesPath} />
          <NTListView onSelectCategory={this.selectCategory.bind(this)} store={this.props.store.listViewStore} />
        </div>
      </div>
    );

  }

}
