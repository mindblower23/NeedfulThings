import React from "react";
import { observer } from "mobx-react";

import "../css/ListView.css";

import ListViewThing from "./ListViewThing";
import ListViewCategory from "./ListViewCategory";

@observer
export default class ListView extends React.Component {

  lastCategoryId = null;
  itemCount = 0;

  constructor(){
    super();
    this.state = {selectedItem: 0};
  }

  componentWillMount(){
    /* set key handler to document */
    document.addEventListener("keydown", this.handleKeys);
  }

  componentWillUnmount(){
    /* remove key handler from document */
    document.removeEventListener("keydown", this.handleKeys);
  }

  setSelected(itemId){
    this.setState({selectedItem: itemId, clicked: false});
  }

  handleKeys = (e) => {
    let state = this.state;

    if (e.keyCode === 40)
      this.setState({selectedItem: (state.selectedItem < this.itemCount - 1) ? (state.selectedItem + 1) : 0});
    else if (e.keyCode === 38)
      this.setState({selectedItem: (state.selectedItem > 0) ? (state.selectedItem - 1) : this.itemCount - 1});
    else if (e.keyCode === 13){
      this.setState({clicked: true});
    }
  };

  render(){

    let rows = [];
    let items = [];
    let itemIdStart = 0;
    let clicked = this.state.clicked;
    this.state.clicked = false;
    console.log("clicked: " + clicked + " - " + this.state.clicked);

    let selectedCategory = this.props.appState.listViewStore.selectedCategory;

    if(selectedCategory.id !== this.lastCategoryId){
      this.state.selectedItem = 0;
      this.lastCategoryId = selectedCategory.id;
    }


    if (selectedCategory.children){
      rows = selectedCategory.children.map((item, i) => (
        <ListViewCategory
          key={item.id}
          itemId={i}
          selected={(this.state.selectedItem === i)}
          onSelect={() => this.setSelected(i)}
          clicked={(this.state.selectedItem === i) ? clicked : false}
          appState={this.props.appState}
          category={item} />
      ));
      itemIdStart = selectedCategory.children.length;
      this.itemCount = selectedCategory.children.length;
    }

    if(selectedCategory.things){
      items = selectedCategory.things.map((item, i) => (
        <ListViewThing
          key={item.id}
          itemId={itemIdStart + i}
          selected={(this.state.selectedItem === (itemIdStart + i))}
          onSelect={() => this.setSelected(itemIdStart + i)}
          appState={this.props.appState}
          thing={item} />
      ));
      this.itemCount += selectedCategory.things.length;
    }
    console.log("The item counts: " + this.itemCount);


    return(
      <div className="lv-container">
        {rows}
        {items}
      </div>
    );
  }
}
