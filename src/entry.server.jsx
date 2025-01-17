import App from "./App.jsx";
import React from "react";
import { StaticRouter } from "react-router-dom/server";

export default function ServerEntry({ url }) {
  return (
    <StaticRouter location={url.pathname}>
      <App />
    </StaticRouter>
  );
}
