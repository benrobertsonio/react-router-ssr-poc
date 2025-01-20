# React Router SSR + Netlify Edge Functions PoC

This is a proof of concept of running React Router v6 SSR in a Netlify Edge function.

The edge function in `netlify/edge-functions/ssr.jsx` catches all paths in the app.

It provides the initial HTML wrapper for the app, the generated client bundle from Vite, and the server rendered React entry point, `src/entry.server.jsx`.

The `src/entry.client.jsx` is the client side entry point, and provides the routes for the app (defined in `routes.jsx`).

## Running locally

You can run this locally with `npm run start`.

You'll see that there is initial html content that is server rendered (from `app.jsx`), and then the components in `routes.jsx` are rendered on hydration.

Click on a link to see that the navigation is handled on the client side.

## Todo

- migrate from StaticRouter to createStaticRouter / createStaticHandler, so that the routes can be defined on the server, and not just on the client. (see docs here: https://reactrouter.com/6.28.2/guides/ssr#with-a-data-router)
  - an example of this is here: https://github.com/remix-run/react-router/tree/main/examples/ssr-data-router
- demonstrate how bundling / code splitting could work.
