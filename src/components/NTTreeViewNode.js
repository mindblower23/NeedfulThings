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

  selectItem(){
    this.props.onSelectItem(this.props.store.id);
  }

  render() {
    console.log("Node rendered: " + this.props.store.name);

    let collapser = null;
    if (this.props.store.childs.length > 0){
      collapser = <NTTreeViewNodeCollapser isCollapsed={this.props.store.isCollapsed} onToggle={this.expandNode.bind(this)} />;
    }

    let subNodes = [];
    if(this.props.store.isCollapsed){
      subNodes = this.props.store.childs.map(item => (
        <NTTreeViewNode onSelectItem={this.props.onSelectItem} key={item.id} store={item} />
      ));
    }

    let icon = null;


    return (
      <div className="NTTreeViewNode">
        <div className={"NTTreeViewNodeItem " + (this.props.store.isActive ? "active" : "")}>
          <span className="NTTreeViewNodeCollapsedBox">
            {collapser}
          </span>
          <span className="iconBox">
            <svg className="iconFolder" viewBox="0 0 24 24"  y="72">
              {IconStore["folder"]}
            </svg>
          </span>
          <span onClick={this.selectItem.bind(this)}>
            {this.props.store.name}
          </span>
        </div>
        <div style={{marginLeft: "20px"}}>{subNodes}</div>
      </div>

    );
  }

}
