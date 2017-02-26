import React from "react";
import { observer } from "mobx-react";

import NTListViewItem from "./NTListViewItem";


@observer
export default class NTListView extends React.Component {

  render(){

    console.log("NTListView: RENDER!!!!");

    let rows = [];
    let items = [];


    if (this.props.store.selectedCategory.children){
      rows = this.props.store.selectedCategory.children.map(item => (
        <NTListViewItem key={item.id} store={item} itemType="category" onSelectCategory={this.props.onSelectCategory} />
      ));
    }


    if(this.props.store.selectedCategory.things){
      items = this.props.store.selectedCategory.things.map(item => (
        <NTListViewItem key={item.id} store={item} itemType="thing" />
      ));
    }

    //console.log("NTListView: " + JSON.stringify(rows));

    return(
      <div className="NTListView">
        {rows}
        {items}
      </div>
    );
  }
}
