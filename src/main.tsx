import React from "react";
import ReactDOM from "react-dom";
import { RecoilRoot } from "recoil";
import Game from "./game";
import "./index.css";

ReactDOM.render(
  <React.StrictMode>
    <RecoilRoot>
      <Game />
    </RecoilRoot>
  </React.StrictMode>,
  document.getElementById("root")
);
