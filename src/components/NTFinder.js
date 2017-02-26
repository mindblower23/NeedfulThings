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

  selectItem(item){
    console.log("selectItem: " + item.id);
    this.props.store.selectCategory(item);
  }

  render(){

    return(
      <div className="NTFinderContainer">
        <Devtools />
        <NTPathView store={this.props.store.categoriesPath} />
        <NTTreeView onSelectItem={this.selectItem.bind(this)} store={this.props.store.categories} />
        <div className="NTFinderDivider"></div>
        <NTListView onCategorySelect={this.selectItem.bind(this)} store={this.props.store.listViewStore} />
      </div>
    );

  }

}
