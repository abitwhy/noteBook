// ----------------------------- 前景知识

// module.exports 属性：通过 Node 模块操作，向外部暴露配置对象
// require 方法：获取模块暴露的内部对象
// “__dirname” 是 node.js 里的一个全局变量，它指向当前执行脚本所在的目录。
// path.normalize(p) 方法：规范化路径，处理冗余的“..”、“.”、“/”字符。发现多个斜杠时，会替换成一个斜杠。当路径末尾包含一个斜杠时，保留。Windows 系统使用反斜杠　
// path.join([path1], [path2], [...]) 方法：将多个路径结合在一起，并转换为规范化路径
// path.resolve([from ...], to) 方法：从源地址 from 到目的地址 to 的绝对路径，类似在 shell 里执行一系列的 cd 命令。如果某个 from 或 to 参数是绝对路径（比如 'E:/abc'，或是以“/”开头的路径），则将忽略之前的 from 参数
// [hash] 是 node.js 里的哈希函数。可指定长度，如：[hash:8]=》 webpack5 废弃了它，并迁移至 fullhash
// [path] 原相对路径标签，在 name 属性里设置，可打包出原文件结构
// [name] 原文件名标签
// [ext] 原文件后缀标签

// ----------------------------- 基础版本

// module.exports = {
//     entry: __dirname + "/src/main.js", // 打包的唯一入口文件
//     output: {
//         path: __dirname + "/public", // 打包后文件存放的地方
//         filename: "bundle.js" // 打包后输出的文件
//     },
//     mode: "development", // [webpack4+]设置 mode，常用的有开发（development）和生产（production）两种模式，但不止于此
//     module: { // 配置 loaders 加载器们
//         rules: [ // 必须写成 rules，而不能是 loaders（可能是版本的原因）
//             { // json 加载器（据称“webpack3./webpack2.已经内置可处理 JSON 文件，无需安装 json-loader”，还未测试过）
//                 test: /\.json$/i, // [正则式]用以匹配 loaders 所处理文件的拓展名的正则表达式（必须）
//                 use: "json-loader", // 指定使用 loader 的名称（必须），键名还可以是“loader”，当有多个 loader 时，显然 “use” 键名更合适
//                 // include: // [正则式]手动添加必须处理的文件（文件夹）（可选）
//                 exclude: /node_modules/, // [正则式]或排除不需要处理的文件（文件夹）（可选）
//                 type: "javascript/auto", // 添加 type 以解决 Module parse failed: Unexpected token m in JSON... 错误
//             },
//             { // css 加载器
//                 test: /\.css$/i,
//                 use: ['style-loader', 'css-loader'], // 组合加载器调用顺序：从后往前
//                 exclude: /node_modules/,
//             },
//             { // less 加载器
//                 test: /\.less$/i,
//                 use: ['style-loader', 'css-loader', 'less-loader'],
//                 exclude: /node_modules/,
//             },
//             { // sass 加载器
//                 test: /\.s[a|c]ss$/i,
//                 use: ['style-loader', 'css-loader', 'sass-loader'],
//                 exclude: /node_modules/,
//             },
//         ]
//     },
// }

// ----------------------------- 改进版本

// 【安装并引入外部插件】
// 处理 html
// 命令：npm i html-webpack-plugin -D
const HtmlWebpackPlugin = require('html-webpack-plugin');
// 补充说明：作用：1.自动在内存中根据指定页面生成一个内存的页面 2.自动把打包好的 bundle.js 追加到页面中去

// 去除冗余打包文件
// 命令：npm i clean-webpack-plugin -D
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// 补充说明：赋值时，官方用了解构赋值，为什么？=》其暴露了多个内部对象

// babel 转 ES6 语法为 ES5
// 命令： npm install babel-loader @babel/core @babel/preset-env -D

// 自动打包（热更）
// 命令：npm i webpack-dev-server -D
// 补充说明：配置在 package.json 里进行。若和 webpack 有版本冲突问题，则需重新安装兼容版本的 webpack 和 webpack-dev-server

// 【访问内置插件】（看到内置插件被放在外部插件的下方，不清楚原因）
// path 模块
const path = require('path'); // 用于处理文件路径的小工具


module.exports = {
    entry: path.join(__dirname, '/src/main.js'), // 打包的唯一入口文件 (注意：是两个参数，而不是字符拼接)
    output: {
        path: path.join(__dirname, '/dist'), // 打包后文件存放的地方
        // path: path.resolve(__dirname, "dist"), // 打包后文件存放的地方
        filename: 'bundle-[hash:8].js' // 打包后输出的文件-加入随机 hash 字符
    },
    mode: 'development', // 设置模式，常用的有开发（development）和生产（production）两种模式，但不止于此
    module: { // 解析非 js 文件
        rules: [ // 配置 loaders 加载器们（配置之前需要先行安装）。 必须写成 rules，而不能是 loaders（可能是版本的原因）
            { // json 加载器（据称“webpack3./webpack2.已经内置可处理 JSON 文件，无需安装 json-loader”，还未测试过=》没错）
                test: /\.json$/, // [正则式]loaders 所处理文件的拓展名（必须）
                use: 'json-loader', // 指定使用 loader 的名称（必须），键名还可以是“loader”，当有多个 loader 时，显然 “use” 键名更合适=>勘误：loader 只是 use 的配置属性之一
                // include: //, // [正则式]手动添加必须处理的文件（文件夹）（可选）
                exclude: /node_modules/, // [正则式]或排除不需要处理的文件（文件夹）（可选）
                type: 'javascript/auto', // 添加 type 以解决 Module parse failed: Unexpected token m in JSON... 错误
            },
            { // css 加载器
                test: /\.css$/,
                use: [ // 组合加载器调用顺序：从后往前
                    'style-loader', // 把 js 打包进 bundle.js
                    'css-loader' // 把 css 编译成 js
                ],
                exclude: /node_modules/,
            },
            { // less 加载器
                test: /\.less$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'less-loader' // 把 less 编译成 css
                ],
                exclude: /node_modules/,
            },
            { // sass 加载器
                test: /\.s[a|c]ss$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader' // 把 sass 编译成 css
                ],
                exclude: /node_modules/,
            },
            // { // 文件路径加载器
            //     test: /\.(png|jpe?g|gif)$/i, //
            //     use: 'file-loader',
            //     // options: {
            //     //     name: '[path][name].[ext]',
            //     //     outputPath: 'images',
            //     // },
            //     exclude: /node_modules/,
            // },
            { // css 文件路径加载器（与文件路径加载器二选一）
                test: /\.(png|jpg|gif)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 8192, // 指定进行 base64 编码的图片大小上限
                        name: '[name].[ext]', // 输出文件名字，不设置会输出随机 hash 码，另外还可以用到 [path] 添加原文件结构
                    },
                }],
                exclude: /node_modules/,
            },
            { // ES6 语法转换加载器 
                test: /\.m?js$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            ['@babel/preset-env', { targets: 'defaults' }],
                        ],
                    },
                },
                exclude: /node_modules/,
            },
        ]
    },
    plugins: [ // 使用（并配置）插件
        new HtmlWebpackPlugin({ template: './src/index.html' }),
        new CleanWebpackPlugin(),
    ],
}