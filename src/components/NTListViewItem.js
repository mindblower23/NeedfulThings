import React from "react";
import { observer } from "mobx-react";

@observer
export default class NTListViewItem extends React.Component {

  render(){
    return(
      <div className="NTListViewItem">
        <span className="iconBox">
          <svg className="iconFolder" viewBox="0 0 24 24"  y="72">
            <path d="M20 6h-8l-2-2H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm0 12H4V8h16v10z" />
          </svg>
        </span>
        {this.props.store.name}
      </div>
    );
  }
}
