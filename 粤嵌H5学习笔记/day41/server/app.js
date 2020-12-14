// 引入 express 框架
const express = require("express");

// 路径处理模块
const path = require("path");

// body-parser 模块,处理 post 发送过来的数据
const bodyParser = require('body-parser');

// 创建 web 服务器
const app = express();

// 创建 application/x-www-form-urlencoded 编码解析,解析格式如 username=张三&age=23 的参数
app.use(bodyParser.urlencoded({ extended: false }));

// 创建 json 遍历解析
app.use(bodyParser.json());

// 静态资源访问服务功能
app.use(express.static(path.join(__dirname, "public")));

// 监听端口
app.listen(3000);

// 响应请求
app.get("/getTest01", function(req, res) {
    // console.log(req);
    console.log(req.query);
    // res.send("getTest01 send respons body to you.");
    res.send('{"data":"json"}');
    // res.send(req.query);
});

// 控制台输出
console.log("服务器启动成功");