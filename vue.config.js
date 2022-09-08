const path = require('path')
module.exports = {
  publicPath: "./",
  devServer: {
    open: false,
    port: 8081,
    proxy: {
      // key: value
      // key - 前缀
      // value - 是跟 http-proxy-middleware 相同的一个配置对象
      '/api': { //地址中以api开头的
        target: 'http://124.221.182.242:3001/',
        changeOrigin: true,
        pathRewrite: {
          '^/api': '' //以api开头
        }
      },
    }
  },
  lintOnSave: false,
  /**
   * svg矢量图标使用配置
   * 使用svg-sprite-loader编译svg，如果使用file-loader时排除src/icons下的矢量图标
   * @param config
   */
  chainWebpack: config => {
    // ......
    config.module
      .rule('svg')
      .exclude.add(path.resolve('src/assets/icons/svg'))
      .end();
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(path.resolve('src/assets/icons/svg'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]',
      })
      .end();
    // .......
  }
}