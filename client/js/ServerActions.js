class ServerActions {
  getCategories(callback){
    fetch("../action?name=getCategories&_users_id=1")
      .then(response => response.json())
      .then(data => callback(data));
  }
}

export default new ServerActions();
