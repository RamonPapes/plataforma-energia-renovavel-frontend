import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  // Em desenvolvimento, as chamadas para /api são repassadas ao backend (porta 3000).
  // Front e API ficam na mesma origem para o navegador, então não é preciso liberar CORS no backend.
  server: { proxy: { "/api": "http://localhost:3000" } },
});
