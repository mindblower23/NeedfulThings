import React from "react";
import { observer } from "mobx-react";
import NTTreeViewNode from "./NTTreeViewNode"

@observer
export default class NTTreeView extends React.Component {

  doIT(e){
    console.log("COME ON!!!!!");

    console.log("setAValue: " + this.props.store[1].name);
    this.props.store[1].name = "WHAT?!?!?!?!?";

  }

  render() {

    console.log("NTTreeView Store: " + JSON.stringify(this.props.store));

    let tree = this.props.store.map(item => (
      <NTTreeViewNode key={item.id} collapsed={false} store={item} />
    ));

    return (
      <div className="NTTreeView">
        {tree}
        <a href="#" onClick={this.doIT.bind(this)}>CLICK ME!</a>
      </div>
    );
  }

}
