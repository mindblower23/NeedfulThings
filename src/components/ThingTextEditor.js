import React, { Component } from "react";
import {Editor, EditorState} from 'draft-js';

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
    this.setState({editorState});
  }

  render(){

    return(
      <div className="lv-text-editor">
        <div className="editor-icon-bar">
          <div className="editor-icon-box">
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
          <Editor ref="editor" editorState={this.state.editorState} onChange={this.onChange} />
        </div>
      </div>
    );
  }
}
