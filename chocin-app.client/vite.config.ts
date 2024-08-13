import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueDevTools from 'vite-plugin-vue-devtools'
import fs from 'fs';
import path from 'path';
import child_process from 'child_process';
import { env } from 'process';

import Components from 'unplugin-vue-components/vite';
import { PrimeVueResolver } from '@primevue/auto-import-resolver';

const baseFolder =
    env.APPDATA !== undefined && env.APPDATA !== ''
        ? `${env.APPDATA}/ASP.NET/https`
        : `${env.HOME}/.aspnet/https`;

const certificateName = "chocin-app.client";
const certFilePath = path.join(baseFolder, `${certificateName}.pem`);
const keyFilePath = path.join(baseFolder, `${certificateName}.key`);

if (!fs.existsSync(certFilePath) || !fs.existsSync(keyFilePath)) {
    if (0 !== child_process.spawnSync('dotnet', [
        'dev-certs',
        'https',
        '--export-path',
        certFilePath,
        '--format',
        'Pem',
        '--no-password',
    ], { stdio: 'inherit', }).status) {
        throw new Error("Could not create certificate.");
    }
}

const target = env.ASPNETCORE_HTTPS_PORT ? `https://localhost:${env.ASPNETCORE_HTTPS_PORT}` :
    env.ASPNETCORE_URLS ? env.ASPNETCORE_URLS.split(';')[0] : 'https://localhost:7055';

// https://vitejs.dev/config/
export default defineConfig({
    optimizeDeps: {
        noDiscovery: true
    },
    plugins: [
        vue(),
        vueDevTools(),
        Components({
            resolvers: [PrimeVueResolver()]
        })
    ],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url)),
            '@stores': fileURLToPath(new URL('./src/stores', import.meta.url)),
            '@components': fileURLToPath(new URL('./src/components', import.meta.url)),
            '@commons': fileURLToPath(new URL('./src/components', import.meta.url)),
            '@layouts': fileURLToPath(new URL('./src/layouts', import.meta.url)),
            '@views': fileURLToPath(new URL('./src/views', import.meta.url)),
        }
    },
    server: {
        proxy: {
            '/api': {
                target,
                secure: false
            },
        },
        port: 5173,
        https: {
            key: fs.readFileSync(keyFilePath),
            cert: fs.readFileSync(certFilePath),
        }
    },
    build: {
        ssr: false,
        reportCompressedSize: true,
        chunkSizeWarningLimit: 600,
        manifest: true,
        rollupOptions: {
            output: {
                globals: {
                    vue: 'Vue',
                },
                minifyInternalExports: true,
                manualChunks(id, {getModuleInfo}) {
                    if (id.includes('node_modules')) {
                        return id.toString().split('node_modules/')[1].split('/')[0].toString();
                    }
                    const match = /.*\.strings\.(\w+)\.js/.exec(id);
                    if (match) {
                        const language = match[1]; // e.g. "en"
                        const dependentEntryPoints = [];

                        // we use a Set here so we handle each module at most once. This
                        // prevents infinite loops in case of circular dependencies
                        // @ts-ignore
                        const idsToHandle = new Set(getModuleInfo(id).dynamicImporters);

                        for (const moduleId of idsToHandle) {
                            // @ts-ignore
                            const {isEntry, dynamicImporters, importers} =
                                getModuleInfo(moduleId);
                            if (isEntry || dynamicImporters.length > 0)
                                dependentEntryPoints.push(moduleId);

                            // The Set iterator is intelligent enough to iterate over
                            // elements that are added during iteration
                            for (const importerId of importers) idsToHandle.add(importerId);
                        }

                        // If there is a unique entry, we put it into a chunk based on the
                        // entry name
                        if (dependentEntryPoints.length === 1) {
                            return `${dependentEntryPoints[0].split('/').slice(-1)[0].split('.')[0]
                            }.strings.${language}`;
                        }
                        // For multiple entries, we put it into a "shared" chunk
                        if (dependentEntryPoints.length > 1) {
                            return `shared.strings.${language}`;
                        }
                    }
                }
            },
            external: ['Vue'],
        },
        modulePreload: {
            polyfill: true,
        },
        commonjsOptions: {
            include: [/node_modules/],
        },
    },
})
