import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: "0.0.0.0", // This binds the server to 0.0.0.0, allowing external access
    port: 3000, // Change port if necessary
  },
});
