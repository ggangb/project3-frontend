require('dotenv').config(); // .env 파일 로드
const { defineConfig } = require('@vue/cli-service')
require('dotenv').config();
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  devServer: {
    proxy: process.env.VUE_APP_BASE_URL
  },
})

