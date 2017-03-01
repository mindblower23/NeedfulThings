import React from "react";
import { observer } from "mobx-react";

import Modalizer from "./Modalizer";

@observer
export default class ThingEditor extends React.Component {

  constructor(){
    super();
    this.state = {isOpen : true};
  }

  close(){
    console.log("ThingEditor tries to close!");
    this.props.store.isOpen = false;
  }
  render() {

    return(
      <Modalizer isOpen={this.props.store.isOpen}>
        <div>Here i am!!!!!!!!!!!!!!!!!!!!!!</div>
        <div onClick={this.close.bind(this)}>And THIS closes the Modal</div>
      </Modalizer>
  );
  }

}
