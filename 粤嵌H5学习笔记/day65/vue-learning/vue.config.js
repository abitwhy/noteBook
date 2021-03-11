module.exports = {
    // publicPath = './', // 当前项目文件路径
    publicPath: process.env.NODE_ENV == 'production' ? './production' : './', // 当前项目文件路径
    assetsDir: 'static', // 打包静态资源的路径
    devServer: {
        port: '8888', // 端口
        proxy: {
            '/search': { // 代理路径(请求路径)
                target: 'http://musicapi.leanapp.cn/', // 目标路径(真实路径)
                changeOrigin: true, // 改变请求头(允许跨域)
            },
        },
    },
}