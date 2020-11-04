setTimeout(function() {
    var result = confirm("学会使用确认框（confirm）了吗？");
    console.log(result);
}, 10000); // 放到下一轮事件循环任务队列的头部
document.write("<b> document.write 可以输出标签</b>");

window.onload = function() {
    var confirm = window.confirm("方便填写一下您的个人信息吗？");
    if (confirm) {
        document.write(
            "<b>收集到的用户基本信息</b>" +
            "<li>姓名：" + prompt("请输入您的姓名：", "王德法") + "</li>" +
            "<li>年龄：" + prompt("请输入您的年龄：", "18") + "</li>" +
            "<li>性别：" + prompt("请输入您的性别：") + "</li>");
        window.alert("注意！以下为敏感信息！");
        console.log("存款：" + "￥" + prompt("请输入您的存款（单位：元）：", 0));
        window.alert("感谢你的配合！");
    } else {
        window.alert("再见！")
        console.log("用户拒绝配（受）合（骗）-_-")
    }
}