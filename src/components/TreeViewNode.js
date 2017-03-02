import React from "react";
import { observer } from "mobx-react";

import TreeViewNodeCollapser from "./TreeViewNodeCollapser";
import ContextMenuCategory from "./ContextMenuCategory";

import IconStore from "./IconStore";

@observer
export default class TreeViewNode extends React.Component {

  constructor(){
    super();
    this.state = {
      contextMenu : false,
      contextMenuPosition : {}
    };
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

  expandNode(e){
    this.props.category.isCollapsed = !this.props.category.isCollapsed;
  }

  selectCategory(e){
    console.log("selectItem: " + this.props.category.id);
    this.props.store.selectCategory(this.props.category);
  }

  render() {
    console.log("Node rendered: " + this.props.category.name);

    let category = this.props.category;

    let collapser = null;
    if (category.children.length > 0){
      collapser = <TreeViewNodeCollapser isCollapsed={category.isCollapsed} onToggle={this.expandNode.bind(this)} />;
    }

    let subNodes = [];
    if(category.isCollapsed){
      subNodes = category.children.map(item => (
        <TreeViewNode store={this.props.store} category={item} key={item.id} />
      ));
    }

    let contextMenu = null;
    if(this.state.contextMenu)
      contextMenu = <ContextMenuCategory contextMenuPosition={this.state.contextMenuPosition} store={this.props.store} category={this.props.category} />

    return (


      <div className="tv-node">
        {contextMenu}
        <div className={"tv-node-item " + (category.isActive ? "active" : "")} onContextMenu={this.openContextMenu.bind(this)}>
          <span className="tv-node-collapsed">
            {collapser}
          </span>
          <span className="tv-iconbox" onClick={this.selectCategory.bind(this)} onDoubleClick={this.expandNode.bind(this)}>
            {IconStore["category"]}
          </span>
          <span className="tv-node-item-text" onClick={this.selectCategory.bind(this)} onDoubleClick={this.expandNode.bind(this)}>
            {category.name}
          </span>
        </div>
        <div style={{marginLeft: "20px"}}>{subNodes}</div>
      </div>

    );
  }

}
