import React from "react";
import { observer } from "mobx-react";

import "../css/PathView.css";

import PathViewItem from "./PathViewItem";

@observer
export default class PathView extends React.Component {
  render(){

    let itemCount = this.props.appState.categoriesPath.length;
    let items = this.props.appState.categoriesPath.map((item, i) => (
      <PathViewItem key={item.id} appState={this.props.appState} category={item} >
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
