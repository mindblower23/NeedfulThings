import React from "react";
import { observer } from "mobx-react";

import IconStore from "./IconStore";

import ThingTextEditor from "./ThingTextEditor";

@observer
export default class ListViewThing extends React.Component {

  constructor(){
    super();
  }

  editThing = () => {
    /*this.props.appState.dialog.dialogComponent = <ThingEditor />;
    this.props.appState.dialog.isOpen = true;*/

    /* set all other things in the view to editTextActive=false */
    this.props.appState.listViewStore.selectedCategory.things.map((item) => item.editTextActive = false);
    this.props.thing.editTextActive = true;
  }

  render(){
    let textView = this.props.thing.editTextActive ?
      <ThingTextEditor appState={this.props.appState} />
    :
      <span onClick={this.editThing} className="lv-thing-text">
        {this.props.thing.text}
      </span>;

    return(
      <div onMouseEnter={this.props.onSelect} className={this.props.selected ? "lv-item lv-thing lv-item-selected" : "lv-item lv-thing"}>
        <span className="lv-iconbox">
          {IconStore["thing"]}
        </span>
        <span className="lv-thing-title">
        {this.props.thing.title}
        </span>
        <span className="lv-thing-break"></span>
        <span className="lv-iconbox">
        </span>
          {textView}
      </div>
    );
  }
}
