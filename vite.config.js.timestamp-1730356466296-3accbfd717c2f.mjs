// vite.config.js
import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "file:///D:/Download/%E9%9A%A8%E6%84%8F/vueESLint/node_modules/vite/dist/node/index.js";
import vue from "file:///D:/Download/%E9%9A%A8%E6%84%8F/vueESLint/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import { createSvgIconsPlugin } from "file:///D:/Download/%E9%9A%A8%E6%84%8F/vueESLint/node_modules/vite-plugin-svg-icons/dist/index.mjs";
import path from "path";
import eslintPlugin from "file:///D:/Download/%E9%9A%A8%E6%84%8F/vueESLint/node_modules/vite-plugin-eslint/dist/index.mjs";
import ViteRestart from "file:///D:/Download/%E9%9A%A8%E6%84%8F/vueESLint/node_modules/vite-plugin-restart/dist/index.js";
import { visualizer } from "file:///D:/Download/%E9%9A%A8%E6%84%8F/vueESLint/node_modules/rollup-plugin-visualizer/dist/plugin/index.js";
import Components from "file:///D:/Download/%E9%9A%A8%E6%84%8F/vueESLint/node_modules/unplugin-vue-components/dist/vite.js";
import vueSetupExtend from "file:///D:/Download/%E9%9A%A8%E6%84%8F/vueESLint/node_modules/vite-plugin-vue-setup-extend/dist/index.mjs";
import { vitePluginFakeServer } from "file:///D:/Download/%E9%9A%A8%E6%84%8F/vueESLint/node_modules/vite-plugin-fake-server/dist/index.mjs";
var __vite_injected_original_import_meta_url = "file:///D:/Download/%E9%9A%A8%E6%84%8F/vueESLint/vite.config.js";
var vite_config_default = defineConfig({
  // server: {
  //   proxy: {
  //     '/api': {
  //       target: '',
  //       changeOrigin: true,
  //       rewrite: (path) => {
  //         const newPath = path.replace(/^\/api/, '');
  //         console.log('Rewriting path from:', path, 'to:', newPath);
  //         return newPath;
  //       },
  //     },
  //   },
  // },
  plugins: [
    vue(),
    visualizer(),
    vueSetupExtend(),
    vitePluginFakeServer(),
    ViteRestart({
      restart: ["vite.config.js", ".env.development"]
    }),
    createSvgIconsPlugin({
      // eslint-disable-next-line no-undef
      iconDirs: [path.resolve(process.cwd(), "src/assets/icons")],
      symbolId: "[name]"
    }),
    Components({
      dirs: ["src/components"],
      // 目標檔案夾
      extensions: ["vue", "jsx"]
      // 文件類型
      // resolvers: [ElementPlusResolver()] // 解析器
      // dts: 'src/components.d.js' // 如果生成的 components.d.js 文件內容有報錯就加這行
    }),
    eslintPlugin({
      // 在啟動專案和打包時進行檢查
      // 預設配置是如果檢查有error類型的問題就啟動、打包失敗
      cache: false
    })
  ],
  resolve: {
    extensions: [".js", ".ts", ".json"],
    // 導入時想要省略的擴展名列表
    alias: {
      "@": fileURLToPath(new URL("./src", __vite_injected_original_import_meta_url))
    }
  },
  build: {
    // assetsInlineLimit: 4096, // 圖片轉 base64 編碼的閾值
    rollupOptions: {
      output: {
        chunkFileNames: "js/[name]-[hash].js",
        // 打包文件的名稱
        entryFileNames: "js/[name]-[hash].js",
        // 入口文件的名稱
        assetFileNames: "[ext]/[name]-[hash].[ext]"
        // 靜態資源如字體，圖片等
      }
    }
  },
  rollupOptions: {
    output: {
      manualChunks(id) {
        if (id.includes("node_modules")) {
          return id.toString().split("node_modules/")[1].split("/")[0].toString();
        }
      }
    }
  },
  esbuild: {
    drop: ["console", "debugger"]
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxEb3dubG9hZFxcXFxcdTk2QThcdTYxMEZcXFxcdnVlRVNMaW50XCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJEOlxcXFxEb3dubG9hZFxcXFxcdTk2QThcdTYxMEZcXFxcdnVlRVNMaW50XFxcXHZpdGUuY29uZmlnLmpzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9EOi9Eb3dubG9hZC8lRTklOUElQTglRTYlODQlOEYvdnVlRVNMaW50L3ZpdGUuY29uZmlnLmpzXCI7aW1wb3J0IHsgZmlsZVVSTFRvUGF0aCwgVVJMIH0gZnJvbSAnbm9kZTp1cmwnO1xuaW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSc7XG5pbXBvcnQgdnVlIGZyb20gJ0B2aXRlanMvcGx1Z2luLXZ1ZSc7XG5pbXBvcnQgeyBjcmVhdGVTdmdJY29uc1BsdWdpbiB9IGZyb20gJ3ZpdGUtcGx1Z2luLXN2Zy1pY29ucyc7XG5pbXBvcnQgcGF0aCBmcm9tICdwYXRoJztcbmltcG9ydCBlc2xpbnRQbHVnaW4gZnJvbSAndml0ZS1wbHVnaW4tZXNsaW50JztcbmltcG9ydCBWaXRlUmVzdGFydCBmcm9tICd2aXRlLXBsdWdpbi1yZXN0YXJ0JztcbmltcG9ydCB7IHZpc3VhbGl6ZXIgfSBmcm9tICdyb2xsdXAtcGx1Z2luLXZpc3VhbGl6ZXInO1xuaW1wb3J0IENvbXBvbmVudHMgZnJvbSAndW5wbHVnaW4tdnVlLWNvbXBvbmVudHMvdml0ZSc7XG5pbXBvcnQgdnVlU2V0dXBFeHRlbmQgZnJvbSAndml0ZS1wbHVnaW4tdnVlLXNldHVwLWV4dGVuZCc7XG5pbXBvcnQgeyB2aXRlUGx1Z2luRmFrZVNlcnZlciB9IGZyb20gJ3ZpdGUtcGx1Z2luLWZha2Utc2VydmVyJztcblxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcbiAgLy8gc2VydmVyOiB7XG4gIC8vICAgcHJveHk6IHtcbiAgLy8gICAgICcvYXBpJzoge1xuICAvLyAgICAgICB0YXJnZXQ6ICcnLFxuICAvLyAgICAgICBjaGFuZ2VPcmlnaW46IHRydWUsXG4gIC8vICAgICAgIHJld3JpdGU6IChwYXRoKSA9PiB7XG4gIC8vICAgICAgICAgY29uc3QgbmV3UGF0aCA9IHBhdGgucmVwbGFjZSgvXlxcL2FwaS8sICcnKTtcbiAgLy8gICAgICAgICBjb25zb2xlLmxvZygnUmV3cml0aW5nIHBhdGggZnJvbTonLCBwYXRoLCAndG86JywgbmV3UGF0aCk7XG4gIC8vICAgICAgICAgcmV0dXJuIG5ld1BhdGg7XG4gIC8vICAgICAgIH0sXG4gIC8vICAgICB9LFxuICAvLyAgIH0sXG4gIC8vIH0sXG4gIHBsdWdpbnM6IFtcbiAgICB2dWUoKSxcbiAgICB2aXN1YWxpemVyKCksXG4gICAgdnVlU2V0dXBFeHRlbmQoKSxcbiAgICB2aXRlUGx1Z2luRmFrZVNlcnZlcigpLFxuICAgIFZpdGVSZXN0YXJ0KHtcbiAgICAgIHJlc3RhcnQ6IFsndml0ZS5jb25maWcuanMnLCAnLmVudi5kZXZlbG9wbWVudCddLFxuICAgIH0pLFxuICAgIGNyZWF0ZVN2Z0ljb25zUGx1Z2luKHtcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bmRlZlxuICAgICAgaWNvbkRpcnM6IFtwYXRoLnJlc29sdmUocHJvY2Vzcy5jd2QoKSwgJ3NyYy9hc3NldHMvaWNvbnMnKV0sXG4gICAgICBzeW1ib2xJZDogJ1tuYW1lXScsXG4gICAgfSksXG4gICAgQ29tcG9uZW50cyh7XG4gICAgICBkaXJzOiBbJ3NyYy9jb21wb25lbnRzJ10sIC8vIFx1NzZFRVx1NkExOVx1NkE5NFx1Njg0OFx1NTkzRVxuICAgICAgZXh0ZW5zaW9uczogWyd2dWUnLCAnanN4J10sIC8vIFx1NjU4N1x1NEVGNlx1OTg1RVx1NTc4QlxuICAgICAgLy8gcmVzb2x2ZXJzOiBbRWxlbWVudFBsdXNSZXNvbHZlcigpXSAvLyBcdTg5RTNcdTY3OTBcdTU2NjhcbiAgICAgIC8vIGR0czogJ3NyYy9jb21wb25lbnRzLmQuanMnIC8vIFx1NTk4Mlx1Njc5Q1x1NzUxRlx1NjIxMFx1NzY4NCBjb21wb25lbnRzLmQuanMgXHU2NTg3XHU0RUY2XHU1MTY3XHU1QkI5XHU2NzA5XHU1ODMxXHU5MzJGXHU1QzMxXHU1MkEwXHU5MDE5XHU4ODRDXG4gICAgfSksXG4gICAgZXNsaW50UGx1Z2luKHtcbiAgICAgIC8vIFx1NTcyOFx1NTU1Rlx1NTJENVx1NUMwOFx1Njg0OFx1NTQ4Q1x1NjI1M1x1NTMwNVx1NjY0Mlx1OTAzMlx1ODg0Q1x1NkFBMlx1NjdFNVxuICAgICAgLy8gXHU5ODEwXHU4QTJEXHU5MTREXHU3RjZFXHU2NjJGXHU1OTgyXHU2NzlDXHU2QUEyXHU2N0U1XHU2NzA5ZXJyb3JcdTk4NUVcdTU3OEJcdTc2ODRcdTU1NEZcdTk4NENcdTVDMzFcdTU1NUZcdTUyRDVcdTMwMDFcdTYyNTNcdTUzMDVcdTU5MzFcdTY1NTdcbiAgICAgIGNhY2hlOiBmYWxzZSxcbiAgICB9KSxcbiAgXSxcbiAgcmVzb2x2ZToge1xuICAgIGV4dGVuc2lvbnM6IFsnLmpzJywgJy50cycsICcuanNvbiddLCAvLyBcdTVDMEVcdTUxNjVcdTY2NDJcdTYwRjNcdTg5ODFcdTc3MDFcdTc1NjVcdTc2ODRcdTY0RjRcdTVDNTVcdTU0MERcdTUyMTdcdTg4NjhcbiAgICBhbGlhczoge1xuICAgICAgJ0AnOiBmaWxlVVJMVG9QYXRoKG5ldyBVUkwoJy4vc3JjJywgaW1wb3J0Lm1ldGEudXJsKSksXG4gICAgfSxcbiAgfSxcbiAgYnVpbGQ6IHtcbiAgICAvLyBhc3NldHNJbmxpbmVMaW1pdDogNDA5NiwgLy8gXHU1NzE2XHU3MjQ3XHU4RjQ5IGJhc2U2NCBcdTdERThcdTc4QkNcdTc2ODRcdTk1QkVcdTUwM0NcbiAgICByb2xsdXBPcHRpb25zOiB7XG4gICAgICBvdXRwdXQ6IHtcbiAgICAgICAgY2h1bmtGaWxlTmFtZXM6ICdqcy9bbmFtZV0tW2hhc2hdLmpzJywgLy8gXHU2MjUzXHU1MzA1XHU2NTg3XHU0RUY2XHU3Njg0XHU1NDBEXHU3QTMxXG4gICAgICAgIGVudHJ5RmlsZU5hbWVzOiAnanMvW25hbWVdLVtoYXNoXS5qcycsIC8vIFx1NTE2NVx1NTNFM1x1NjU4N1x1NEVGNlx1NzY4NFx1NTQwRFx1N0EzMVxuICAgICAgICBhc3NldEZpbGVOYW1lczogJ1tleHRdL1tuYW1lXS1baGFzaF0uW2V4dF0nLCAvLyBcdTk3NUNcdTYxNEJcdThDQzdcdTZFOTBcdTU5ODJcdTVCNTdcdTlBRDRcdUZGMENcdTU3MTZcdTcyNDdcdTdCNDlcbiAgICAgIH0sXG4gICAgfSxcbiAgfSxcbiAgcm9sbHVwT3B0aW9uczoge1xuICAgIG91dHB1dDoge1xuICAgICAgbWFudWFsQ2h1bmtzKGlkKSB7XG4gICAgICAgIGlmIChpZC5pbmNsdWRlcygnbm9kZV9tb2R1bGVzJykpIHtcbiAgICAgICAgICAvLyBcdThCOTNcdTZCQ0ZcdTUwMEJcdTYzRDJcdTRFRjZcdTkwRkRcdTU5MTZcdTVFMzZcdTYyMTBcdTczNjhcdTdBQ0JcdTc2ODRcdTY1ODdcdTRFRjZcbiAgICAgICAgICByZXR1cm4gaWRcbiAgICAgICAgICAgIC50b1N0cmluZygpXG4gICAgICAgICAgICAuc3BsaXQoJ25vZGVfbW9kdWxlcy8nKVsxXVxuICAgICAgICAgICAgLnNwbGl0KCcvJylbMF1cbiAgICAgICAgICAgIC50b1N0cmluZygpO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgIH0sXG4gIH0sXG4gIGVzYnVpbGQ6IHtcbiAgICBkcm9wOiBbJ2NvbnNvbGUnLCAnZGVidWdnZXInXSxcbiAgfSxcbn0pO1xuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUFrUixTQUFTLGVBQWUsV0FBVztBQUNyVCxTQUFTLG9CQUFvQjtBQUM3QixPQUFPLFNBQVM7QUFDaEIsU0FBUyw0QkFBNEI7QUFDckMsT0FBTyxVQUFVO0FBQ2pCLE9BQU8sa0JBQWtCO0FBQ3pCLE9BQU8saUJBQWlCO0FBQ3hCLFNBQVMsa0JBQWtCO0FBQzNCLE9BQU8sZ0JBQWdCO0FBQ3ZCLE9BQU8sb0JBQW9CO0FBQzNCLFNBQVMsNEJBQTRCO0FBVjBILElBQU0sMkNBQTJDO0FBWWhOLElBQU8sc0JBQVEsYUFBYTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsRUFjMUIsU0FBUztBQUFBLElBQ1AsSUFBSTtBQUFBLElBQ0osV0FBVztBQUFBLElBQ1gsZUFBZTtBQUFBLElBQ2YscUJBQXFCO0FBQUEsSUFDckIsWUFBWTtBQUFBLE1BQ1YsU0FBUyxDQUFDLGtCQUFrQixrQkFBa0I7QUFBQSxJQUNoRCxDQUFDO0FBQUEsSUFDRCxxQkFBcUI7QUFBQTtBQUFBLE1BRW5CLFVBQVUsQ0FBQyxLQUFLLFFBQVEsUUFBUSxJQUFJLEdBQUcsa0JBQWtCLENBQUM7QUFBQSxNQUMxRCxVQUFVO0FBQUEsSUFDWixDQUFDO0FBQUEsSUFDRCxXQUFXO0FBQUEsTUFDVCxNQUFNLENBQUMsZ0JBQWdCO0FBQUE7QUFBQSxNQUN2QixZQUFZLENBQUMsT0FBTyxLQUFLO0FBQUE7QUFBQTtBQUFBO0FBQUEsSUFHM0IsQ0FBQztBQUFBLElBQ0QsYUFBYTtBQUFBO0FBQUE7QUFBQSxNQUdYLE9BQU87QUFBQSxJQUNULENBQUM7QUFBQSxFQUNIO0FBQUEsRUFDQSxTQUFTO0FBQUEsSUFDUCxZQUFZLENBQUMsT0FBTyxPQUFPLE9BQU87QUFBQTtBQUFBLElBQ2xDLE9BQU87QUFBQSxNQUNMLEtBQUssY0FBYyxJQUFJLElBQUksU0FBUyx3Q0FBZSxDQUFDO0FBQUEsSUFDdEQ7QUFBQSxFQUNGO0FBQUEsRUFDQSxPQUFPO0FBQUE7QUFBQSxJQUVMLGVBQWU7QUFBQSxNQUNiLFFBQVE7QUFBQSxRQUNOLGdCQUFnQjtBQUFBO0FBQUEsUUFDaEIsZ0JBQWdCO0FBQUE7QUFBQSxRQUNoQixnQkFBZ0I7QUFBQTtBQUFBLE1BQ2xCO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFBQSxFQUNBLGVBQWU7QUFBQSxJQUNiLFFBQVE7QUFBQSxNQUNOLGFBQWEsSUFBSTtBQUNmLFlBQUksR0FBRyxTQUFTLGNBQWMsR0FBRztBQUUvQixpQkFBTyxHQUNKLFNBQVMsRUFDVCxNQUFNLGVBQWUsRUFBRSxDQUFDLEVBQ3hCLE1BQU0sR0FBRyxFQUFFLENBQUMsRUFDWixTQUFTO0FBQUEsUUFDZDtBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUFBLEVBQ0EsU0FBUztBQUFBLElBQ1AsTUFBTSxDQUFDLFdBQVcsVUFBVTtBQUFBLEVBQzlCO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
