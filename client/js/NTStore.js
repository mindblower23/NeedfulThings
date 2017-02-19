import { computed, observable, action } from "mobx";

import serverActions from "./ServerActions";

class NTStore {
  @observable categories = [];

  @action getCategories(){
    serverActions.getCategories((data) => {
      console.table(data);

      let newCats = [];

      data.forEach((row) => {
        newCats.push(new Category(row.id, row.name, row.parent_categories_id, row.childs));
      })
      this.categories.replace(newCats);

    })
  }
}

var store = window.store = new NTStore();
export default store;

class Category {
  @observable id;
  @observable name;
  @observable parent_categories_id;
  @observable childs;

  constructor(id, name, parent_categories_id, childs){
    this.id = id;
    this.name = name;
    this.parent_categories_id = parent_categories_id;
    this.childs = this.generateChilds(childs);
  }

  generateChilds(source){
    let target = [];
      for (let i = 0; i < source.length; i++){
        target.push(new Category(source[i].id, source[i].name, source[i].parent_categories_id, source[i].childs))
      }
    return target;
  }

}

class Thing {
  @observable id;
  @observable title;
  @observable categories_id;

  constructor(value){
    this.value = value;
    this.id = Date.now();
    this.complete = true;
  }
}
