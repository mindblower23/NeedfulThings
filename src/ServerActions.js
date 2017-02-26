/* ServerActions talks to a REST service that returns JSON */

class ServerActions {

  act(actionName, params = {}, callback){

    switch (actionName) {
      case "getCategories":
        fetch("http://localhost:3000/action?name=getCategories&_users_id=1")
          .then(response => response.json())
          .then(data => callback(data));
        break;
      case "getThings":
      fetch("http://localhost:3000/action?name=getThings&_categories_id=" + params.categories_id)
        .then(response => response.json())
        .then(data => callback(data));
        break;
    }

  }
}
export default new ServerActions();
