import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path';
import { visualizer } from "rollup-plugin-visualizer";

// https://vite.dev/config/
export default defineConfig({
    define: {
        global: 'globalThis',
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src'), // point @ to src
        },
    },
    plugins: [
        react(),
        visualizer({
            filename: "stats.html", // report filename
            gzipSize: true,
            brotliSize: true,
        }),
    ],
    build: {
        rollupOptions: {
            output: {
                manualChunks(id) {
                    if (id.includes('node_modules/antd')) return 'antd';
                    if (id.includes('@codemirror/lang-sql')) return 'cm-lang-sql';
                    if (id.includes('@uiw/react-codemirror')) return 'uiw-cm';
                },
            },
        },
    },
})
