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

    if (this.props.store.selectedCategory.children){
      rows = this.props.store.selectedCategory.children.map(item => (
        <ListViewCategory key={item.id} store={item} onSelectCategory={this.props.onSelectCategory} />
      ));
    }

    if(this.props.store.selectedCategory.things){
      items = this.props.store.selectedCategory.things.map(item => (
        <ListViewThing key={item.id} store={item} />
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
