import React from "react";
import { observer } from "mobx-react";
import NTListViewItem from "./NTListViewItem";

@observer
export default class NTListView extends React.Component {

  render(){

    console.log("NTListView: RENDER!!!!");

    let rows = this.props.store.map(item => (
      <NTListViewItem key={item.id} store={item} />
    ));

    return(
      <div className="NTListView">
        {rows}
      </div>
    );
  }
}
