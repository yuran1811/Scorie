import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';
import tsconfigPaths from 'vite-tsconfig-paths';
import dns from 'dns';

dns.setDefaultResultOrder('verbatim');

export default defineConfig({
  server: { port: 1811 },
  plugins: [
    react(),
    tsconfigPaths(),
    VitePWA({
      devOptions: { enabled: true },
      registerType: 'autoUpdate',
      workbox: { globPatterns: ['**/*.{js,css,html,ico,png,svg}'] },
      includeAssets: ['**/*.{js,css,html,ico,png,svg}', 'QRCode.png'],
      manifest: {
        name: 'Scorie',
        short_name: 'Scorie',
        description: 'For your better school life',
        scope: '/',
        start_url: '/',
        display: 'standalone',
        orientation: 'portrait',
        theme_color: '#3730a3',
        background_color: '#3730a3',
        prefer_related_applications: true,
        icons: [
          {
            src: 'favicon.ico',
            sizes: '64x64 32x32 24x24 16x16',
            type: 'image/x-icon',
            purpose: 'maskable',
          },
          { src: 'logo192.png', type: 'image/png', sizes: '192x192' },
          { src: 'logo512.png', type: 'image/png', sizes: '512x512' },
          { src: 'QRCode.png', type: 'image/png' },
        ],
        shortcuts: [
          {
            name: 'Note Feature',
            short_name: 'Note',
            description: 'Full note features',
            url: '/notes',
            icons: [{ src: 'logo192.png', type: 'image/png', sizes: '192x192' }],
          },
          {
            name: 'Score Feature',
            short_name: 'Score',
            description: 'Full score features',
            url: '/scores',
            icons: [{ src: 'logo192.png', type: 'image/png', sizes: '192x192' }],
          },
          {
            name: 'Analytics Feature',
            short_name: 'Analytics',
            description: 'Full analytics features',
            url: '/analytics',
            icons: [{ src: 'logo192.png', type: 'image/png', sizes: '192x192' }],
          },
        ],
      },
    }),
  ],
});
