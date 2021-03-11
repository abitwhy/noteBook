const path = require('path');

module.exports = {
    publicPath: process.env.NODE_ENV == 'production' ? './production' : './', // 当前项目文件路径
    assetsDir: 'static', // 打包静态资源的路径
    outputDir:'dist',//编译的输出目录
    runtimeCompiler:true,
    pluginOptions: {
        'style-resources-loader': {
            preProcessor: 'stylus',
            patterns: [
                path.resolve(__dirname, 'src/assets/styles/index.styl'),
            ],
        },
    },
    // 本地配置代理(解决跨域)
    devServer: {
        proxy: {
            '/api': {
                target: 'https://musicapi.leanapp.cn/', // 真实的后台接口
                changeOrigin: true,
                ws: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    }
}