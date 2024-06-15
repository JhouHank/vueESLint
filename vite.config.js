import {fileURLToPath, URL} from 'node:url';
import {defineConfig} from 'vite';
import vue from '@vitejs/plugin-vue';
import {createSvgIconsPlugin} from 'vite-plugin-svg-icons';
import path from 'path';
import eslintPlugin from 'vite-plugin-eslint';
import ViteRestart from 'vite-plugin-restart';
import {visualizer} from 'rollup-plugin-visualizer';
import Components from 'unplugin-vue-components/vite';
import vueSetupExtend from 'vite-plugin-vue-setup-extend';

export default defineConfig({
  // server: {
  //   proxy: {
  //     '/api': {
  //       target: '',
  //       changeOrigin: true,
  //       rewrite: (path) => path.replace(/^\/api/, ''),
  //     },
  //   },
  // },
  plugins: [
    vue(),
    visualizer(),
    vueSetupExtend(),
    ViteRestart({
      restart: ['.env.development'],
    }),
    createSvgIconsPlugin({
      // eslint-disable-next-line no-undef
      iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
      symbolId: '[name]',
    }),
    Components({
      dirs: ['src/components'], // 目標檔案夾
      extensions: ['vue', 'jsx'], // 文件類型
      // resolvers: [ElementPlusResolver()] // 解析器
      // dts: 'src/components.d.js' // 如果生成的 components.d.js 文件內容有報錯就加這行
    }),
    // // mock支持
    // vitePluginFakeServer({
    //   logger: false,
    //   include: "mock",
    //   infixName: false,
    //   enableProd: true
    // }),
    eslintPlugin({
      // 在啟動專案和打包時進行檢查
      // 預設配置是如果檢查有error類型的問題就啟動、打包失敗
      cache: false,
    }),
  ],
  resolve: {
    extensions: ['.js', '.ts', '.json'], // 導入時想要省略的擴展名列表
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    // assetsInlineLimit: 4096, // 圖片轉 base64 編碼的閾值
    rollupOptions: {
      output: {
        chunkFileNames: 'js/[name]-[hash].js', // 打包文件的名稱
        entryFileNames: 'js/[name]-[hash].js', // 入口文件的名稱
        assetFileNames: '[ext]/[name]-[hash].[ext]', // 靜態資源如字體，圖片等
      },
    },
  },
  rollupOptions: {
    output: {
      manualChunks(id) {
        if (id.includes('node_modules')) {
          // 讓每個插件都外帶成獨立的文件
          return id
            .toString()
            .split('node_modules/')[1]
            .split('/')[0]
            .toString();
        }
      },
    },
  },
  esbuild: {
    drop: ['console', 'debugger'],
  },
});
