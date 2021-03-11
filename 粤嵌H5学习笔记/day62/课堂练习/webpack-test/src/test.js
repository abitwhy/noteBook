// node.js 暴露方式
module.exports = function() {
    let h2 = document.createElement('h2');
    h2.innerText = 'come from test.js';
    return h2;
};
// es6 暴露方式
// 1. 暴露单个对象
// export default () => {
//     let h2 = document.createElement('h2');
//     h2.innerText = 'come from test.js';
//     return h2;
// }

// 2. 暴露多个对象
// export let test = ()=>{
//     let h2 = document.createElement('h2');
//     h2.innerText = 'come from test.js';
//     return h2;
// }