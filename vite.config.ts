import { defineConfig } from "vite";

export default defineConfig({
  build: {
    outDir: "dist", // Carpeta de salida
    rollupOptions: {
      input: "index.html", // Archivo de entrada principal
    },
  },
});

