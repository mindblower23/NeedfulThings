import React from "react";
import { observer } from "mobx-react";

import "../css/TreeViewNode.css";

import TreeViewNodeCollapser from "./TreeViewNodeCollapser";
import IconStore from "./IconStore";

@observer
export default class TreeViewNode extends React.Component {

  expandNode(e){
    this.props.store.isCollapsed = !this.props.store.isCollapsed;
  }

  render() {
    console.log("Node rendered: " + this.props.store.name);

    let collapser = null;
    if (this.props.store.children.length > 0){
      collapser = <TreeViewNodeCollapser isCollapsed={this.props.store.isCollapsed} onToggle={this.expandNode.bind(this)} />;
    }

    let subNodes = [];
    if(this.props.store.isCollapsed){
      subNodes = this.props.store.children.map(item => (
        <TreeViewNode onSelectCategory={this.props.onSelectCategory} key={item.id} store={item} />
      ));
    }

    let icon = null;


    return (
      <div className="tv-node">
        <div className={"tv-node-item " + (this.props.store.isActive ? "active" : "")}>
          <span className="tv-node-collapsed">
            {collapser}
          </span>
          <span className="tv-iconbox" onClick={() => this.props.onSelectCategory(this.props.store)} onDoubleClick={this.expandNode.bind(this)}>
            {IconStore["category"]}
          </span>
          <span onClick={() => this.props.onSelectCategory(this.props.store)} onDoubleClick={this.expandNode.bind(this)}>
            {this.props.store.name}
          </span>
        </div>
        <div style={{marginLeft: "20px"}}>{subNodes}</div>
      </div>

    );
  }

}
