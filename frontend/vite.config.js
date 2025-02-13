import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:5000",
        changeOrigin: true,  // ✅ Helps with CORS issues
        secure: false,       // ✅ Allows HTTP (if the backend is not using HTTPS)
      },
    },
  },
});
