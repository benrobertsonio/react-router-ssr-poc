/** @jsxImportSource react */
import ServerEntry from "../../src/entry.server.jsx";
import manifest from "../../dist/edge-manifest.js";
import { renderToString } from "react-dom/server";

export default async (request, context) => {
  const url = new URL(request.url);

  // Get the client entry bundle.
  const clientEntry = Object.values(manifest).find(
    (entry) => entry.isEntry && entry.name === "entry.client"
  );
  const clientPath = `/dist/${clientEntry.fileName}`;

  // serve html
  const appHtml = renderToString(<ServerEntry url={url} />);

  return new Response(
    `<!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Server Rendered App</title>
        <script type="module" src="${clientPath}"></script>
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

export const config = {
  path: "/*",
  // exclude all js from the edge function
  excludedPath: ["/dist/assets/*.js"],
};
