import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';
import { defineConfig, loadEnv } from 'vite';
import type { Plugin } from 'vite';

// Custom plugin to serve Award_Images folder as static assets at /Award_Images/
function awardImagesPlugin(): Plugin {
  const imagesDir = path.resolve(__dirname, 'Award_Images');
  return {
    name: 'award-images-static',
    configureServer(server) {
      server.middlewares.use('/Award_Images', (req, res, next) => {
        const filePath = path.join(imagesDir, decodeURIComponent(req.url || ''));
        if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
          res.setHeader('Cache-Control', 'public, max-age=3600');
          const ext = path.extname(filePath).toLowerCase();
          const mimeTypes: Record<string, string> = {
            '.jpg': 'image/jpeg',
            '.jpeg': 'image/jpeg',
            '.png': 'image/png',
            '.gif': 'image/gif',
            '.webp': 'image/webp',
            '.heic': 'image/heic',
          };
          res.setHeader('Content-Type', mimeTypes[ext] || 'application/octet-stream');
          fs.createReadStream(filePath).pipe(res);
        } else {
          next();
        }
      });
    },
  };
}

// Custom plugin to serve Clients folder as static assets at /Clients/
function clientsPlugin(): Plugin {
  const clientsDir = path.resolve(__dirname, 'Clients');
  return {
    name: 'clients-static',
    configureServer(server) {
      server.middlewares.use('/Clients', (req, res, next) => {
        const filePath = path.join(clientsDir, decodeURIComponent(req.url || ''));
        if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
          res.setHeader('Cache-Control', 'public, max-age=3600');
          const ext = path.extname(filePath).toLowerCase();
          const mimeTypes: Record<string, string> = {
            '.jpg': 'image/jpeg',
            '.jpeg': 'image/jpeg',
            '.png': 'image/png',
            '.gif': 'image/gif',
            '.webp': 'image/webp',
          };
          res.setHeader('Content-Type', mimeTypes[ext] || 'application/octet-stream');
          fs.createReadStream(filePath).pipe(res);
        } else {
          next();
        }
      });
    },
  };
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');
  return {
    plugins: [react(), tailwindcss(), awardImagesPlugin(), clientsPlugin()],
    define: {
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify - file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
    },
  };
});
