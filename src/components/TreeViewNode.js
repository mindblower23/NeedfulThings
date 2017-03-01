import React from "react";
import { observer } from "mobx-react";

import TreeViewNodeCollapser from "./TreeViewNodeCollapser";
import IconStore from "./IconStore";

@observer
export default class TreeViewNode extends React.Component {

  expandNode(e){
    this.props.category.isCollapsed = !this.props.category.isCollapsed;
  }

  selectCategory(e){
    console.log("selectItem: " + this.props.category.id);
    this.props.store.selectCategory(this.props.category);
  }

  render() {
    console.log("Node rendered: " + this.props.store.name);

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

    return (
      <div className="tv-node">
        <div className={"tv-node-item " + (category.isActive ? "active" : "")}>
          <span className="tv-node-collapsed">
            {collapser}
          </span>
          <span className="tv-iconbox" onClick={this.selectCategory.bind(this)} onDoubleClick={this.expandNode.bind(this)}>
            {IconStore["category"]}
          </span>
          <span onClick={this.selectCategory.bind(this)} onDoubleClick={this.expandNode.bind(this)}>
            {category.name}
          </span>
        </div>
        <div style={{marginLeft: "20px"}}>{subNodes}</div>
      </div>

    );
  }

}
