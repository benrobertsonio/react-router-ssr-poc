import React from "react";
import { StaticRouterProvider } from "react-router-dom/server";

export default function ServerEntry({ router, context }) {
  return <StaticRouterProvider router={router} context={context} />;
}
