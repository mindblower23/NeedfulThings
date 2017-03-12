import { computed, observable, action } from "mobx";
import React from "react";

import ShortCutPool from "./components/ShortCutPool";

import serverActions from "./ServerActions";

class AppState {
  shortCutPool = new ShortCutPool();

  @observable finder = {onClick: null, onContextMenu: null};
  @observable categories = [];
  @observable categoriesPath = [];
  @observable listViewStore = {selectedCategory: {}};
  @observable dialog = {
              dialogComponent: null,
              buttonsOnly: false
            };
  @observable contextMenu = {
              contextMenuComponent: null
            };

  @action initStartUp(){
    this.getCategories();
  }

  /**
    * @desc load categories tree from server
  */
  @action getCategories(){
    serverActions.act("getCategories", null, (data) => {
      data[0].isCollapsed = true;

      this.categories.replace(data);
      this.selectCategory(this.categories[0]);

    })
  }

  /**
    * @desc loads all things of the selected category from serverActions
    * sets the selected category in the tree view to active
    * opens all parent nodes in the tree view
  */
  @action selectCategory(selectedCategory){
    serverActions.act("getThings", {categories_id: selectedCategory.id}, (data) => {

      /* Add editTextActive to indicate if the things text is currently edited in draft editor */
      data.map((item) => {item.editTextActive = false});

      selectedCategory.things = data;

      let parentIdHistory = selectedCategory.parentIdHistory.slice();
      parentIdHistory.shift();

      this.categoriesPath.replace([]);

      this.collapseParentNodesAndBuildPathView(this.categories, parentIdHistory);

      this.categoriesPath.push(selectedCategory);

      this.setActiveCategory(this.categories, selectedCategory.id);

      this.listViewStore.selectedCategory = selectedCategory;

    });
  }

  /**
    * @desc sets the current category to isActive = true and all others to false
    * categories are in a tree structure so this has to be done recursively
  */
  setActiveCategory(categories, active_categoryId){
    categories.forEach(item => {

      item.isActive = (item.id === active_categoryId) ? true : false;

      if(item.children.length > 0)
        this.setActiveCategory(item.children, active_categoryId);
    });
  }

  /**
    * @desc opens all parent category nodes of the currently selected category
    * categories are in a tree structure so this has to be done recursively
    * the categories path array is build for the path view
    * @categories the categories tree object
    * @parentIdHistory an array with all the parent ids of the selected category
  */
  collapseParentNodesAndBuildPathView(categories, parentIdHistory){
    if(parentIdHistory.length > 0){
      let currentCategory = categories.find((item) => item.id === parentIdHistory[0]);
      currentCategory.isCollapsed = true;

      //build categoriesPath
      this.categoriesPath.push(currentCategory);

      parentIdHistory.shift();
      this.collapseParentNodesAndBuildPathView(currentCategory.children, parentIdHistory);
    }
  }

  openDialog(componentName){
    this.dialog.dialogTag = this.dialogs[componentName];
    this.dialog.isOpen = true;
  }

}

var appState = window.appState = new AppState();
export default appState;
