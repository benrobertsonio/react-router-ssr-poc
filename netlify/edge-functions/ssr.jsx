/** @jsxImportSource react */
import App from "../../src/App.jsx";
import { StaticRouter } from "react-router-dom/server";
import { renderToString } from "react-dom/server";

export default async (request, context) => {
  const url = new URL(request.url);

  let manifest = {};
  try {
    const manifestResp = await context.json(
      "/.netlify/edge-functions/manifest.json"
    );
    manifest = await manifestResp.json();
    console.log("loaded manifest:", manifest);
  } catch (e) {
    console.error("Failed to load manifest:", e);
  }

  const clientEntry =
    manifest["client-entry.jsx"]?.file || "/assets/client-entry-C8fnGiLJ.js";
  console.log("using client entry:", clientEntry);

  const appHtml = renderToString(
    <StaticRouter location={url.pathname}>
      <App />
    </StaticRouter>
  );

  return new Response(
    `<!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>My App</title>
        <script type="module" src="${clientEntry}"></script>
      </head>
      <body>
        <div id="root">${appHtml}</div>
      </body>
    </html>`,
    {
      headers: { "content-type": "text/html; charset=utf-8" },
    }
  );
};
