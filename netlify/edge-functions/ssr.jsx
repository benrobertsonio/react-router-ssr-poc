/** @jsxImportSource react */
import {
  StaticRouterProvider,
  createStaticHandler,
  createStaticRouter,
} from "react-router-dom/server";

import React from "react";
import manifest from "../../dist/edge-manifest.js";
import { renderToReadableStream } from "react-dom/server";
import { routes } from "../../routes.jsx";

export default async (request, context) => {
  console.log("🚀 starting edge function");

  try {
    // do all the async router setup here instead of in ServerEntry
    console.log("🔍 creating static handler");
    const staticHandler = createStaticHandler(routes);

    console.log("🎯 getting context");
    const routerContext = await staticHandler.query(request);

    if (routerContext instanceof Response) {
      return routerContext;
    }

    console.log("🚀 creating router");
    const router = createStaticRouter(routes, routerContext);

    console.log("📦 getting client entry");
    const clientEntry = Object.values(manifest).find(
      (entry) => entry.isEntry && entry.name === "entry.client"
    );
    const clientPath = `/dist/${clientEntry.fileName}`;

    console.log("🎨 creating stream");
    const element = (
      <html>
        <head>
          <meta charset="UTF-8" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <title>Server Rendered App</title>
          <script type="module" src={clientPath}></script>
        </head>
        <body>
          <div id="root">
            <React.Suspense fallback="Loading...">
              <StaticRouterProvider
                router={router}
                context={routerContext}
                nonce="whatever" // this is a weird hack but sometimes helps
                hydrate={false} // try disabling hydration during ssr
              />
            </React.Suspense>
          </div>
        </body>
      </html>
      // <React.Suspense fallback="Loading...">

      // </React.Suspense>
    );

    const appHtml = await renderToReadableStream(element, {
      onError: (error) => {
        console.error("SSR Error:", {
          message: error.message,
          stack: error.stack,
          cause: error.cause,
          type: error.constructor.name,
        });
      },
      bootstrapScripts: [clientPath],
    });

    console.log("⏳ waiting for ready");
    await appHtml.allReady;
    console.log("✅ stream ready");

    const decoder = new TextDecoder();
    let html = "";
    const reader = appHtml.getReader();

    console.log("📖 reading stream");
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      html += decoder.decode(value);
    }
    console.log("📚 stream read complete");

    return new Response(html, {
      status: 200,
      headers: { "content-type": "text/html; charset=utf-8" },
    });
  } catch (error) {
    console.error("FATAL ERROR:", {
      message: error.message,
      stack: error.stack,
      cause: error.cause,
    });
    return new Response(`Server Error: ${error.message}`, { status: 500 });
  }
};

export const config = {
  path: "/*",
  // exclude all js from the edge function
  excludedPath: ["/dist/assets/*.js"],
};
