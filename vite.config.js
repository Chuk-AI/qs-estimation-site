// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

export default defineConfig({
  plugins: [react()],
  base: "/qs-estimation-site/", //  ← repo name between slashes
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"), // lets you import like "@/components/..."
    },
  },
});
