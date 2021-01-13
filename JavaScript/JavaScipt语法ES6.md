# JavaScipt 语法 ES6

> **几点说明:**
>
> - 根据[es6教程](https://es6.ruanyifeng.com/ "网道《JES6 入门教程》")做的笔记，内容有取舍。
> - 笔记将更侧重通过代码验证语法，知识的组织逻辑也渗透在里面

[TOC]



## babel 转码器

- 作用

> [Babel](https://babeljs.io/) 是一个广泛使用的 ES6 转码器，可以将 ES6 代码转为 ES5 代码，从而在老版本的浏览器执行。

*详见：*[babel](https://es6.ruanyifeng.com/#docs/intro#Babel-转码器 ''babel转码器)

## let 与 const 变量

- 作用

> let 命令声明的变量（块级变量），只在`let`命令所在的代码块内有效。
>
> const 命令声明值不可更改的块级常量。其本质是保证变量指向的那个内存地址所保存的数据不得改动（所以值不变仅对简单变量成立）。

- 关键词

  ==块级作用域==、==无变量提升==、==TDZ-暂时性死区==、==不可重复声明==

- 语法

  1. 声明语法

  ```js
  { /* 原则上，每个花括号{}形成一个块级作用域 block */
      // console.log(x); /* 不存在变量提升，抛出 ReferenceError : x is not defined */
      console.log(y); /* undefined。变量提升的结果 */
      let x = 'unique';
      // let x = 'not unique'; /* 同一块级作用域重复定义 let 变量会抛出 SyntaxError：Identifier 'x' has already been declared */
      var y = 'global';
      // let y = 'block'; /* 同一块级作用域重复定义 var 声明的变量也会抛出变量已定义错误，不过此时是 let 产生的暂时性死区，使 var 声明处出报错，而不是后面的 let 处 */
  }
  // if (true) let y = 'need brace"{}"'; /* 必须以花括号{}作为块级作用域的标志，否则抛出 SyntaxError: Lexical declaration cannot appear in a single-statement context */
  ```

  2. 作用域

  ```js
let z = 'can\'t find in window';
  console.log(window.z); /* undefined。在顶级作用域声明的 let 变量不会变成 window 的属性 */
  if (true) {
      var a = 'global';
      let b = 'block';
  }
  console.log(a); /* "global" */
  // console.log(b); /* 块级作用域外无法访问，抛出 ReferenceError: b is not defined */
  for (let i = 0; i < 2; i++) { /* for 循环的圆括号()里也形成一个块级作用域，猜测这只是语法糖，内部还是通过花括号{}来形成块级作用域。且 for 循环的()里的作用域，是后面{}作用域的上级作用域 */
      let i = 'subbloc'; /* {} 作用域作为子作用域，会修改上级同名变量 */
      console.log(i); /* "subblcok" */
  }
  var arr = [];
  // for (var i = 0; i < 2; i++) { /* 函数里输出的是 var 声明的变量是全局 i（for 语句执行完毕后，i 始终为3） */
  for (let i = 0; i < 3; i++) { /* 函数里输出的是 for 块级作用域下的局部变量 i */
      arr[i] = function() {
          console.log(i);
      }
  }
  arr[1]();
  var x = 'global';
  if (true) {
      // console.log(x); /* let/const 声明的变量，会其所在的块级作用域内，let 声明之前，产生暂时死区，无法访问该变量（即使存在同名的全局变量），抛出未初始化错误 */
      let x = "TDZ,temporal dead zone";
      console.log(x);
      // let y = y; /* 注意：该句也会报错。虽然 y 出现在声明语句里，但不是 let 操作符语句内，所以前面的“let 声明”仅指 let 操作符语句，而不包含赋值语句 */
  }
  ```
  
  3. const 常量

  const 语法及作用域遵守 let 的规范，此外，还有以下语法要求：

  ```js
const C = 'const';
  console.log(C);
  // -声明 const 变量必须同时初始化，否则抛出
  // const C2; /* SyntaxError: Missing initializer in const declaration */
  // -不可修改常量，否则抛出
  // C = 'const is variable?'; /* TypeError: Assignment to constant variable. */
  // -常量的本质变量地址不改变
  const CST = { p1:'只能保证变量地址不变' };
  log(CST); // {p1: "只能保证变量地址不变"}
  CST.p2 = '不能保证复杂类型的值不改变';
  log(CST); // {p1: "只能保证变量地址不变", p2: "不能保证复杂类型的值不改变"}
  ```

## 解构赋值（Destructuring）

- 作用

> 按照一定模式，从数组和对象中提取值，对变量进行赋值。

- 关键词

  ==映射==、 ==模式==、 ==键值对==、==默认值==、==遍历（iterable）==、

- 基础规则
  1. 解构赋值本质是模式匹配，用等号连接左右两个模式。左模式与右模式存在映射关系（右模式是左模式的像，右模式是左模式的原像）。当左模式在右模式中找不到映射元素时，就以 undefined 作为提示 。
  2. 解构赋值的自动转换规则是：只要等号右边的值不是对象或数组，就先将其转为对象。

- 语法

  1. 对象解构赋值

  ```js
  // -基础语法汇总
  let {
  	p0, // 对象解构变量是键值对，当键名键值相同时可简写（这里的 p0 是 p0:p0 的简写）
  	p1,
  	p2,
  	p3,
  	p4 = '对象解构变量默认值',
  } = {
  	p0: '对象解构左模式使用"{}"包裹',
  	p1: '变量必须与属性同名',
  	p2: '才能取到正确的值'
  };
  console.log(p1, p2); /* 变量必须与属性同名，才能取到正确的值 */
  console.log("p3:", p3); /* undefined，不存在对应属性的解构变量的值为 undefined */
  console.log("p4:", p4);
  // -解构变量取别名：通过完整键值对方式添加别名，键匹配解构对象里的属性名（键仅在模式中可用），值存储属性值（是外部可引用的解构变量）
  const {
  	log,
  	dir
  } = console; /* 内置 console 对象 */
  log('解构 console 内置方法，使用起来更便捷');
  let {
  	log: loga,
  	sin,
  	cos,
  	PI: pi,
  	E
  } = Math; /* 内置 Math 对象 */
  // log('PI=', PI); /* 键在模式外不可用，抛出 ReferenceError: PI is not defined */
  log('pi=', pi); /* 值才是外部可引用的解构变量 */
  log('log(e)=', loga(E));
  let {
  	key: value = '拥有别名的解构变量也可设置默认值'
  } = {};
  log(value);
  // -数组进行对象解构赋值
  let {
  	0: e0
  } = ['将数组当作对象解构']; /* 数组也是对象，也可进行对象解构，但没必要 */
  log(e0);
  //  -修改/添加对象属性。与后面要学的'...'解构操作功能类似。相比之下，这里操作的粒度更细，而'...'解构是批操作
  let obj = {
  	p1: '原有属性'
  };
  ({ /* 将一个已经声明的变量用于解构赋值必需用圆括号包裹（此处 obj 为已声明变量） */
  	p01: obj.p1,
  	p02: obj.p2
  } = {
  	p01: '修改原有属性',
  	p02: '添加新属性'
  });
  log(obj);
  // -嵌套对象解构赋值（TODO）
  ```

  2. 数组解构赋值

  ```js
  // -不可遍历结构的对象不可数组解构赋值
  // let [des] = false; /* 抛出 TypeError: false is not iterable */
  // -基础语法汇总
  let [a, b, c = '3.支持默认参数', d = '4.非空位、非 undefined 的元素才会覆盖默认值', , f, g = a] = ['1.数组左模式使用"[]"包裹解构变量', '2.解构变量与数组元素依次对应', undefined, '4.覆盖解构变量默认值', '5.跳过此项', '6.解构变量可空余', , '7.不必一一对应'];
  console.log('a:', a);
  console.log('b:', b);
  console.log('c:', c);
  console.log('d:', d);
  console.log('f:', f);
  console.log('g:', g); /* 既然解构变量是变量，则前面的（先声明的）解构变量可被后面的引用 */
  let [first, ...rest] = [1, 2, 3, 4]; /* 这里的‘...’是余参标识符，其后的参数 rest 是一个数组，存入解构数组剩余的所有元素 */
  console.log(first); /* 1 */
  console.log(rest); /* [2, 3 ,4] */
  // -嵌套数组解构赋值
  let [foo, [
  	[bar], baz
  ]] = ['支持', [
  	['嵌套数组'], '解构'
  ]];
  console.log(foo, bar, baz);
  // -Set 进行数组解构赋值
  let [x, y, z] = new Set(['set', '通过', '数组解构']);
  console.log(x, y, z);
  ```

  3. 了解更多

  ```js
  // -类数组解构赋值（与数组类似，略）
  // -数值和布尔值解构赋值：如果等号右边是数值和布尔值，则会先转为对象。
  let {
  	toString: s
  } = 123;
  s === Number.prototype.toString /* true */
  let {
  	name: bName
  } = false;
  bName === Boolean.prototype.name; /* true */
  // -undefined/null：不能转为对象，不可进行解构赋值
  // -函数参数解构赋值
  function add([x, y]) { /* 在传入参数的那一刻，数组参数被解构成变量 x 和 y */
  	return x + y;
  }
  log(add([1, 2])); /* 3 */
  ```
  
  4. 应用
  
  ```js
  // -交换变量值
  let num1 = 1; /* 变量两两交换 */
  let num2 = 2;
  log('交换前：num1:%d,num2:%d', num1, num2);
  [num1, num2] = [num2, num1];
  log('交换后：num1:%d,num2:%d', num1, num2);
  // --任意数量变量、对象或属性自由交换
  let n1 = 1; /* 变量 */
  let n2 = 2;
  let n3 = 3;
  log('交换前：n1:%d,n2:%d,n3:%d', n1, n2, n3);
  [n1, n2, n3] = [n3, n1, n2];
  log('交换后：n1:%d,n2:%d,n3:%d', n1, n2, n3);
  let obj1 = { /* 对象 */
  	foo: 'foo'
  };
  let obj2 = {
  	bar: 'bar'
  };
  let obj3 = {
  	baz: 'baz'
  };
  log('交换前：', '\nobj1:', obj1, '\nobj2:', obj2, '\nobj3:', obj3);
  [obj1, obj2, obj3] = [obj3, obj1, obj2];
  log('交换后：', '\nobj1:', obj1, '\nobj2:', obj2, '\nobj3:', obj3);
  let o1 = { /* 属性 */
  	p1: 1,
  	p2: 2,
  	p3: 3
  };
  let o2 = {
  	p1: 11,
  	p2: 22,
  	p3: 33
  };
  log('交换前：', o1);
  ({
  	p3: o1.p1,
  	p1: o1.p2,
  	p2: o1.p3
  } = o2);
  log('交换后：', o1);
  ```

## 对数据类型的扩展

### 字符串扩展

- Unicode 码的写法

> 完善双字节 Unicode 码（即大于 \uFFFF 的码点）。

```js
let dblByte5 = "\uD842\uDFB7"; /* ES5 */
let dblByte6 = "\u{20BB7}"; /* ES6 */
console.log(dblByte5); /* "₻7"，异常输出 */
console.log(dblByte6); /* "𠮷"，正常输出 */
```

- for-of  遍历字符串

> 遍历字符串，且支持 2 字节 Unicode 码字符。

```js
let str = String.fromCodePoint(0x20BB7); /* 与 'u\{20BB7}' 等价 */
for (let i = 0; i < str.length; i++) { /* ES5 */
  console.log(str[i]);
}
// �
// �
for (let char of str) { /* ES6 */
  console.log(char);
}
// 𠮷
```

- 模板字符串（template string）

> 加强版的字符串，用反引号`` 标识。

```js
// -模板字符串允许换行书写 HTML 代码
document.body.innerHTML = `
	<ul>
		<li>字符串模板</li>
		<li>template string</li>
		<li>可以换行书写</li>
	</ul>
`;
// -允许在字符串模板里嵌入变量
let num = 1;
document.body.innerHTML = `
	<ul>
		<li>${num}</li>
		<li>1乘以2等于${num*2}</li>
		<li>${alert('模板里可以写任何js代码')}</li>
	</ul>
`;
```

