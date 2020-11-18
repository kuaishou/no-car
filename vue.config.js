const merge = require("webpack-merge");
let baseUrl = '/eb-web/vue/noCar';


console.log('********************开始按'+process.env.VUE_APP_MODE+'环境模式打包*********************');

module.exports = {
  lintOnSave: false,
  publicPath: baseUrl,
  // devServer: {
  //   proxy: 'https://mtest.sinosafe.com.cn'
  // },
  chainWebpack: config => {
    config.module
      .rule("ts")
      .use("ts-loader")
      .tap(options => {
        options = merge(options, {
          transpileOnly: true,
          compilerOptions: {
            module: "es2015"
          }
        });
        return options;
      });
  }
};