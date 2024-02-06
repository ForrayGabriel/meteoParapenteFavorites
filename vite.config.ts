import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import * as path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      {
        find: "Shared",
        replacement: path.resolve(__dirname, "./src/Shared"),
      },
    ],
  },
  server: {
    proxy: {
      "/api": {
        target: "http://data0.meteo-parapente.com",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
});
