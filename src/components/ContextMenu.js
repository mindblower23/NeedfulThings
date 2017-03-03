import React from "react";
import { observer } from "mobx-react";

import ContextMenuCategory from "./ContextMenuCategory";

@observer
export default class ContextMenu extends React.Component {

  render(){
    let storeContextMenu = this.props.store.contextMenu;

    console.log("ContextMenu: " + JSON.stringify(storeContextMenu));

    if (storeContextMenu.isVisible){

      document.body.onmousedown = () => {
        console.log("body.onmousedown is triggered!");
        storeContextMenu.isVisible = false;
        document.body.onmousedown = null;
      }

      let contextMenuItemsComponent = null;

      switch (storeContextMenu.contextMenuItemsComponent) {
        case "ContextMenuCategory":
          contextMenuItemsComponent = <ContextMenuCategory className="context-menu" style={storeContextMenu.position} store={this.props.store} />;
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