let testJson = require('./test.json');
module.exports = function() {
    let h2 = document.createElement('h2');
    h2.innerText = testJson.text;
    return h2;
}