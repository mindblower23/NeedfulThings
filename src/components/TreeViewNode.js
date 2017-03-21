import React from "react";
import { observer } from "mobx-react";

import TreeViewNodeCollapser from "./TreeViewNodeCollapser";
import CategoryEditor from "./CategoryEditor";
import ContextMenuCategory from "./ContextMenuCategory";
import DlgConfirm from "./DlgConfirm";

import IconStore from "./IconStore";

@observer
export default class TreeViewNode extends React.Component {

  appStore = null;

  componentWillMount(){
    this.appState = this.props.appState;
  }

  openContextMenu(e){
    let contextMenu = this.props.appState.contextMenu;

    let items = [
      {type: "item", text: "Rename Category", handler: this.renameCategory.bind(this)},
      {type: "item", text: "Add Category", handler: this.addCategory.bind(this)},
      {type: "item", text: "Delete Category", handler: this.deleteCategory.bind(this)}
    ]

    contextMenu.contextMenuComponent = <ContextMenuCategory
      items={items}
      position={{left : e.pageX, top : e.pageY}}
    />;
  }

  renameCategory(e){
    e.stopPropagation();

    this.props.appState.contextMenu.contextMenuComponent = null;
    this.props.category.isEditTree = true;
  }
  editorClose(){
    this.props.category.isEditTree = false;
  }
  addCategory(){
    this.props.appState.contextMenu.contextMenuComponent = null;
    this.props.appState.addCategory(this.props.category, 1);
  }
  deleteCategory(){
    this.props.appState.contextMenu.contextMenuComponent = null;
    let dlg = this.appState.dialog;

    dlg.dialogComponent = <DlgConfirm
      onOk={() => {console.log("DELETE CONFIRMED"); this.props.appState.dialog.dialogComponent = null;}}
      onCancel={() => {this.props.appState.dialog.dialogComponent = null}}
      text="Do you really want to delete the category?"
    />
    dlg.buttonsOnly = true;

  }

  expandNode(e){
    e.stopPropagation();
    this.props.category.isCollapsed = !this.props.category.isCollapsed;
  }

  selectCategory(e){
    console.log("selectItem: " + this.props.category.id);
    this.props.appState.selectCategory(this.props.category);
  }

  render() {

    console.log("Node rendered: " + this.props.category.name);

    let category = this.props.category;

    let collapser = null;
    if (category.children.length > 0){
      collapser = <TreeViewNodeCollapser isCollapsed={category.isCollapsed} onToggle={this.expandNode.bind(this)} />;
    }

    let subNodes = [];
    if(category.isCollapsed){
      subNodes = category.children.map(item => (
        <TreeViewNode appState={this.props.appState} category={item} key={item.id} />
      ));
    }

    let item = category.name;
    if(this.props.category.isEditTree)
      item =  <CategoryEditor
                appState={this.props.appState}
                category={this.props.category}
                value={category.name}
                onClose={this.editorClose.bind(this)}
              />

    return (

      <div className="tv-node">
        <div
          className={"tv-node-item " + (category.isActive ? "active" : "")}
          onContextMenu={this.openContextMenu.bind(this)}
          onClick={this.selectCategory.bind(this)}
          onDoubleClick={this.expandNode.bind(this)}
        >
          <span className="tv-node-collapsed">
            {collapser}
          </span>
          <span className="tv-iconbox" >
            {IconStore["category"]}
          </span>
          <span className="tv-node-item-text">
            {item}
          </span>
        </div>
        <div style={{marginLeft: "20px"}}>{subNodes}</div>
      </div>

    );
  }

}
