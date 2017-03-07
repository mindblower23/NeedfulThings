import React from "react";
import { observer } from "mobx-react";

@observer
export default class ContextMenu extends React.Component {

  render(){

    let appContextMenu = this.props.appState.contextMenu;

    if (appContextMenu.contextMenuComponent !== null){

      /* clicking somewhere around the context menu will close it */
      this.props.appState.finder.onClick = (e) => {
        appContextMenu.contextMenuComponent = null;
        this.props.appState.finder.onClick = null;
      };

      /* clone the component and add prop 'appState' for enabling the esc for closing */
      let contextMenuComponent = React.cloneElement(
        appContextMenu.contextMenuComponent,
        {appState: this.props.appState}
      )

      return(
        contextMenuComponent
      );

    } else
      return null;

  }

}
