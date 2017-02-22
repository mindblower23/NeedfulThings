import React from "react";
import Devtools from "mobx-react-devtools"

import "../css/NTFinder.css";

import NTTreeView from "./NTTreeView"
import NTListView from "./NTListView"

import Killme from "./Killme";


export default class NTFinder extends React.Component {

  componentDidMount() {
    this.props.store.initStartUp();
  }

  selectItem(itemId){
    console.log("selectItem: " + itemId);
    this.props.store.getItems(itemId);
  }

  render(){

    return(
      <div className="NTFinderContainer">
        <Devtools />
        <NTTreeView onSelectItem={this.selectItem.bind(this)} store={this.props.store.categories} />
        <div className="NTFinderDivider"></div>
        <NTListView store={this.props.store.items} />
      </div>
    );

  }

}
