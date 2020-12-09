function getNextElementOf(node, name) { /* 查找下一个指定类型元素节点 */
    if (name ? node.nextElementSibling.nodeName == name.toUpperCase() : true) {
        return node.nextElementSibling;
    } else if (node.nextElementSibling.nextElementSibling) {
        return getNextElementOf(node.nextElementSibling, name);
    } else {
        return null;
    }
}