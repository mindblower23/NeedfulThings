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

  componentWillReceiveProps(nextProps){
    if (nextProps.clicked)
      this.selectCategory();
    else if (nextProps.rightClicked)
      this.openContextMenu({preventDefault: () => false, pageX: 100, pageY: 100});
  }

  selectCategory() {
    this.props.appState.selectCategory(this.props.category);
  }

  openContextMenu(e){
    e.preventDefault();

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
    this.props.appState.contextMenu.contextMenuComponent = null;
    this.setState({editCategory : true});
  }
  addCategory(e){
    this.props.appState.contextMenu.contextMenuComponent = null;
  }
  deleteCategory(e){
    this.props.appState.contextMenu.contextMenuComponent = null;

    let dlg = this.props.appState.dialog;
    dlg.dialogComponent = <DlgConfirm
      onOk={() => {
          console.log("DELETE CONFIRMED");
          this.props.appState.dialog.dialogComponent = null;
        }
      }
      onCancel={() => {this.props.appState.dialog.dialogComponent = null;}}
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
      <div
        className={this.props.selected ? "lv-item lv-category lv-item-selected" : "lv-item lv-category"}
        onMouseOver={this.props.onSelect}
        onDoubleClick={this.selectCategory.bind(this)}
        onContextMenu={this.openContextMenu.bind(this)}
      >
        <span className="lv-iconbox">
          {IconStore["category"]}
        </span>
        {item}
      </div>
    );
  }
}
