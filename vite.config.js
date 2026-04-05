import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    build: {
        chunkSizeWarningLimit: 500,
        outDir: "dist",
        rollupOptions: {
            output: {
                manualChunks: {
                    "vendor-react": ["react", "react-dom", "react-router-dom"],
                    "vendor-gsap": ["gsap"],
                    "vendor-lenis": ["lenis"],
                },
            },
        },
    },
    server: {
        port: 3000,
    },
});
