import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

import svgr from "vite-plugin-svgr";
// import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [svgr(), react()],
    server: {
        https: false,
    },
    build: {
        // rollupOptions: {
        //     external: ["react", "react-dom", "react-quill", "react-router-dom"],
        // },
    },
});
