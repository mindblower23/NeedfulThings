//var $ = require('jquery');
import React from "react";
import ReactDOM from "react-dom";

import store from "./NTStore";
import NTFinder from "./components/NTFinder";

ReactDOM.render(
  <NTFinder store={store}/>,
  document.getElementById("me")
);
