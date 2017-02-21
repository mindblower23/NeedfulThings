//var $ = require('jquery');
import React from "react";
import ReactDOM from "react-dom";

import store from "./NTStore";
import NTFinder from "./components/NTFinder";

import "./css/NTFinder.css";


ReactDOM.render(
    <NTFinder store={store}/>,
    document.getElementById("me")
  );
