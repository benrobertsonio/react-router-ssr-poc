import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    manifest: true,
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
