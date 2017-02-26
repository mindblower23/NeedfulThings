import React from "react";
import { observer } from "mobx-react";

import "../css/NTTreeViewNode.css";

import NTTreeViewNodeCollapser from "./NTTreeViewNodeCollapser";
import IconStore from "./IconStore";

@observer
export default class NTTreeViewNode extends React.Component {

  expandNode(e){
    this.props.store.isCollapsed = !this.props.store.isCollapsed;
  }

  render() {
    console.log("Node rendered: " + this.props.store.name);

    let collapser = null;
    if (this.props.store.children.length > 0){
      collapser = <NTTreeViewNodeCollapser isCollapsed={this.props.store.isCollapsed} onToggle={this.expandNode.bind(this)} />;
    }

    let subNodes = [];
    if(this.props.store.isCollapsed){
      subNodes = this.props.store.children.map(item => (
        <NTTreeViewNode onSelectCategory={this.props.onSelectCategory} key={item.id} store={item} />
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
