import React from "react";
import NTTreeView from "./NTTreeView"

export default class NTFinder extends React.Component {

  componentDidMount() {
    this.props.store.getCategories();
  }

  render(){

    return(
      <div className="NTFinderContainer">
        <div>
          <NTTreeView store={this.props.store.categories}/>
        </div>
      </div>
    );

  }

}
