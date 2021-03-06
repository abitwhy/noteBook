# 一级标题
另一种写法
==========
## 二级标题
另一种写法
----------
***
---
两种分割线（后一种有多语义）
*****************
## 列表
### 无序列表

* *、+、- 都可以用，效果一致
+ 单侧标记与文本间需要空格
- 双侧标记与文本间不能有空格
- 不同 MarkDown 编译器的语法有出入
### 有序列表

0. 顶行`数字`+`.`即可
1. 有序列表

2. 没有门槛

3. 拿来即用

********************
## 段落
> **块级引用**
> 邻行文本只会以空格分隔（这只是 markdown 原生语法，编辑器未必如此做）

> **隔空行**文本则会隔行

> **段落开头不要留出空白字符**。否则像 Typora 会在留白处编译出来一个‘?’。
*********************
## 表格

| 工作安排 | 学习计划 | 完成情况 |
| ------- | ------  | ------- |
| 换个新工作 | 革新自己的学习方式 |todo |
| 告别 | 啃基础知识 |TODO |

*********************
## 强调

- **加粗** 或 __加粗__
- *斜体*
- ~~划掉~~
- ++下划线++ 或 <u>下划线</u> （不被广泛支持，是为了避免与链接混淆吧）
- ==高亮== (不被广泛支持)
- 表情：:smile:
- 脚标：X^2^
*********************

## 链接

- [链接](链接地址 "title")[^2]
- ![alt 文本](图片链接地址 "标题")
- ![Typora 图标](https://typora.io/img/favicon-64.png "Typora")
[^2]: MD只允许网络链接，但有方法可以在项目中使用 url 链接。
*********************
## HTML代码

	<span>不顶头写即可，<和& 将被自动转义</span>

***

## 拓展
### 代码块

这是 `<a>行内代码块</a>` 的示例

``` javascript （说明语言）
//块级代码块
/**
* nth element in the fibonacci series.
* @param n >= 0
* @return the nth element, >= 0.
*/
function fib(n) {
  var a = 1, b = 1;
  var tmp;
  while (--n >= 0) {
    tmp = a;
    a += b;
    b = tmp;
  }
  return a;
}
document.write(fib(10));
```


```javascript
// 缩进四格表示代码块，仅作了解，编辑器仅支持语法而已
```

```diff
function(){ 
	// try to use diff 
	// it seems can be replaece by comment
-  	bad things
+  	good things
}
```

***

### 目录结构

[TOC]

注脚 [^0]
[^0]: 注脚描述

***

### LaTex数学公式

==行内公式==

牛顿第一定律 $F_合=ma$，物体不受力则会静止或做匀速直线运动。

==块级公式==
$$ {$$$$公式块}
E=mc^2
$$

### 表格新知识

| 题头1                  |           题头2            |                    题头3 |
| :--------------------- | :------------------------: | -----------------------: |
| 这是一段没有意义的内容 | 这同样是一段没有意义的内容 | 这还是一段没有意义的内容 |
| blabla[^1]             |        lololololol         |               ohhhhhhhhh |
| 1997                   |             4              |                       14 |

[^1]: 注脚可以出现在任何地方

***

### 无序列表新知识


- 父（无缩进）
  - 子（1 tab 缩进）
     - 孙（2 tab 缩进）

- [ ] 单选按钮（独立成组，不会与后面的单选按钮构成单选组）

# 总结

> 目前看来，学 MarkDown，熟悉一款 MarkDown 编辑器就够了！​

