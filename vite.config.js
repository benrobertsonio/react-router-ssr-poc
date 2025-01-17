import { defineConfig } from "vite";
import fs from "fs";
import path from "path";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [
    react(),
    {
      name: "inject-manifest",
      generateBundle(options, bundle) {
        // create a virtual module with our manifest data
        const manifestContent = `export default ${JSON.stringify(bundle)}`;

        this.emitFile({
          type: "asset",
          fileName: "edge-manifest.js",
          source: manifestContent,
        });
      },
    },
  ],
  build: {
    manifest: true,
    outDir: "dist",
    rollupOptions: {
      input: "src/client-entry.jsx",
    },
  },
  resolve: {
    alias: {
      react: "https://esm.sh/v135/react@18.2.0",
      "react-dom": "https://esm.sh/v135/react-dom@18.2.0",
      "react-dom/client": "https://esm.sh/v135/react-dom@18.2.0/client",
      "react-router-dom": "https://esm.sh/v135/react-router-dom@6.20.0",
    },
  },
});
