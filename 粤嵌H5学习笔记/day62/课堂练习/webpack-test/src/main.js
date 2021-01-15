// main.js 文件作为打包入口文件，一般放在 src 目录下，其他文件一般会划分好模块，放在 src 的子目录留下

// 导入 css 样式（模块）
// import './css/index.css'; // 仅导入
import css from './assets/css/index.css'; // 赋变量供后续使用

// 导入 sass 样式（模块）
import sass from './assets/css/index.scss';

let test = require('./test.js');
let test2 = require('./test2.js');
document.body.appendChild(test());
document.body.appendChild(test2());