function getNextElementOf(node, name) { /* [js]查找下一个指定类型元素节点 */
    if (name ? node.nextElementSibling.nodeName == name.toUpperCase() : true) {
        return node.nextElementSibling;
    } else if (node.nextElementSibling.nextElementSibling) {
        return getNextElementOf(node.nextElementSibling, name);
    } else {
        return null;
    }
}

function render(nodeSet, dataArr) { /* [jQuery]批量数据渲染 */
    $(nodeSet).each((index, item) => {
        // text 方案
        // $(item).text(dataArr[index]);

        // html 方案
        // $(item).html(dataArr[index]); /* 基础版 */

        // 思考：$.html 可以接受节点参数，那么 dataArr 里面也可以是结点，不过需要考虑是否是需要 clone
        // 支持渲染节点版
        if (dataArr[index] instanceof Node /* 原生 Node */ || dataArr[index].get ? dataArr[index].get(0) instanceof Node : false /* $(Node) */ ) { /* 目前已知插入 document、document.body 这样的顶级节点会使网页崩溃 */
            $(item).html($(dataArr[index]).clone(true, true)); /* 考虑不 clone 会导致网页原有节点被移动（可能会有该需求，暂不考虑），所以渲染原节点的复制品 */
        } else {
            $(item).html(dataArr[index]);
        }
    });

    // [对比]原生 js 实现
    // nodeSet.forEach((item, index) => {
    //     // item.innerText=dataArr[index]; /* text 方案 */
    //     item.innerHTML = dataArr[index]; /* html 方案 */
    // });
}

function debounce(fn, delay) { /* [js]防抖函数 */
    var timer = null; // 声明计时器
    return function() {
        var context = this;
        var args = arguments;
        clearTimeout(timer);
        timer = setTimeout(function() {
            fn.apply(context, args);
        }, delay);
    };
}

function traversal(array, callback) { /* 递归遍历递归数组 */
    var sub = null; /* 必须定义 sub 中间变量，不能在 for-in 中 return，会导致 for-in 循环不能遍历完整 */
    var quit = true; /* 为了提高性能，添加了quit，通过 callback 的返回值判断是否继续遍历 */
    for (var index in array) { /* 递归遍历（一层一层地找，而不是一个一个找，这样有优势吗？） */
        callback && (quit = callback(array, index)); /* callback 用以拓展搜索功能， 默认接收 array 及 index 参数 */
        if (quit) { /* 终止遍历 */
            return;
        }
        sub = traversal(array[index].subarray, callback);
    }
    // array.forEach((element,index) => {
    //     callback && (quit = callback(array, index)); /* callback 用以拓展搜索功能， 默认接收 array 及 index 参数 */
    //     if (quit) { /* 终止遍历 */
    //         return;
    //     }
    //     sub = traversal(array[index].subarray, callback);
    // });
    return sub;
}