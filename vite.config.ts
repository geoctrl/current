import { vitePlugin as remix } from "@remix-run/dev";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import dts from "vite-plugin-dts";
import vitePluginIconSprite from "./vite-plugin-icon-sprite";

export default defineConfig(async () => {
  return {
    plugins: [
      dts({
        insertTypesEntry: true,
      }),
      remix(),
      tsconfigPaths(),
      vitePluginIconSprite({ directory: "./icons" }),
    ],
    clearScreen: false,
  };
});
