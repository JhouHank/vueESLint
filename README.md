<div align="center">

# Vue 3 + Vite 5 + ESLint

</div>

## 系統說明

**版本**

本專案在 Node.js `v20.12.2` 環境下進行開發。

**專案運行**

您可以按照以下步驟運行專案：

```shell
npm install
npm run dev
```

這些命令將安裝所有必要的相依套件，並啟動開發伺服器，讓您能夠開始開發和預覽您的專案。如果您需要更多詳細資訊，請參考專案的 `package.json`。

## 使用技術

**前端框架與函式庫**

- Vue.js
- Tailwind CSS

**建置工具**

- Vite：用於加速前端開發和建置最佳化的建置工具。
- rollup-plugin-visualizer：Rollup 打包可視化插件，用於分析 bundle 的組成，幫助你最佳化專案的打包結果。
- vite-plugin-restart：通過監聽特定檔案是否修改，自動重啟 Vite 伺服器。
- unplugin-vue-components：組件自動依需求導入，支援多個 UI Library 的解析器。
- unplugin-auto-import：Vue 3 的插件 hooks 自動引入，支持 vue、vue-router、vue-i18n 等自動導入。
- vite-svg-loader：載入 svg 檔並且可以當作 Vue Component 使用。
- vite-plugin-vue-setup-extend：讓 Vue 3 的 setup 語法糖可以使用 name 屬性。
