function searchWrap(node, data) {
    this.node = node || null;
    this.data = data || [];
}
searchWrap.prototype.init = function() { /* 初始化 */
    var sw, searching, query;
    sw = this;
    sw.renderThead(sw.data[0]);
    sw.renderTbody(sw.data.slice(1));
    searching = sw.node.querySelector("input[type='text']");
    query = sw.node.querySelector("input[type='button']");
    searching.onkeyup = function() { /*  */
        sw.search();
    };
    query.onclick = function() {
        sw.search();
    };
    // 上面两个搜索的业务严重冲突。
    // 考虑限定 searching.onkeyup 事件返回的搜索结果，仅返回一页数据。
    // 而 query.onclick 事件则不做限制，返回所有查询结果。
    // 实际上，目前成熟的处理方式是：searching.onkeyup 事件仅搜索候选词，并展示在单独的候选框中，来提示用户，而非将整个查询数据写入 tbody
};
searchWrap.prototype.search = function() { /* 查找 */
    var sw, searching, query, result, tbody;
    // sw = this;
    searching = this.node.querySelector("input[type='text']");
    query = this.node.querySelector("input[type='button']");
    tbody = this.node.querySelector("tbody");
    result = this.data.slice(1).filter(function(value) {
        if (value["name"].indexOf(searching.value) > -1) {
            return true;
        } else {
            return false;
        }
    });
    tbody.innerHTML = "";
    this.renderTbody(result);
};
searchWrap.prototype.renderThead = function(data) { /* 渲染表头 */
    var thead, tr;
    thead = this.node.querySelector("thead");
    tr = document.createElement('tr');
    for (var i in data) {
        var th = document.createElement('th');
        th.innerText = data[i]; /* 中文表头 */
        // th.innerText = i; /* 或英文表头 */
        tr.appendChild(th);
    }
    thead.appendChild(tr);
};
searchWrap.prototype.renderTbody = function(data) { /* 渲染表数据 */
    var tbody = this.node.querySelector("tbody");
    if (data.length) {
        data.forEach(element => {
            var tr = document.createElement('tr');
            for (var i in element) {
                var td = document.createElement('td');
                td.innerText = element[i];
                tr.appendChild(td);
            }
            tbody.appendChild(tr);
        });
    } else {
        tbody.innerHTML = "<tr><td " + "colspan='99'" + ">数据为空。。。</td></tr>";
    }
}