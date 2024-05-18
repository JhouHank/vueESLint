import {fileURLToPath, URL} from 'node:url';
import {defineConfig} from 'vite';
import vue from '@vitejs/plugin-vue';
import svgLoader from 'vite-svg-loader';
// vite-plugin-svg-icons
import eslintPlugin from 'vite-plugin-eslint';
import ViteRestart from 'vite-plugin-restart';
import {visualizer} from 'rollup-plugin-visualizer';
import Components from 'unplugin-vue-components/vite';
import vueSetupExtend from 'vite-plugin-vue-setup-extend';

export default defineConfig({
  plugins: [
    vue(),
    visualizer(),
    vueSetupExtend(),
    svgLoader(),
    ViteRestart({
      restart: ['.env.development'],
    }),
    // AutoImport({
    //   imports: ['vue', 'vue-router'],
    //   // dirs:['./hooks',], // 可以設定特定資料夾自動導入
    //   eslintrc: {
    //     enabled: true,
    //     filepath: './.eslintrc-auto-import.json',
    //     globalsPropValue: true,
    //   },
    // }),
    Components({
      dirs: ['src/components'], // 目標檔案夾
      extensions: ['vue', 'jsx'], // 文件類型
      // resolvers: [ElementPlusResolver()] // 解析器
      // dts: 'src/components.d.js' // 如果生成的 components.d.Js 文件內容有報錯就加這行
    }),
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
