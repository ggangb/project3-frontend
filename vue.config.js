const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave:false,
  outputDir: "../../project3-backend/src/main/resources/static",
    devServer: {
      proxy: "http://localhost:3000"    
      },
    })
  
