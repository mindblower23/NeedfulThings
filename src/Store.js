import { computed, observable, action } from "mobx";

import serverActions from "./ServerActions";

class Store {
  @observable categories = [];
  @observable listViewStore = {'selectedCategory': {}};
  @observable categoriesPath = [];

  @action initStartUp(){
    this.getCategories();
  }

  @action getCategories(){
    serverActions.act("getCategories", null, (data) => {
      data[0].isCollapsed = true;

      this.categories.replace(data);
      this.selectCategory(data[0]);

    })
  }

  @action selectCategory(categoryObject){
    serverActions.act("getThings", {categories_id: categoryObject.id}, (data) => {

      categoryObject.things = data;

      let parentIdHistory = categoryObject.parentIdHistory.slice();
      parentIdHistory.shift();

      this.categoriesPath.replace([]);

      this.setCollapsedParents(this.categories, parentIdHistory);

      this.categoriesPath.push(categoryObject);

      this.setCategoryActive(this.categories, categoryObject.id);

      this.listViewStore.selectedCategory = categoryObject;

    });
  }

  setCategoryActive(categories, active_categoryId){
    categories.forEach(item => {
      if (item.id === active_categoryId)
        item.isActive = true;
      else if (item.isActive)
        item.isActive = false;

      if(item.children.length > 0)
        this.setCategoryActive(item.children, active_categoryId);
    });
  }

  setCollapsedParents(categories, parentIdHistory){
    if(parentIdHistory.length > 0){
      let currentCategory = categories.find((item) => item.id === parentIdHistory[0]);
      currentCategory.isCollapsed = true;

      //build categoriesPath
      this.categoriesPath.push(currentCategory);

      parentIdHistory.shift();
      this.setCollapsedParents(currentCategory.children, parentIdHistory);
    }
  }

}

var store = window.store = new Store();
export default store;