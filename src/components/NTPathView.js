import React from "react";
import { observer } from "mobx-react";

import "../css/NTPathView.css";

import NTPathViewItem from "./NTPathViewItem";

@observer
export default class NTPathView extends React.Component {
  render(){

    let itemCount = this.props.store.length;
    let items = this.props.store.map((item, i) => (
      <NTPathViewItem key={item.id} store={item} >
      {(i !== itemCount - 1)
          ? <span className="pv-item-divider">></span>
          : <span></span>
      }
    </NTPathViewItem>
    ));

    return(
      <div className="pv-container">
        {items}
      </div>
    )
  }
}
