//var $ = require('jquery');
import React from "react";
import ReactDOM from "react-dom";

import AppState from "./AppState";
import Finder from "./components/Finder";

//disable right click on the page
document.body.oncontextmenu = () => false;

ReactDOM.render(
  <Finder appState={AppState}/>,
  document.getElementById("me")
);
