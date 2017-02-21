import { computed, observable, action } from "mobx";

import serverActions from "./ServerActions";

class NTStore {
  @observable categories = [];
  @observable items = [];

  @action initStartUp(){
    this.getCategories();
    this.getItems(0);
  }

  @action getCategories(){
    serverActions.act("getCategories", (data) => {
      console.log("getCategories!");
      /*
      let newCats = [];
      data.forEach((row) => {
        newCats.push(new Category(row.id, row.name, row.parent_categories_id, row.childs));
      })
      this.categories.replace(newCats);
      */

      this.categories.replace(data);
    })
  }

  @action getItems(categoryId){
    serverActions.act("getItems", (data) => {
      console.log("getItems!");
      this.items.replace(data);

      //let tempCategories = this.categories.peek();

      this.setCategoryActive(this.categories, categoryId);
      //this.categories.replace(tempCategories);

    }, {categories_id: categoryId});
  }

  setCategoryActive(categories, active_categoryId){
    categories.forEach(item => {
      if (item.id === active_categoryId)
        item.isActive = true;
      else if (item.isActive)
        item.isActive = false;

      if(item.childs.length > 0)
        this.setCategoryActive(item.childs, active_categoryId);
    });
  }
}

var store = window.store = new NTStore();
export default store;
