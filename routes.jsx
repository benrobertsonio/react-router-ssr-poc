import App from "./src/App.jsx";
import { Outlet } from "react-router-dom";
import React from "react";

function Layout() {
  return (
    <>
      <h1>This is the layout.</h1>
      {/* <Link to="/">Go to home</Link> */}
      <Outlet />
    </>
  );
}

export const routes = [
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <App />,
      },
    ],
  },
];
