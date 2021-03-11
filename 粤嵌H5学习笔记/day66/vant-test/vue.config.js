const path = require('path');

module.exports = {
    publicPath: process.env.NODE_ENV == 'production' ? './production' : './', // 当前项目文件路径
    assetsDir: 'static', // 打包静态资源的路径
    pluginOptions: {
        'style-resources-loader': {
            preProcessor: 'stylus',
            patterns: [
                path.resolve(__dirname, 'src/assets/styles/index.styl'),
            ],
        },
    },
    css: {
        // extract: process.env.NODE_ENV !== 'development',
        // sourceMap: false,
        requireModuleExtension: true // 显示声明此项,修复 vant 自动按需引入样式失效 bug
    }
}