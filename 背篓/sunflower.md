***——记录不平凡的见闻与灵感***

***

`2020年8月27日08:05:32`

- ==感想== 如果目标不变，暂时的让步就只是蓄力，这会比固执的向前更早完成目标。

- ==迷茫== 什么时候能达到`阅读源码`的水平，简直不敢想象。

- ==翻译== Rome was not built in a day. 驽马十驾，功在不舍。

- ==思考== 由计算`和最大子数组`带来的人生思考。（*算法没有考虑结果不唯一的情况*）

  ```java
  /*
   * 计算数组和最大子数组（不考虑结果不唯一的情况）
   */
  public static void maxSubArray(int arr[]) { // 或另起名作 findBestMe
  	int maxSum = 0, start = 0, length = 0;
  	int tempSum = 0, tempStart = 0, tempLength = 0;
  /*
  	// 彻彻底底的失败（算法是错的）
  	for (int i = 0; i < arr.length; i++) {	
  		// 天真地以为
  		tempSum += arr[i]; // 囫囵吞枣
  		tempLength++;  // 野蛮生长
  		// 功亏一篑
  		if (tempSum < 0) {
  			tempSum = arr[i]; // 还会有希望
  			tempLength = 1; // 仅有的希望
  			tempStart = i; // 盛年不重来
  		}
  		// 岁月沉淀下来的是
  		if (tempSum > maxSum) {
  			maxSum = tempSum; // 财富？
  			start = tempStart; // 欲望？
  			length = tempLength; // 痛苦？
  		}
  	}
  */
  	// 正确的途径
  	for (int i = 0; i < arr.length; i++) {
          // 及早发现错误
  		if (tempSum < 0) {
  			tempSum = arr[i]; // 重新来过
  			tempLength = 1; // 专注集中
  			tempStart = i; // 摆正态度
  		} else { // 方向明确
  			tempSum += arr[i]; // 全力以赴
  			tempLength++;  // 循序渐进
  		}
  		// 岁月真正沉淀下来的是
  		if (tempSum > maxSum) {
  			maxSum = tempSum; // 知识
  			start = tempStart; // 回忆
  			length = tempLength; // 与精神
  		}
  	}
  	// 除了自己，没有人能做出解答
  	System.out.println("最大子数组和：" + maxSum);
  	System.out.println("最大子数组起始索引：" + start);
  	System.out.println("最大子数组长：" + length);
  }
  ```

***

  `2020年9月7日14:31:56`

- ==灵感==`MarkDown`支持表情符，在拼写表情单词的时候联想到：因为只有在你拼写正确，它才会显示出表情，这种简单的`关联记忆`带有可观的`激励作用`。如果把这项功能拿去背英语单词（视野更开拓点儿，任何一门语言的词汇），要么依托现有的 `MarkDown` 编辑器，做成内嵌功能模块；要么独立做成专一功能的 `app`。技术上，后者只需要在现有 `MarkDown` 编辑器上做加减法即可。减去除转换显示表情以外的功能，添加语音发音、翻译等功能。技术难点在于庞大的图标、语音资源的收集和统一工作，以及它们的检索引擎。总的来说，前途很光明。

***

  `2020年11月10日23点01分`

-   ==翻译==Not everything is cut and dry.（不是所有的事情都是一成不变的。）
- ==困惑==关于 逻辑运算 `&&`和 `||`优先级到底时如何的？还是没有办法验证，啊啊啊！！
- ==发现==三元逻辑运算符 `x?y:z` 与 `x&&y||z`等价，可以认为前者时后者的语法糖。（*三元运算符为右结合*）
- ==翻译==Hats off to all of them!（向他们致敬！）

------

`2020年12月9日17点29分`

- ==理论==悲观地储蓄，乐观地投资。——利特伍德奇迹定律
- ==灵感==手机上添加滑轮，解决滚动事件与触摸事件之间的冲突，与 PC 也更兼容。

- ==思考==面对生活的态度：-Are you winning( son)? -I just start to play.

- ==感慨==中英文标点符号什么时候才可以合并，并规范化啊！