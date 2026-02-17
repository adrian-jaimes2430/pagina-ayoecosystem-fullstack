import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { builder } from "@builder.io/react";

builder.init("67c6862db57746c1a46f1485dc7f3883");

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
