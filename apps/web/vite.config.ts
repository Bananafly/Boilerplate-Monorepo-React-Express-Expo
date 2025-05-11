import path from 'path';

import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import viteTsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  base: '/',
  plugins: [react(), viteTsconfigPaths()],
  build: {
    sourcemap: false,
  },
  server: {
    port: parseInt(process.env.PORT || '5173', 10),
  },
  preview: {
    port: 4173,
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/testing/setup-tests.ts',
    exclude: ['**/node_modules/**', '**/e2e/**'],
    coverage: {
      include: ['src/**'],
    },
  },
  optimizeDeps: { exclude: ['fsevents'] },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'), // Add this alias configuration
    },
  },
});
