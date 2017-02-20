import React from "react";
import NTTreeViewNodeCollapser from "./NTTreeViewNodeCollapser";

export default class NTTreeViewNode extends React.Component {

  constructor(){
    super();
    this.state = {collapsed: false};
  }
  expandNode(e){
    this.setState({collapsed: !this.state.collapsed});
  }
  render() {
    console.log("Node rendered: " + this.props.store.name);
    //console.log(JSON.stringify(this.props.store));

    let subNodes = [];

    if(this.state.collapsed){
      subNodes = this.props.store.childs.map(item => (
        <NTTreeViewNode key={item.id} store={item} />
      ));
    }

    let collapser = null;
    if (this.props.store.childs.length > 0){
      collapser = <NTTreeViewNodeCollapser isCollapsed={this.state.collapsed} onToggle={this.expandNode.bind(this)} />;
    }


    return (
      <div className="NTTreeViewNode">
        <div className="NTTreeViewNodeItem">
          <span className="NTTreeViewNodeCollapsedBox">
            {collapser}
          </span>
          <span className="iconBox">
            <svg className="iconFolder" viewBox="0 0 24 24"  y="72">
              <path d="M20 6h-8l-2-2H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm0 12H4V8h16v10z" />
            </svg>
          </span>
          <span style={{"verticalAlign": "middle"}}>
            {this.props.store.name}
          </span>
        </div>
        <div style={{marginLeft: "20px"}}>{subNodes}</div>
      </div>

    );
  }

}
