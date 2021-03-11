<template>
    <div class="multy">
        <h1>pages 文件夹存放完整页面</h1>
        <input type="text" v-model="num">
        <table border="1">
            <template v-if="num>0">
            <tr v-for="i in parseInt(num)" :key="i">
                <td v-for="j in i" :key="j">
                {{j}}*{{i}}={{i*j}}
                </td>
            </tr>
            </template>
        </table>
    </div>
</template>
<script>
export default {
    name: 'readme',
    props: {
        num: String,
    },
}
</script>

<style lang="scss" scoped>
    table{
       margin: 0 auto;
    }
  // 设置 lang 属性指定使用的预编译语言:可选的有 less,scss,stylus   
  // 安装 less (npm i less-loader -D)
  // 安装 sass (npm i node-sass sass-loader -D)(node-sass 和 sass-loader 可能会出现版本问题,版本示例: node-sass@4.14.1 sass-loader@8.0.0)
  // 安装 stylus (npm i stylus stylus-loader -D)(stylus 和 stylus-loader 可能会出现版本问题,版本示例:stylus@0.54.8 stylus-loader@3.0.2)
</style>