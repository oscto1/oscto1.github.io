import { defineConfig } from "vite";

export default defineConfig(({ mode }) => ({
  base: mode === "dev"
    ? "/portfolio-dev/"
    : "/",

  build: {
    target: 'chrome80',
  }
}));