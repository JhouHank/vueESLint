// ESLint 配置文件
require('@rushstack/eslint-patch/modern-module-resolution');

module.exports = {
  // 讓 ESLint 知道有一些全域變數，
  // 這樣在使用全域變數時就不會報錯
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    node: true,
  },
  // 告訴 ESLint 不要再往父層目錄尋找文件
  root: true,
  // 注意順序（下面的會繼承上面的）！！！
  extends: [
    // ESLint 官方提供的推薦規則
    'eslint:recommended',
    // Vue 提供的 ESLint 規則插件
    'plugin:vue/vue3-recommended',
    // ESLint 官方提供給 Vue 使用的 Prettier 規則
    '@vue/eslint-config-prettier',
  ],
  // 解析器：允許使用者指定 JS 語言，預設為ES5
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    // rules 可以是陣列
    // 第一個值是「錯誤層級（error level）
    // off 或 0 - 關閉規則
    // warn 或 1- 將該規則顯示為警告，但仍可執行
    // error 或 2 - 將規則顯示為錯誤，會跳出錯誤後不執行，無法成功編譯
    // 第二個值則是針對該規則的「設定」
    // 例如在 semi 規則中的 always 表示總是要有分號；
    // quotes 規則中的 double 則表示要使用雙引號。
    'vue/no-unused-vars': 'error',
    'prettier/prettier': 'error',
  },
};
