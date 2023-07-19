import react from '@vitejs/plugin-react';
import dns from 'dns';
import { visualizer } from 'rollup-plugin-visualizer';
import { PluginOption } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';
import tsconfigPaths from 'vite-tsconfig-paths';
import { configDefaults, defineConfig } from 'vitest/config';

dns.setDefaultResultOrder('verbatim');

export default defineConfig({
  server: { port: 1811 },
  test: { name: 'scorie', exclude: [...configDefaults.exclude] },
  plugins: [
    react(),
    tsconfigPaths(),
    visualizer({
      template: 'sunburst', // treemap or sunburst
      open: true,
      gzipSize: true,
      brotliSize: true,
      filename: 'analyse.html',
    }) as PluginOption,
    VitePWA({
      devOptions: { enabled: true },
      registerType: 'autoUpdate',
      workbox: { globPatterns: ['**/*.{js,css,html,ico,png,svg}'] },
      includeAssets: ['**/*.{js,css,html,ico,png,svg}'],
      manifest: {
        name: 'Scorie',
        short_name: 'Scorie',
        description: 'For your better school life',
        scope: '/',
        start_url: '/',
        display: 'standalone',
        orientation: 'portrait',
        theme_color: '#150731',
        background_color: '#150731',
        prefer_related_applications: true,
        icons: [
          {
            src: 'favicon.ico',
            sizes: '64x64 32x32 24x24 16x16',
            type: 'image/x-icon',
            purpose: 'maskable',
          },
          {
            src: '/android/android-chrome-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/android/android-chrome-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
        shortcuts: [
          {
            name: 'Note Page',
            short_name: 'Note',
            description: 'Goto note page',
            url: '/notes',
            icons: [{ src: '/android/android-chrome-192x192.png', type: 'image/png', sizes: '192x192' }],
          },
          {
            name: 'Score Manage',
            short_name: 'Score',
            description: 'Goto score page',
            url: '/subjects',
            icons: [{ src: '/android/android-chrome-192x192.png', type: 'image/png', sizes: '192x192' }],
          },
          {
            name: 'Analytics',
            short_name: 'Analytics',
            description: 'Goto analytics page',
            url: '/analytics',
            icons: [{ src: '/android/android-chrome-192x192.png', type: 'image/png', sizes: '192x192' }],
          },
          {
            name: 'Tools',
            short_name: 'Tools',
            description: 'Goto tools page',
            url: '/tools',
            icons: [{ src: '/android/android-chrome-192x192.png', type: 'image/png', sizes: '192x192' }],
          },
        ],
      },
    }),
  ],
});
