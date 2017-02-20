import React from "react";
import NTTreeView from "./NTTreeView"
import NTListView from "./NTListView"

export default class NTFinder extends React.Component {

  componentDidMount() {
    this.props.store.initStartUp();
  }

  render(){

    return(
      <div className="NTFinderContainer">
        <NTTreeView store={this.props.store.categories} />
        <div className="NTFinderDivider"></div>
        <NTListView store={this.props.store.items} />
      </div>
    );

  }

}
