/* ServerActions talks to a REST service that returns JSON */

class ServerActions {

  act(actionName, params = {}, callback){

    switch (actionName) {
      case "loadCategories":
        fetch("http://localhost:3000/action?name=loadCategories&_users_id=1&_id=" + params.categories_id)
        .then(response => response.json())
        .then(data => callback(data));
        break;
      case "getThings":
        fetch("http://localhost:3000/action?name=getThings&_categories_id=" + params.categories_id)
        .then(response => response.json())
        .then(data => callback(data));
        break;
      case "saveNewCategory":
        let data = new FormData();
        data.append("_parent_categories_id", params.parent_categories_id);
        data.append("_name", params.name)
        fetch("http://localhost:3000/action?name=saveNewCategory",
        {
          method: "POST",
          body: data
        })
        .then(response => response.json())
        .then(data => callback(data));
        break;
    }

  }
}
export default new ServerActions();
