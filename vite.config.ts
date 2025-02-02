import { defineConfig } from "vite";

export default defineConfig({
  base: "/kws2100-kartbaserte-websystemer",
  server: {
    proxy: {
      "/kws2100-kartbaserte-websystemer/api": "http://localhost:3000",
    },
  },
});
