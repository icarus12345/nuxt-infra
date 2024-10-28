import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import vue from '@vitejs/plugin-vue';
import path from 'path'

import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite'
import RadixResolver from 'radix-vue/resolver'

export default defineConfig({
    server: {
        host: '0.0.0.0',
        port: 5173,
    },
    plugins: [
        vue({ 
            template: {
                transformAssetUrls: {
                    base: null,
                    includeAbsolute: false,
                },
            },
        }),
        Components({
            dirs: [
                'resources/views',
                'resources/app',
                '../package/docs/components/demo',
            ],
            extensions: ['vue'],
            include: [/\.vue$/, /\.blade\.php$/],
            dts: true,
            deep: true,
            directoryAsNamespace: true,
            resolvers: [
                RadixResolver({
                    prefix: '',
                })
            ],
        }),
        AutoImport({
            // Tự động import các thư viện như vue, vue-router, ...
            dirs: [],
            imports: ['vue'],
            dts: true, // Tạo file TypeScript declarations
        }),
        laravel({
            input: [
                'resources/app/main.js',
                'resources/css/tailwind.css',
            ],
            refresh: true,
        }),
    ],
    css: {
        postcss: './postcss.config.ts',
    },
    resolve: { 
        alias: {
            'vue': 'vue/dist/vue.esm-bundler.js',
            '@': path.resolve(__dirname, './resources/app'),
        },
        extensions: ['.js', '.ts', '.jsx', '.tsx', '.json', '.vue', '.mjs']
    },
});
