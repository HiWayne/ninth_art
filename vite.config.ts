import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { posix } from "path";
import svgr from "vite-plugin-svgr";

const resolve = (relativePath: string) =>
  posix.join(posix.resolve("./"), relativePath);

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: "0.0.0.0",
    port: 9590,
    open: true,
  },
  plugins: [
    react(),
    svgr({
      // Set it to `true` to export React component as default.
      // Notice that it will overrides the default behavior of Vite.
      exportAsDefault: false,
      // svgr options: https://react-svgr.com/docs/options/
      svgrOptions: {
        typescript: true,
      },
      // esbuild options, to transform jsx to js
      esbuildOptions: {
        // ...
        loader: "tsx",
      },
      //  A minimatch pattern, or array of patterns, which specifies the files in the build the plugin should include. By default all svg files will be included.
      include: "**/*.svg",
      //  A minimatch pattern, or array of patterns, which specifies the files in the build the plugin should ignore. By default no files are ignored.
      exclude: "",
    }),
  ],
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
