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
    this.loadCategories(2);
  }

  /**
    * @desc load categories tree from server
  */
  @action loadCategories(categories_id){
    serverActions.act("loadCategories", {categories_id}, (data) => {
      this.addCategoryPropsForView(data[0]);
      data[0].isCollapsed = true;

      this.categories.replace(data);
      this.selectCategory(this.categories[0]);
    })
  }


  @action reloadCategory(category){
    serverActions.act("loadCategories", {categories_id: category.id}, (data) => {
      this.addCategoryPropsForView(data[0]);
      data[0].isCollapsed = true;

      category.replace(data);
      //this.selectCategory(this.categories[0]);
    })
  }

  /**
    * @desc add props to categories that are needed for displaying the views
  */
  addCategoryPropsForView(category){
    category.isActive = false;
    category.isCollapsed = false;
    category.things = [];
    category.isEditTree = false;
    category.isEditView = false;
    category.children.forEach(item => {this.addCategoryPropsForView(item)});
  }

  /**
    * @desc iterates trough the given category array and finds the matching category by id recursevly
    * @categories   the categories array
    * @id           the category id to be matched with
  */
  getCategoryById(categories, id){
    for (let i = 0; i < categories.length; i++)
    {
      let item = categories[i];
      if(item.id === id)
        return item;
      if (item.children.length > 0){
        let ret = this.getCategoryById(item.children, id);
        if (ret) return ret;
      }
    };
    return false;
  }

  /**
    * @desc loads all things of the selected category from serverActions
    * sets the selected category in the tree view to active
    * opens all parent nodes in the tree view
  */
  @action selectCategory(selectedCategory){
    serverActions.act("getThings", {categories_id: selectedCategory.id}, (data) => {

      /* Add editTextActive to indicate if the things text is currently edited in draft editor */
      data.map((item) => {this.addThingPropsForView(item)});

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

  addThingPropsForView(thing){
    thing.editTextActive = false;
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

  @action addCategory(selectedCategory, viewType){
    let newCategory = {...selectedCategory};
    newCategory.id = -1;
    newCategory.parent_categories_id = selectedCategory.id;
    newCategory.name = "rename!";
    newCategory.things = [];
    newCategory.parentIdHistory.push(selectedCategory.id);
    newCategory.children = [];

    if(viewType === 1)
      newCategory.isEditTree = true;
    else
      newCategory.isEditView = true;

    selectedCategory.children.push(newCategory);
    selectedCategory.isCollapsed = true;
  }

  @action saveNewCategory(selectedCategory){

    /* save to server/db */
    serverActions.act(
      "saveNewCategory",
      {
        parent_categories_id: selectedCategory.parent_categories_id,
        name: selectedCategory.name
      },
      (data) => {
        /* set the id in appState category to the new inserted id from server/db */
        selectedCategory.id = data[0].id;

        //resort the children of the parent node
        let parent = this.getCategoryById(this.categories, selectedCategory.parent_categories_id);
        this.sortCategoryChildren(parent);

      }
    );
  }

  sortCategoryChildren(category){
    let temp = category.children.sort((a, b) => a.name.localeCompare(b.name));
    category.children.replace(temp);
  }

}

var appState = window.appState = new AppState();
export default appState;
