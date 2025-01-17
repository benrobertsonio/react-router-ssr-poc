import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import React from "react";
import { hydrateRoot } from "react-dom/client";

hydrateRoot(
  document.getElementById("root"),
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
