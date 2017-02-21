import React from "react";
import { observer } from "mobx-react";
import NTTreeViewNodeCollapser from "./NTTreeViewNodeCollapser";

@observer
export default class NTTreeViewNode extends React.Component {

  constructor(){
    super();
    this.state = {isCollapsed: false};
  }
  expandNode(e){
    this.setState({isCollapsed: !this.state.isCollapsed});
  }

  selectItem(){
    this.props.onSelectItem(this.props.store.id);
  }

  render() {
    console.log("Node rendered: " + this.props.store.name);

    let collapser = null;
    if (this.props.store.childs.length > 0){
      collapser = <NTTreeViewNodeCollapser isCollapsed={this.state.isCollapsed} onToggle={this.expandNode.bind(this)} />;
    }

    let subNodes = [];

    if(this.state.isCollapsed){
      subNodes = this.props.store.childs.map(item => (
        <NTTreeViewNode onSelectItem={this.props.onSelectItem} key={item.id} store={item} />
      ));
    }

    return (
      <div className="NTTreeViewNode">
        <div className={"NTTreeViewNodeItem " + (this.props.store.isActive ? "active" : "")}>
          <span className="NTTreeViewNodeCollapsedBox">
            {collapser}
          </span>
          <span className="iconBox">
            <svg className="iconFolder" viewBox="0 0 24 24"  y="72">
              <path d="M20 6h-8l-2-2H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm0 12H4V8h16v10z" />
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
