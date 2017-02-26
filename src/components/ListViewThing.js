import React from "react";
import { observer } from "mobx-react";

import IconStore from "./IconStore";

@observer
export default class ListViewThing extends React.Component {

  render(){

    return(
      <div className="lv-item">
        <span className="lv-iconbox">
          {IconStore["thing"]}
        </span>
        {this.props.store.name}
      </div>
    );
  }
}
