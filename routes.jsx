import { json, useLoaderData } from "react-router-dom";

import { Link } from "react-router-dom";
import React from "react";

export const routes = [
  {
    path: "/",
    loader() {
      return json({
        message: "This text is hydrated on the client using a data loader.",
      });
    },
    Component() {
      let data = useLoaderData();
      return (
        <>
          <h1>{data.message}</h1>
          <Link to="/another-route">Go to another route</Link>
        </>
      );
    },
  },
  {
    path: "/another-route",
    Component() {
      return (
        <>
          <h1>This is another route.</h1>
          <Link to="/">Go to home</Link>
        </>
      );
    },
  },
];
