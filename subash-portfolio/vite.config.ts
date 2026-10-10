import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// base "./" makes the build work on <user>.github.io and on project pages alike.
export default defineConfig({
  plugins: [react()],
  base: "./",
});
