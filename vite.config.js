import {fileURLToPath, URL} from 'node:url';
import {defineConfig} from 'vite';
import vue from '@vitejs/plugin-vue';
import eslintPlugin from 'vite-plugin-eslint';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    eslintPlugin({
      // 在啟動專案和打包時進行檢查
      // 預設配置是如果檢查有error類型的問題就啟動、打包失敗
      cache: false,
      include: [
        'src/**/*.ts',
        'src/**/*.js',
        'src/**/**/*.vue',
        'src/**/**/**/*.vue',
        'src/**/**/**/**/*.vue',
        'src/*.ts',
        'src/*.vue',
      ],
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
});
