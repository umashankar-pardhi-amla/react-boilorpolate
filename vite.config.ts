import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

const isTest = process.env.VITEST === "true" || process.env.VITEST === "1";
export default defineConfig({
  plugins: [
    tailwindcss(),
    ...(isTest ? [] : [reactRouter()]),
    tsconfigPaths(),
  ],
  server: {
    strictPort: false,
    hmr: true,
    watch: { usePolling: false },
  },
  optimizeDeps: {
    include: ["react", "react-dom", "antd", "zustand", "@tanstack/react-query", "axios"],
  },
  // @ts-expect-error Vitest extends Vite config with test
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./vitest.setup.ts"],
    include: ["tests/**/*.{test,spec}.{ts,tsx}"],
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html"],
      include: ["app/core/**/*.{ts,tsx}"],
      exclude: ["**/*.d.ts", "**/*.config.*", "**/__tests__/**", "**/*.test.*", "**/*.spec.*"],
    },
  },
});
