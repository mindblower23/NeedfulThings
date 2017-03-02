import React from "react";
import { observer } from "mobx-react";

import ContextMenuCategory from "./ContextMenuCategory";

import IconStore from "./IconStore";

@observer
export default class ListViewCategory extends React.Component {

  constructor(){
    super();
    this.state = {
      contextMenu : false,
      contextMenuPosition : {}
    };
  }

  selectCategory(){
    this.props.store.selectCategory(this.props.category);
  }

  openContextMenu(e){
    e.preventDefault();

    let contextMenu = this.props.store.contextMenu;

    contextMenu.position = {left : e.pageX, top : e.pageY};
    contextMenu.contextMenuItemsComponent = "ContextMenuCategory";
    contextMenu.connectedObject = this.props.category;
    contextMenu.isVisible = true;

  }

  render(){

    return(
      <div className="lv-item lv-category" onDoubleClick={this.selectCategory.bind(this)} onContextMenu={this.openContextMenu.bind(this)}>
        <span className="lv-iconbox">
          {IconStore["category"]}
        </span>
        {this.props.category.name}
      </div>
    );
  }
}
