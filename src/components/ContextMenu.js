import React from "react";
import { observer } from "mobx-react";

import ContextMenuCategory from "./ContextMenuCategory";

@observer
export default class ContextMenu extends React.Component {

  render(){

    let storeContextMenu = this.props.appState.contextMenu;

    console.log("ContextMenu: " + JSON.stringify(storeContextMenu));

    if (storeContextMenu.isVisible){

      this.props.appState.finder.onClick = (e) => {
        console.log("EVENT TARGET" + e.target.className);
        storeContextMenu.isVisible = false;
        this.props.appState.finder.onClick = null;
      };

      let contextMenuItemsComponent = null;

      switch (storeContextMenu.contextMenuItemsComponent) {
        case "ContextMenuCategory":
          contextMenuItemsComponent = <ContextMenuCategory className="context-menu" style={storeContextMenu.position} appState={this.props.appState} />;
          break;
        default:
          contextMenuItemsComponent = null;
      }
      console.log("contextMenuItemsComponent: " + contextMenuItemsComponent);
      return(
        contextMenuItemsComponent
      )

    } else
      return null;

  }

}
