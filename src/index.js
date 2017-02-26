//var $ = require('jquery');
import React from "react";
import ReactDOM from "react-dom";

import store from "./Store";
import Finder from "./components/Finder";

ReactDOM.render(
  <Finder store={store}/>,
  document.getElementById("me")
);
