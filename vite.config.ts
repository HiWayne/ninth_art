import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { posix } from "path";

const resolve = (relativePath: string) =>
  posix.join(posix.resolve("./"), relativePath);

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: "0.0.0.0",
    port: 9590,
  },
  plugins: [react()],
  resolve: {
    alias: {
      pages: resolve("src/pages"),
      router: resolve("src/router"),
      "@": resolve("src"),
      shared: resolve("src/shared"),
      store: resolve("src/store"),
      assets: resolve("src/assets"),
      utils: resolve("src/shared/utils"),
    },
  },
});
