import * as React from "react";
import * as ReactDOM from "react-dom";
import { App } from "./components/app/App";

const mountNode = document.getElementById("app");
ReactDOM.render(<App />, mountNode);
