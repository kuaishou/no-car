/*
 * @Author: ex_liangshengde@sinosafe.com.cn
 * @Date: 2019-04-26 14:51:06
 * @LastEditTime: 2019-08-14 15:36:25
 * @LastEditors: ex_liangshengde@sinosafe.com.cn
 * @Description: 描述
 */
const fs = require('fs')

function hasNodeModules(module) {
    return fs.existsSync('node_modules/' + module);
}
let vuxLoader
if (hasNodeModules('@vux/loader')) {
    vuxLoader = require('@vux/loader');
}
let isProduction = process.env.NODE_ENV == 'production'
if (!isProduction) {
    console.log('********************按测试环境模式打包*********************');
} else if (isProduction) {
    console.log('********************按生产环境模式打包*********************');
}
const configureWebpack = config => {
    console.log('common configureWebpack')
    if (isProduction) {
        try {
            Object.assign(config.optimization.minimizer[0].options.uglifyOptions.compress, {
                warnings: false,
                drop_debugger: true, // console
                drop_console: true,
                pure_funcs: ['console.log'] // 移除console
                //drop_console和pure_funcs的区别，drop_console是把console.log()注释掉了，而pure_funcs是把console.log()移除掉了。 
            })
        } catch (error) {
            console.log('打包配置错误', error);
        }
    }
    if (vuxLoader) {

        vuxLoader.merge(config, {
            plugins: ['vux-ui', {
                // name: 'less-theme',
                // path: 'src/theme.less'
            }]
        })
    }
}
const chainWebpack = config => {

    console.log('common chainWebpack')
    if (isProduction) {
        //配置如何展示性能提示。例如，如果一个资源超过 250kb，webpack 会对此输出一个警告来通知你
        // 性能警告显示方式 error错误 warning警告
        // config.performance.hints('error')
        // 入口总大小400k
        config.performance.maxEntrypointSize(400 * 1000)
        // 单个文件250k
        config.performance.maxAssetSize(250 * 1000)
        //    console.log('**=',)
    } else {
        const isLegacyBundle = process.env.VUE_CLI_MODERN_MODE && !process.env.VUE_CLI_MODERN_BUILD
        const version = +new Date();
        config.mode('development')
            // .output()
            .output
            .filename(isLegacyBundle ? 'js/[name]-legacy.js?' + version : 'js/[name].js?' + version)
    }
}
let vueConfig = {
    transpileDependencies: [
        // 可以是字符串或正则表达式
        // 'utils',
        // "utils/browser"
    ],
    productionSourceMap: false,
    configureWebpack,
    devServer: {
        proxy: 'https://agenttest.sinosafe.com.cn'
    },
    // pluginOptions: {
    //     'style-resources-loader': {
    //         preProcessor: 'less',
    //         patterns: [
    //             './src/common/vui/layout/fn.less',
    //         ]
    //     }
    // },
    // css: {
    //     loaderOptions: {

    //         postcss: {
    //             plugins: [require('postcss-px2rem')({
    //                 remUnit: 108
    //             })]
    //         },
    //     }
    // },
    chainWebpack
}

module.exports = {
    vueConfig,
    configureWebpack,
    chainWebpack
}