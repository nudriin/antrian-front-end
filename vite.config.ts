import { defineConfig } from "vite"
import react from "@vitejs/plugin-react-swc"
import path from "path"

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    server: {
        proxy: {
            "/api": {
                target: "http://localhost:5000",
                changeOrigin: true,
            },
        },
        watch: {
            usePolling: true,
        },
    },
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
        },
    },
})
