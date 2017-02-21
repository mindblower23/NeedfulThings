import React from "react"
import { observable } from "mobx";
import { observer } from "mobx-react";

@observer
export default class KillMe extends React.Component {

  @observable myValue = "huhuhaha";

  render (){
    return(
      <div style={{"flexBasis": "800px"}}>
        {this.myValue}
        <a href="#" onClick={() => this.myValue = "?"}>DOITNOW!</a>
      </div>
    );
  }
}
