import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000
  },
  resolve: {
       alias: {
         "@styles": path.resolve(__dirname, "src/styles"),
         "@components": path.resolve(__dirname, "src/components"),
         "@pages": path.resolve(__dirname, "src/pages")
       },
     },
     css: {
       preprocessorOptions: {
         scss: {
           additionalData: `@use "@styles/abstracts/variables" as vars;\n`,
         },
       },
     },
})
