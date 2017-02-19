import React from "react";

export default class NTTreeViewNode extends React.Component {

  render() {

    console.log(JSON.stringify(this.props.store));

    let subNodes = this.props.store.childs.map(item => (
      <NTTreeViewNode key={item.id} store={item} />
    ));


    return (
      <div>
        <div>{this.props.store.name}</div>
        <div style={{marginLeft: "20px"}}>{subNodes}</div>
      </div>

    );
  }

}
