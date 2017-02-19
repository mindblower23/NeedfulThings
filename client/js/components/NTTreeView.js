import React from "react";
import { observer } from "mobx-react";
import NTTreeViewNode from "./NTTreeViewNode"

@observer
export default class NTTreeView extends React.Component {

  render() {

    console.log("NTTreeView Store: " + JSON.stringify(this.props.store));

    let tree = this.props.store.map(item => (
      <NTTreeViewNode store={item} />
    ));

    return (
      <div>
        {tree}
      </div>
    );
  }

}
