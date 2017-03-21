import React, { Component } from "react";
import { observer } from "mobx-react";

@observer
export default class CategoryEditor extends Component {

  constructor(){
    super();
    this.state = {value: null};
  }

  componentWillMount(){
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

    this.props.appState.shortCutPool.addHandler("CategoryEditor", this.handleKeys, true);
  }

  componentWillUnmount(){
    this.props.appState.shortCutPool.removeHandler("CategoryEditor");
  }

  preventClicks(e){
    console.log("CategoryEditor reports Click!");
    e.stopPropagation();
    e.preventDefault();
  }

  handleChange(e){
    console.log("CategoryEditor handleChange");
    this.setState({value: e.target.value});
  }

  handleKeys = (e) => {
    if(e.keyCode === 13){
      this.props.category.name = e.target.value;
      this.props.appState.saveNewCategory(this.props.category);
      this.props.appState.finder.onClick(e);
    } else if (e.keyCode === 27)
      this.props.appState.finder.onClick(e);
  }

  render(){
    return(

      <input
        className="category-editor"
        autoFocus
        onClick={this.preventClicks.bind(this)}
        onDoubleClick={this.preventClicks.bind(this)}
        value={this.state.value}
        onChange={this.handleChange.bind(this)}
      />

    );

  }

}
