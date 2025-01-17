import { defineConfig } from "vite";
import fs from "fs";
import path from "path";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [
    react(),
    // {
    //   name: "generate-manifest-js",
    //   closeBundle() {
    //     // read vite's manifest
    //     const manifest = fs.readFileSync(
    //       path.join(__dirname, "dist", ".vite", "manifest.json"),
    //       "utf-8"
    //     );

    //     // write it as a js module
    //     fs.writeFileSync(
    //       path.join(__dirname, "netlify/edge-functions/manifest.js"),
    //       `export default ${manifest};`
    //     );
    //   },
    // },
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
