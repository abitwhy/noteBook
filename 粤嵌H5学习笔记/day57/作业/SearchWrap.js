function SearchWrap(node, data) { /* 搜索数据（升级版），可用性有提高 */
    this._node = node || null;
    this._btns = this._node.querySelectorAll('.search-btn'); /* 搜索按钮们 */
    this._thead = this._node.querySelector("thead");
    this._tbody = this._node.querySelector("tbody");
    this._mask = this._node.querySelector(".mask"); /* 遮罩层用于提示 */

    this._data = data || [];
    this._dBody = this._data.slice(1); /* 数据首元素用于存题头，其余的才存储真正的数据 */
    this._result = []; /* 存储查询结果 */
    this._acheResult = []; /* 缓存上次查询结果，还可考虑缓存 node 结果 */
}
SearchWrap.prototype.init = function() { /* 初始化 */
    let sw = this; /* SearchWrap 的实例 */
    let {
        _node,
        _btns,
        _thead,
        _tbody,
        _mask,
        _data,
        _dBody,
        _result,
        _acheResult
    } = sw;
    sw.renderThead(_data[0]);
    sw.renderTbody(_dBody);
    sw.search();
};
SearchWrap.prototype.query = function(filterCallback) { /* (根据指定条件)查找并渲染数据，类似 dao 层 */
    let sw = this; /* SearchWrap 的实例 */
    let {
        _node,
        _btns,
        _thead,
        _tbody,
        _mask,
        _data,
        _dBody,
        _result,
        _acheResult
    } = sw;
    _result = _dBody.filter(filterCallback); /* [TODO]更进一步的优化是分页查询*/
    _tbody.innerHTML = ""; /* 清空数据 */
    sw.renderTbody(_result);
};
SearchWrap.prototype.search = function(filterCallback) { /* 搜索服务，类似 sevice 层 */
    let sw = this; /* SearchWrap 的实例 */
    let {
        _node,
        _btns,
        _thead,
        _tbody,
        _mask,
        _data,
        _dBody,
        _result,
        _acheResult
    } = sw;
    let names = Array.from(_btns).map(btn => btn.name); /* 根据 name 进行搜索分组 */
    names.forEach(name => { /* [TODO]不同分组需不需要进行联动查询，需要的话，初步考虑缓存中间查询结果来实现 */
        let inputs = Array.from(document.getElementsByName(name)); /* name 相同的，即同一组 input */
        // console.log(inputs);
        let btn = inputs.filter(ipt => ipt.className.includes('search-btn'))[0]; /* 搜索按钮 */
        let searchings = inputs.filter(ipt => ipt.className.includes('search-ipt')); /* 搜索信息们 */
        if (searchings.length == 1) { /* 只有一个搜索信息时，进行模糊匹配查询，支持按键查询 */
            let keywords;
            searchings[0].onkeyup = evt => {
                keywords = evt.target.value;
                sw.query((item, index, data) => item[name].includes(keywords)); /* 当 keywords 为空时，查询并返回了所有数据，如果是真实的请求，这很不好！ */
            };
            btn.onclick = evt => {
                sw.query((item, index, data) => item[name].includes(keywords));
            }
        } else { /* 一个以上（目前，准确地说是两个）搜索信息时，进行范围查询 */
            btn.onclick = evt => {
                sw.query((item, index, data) => {
                    min = searchings[0].value || -Infinity;
                    max = searchings[1].value || Infinity;
                    return item[name] >= min && item[name] <= max;
                });
            };
        }
    });
};
SearchWrap.prototype.renderThead = function(data) { /* 渲染表头 */
    let sw = this; /* SearchWrap 的实例 */
    let {
        _node,
        _btns,
        _thead,
        _tbody,
        _mask,
        _data,
        _dBody,
        _result,
        _acheResult
    } = sw;
    let tr = document.createElement('tr');
    for (let i in data) {
        tr.innerHTML += `<th>${data[i]}</th>`; /* 中文表头 */
        // tr.innerHTML += `<th>${i}</th>`; /* 或英文表头 */
    }
    _thead.appendChild(tr);
};
SearchWrap.prototype.renderTbody = function(data) { /* 渲染表数据 */
    let sw = this; /* SearchWrap 的实例 */
    let {
        _node,
        _btns,
        _thead,
        _tbody,
        _mask,
        _data,
        _dBody,
        _result,
        _acheResult
    } = sw;
    if (data.length) {
        _mask.style.visibility = 'hidden';
        data.forEach(item => {
            let tr = document.createElement('tr');
            for (let i in item) {
                tr.innerHTML += `<td>${item[i]}</td>`;
            }
            _tbody.appendChild(tr);
        });
    } else {
        _mask.style.visibility = 'visible';
    }
}