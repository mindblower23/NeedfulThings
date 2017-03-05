import React from "react";
import { observer } from "mobx-react";

import DlgConfirm from "./DlgConfirm";
import ContextMenuCategory from "./ContextMenuCategory";
import CategoryEditor from "./CategoryEditor";

import IconStore from "./IconStore";

@observer
export default class ListViewCategory extends React.Component {

  constructor() {
    super();
    this.state = {editCategory: false};
  }

  selectCategory() {
    this.props.appState.selectCategory(this.props.category);
  }

  openContextMenu(e){
    e.preventDefault();

    let contextMenu = this.props.appState.contextMenu;

    contextMenu.contextMenuItemsComponent = <ContextMenuCategory
      onRename={this.renameCategory.bind(this)}
      onAdd={this.addCategory.bind(this)}
      onDelete={this.deleteCategory.bind(this)}
      connectedObject={this.props.category}
      position={{left : e.pageX, top : e.pageY}}
    />;
    contextMenu.isVisible = true;
  }

  renameCategory(e){
    e.stopPropagation();

    this.props.appState.contextMenu.isVisible = false;
    this.setState({editCategory : true});
  }
  addCategory(e){

  }
  deleteCategory(e){
    let dlg = this.props.appState.dialog;
    dlg.dialogComponent = <DlgConfirm
      onOk={() => {console.log("DELETE CONFIRMED"); this.props.appState.dialog.isVisible = false;}}
      onCancel={() => {this.props.appState.dialog.isVisible = false}}
      text="Do you really want to delete the category?"
    />
    dlg.buttonsOnly = true;
    dlg.isVisible = true;
  }

  editorClose(){
    this.setState({editCategory : false});
  }

  render(){

    let item = this.props.category.name;
    if(this.state.editCategory)
      item =  <CategoryEditor
                appState={this.props.appState}
                category={this.props.category}
                value={this.props.category.name}
                onClose={this.editorClose.bind(this)}
              />

    return(
      <div className="lv-item lv-category" onDoubleClick={this.selectCategory.bind(this)} onContextMenu={this.openContextMenu.bind(this)}>
        <span className="lv-iconbox">
          {IconStore["category"]}
        </span>
        {item}
      </div>
    );
  }
}
