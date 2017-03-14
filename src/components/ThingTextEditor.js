import React, { Component } from "react";
import {Editor, EditorState, RichUtils} from 'draft-js';

import iconStore from "./IconStore";

import "../css/ThingTextEditor.css";

export default class ThingTextEditor extends Component {

  constructor(props){
    super(props);
    this.state = {editorState: EditorState.createEmpty()}
  }

  componentDidMount(){
    this.props.appState.shortCutPool.addHandler("ThingTextEditor", this.handleKeys, true);
    this.refs.editor.focus();
  }

  componentWillUnmount(){
    this.props.appState.shortCutPool.removeHandler("ThingTextEditor");
  }

  handleKeys = (e) => {
    return true;
  }

  onChange = (editorState) => {
    console.log("onChange called!");
    this.setState({editorState});
    //this.refs.editor.focus();
  }

  setBold = (e) => {
    e.preventDefault();
    e.stopPropagation();
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, "myStyle"));
  }

  focus = () => this.refs.editor.focus();

  myStyleMap = {'myStyle': {backgroundColor: '#b00000'}};

  render(){

    return(
      <div className="lv-text-editor">
        <div className="editor-icon-bar">
          <div className="editor-icon-box" onMouseDown={this.setBold}>
            {iconStore.editorIconBold}
          </div>
          <div className="editor-icon-box">
            {iconStore.editorIconItalic}
          </div>
          <div className="editor-icon-box">
            {iconStore.editorIconUnderline}
          </div>
        </div>
        <div className="editor-container">
          <Editor ref="editor" customStyleMap={this.myStyleMap} editorState={this.state.editorState} onChange={this.onChange} />
        </div>
      </div>
    );
  }
}
