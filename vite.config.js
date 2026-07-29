import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Dev-server proxy so the frontend can call relative /api/* paths without
// hardcoding the backend origin - see src/services/api.js.
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:8000",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
});
