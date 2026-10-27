import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  base: '/je4nizar-portfolio/',
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'k8s-sample-architecture-aws.png'],
      manifest: {
        name: 'DevOps & Cloud Architecture Portfolio',
        short_name: 'DevOpsPortfolio',
        description: 'Interactive 3D walkthrough of Cloud & Microservices Architectures',
        theme_color: '#0f172a',
        background_color: '#0f172a',
        display: 'standalone',
        icons: [
          {
            src: 'k8s-sample-architecture-aws.png',
            sizes: '192x192',
            type: 'image/png'
          }
        ]
      }
    })
  ]
});
