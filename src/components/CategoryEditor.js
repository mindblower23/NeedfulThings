import React, { Component } from "react";
import { observer } from "mobx-react";

@observer
export default class CategoryEditor extends Component {

  constructor(){
    super();
    this.state = {value: "hhh"};
  }

  componentDidMount(){

    console.log("CE: " + this.props.category.name);
    this.setState({value: this.props.category.name});

    this.props.appState.finder.onClick = (e) => {
      this.props.onClose();
      this.props.appState.finder.onClick = null;
      this.props.appState.finder.onContextMenu = null;
    };
    this.props.appState.finder.onContextMenu = (e) => {
      this.props.onClose();
      this.props.appState.finder.onClick = null;
      this.props.appState.finder.onContextMenu = null;
    };
  }

  click(e){
    console.log("CategoryEditor reports Click!");
    e.stopPropagation();
    e.preventDefault();
  }

  handleChange(e){
    console.log("CategoryEditor handleChange");
    this.setState({value: e.target.value});

  }

  keyPress(e){
    if(e.keyCode === 13){
      this.props.category.name = e.target.value;
      this.props.appState.finder.onClick(e);
    } else if (e.keyCode === 27)
      this.props.appState.finder.onClick(e);
  }

  render(){
    return(

      <input
        className="category-editor"
        autoFocus
        onKeyDown={this.keyPress.bind(this)}
        onClick={this.click.bind(this)}
        value={this.state.value}
        onChange={this.handleChange.bind(this)}
      />

    );

  }

}
