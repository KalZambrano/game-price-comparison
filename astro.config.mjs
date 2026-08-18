import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  integrations: [react(), tailwind()],
  output: 'static',
  vite: {
    optimizeDeps: {
      // Se importan solo desde islas cliente, asi que Vite las descubriria
      // tarde y re-optimizaria en caliente (504 Outdated Optimize Dep).
      include: ['react-icons/fa', 'react-icons/tb', 'react-icons/md']
    }
  }
});
