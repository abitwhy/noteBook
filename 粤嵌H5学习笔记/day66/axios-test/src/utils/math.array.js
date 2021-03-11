/**
 * @description 数组数据处理
 * 
 */

/**
 * @description 寻找数组重复元素
 * @param {Array} array 原数组
 * @returns {Array} 每种重复元素
 */
export function repeatElem(array) { // 复杂度为 O(n)
    // log.time('repeatElem takes');
    let each = new Set(); // 每种元素
    let repeat = new Set(); // 重复元素
    array.forEach(elem => {
        if (each.size == each.add(elem).size) { // 向 Set 添加元素时,不会发生类型转换,所以此处相当于做了绝对相等判断(除了认为 NaN 等于自身外).若仅有值相等需求,则需要转换类型
            repeat.add(elem);
        }
    });
    // log.timeEnd('repeatElem takes');
    return Array.from(repeat); // 转数组,顺序为元素首次重复的顺序
}

/**
 * @description 产生指定的随机整数数组
 * @param {Number} max 最大值(正数) [10]
 * @param {Number} len 数组长度 [max]
 * @param {Boolean} minus 是否返回负数 [false|true]
 * @returns {Array} 随机整数
 */
export function rdIntArr(max = 10, len = max, minus = false) {
    let arr = [];
    for (let i = 0; i < len; i++) {
        arr.push((minus ? -1 : 1) * Math.floor(Math.random() * (max + 1)));
    }
    return arr;
}