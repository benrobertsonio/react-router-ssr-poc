/** @jsxImportSource react */
import App from "../../src/App.jsx";
import { StaticRouter } from "react-router-dom/server";
// import manifest from "../../dist/.vite/manifest.json";
import { renderToString } from "react-dom/server";

export default async (request, context) => {
  console.log({ request, context });
  const url = context.url;
  const appHtml = renderToString(
    <StaticRouter location={url}>
      <App />
    </StaticRouter>
  );
  // <script type="module" src="${manifest["src/client-entry.jsx"].file}"></script>

  return new Response(
    `<!DOCTYPE html>
    <html>
    <head>
    <title>My App</title>
        
      </head>
      <body>
        <div id="root">${appHtml}</div>
      </body>
    </html>`,
    {
      headers: { "content-type": "text/html" },
    }
  );
};
