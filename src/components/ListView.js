import React from "react";
import { observer } from "mobx-react";

import "../css/ListView.css";

import ListViewThing from "./ListViewThing";
import ListViewCategory from "./ListViewCategory";

@observer
export default class ListView extends React.Component {

  render(){

    let rows = [];
    let items = [];

    let selectedCategory = this.props.store.listViewStore.selectedCategory;

    if (selectedCategory.children){
      rows = selectedCategory.children.map(item => (
        <ListViewCategory key={item.id} store={this.props.store} category={item} />
      ));
    }

    if(selectedCategory.things){
      items = selectedCategory.things.map(item => (
        <ListViewThing key={item.id} store={this.props.store} thing={item} />
      ));
    }

    return(
      <div className="lv-container">
        {rows}
        {items}
      </div>
    );
  }
}
