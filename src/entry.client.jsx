import { RouterProvider, createBrowserRouter } from "react-router-dom";

import React from "react";
import { hydrateRoot } from "react-dom/client";
import { routes } from "../routes.jsx";

let router = createBrowserRouter(routes);

hydrateRoot(
  document.getElementById("root"),
  <RouterProvider router={router} />
);
