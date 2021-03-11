/* 解构 console 常用内置方法 */
const {
    log,
    dir
} = console;
/* 解构数组常用内置方法 */
let {
    log: loga,
    sin,
    cos,
    max,
    min,
    PI,
    E
} = Math;

/* 找数组重复元素 */
// 最新版
function repeatElem(arr) { // 复杂度为 O(n)
    console.time('repeatElem takes');
    let each = new Set(); // 每种元素
    let repeat = new Set(); // 重复元素
    arr.forEach(elem => {
        if (each.size == each.add(elem).size) { // 向 Set 添加元素时,不会发生类型转换,所以此处相当于做了绝对相等判断(除了认为 NaN 等于自身外).若仅有值相等需求,则需要转换类型
            repeat.add(elem);
        }
    });
    console.timeEnd('repeatElem takes');
    return Array.from(repeat); // 转数组,顺序为元素首次重复的顺序
}

function _repeatElem(arr) { // 复杂度介于 O(n^2) 与 O(n) 之间
    console.time('_repeatElem takes');
    let repeats = arr.filter((item, index, array) =>
        array.slice(index + 1).some(elem => elem == item)
    );
    console.timeEnd('_repeatElem takes');
    return Array.from(new Set(repeats)); // 去重,顺序为元素在数组中出现的顺序
}

function __repeatElem(arr) { // 复杂度为 O(n^2)
    console.time('__repeatElem takes');
    let repeats = arr.filter((item, index, array) => {
        let each = array.filter(elem => elem == item);
        return each.length > 1;
    });
    console.timeEnd('__repeatElem takes');
    return Array.from(new Set(repeats)); // 去重,顺序为元素在数组中出现的顺序
}


function rdIntArr(max=10,len=max,minus=false) {
    let arr = [];
    for (let i = 0; i < len; i++) {
        arr.push((minus?-1:1)*Math.floor(Math.random() * (max + 1)));
    }
    return arr;
}
