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

      return(
        this.props.appState.contextMenu.contextMenuItemsComponent
      )

    } else
      return null;

  }

}
