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

    this.setState({
      contextMenu : true,
      contextMenuPosition : {
        left : e.pageX,
        top : e.pageY
      }
    });

    document.body.onmousedown = () => {
      this.setState({contextMenu : false});
      document.body.onmousedown = null;
    };
  }

  render(){
    let contextMenu = null;
    if(this.state.contextMenu)
      contextMenu = <ContextMenuCategory contextMenuPosition={this.state.contextMenuPosition} store={this.props.store} category={this.props.category} />

    return(
      <div className="lv-item lv-category" onDoubleClick={this.selectCategory.bind(this)} onContextMenu={this.openContextMenu.bind(this)}>
        {contextMenu}
        <span className="lv-iconbox">
          {IconStore["category"]}
        </span>
        {this.props.category.name}
      </div>
    );
  }
}
