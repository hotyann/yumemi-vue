/// <reference types="vitest" />

import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vite';

import AutoImport from 'unplugin-auto-import/vite';

export default defineConfig({
  plugins: [
    vue(),
    AutoImport({ imports: ['vue'], dts: 'types/auto-imports.d.ts' }),
  ],
  test: {
    globals: true,
    environment: 'jsdom',
  },
});
