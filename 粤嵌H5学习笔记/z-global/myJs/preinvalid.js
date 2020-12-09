    // （登录/注册）表单预校验
    function Preinvalid(node, data) {
        this.node = node || null;
        this.data = data || [];
    }
    Preinvalid.prototype.init = function() {
        var piv;
        piv = this;
        piv.addProperty();
        piv.node.addEventListener("blur", piv.showTips.bind(piv), true); /* 由于 focus 和 blur 事件不会冒泡，只能在捕获阶段触发，所以是否在冒泡阶段触发需要设为 true */
        piv.node.addEventListener("focus", piv.removeTips, true);
    };
    Preinvalid.prototype.invalid = function(target, regExp) { /* 校验 */
        return regExp.test(target.value);
    };
    // Preinvalid.prototype.getNextElementOf = function getNextElementOf(node, name) { /* 查找下一个指定类型元素节点（集成进来，否则单独引入）=》最终选择了单独引入，注释代码，保留备用 */
    //     if (name ? node.nextElementSibling.nodeName == name.toUpperCase() : true) {
    //         return node.nextElementSibling;
    //     } else if (node.nextElementSibling.nextElementSibling) {
    //         return getNextElementOf(node.nextElementSibling, name);
    //     } else {
    //         return null;
    //     }
    // }
    Preinvalid.prototype.addProperty = function() { /* 为[tips]做准备 */
        var piv, inputs, count = 0;
        piv = this;
        inputs = piv.node.querySelectorAll("input");
        inputs.forEach(function(item) {
            var input, label;
            input = {};
            label = item.previousElementSibling; /* 假设为 label */
            // 单独存属性方案
            // input["name"] = item.name;
            // input["nameZH"] = label.nodeName == "LABEL" ? label.innerText.slice(0, -1) : item.placeholder;
            // data.push(input);

            // 给 node 节点添加属性方案（这里好像也可以封装）
            item.nameZH = label.nodeName == "LABEL" ? label.innerText.split(" ") /* 注意这里是全角空格 */ .join("").slice(0, -1) : item.placeholder;
            item.reg = piv.data[count].reg;
            item.msg = piv.data[count++].msg;
        });
    };
    Preinvalid.prototype.tips = function(target, message) {
        var tip = document.createElement("div");
        var computedStyle = window.getComputedStyle(target); /* 获取元素 css 计算属性  */
        tip.innerText = target.value ? message : target.nameZH + "不能为空！";
        tip.style.width = target.offsetWidth + "px";
        tip.style.height = "0px";
        tip.style.marginLeft = target.offsetLeft - target.parentNode.offsetLeft + "px";
        // 如果有函数能获取下一个指定 nodeName 的元素节点，那么下一行代码的可用性将提高，并更加简明
        // tip.style.marginBottom = computedStyle.marginBottom || target.nextElementSibling.nextElementSibling.nextElementSibling.offsetTop - target.offsetTop - target.offsetHeight + "px";
        // tip.style.marginBottom = computedStyle.marginBottom || this.getNextElementOf(target, "input").offsetTop - target.offsetTop - target.offsetHeight + "px"; /* 改进1 */
        tip.style.marginBottom = computedStyle.marginBottom || getNextElementOf(target, "input").offsetTop - target.offsetTop - target.offsetHeight + "px"; /* 改进2 */
        tip.style.color = "red";
        target.style.marginBottom = "0px";
        // 如果有函数能获取下一个指定 nodeName 的元素节点，那么下一行代码的可用性将提高，并更加简明
        // target.parentNode.insertBefore(tip, this.getNextElementOf(target, "label")); /* 改进1 */
        target.parentNode.insertBefore(tip, getNextElementOf(target, "label")); /* 改进2 */
        return tip;
    };
    Preinvalid.prototype.showTips = function(e) {
        var tgt = e.target;
        if (tgt.nodeName == "INPUT" && tgt.type == "text") {
            // tgt.tip = this.invalid(tgt, tgt.reg) ? null : this.tips.bind(this)(tgt, tgt.msg); /* 改进1=》 若 getNextElementOf 为静态方法，则不需要 bind，代码逻辑也更简明 */
            tgt.tip = this.invalid(tgt, tgt.reg) ? null : this.tips(tgt, tgt.msg); /* 改进2 */
        }
    };
    Preinvalid.prototype.removeTips = function(e) {
        var tgt = e.target;
        if (tgt.nodeName == "INPUT" && tgt.type == "text") {
            tgt.tip ? (tgt.style.marginBottom = tgt.tip.style.marginBottom) && tgt.tip.parentNode.removeChild(tgt.tip) : null;
        }
    };

    /* ----------------------------------HTML example---------------------------------- */
    /*     
        <body>
            <form id="login" action="">
                <label for="uername">用户名:</label>
                <input id="username" name="username" type="text" placeholder="用户名"><br>
                <label for="email">邮&emsp;箱:</label>
                <input id="email" name="email" type="text" placeholder="邮箱"><br>
            </form>
        </body>
    */

    /* ----------------------------------CSS example---------------------------------- */
    // * {
    //     margin: 0;
    //     padding: 0;
    // }

    // form {
    //     text-align: center;
    // }

    // label {
    //     vertical-align: top;
    //     line-height: 30px;
    // }

    // input {
    //     height: 30px;
    //     /* 必需通过 margin-bottom 留出一行提示信息的位置 */
    //     margin-bottom: 30px;
    //     padding: 0 4px;
    //     font-size: 16px;
    //     line-height: 30px;
    //     vertical-align: bottom;
    // }

    // input[type="text"] {
    //     min-width: 260px;
    // }