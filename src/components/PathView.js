import React from "react";
import { observer } from "mobx-react";

import "../css/PathView.css";

import PathViewItem from "./PathViewItem";

@observer
export default class PathView extends React.Component {
  render(){

    let itemCount = this.props.store.length;
    let items = this.props.store.map((item, i) => (
      <PathViewItem key={item.id} store={item} onSelectCategory={this.props.onSelectCategory} >
      {(i !== itemCount - 1)
          ? <span className="pv-item-divider">></span>
          : <span></span>
      }
    </PathViewItem>
    ));

    return(
      <div className="pv-container">
        {items}
      </div>
    )
  }
}
