import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { crx } from '@crxjs/vite-plugin';
import manifest from './manifest.json';
import UnoCSS from 'unocss/vite';

export default defineConfig({
  base: './', // 确保资源路径为相对路径
  resolve: {
    alias: {
      '@/': `${path.resolve(__dirname, 'src')}/`,
    },
  },
  define: {
    'process.env': process.env,
  },
  server: {
    host: 'localhost',
    cors: true,
    proxy: {
      '/dev': {
        target: 'https://web3ai.cloud/dev',
        // target: "http://18.205.246.62:3000",
        // target: 'http://localhost:3000',
        secure: false,
        ws: true,
        changeOrigin: true,
        rewrite: path => path.replace(/^\/dev/, ''), // 将/api重写为空
      },
      '/api': {
        target: 'https://web3ai.cloud/api',
        // target: "http://18.205.246.62:3000",
        // target: 'http://localhost:3000',
        secure: false,
        ws: true,
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, ''), // 将/api重写为空
      },
    },
  },
  // 构建
  build: {
    // target: 'es2015',
    minify: 'terser',
    sourcemap: process.env.VITE_APP_ENV === 'develement', // 是否产出sourcemap.json
    outDir: 'build', // 产出目录
    // polyfillModulePreload: true, // 预加载polyfillModule
    commonjsOptions: {
      transformMixedEsModules: true,
    },
    rollupOptions: {
      // external: ['@walletconnect/jsonrpc-types', '@walletconnect/jsonrpc-utils'],
      input: {
        main: path.resolve(__dirname, 'index.html'),
      },
    },
  },
  plugins: [react(), UnoCSS(), crx({ manifest })],
  assetsInclude: ['**/*.ttf'],
});
