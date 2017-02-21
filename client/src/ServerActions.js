/* ServerActions talks to a REST service that returns JSON */

class ServerActions {

  act(actionName, callback, params = {}){

    switch (actionName) {
      case "getCategories":
        fetch("../action?name=getCategories&_users_id=1")
          .then(response => response.json())
          .then(data => callback(data));
        break;
      case "getItems":
      fetch("../action?name=getItems&_categories_id=" + params.categories_id)
        .then(response => response.json())
        .then(data => callback(data));
        break;
    }

  }
}
export default new ServerActions();
