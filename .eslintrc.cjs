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
    './.eslintrc-auto-import.json',
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
    'vue/no-unused-vars': 'error',
    'prettier/prettier': 'error',
    // 解決 LF / CRLF 的問題
    // 最根本解法是：在拉專案前輸入 git config --global core.autocrlf false
  },
};
