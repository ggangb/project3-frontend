const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  outputDir: "../../project3/src/main/resources/static",
      devServer: {
        proxy: "http://localhost:3000"
      }
  
})
