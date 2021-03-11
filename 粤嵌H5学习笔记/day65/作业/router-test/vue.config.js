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
    }
}