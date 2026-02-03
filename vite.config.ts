import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { visualizer } from "rollup-plugin-visualizer";

const isAnalyze = process.env.ANALYZE === "true" || process.env.ANALYZE === "1";

export default defineConfig({
  plugins: [tailwindcss(), reactRouter(), tsconfigPaths()],
  build: {
    rollupOptions: {
      plugins: isAnalyze ? [visualizer({ open: false, filename: "build/stats.html", gzipSize: true })] : [],
    },
  },
  server: {
    strictPort: false,
    hmr: true,
    watch: { usePolling: false },
  },
  optimizeDeps: {
    include: ["react", "react-dom", "antd", "zustand", "@tanstack/react-query", "axios"],
  },
});
