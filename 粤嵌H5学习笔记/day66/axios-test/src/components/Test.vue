<script>
import HelloWorld from "@/components/HelloWorld";
import { capsule, primary, success, warning, danger } from "@/utils/log.js";
export default {
  name: "Test",
  components: {
    HelloWorld,
  },
  props: {
    tag: {
      type: String,
      required: true,
    },
    // myProp:String
  },
  render(createElement) {
    capsule("title", "content");
    warning("警告");
    primary("初级");
    success("成功");
    danger("错误");
    // console.log("this:", this);
    let { tag, $slots, $options } = this;
    // console.log("$slots.default:", $slots.default);
    // console.log("$options._componentTag:", $options._componentTag);
    let defaultClass = $options._componentTag.toLowerCase();
    var getChildrenTextContent = function(children) {
      return children
        .map(function(node) {
          return node.children
            ? getChildrenTextContent(node.children)
            : node.text;
        })
        .join("");
    };
    var id = getChildrenTextContent(this.$slots.default)
      .toLowerCase()
      //   .replace(/\W+/g, "-")
      .replace(/[^A-Za-z0-9_\u4e00-\u9fa5]+/g, "-") // 增加汉字
      .replace(/(^-|-$)/g, "");
    // console.log("id", id);
    // @returns {VNode}
    return createElement(
      // param1 {String | Object | Function} 必选.
      // 标签名称,组件选项对象,或返回前两者的异步函数.
      tag,
      // param2 数据对象 {Object}.可选.
      {
        // 动态类名
        class: [defaultClass],
        // 动态样式
        style: {
          color: "red",
        },
        // 普通的 HTML attribute
        attrs: {
          id,
        },
        // 组件 prop
        props: {
          myProp: "bar", // 测试值没有传过去
        },
        // ...
      },
      // param3 虚拟节点(vNode) {String | Array} 可选.
      // 文本虚拟节点或由 createElement() 构建而成子级虚拟节点
      // "字符串生成的“文本虚拟节点”",
      // 子节点数组
      [
        // 又可分为以下三类:
        // 存储在默认插槽里的子节点数组
        $slots.default,
        // 引入的组件组件
        createElement(HelloWorld, {
          props: {
            msg: "foo",
          },
        }),
        // 工厂渲染标签/组件,解决 VNode 必须唯一
        Array.apply(null, { length: 20 }).map((el, id) =>
          createElement(HelloWorld, { props: { msg: id } })
        ),
      ]
    );
  },
};
</script>
