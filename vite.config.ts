import { defineConfig } from "vite";
import viteReactPlugin from "@vitejs/plugin-react";

export default defineConfig({
  base: "/kws2100-kartbaserte-websystemer",
  plugins: [viteReactPlugin()],
});
