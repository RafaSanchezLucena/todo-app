import { defineConfig } from 'vite'
import { resolve } from "path"

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve("index.html"),
        contacta: resolve("contacta.html"),
      },
    },
  },
});