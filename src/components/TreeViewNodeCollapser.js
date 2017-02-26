import React from "react";

export default class TreeViewNodeCollapser extends React.Component {

  render(){

    return(

      <svg  onClick={this.props.onToggle}
            viewBox="0 0 20 20"
            width="20px"
            height="20px"
      >
      {(this.props.isCollapsed) ? (
        <polygon points="5,8 10,13 15,8"></polygon>
      ) : (
        <polygon points="8,5 13,10 8,15"></polygon>
      )
      }

      </svg>

    );
  }
}
