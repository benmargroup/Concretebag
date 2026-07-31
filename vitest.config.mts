import { defineConfig } from "vitest/config";
import path from "node:path";

const rootDir = import.meta.dirname;

export default defineConfig({
  resolve: {
    alias: {
      "@data": path.resolve(rootDir, "data"),
      "@": path.resolve(rootDir, "src"),
    },
  },
});
