import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// During development requests to /api/v1 are proxied to Django.
// In deployment, set VITE_API_BASE_URL to the public Django /api/v1 URL.
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    strictPort: true,
    proxy: {
      "/api": {
        target: "http://127.0.0.1:8000",
        changeOrigin: true,
      },
    },
  },
});
