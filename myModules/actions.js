const db = new (require('./db'))();

const Utils = require('./Utils');

class Actions{

    constructor(){
        this.json = "";
    }

    queryToParams(queryObj){
        var params = [];
        for (var key in queryObj) {
            if (key.substr(0,1) === '_')
                params.push(queryObj[key]);
        }
        return params;
    }

    act (queryStringObj){

        //Dispatch Actions by name in querystring
        return new Promise((resolve, reject) => {

            if(queryStringObj.name === 'getUsers')
            {
               db.query("call getUsers(?)", this.queryToParams(queryStringObj)).then(result => {
                   return resolve(result);
               }).catch(err => {
                   return reject(err);
               });

            }
            else if (queryStringObj.name === 'checkLogin') {

              //Check Login by username and password
              db.query("call checkLogin(?, ?)", this.queryToParams(queryStringObj)).then(result => {
                  return resolve(result);
              });

            }
            else if (queryStringObj.name === 'getCategories') {

                //Check Login by username and password
                db.query("call getCategories(?)", this.queryToParams(queryStringObj)).then(result => {

                  //build multidimensional array from db table
                  let categories = Utils.generateTreeViewArray(result[0], "id", "parent_categories_id");



                  return resolve(categories);
                });

            } else {
                // ERROR!!!!
                console.log("ERROR IN ACTIONS!");
                return reject(new Error('No Action defined in QueryString!'));
            }

        });

    }
}

module.exports = Actions;
