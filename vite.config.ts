import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'Petpal - Mood Tracker',
        short_name: 'Petpal',
        description: 'Your cute mood tracking companion',
        theme_color: '#ff6b9d',
        background_color: '#ffffff',
        display: 'standalone',
        orientation: 'portrait',
        icons: [
          {
            src: '/petpal-icon-192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/petpal-icon-512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
    }),
  ],
  server: {
    port: 3000,
    allowedHosts: ['3bb6453cb66c.ngrok-free.app'],
  },
  build: {
    outDir: 'dist',
  },
});
