# JavaScript 学习笔记

> **几点说明:**
>
> - 根据[教程](https://wangdoc.com/javascript/index.html "网道《JavaScript教程》")做的笔记，内容有取舍。
> - 教程里使用的是==ES5==语法，==ES6==应该会较晚的时候学习。
> - 笔记以单个语法点为单元，单元主题明确，单元间比较散乱。
> - 文件格式也是后面才转成`md`的，源码排版可能会很乱。

[TOC]
***

## 数据类型

JavaScript 六种**基本类型**有:

 `number`|`string`|`boolean`|`undefined`|`null`|`object`

其中，`object`可细分为三个子类型：`狭义object`、`array`和`function`。

***

## 逻辑运算的返回值[^1]


1. **逻辑与运算**（`&&`运算）会返回最早遇到非以下类型的值：
   `NaN` `null` `undefined` `0` `false`;
   
2. **逻辑或运算**（`||`运算） 会返回最早遇到非以下类型的值：
   `NaN` `null` `undefined` `0` `false`;

[^1]:*这与 Java 甚至其他目前了解到的语法全然不同*。
***

## '='相关运算符

**值表达式**`=`、**严格相等运算符**`===`和**相等运算符**`==`。后两个的区别是，`==`会自动做类型转换。

***

## label 标签

语句的前面写标签`label`(标签名自定拟)，相当于定位符，配合`break` 和`continue`两个处理循环的关键字，用于**跳转到程序的任意位置**，标签的格式如下:
``` javascript
label:
	{/*块级语句*/}
// 如跳出循环
comeHere:
	while(true){
        console.log('Execute circle things.'); 
        if(true)
            break comeHere;
    }
console.log('Execute follow things.'); 
//Execute circle things.
//Execute follow things.
```

***

## undefined 与 null 的区别

> **没有定义**和**定义没有**的区别。

***

## parseInt/parseFloat 转换函数

- **作用**

> 将**字符串**转成**整数**/**浮点数**。

- **示例**

  - `parseInt('123');` 

      等价于`parseInt(123);`或`parseInt(String(123));`。

  - `parseInt('0xff');`（只有**十六进制**支持该写法）

      等价于`parseInt('ff',16);`。第二个可选参数指定输入字符的**进制**，范围在`2~32`。

  - `parseInt(0o377);`(**非十六进制**可利用该写法）

     等价于`parseInt(String(0o377));`、`parseInt('255');`或`parseInt('377',18));`。

  - **易错：**`parseInt(011,2);`

     - 预期：`3`
     - 结果：`NaN`
     - 原因：等价于`parseInt('9',2);`

***

## 原生Base64转码函数

> - **编码：**`btoa()`
>
> - **解码：**`atob()`
>

- 示例

```javascript
btoa('hello'); // "aGVsbG8="
// 某些字符串编码出来的字符码末尾会有’=‘或’==‘的情况，解码时它们可有可无，如：
atob('aGVsbG8='); // "hello"
atob('aGVsbG8'); // "hello"
// 另外，如要对含有汉字的字符串编码，还需以下转换：
function b64Encode(str) {
  return btoa(encodeURIComponent(str));
}
function b64Decode(str) {
  return decodeURIComponent(atob(str));
}
// 示例：
b64Encode('我爱你'); // "JUU2JTg4JTkxJUU3JTg4JUIxJUU0JUJEJUEw"
b64Decode('JUU2JTg4JTkxJUU3JTg4JUIxJUU0JUJEJUEw'); // "我爱你"
```

***

## 链式引用

- **说明**

>  **属性的值**还是一个**对象**，就形成了**链式引用**。

- **示例**

```javascript
var o1 = {};
var o2 = { bar: 'hello' };
o1.foo = o2;// 这里属性是动态创建的。
o1.foo.bar; // "hello"
```

***

## eval语句

- **作用**

> 接受一个**字符串**作为参数，并将这个字符串**当作语句执行**。

- **示例[^2]**

```javascript
eval('{foo: 123}'); // 123
eval('({foo: 123})'); // {foo: 123}
```

[^2]:示例同时还用于展示另一个知识点：外加()以区分{}是代码块还是对象声明的表达式。

***

##  匿名函数与构造函数

**匿名函数**`anonymous funtion`又称**函数表达式**`Function Expression`，声明方式：`var funA=function(params){...};`
**构造函数**`constructor Function`声明方式：

```javascript
var funC = new Function('param1','param2',...,'paramN','functionBody'); // functionBody 为字符串形式的函数体，这种声明方式不常用。
```

另外，匿名函数可以**有名字**，该参数名只能在函数体**内部访问**，可用以**声明递归函数**。

- **示例**

```javascript
// 斐波那契数列
var fib=function fibInner(num){
if(num===0)return 0;
if(num===1)return 1;
return fibInner(num-2)+fibInner(num-1);
};
fibInner(6); // ReferenceError: fibInner is not defined
fib(6); // 8
```

***

## 闭包函数初步理解

- **示例**

```javascript
// 定义闭包函数，形成闭包环境。
function closureFun(initParam){ // 勘误：闭包不是指父函数，而是指内嵌子函数。
var innerProp='父函数内部私有属性';
function innerFun(innerParam){ // 必须嵌套有内部函数。
console.log(innerProp);
console.log(initParam);
console.log(innerParam);
return innerParam;
}
return innerFun; // 必须返回内部函数。
}
// 创建变量接收闭包函数实例的返回值。
var otherFun=closureFun('初始化参数'); 
// 该变量实质是内部函数的引用，不妨先称它为外部函数。
otherFun;
/* 结果：
*  innerFun(innerParam){
*     console.log(innerProp);
* 	   console.log(initParam);
* 	   console.log(innerParam);
* 	   return innerParam;
*  }
*/
// 外部函数实例化（也就是内部函数实例化），使得闭包环境得以维护，从而可以访问到“父函数内部私有属性”和“初始化参数”。
otherFun('内部参数（普通参数）');
/* 结果：
*  父函数内部私有属性
*  初始化参数
*  内部参数（普通参数）
*  "内部参数（普通参数）"
*/
```

***

## 普通变量与函数（变量）使用的区别

> - **普通变量**的使用模式是：**声明**->**赋值**->**引用**。
> - **函数（变量）**的使用模式是：**声明**->**定义**->**引用**->**实例**。

引用和实例的外在区别体现在有无`()`，内在就是`形`与`值`的区别。java 里原本没有`引用`这一环，而只有与`实例`对应的`调用`，不过不清楚 `java8` `lambda` 表达式是否已支持。

- **补充：**java 中不支持函数内部定义内嵌函数，只可以内嵌函数自身，构成递归函数。另外，函数参数也不支持“函数类型”，因为基本数据类型中根本就没有函数类型。

***

## 函数参数传递类型

> - **基本类型**参数为**值传递**（passes by value），或称参数为**值类型**。
>
> - **类类型**参数为**址传递**（pass by reference），或称参数为**引用类型**。

***

## 函数的 length 属性

>  返回函数**预期**传入的参数个数，由其构造函数决定。
>

***

## 立即调用的函数表达式（IIFE）

- **作用**

> 对匿名函数使用这种“**立即执行的函数表达式**”，不必为函数命名，避免污染全局变量；封装产生作用域，封装私有变量。

- **做法**

  给函数外加`()`使之成为**函数表达式**。（还有其他方式，这是标准方式）。

- **示例**

```javascript
function(){}() // 报错，function 在行首被当做语句，语句不应以“()”结尾。
var f = function(){console.log('函作为表达式')}(); // function 作为表达式，可以被立即执行。
(function(){console.log('函数作为表达式')}()); // 同样被立即执行,注意两个连续 IIFE 表达式之间必须用‘;’分开，避免第二个被当做第一个的参数而出错。
(function(){console.log('函数作为表达式')})(); // 同上面等价。
```

***

## eval 命令

- **作用**

> 接受一个**字符串**作为参数，并将这个字符串**当作语句执行**。常用来解析 JSON 数据的字符串（但最好用原生的 JSON.parse 方法代替）。

- **示例**

```javascript
eval('console.log("lol")'); // lol
```
- **注意**
- 非字符串原样返回；
- 非语句参数会报错；
- 语句也应有单独存在的意义；
- 其他语句应满足语句的基本规则；
- 无私有作用域、别名调用产生的影响等。
- **反例**

```javascript
eval(121); // 非字符串，原样返回。
eval('3x'); // 非语句，报语法错误。
eval('return;'); // return 不单独，报语法错误。
eval('var foo="eval里的语句没有自己的作用域，等同于直接嵌入的语句"'); // strict 模式会给它赋予作用域，这有利于开发。
```

***

## 数组

- **目的**

> **数据结构**需要（**性能需求**其它语言才涉及）。

- **概念**

  数组是**有序的对象集**（强类型语言的基本类型数组还要求元素类型一致，创建时指定数组长度（此后数组长度不变））。

- **特点**

  JavaScript 数组的类型是**对象**。数组元素**索引可以不连续**。数组**长度可以赋值**。

- **示例**

1. **声明+初始化**

```javascript
var arr = ['str',6,{foo:'对象也可以'},['另一个数组'],,]; // ‘,,’表示留有空位 empty。空位不会被 forEach 等所遍历，因为它们没有索引。
```

2. **增删元素**	

```javascript
// 队列方式
arr.push('末尾添加','可以有多个参数','按参数顺序依次添加'); // 返回数组长度
arr.pop(); // 删除尾元素，返回删除元素，空位也会被删除，并返回 undefined。

// 堆栈方式
arr.unshift; // 添加首元素
arr.shift(); // 删除首元素
```

3. **修改元素**

  ```javascript
  arr[33]='数字索引会被转换成字符串'; // 若元素本不存在则会变成添加。33号元素之前可以有未定义的元素，会被标识为 empty 空位。
  ```

4. **添加属性**^（不建议）^

  ```javascript
  a[-1]='数组是对象就可以添加属性'; // 添加了‘-1’属性。要与添加元素相区分，最好避免数字名属性，或使用‘.’的形式添加。数组添加的属性将不被 hasOwnProperty() 检测到。
  ```

  - **length 属性**

  ```javascript
  arr.length // 返回已定义的元素最大索引+1（相当于承认中间未定义的元素对数组长度有影响，但不予保存）。
  arr.length= Math.pow(2, 32)-1; // 可以赋值，但不得超过2^32-1，更不能赋其它不合理的值或类型。
  ```

  - **删除数组**

  ```javascript
  // 两种方式
  arr.length=0; // 那么不难想到，可以批量删除元素，而类数组无法这么做。
  arr=undefined // 赋 undefined 值
  ```

  - **遍历**

  1. **for/while 循环**（同 java，略）

  2. **forEach() 方式**
     `arr.forEach(function(item){console.log(item)});`

  3. **for-in 方式**

```javascript
for(var i in arr){console.log(i)}; // 会把对象属性也遍历出来，所以慎用。
```

***

## 类数组对象

- **特征**

> 一个对象的所有键名都是**自然数**（零和正整数），并且有`length`属性。

- **说明**

  1. **JS内置类数组对象：**JavaScript 字符串和部分内置对象就属于类数组对象。内置对象如函数的 arguments 对象。
  2.  **`slice` 方法：**slice 根据索引找出选定区间的元素，返回目标数组。

- **示例**

```javascript
'abc'.slice(0,1) // [a,b] 
Array.prototype.slice.call('abc') // ["a","b","c"]，转换成了数组。
```

***

## true 和 false 与其他类型的转换关系

> -  **false：**六种类型代表值：undefined,null,0,false,NaN,''；
>
> -  **true：**上面六种类型取反；任何对象（包括 `new Boolean()` 包装出来的值为 false 的对象）。

另外，能直接与 **false** 或 **true** **以`==`做等价转化**的只有： 
 - **true：**`1`、`'1'`、`[1]`
 - **false：**`0`、`''`、`[0]`

原因在于类型转化优先级。

**一个奇怪的现象：**
`[]==![]`为`true`，难道它们做的是址比较？可是 `[1]==![1]`、`['1']==!['1']` 的结果却是 false。

**进一步解释：**

>  **“==”类型转换规则:**
>  	值类型 == 值类型 //相当于 Number(值类型) == Number(值类型)
>  	引用类型 == 引用类型 // 直接比较引用地址
>  	引用类型 == 值类型 // 将引用类型对象转化成原始类型的值，再进行比较
>  **比较规则：**
>  	与数值进行比较，会先转成数值，再进行比较；
>        与字符串进行比较，会先转成字符串，再进行比较；
> 	与布尔值进行比较，两个运算子都会先转成数值，然后再进行比较。

***

## 与字符串的加法运算会被重载

```javascript
 1 + 'a' // '1a'
 true + 'a' // 'truea' 
 1 + '2' + 3 // '123'
 1 + 2 + '3' // '33'
```

***

## 运算副作用

- **概念**

> 运算之后，变量的值发生变化，这种效应叫做运算的**副作用**（side effect）。

- **示例**：`x++;` ， 运算符里只有自增/减是负相应的。

***

## 数值运算符‘+’/‘-’

- **作用**

>  可以将**任何值**转为数值

- **示例：**`+true; // 1`、`-[]; // -0`。

------

## 指数运算符“**”

- **示例**

```javascript
2**3**2; // 512，可嵌套，相当于2**(3**2)但嵌套不了几层就超出可表示的数值范围了。
```

------

## console 有用\有趣的静态方法

 **示例：**

  1. log\info 带 css 样式的信息

```javascript
console.info('%c控制台打印信息可以有 css 样式！',
'color: red; background: yellow; font-size: 24px;');
```

  2. table 输出复合对象表格

```javascript
var family =[
{ relationship:'爸爸',name:'xxx'},
{ relationship:'妈妈',name:'xxx'},
{ relationship:'姐姐',name:'xxx'},
];
console.table(family); // 数组
var family ={
father:{ name:'xxx',age:100},
mother:{ name:'xxx',age:100},
sister:{ name:'xxx',age:18},
};
console.table(family); // 对象
```

  3. dir 查看 DOM

```javascript
console.dir(document.body); // 输出网页 DOM
console.log(document.body); // 输出了整个 element 选项
```

------

## 属性描述对象（attributes object）

- **目的**

> 提供一个内部数据结构，用来**描述对象的属性**，**控制它的行为**。又称**元属性对象**，以下简称**元属性**。

- 示例

```javascript
// 用 definePropertie\defineProperties 方法定义元属性。
var obj=Object.definePropertie({},'foo',{
	value: undefined, // 属性的属性值	
	writable: true, // 属性值是否可写
	enumerable: true, // 是否可遍历
	configurable: true, // 元属性是否可写（不包括 value）
	//get: undefined, // 取值函数，不能和 value 同时设置或同时设置 writable 为 true。
	//set: undefined // 存值函数，规则同上。
});
Object.getOwnPropertyDescriptor(obj,'foo'); // 返回 obj 的元属性。
```

- **补充**

  **defineProperty/definePropertys 的使用方法**

  - **函数原型**（或说API更准确）

    1.`Object.defineProperty(object, propertyName, attributesObject);`

    **参数说明：**参数依次为，**属性所属对象**、**属性名字符串**、**元属性**。

    2.`Object.defineProperties(object, attributesObjects);`

    **参数说明：**参数依次为，**属性所属对象**、**属性描述对象们**。

  - **示例**

```javascript
var o1 = { foo:1 }; // foo 是普通方式创建的属性。
Object.defineProperty(o1, 'bar', {}); // 给已有对象属性修改元属性。没有的属性会被创建。若已有属性设置了 configurable:false 会导致失败。
Object.getOwnPropertyDescriptors(o1); // 注意观察普通属性元属性的默认值，与 defineProperty 创建属性元属性的默认值，二者之间的区别。
var o2 = Object.defineProperties({},{ // 创建对象时定义属性的元属性
    p1:{value:1},
    p2:{}
});
```
*此外，使用`Object.create`创建对象时，也允许通过二参定义元属性。*

-----

## keys 与 getOwnPropertyNames 的异同

-  **作用：**返回对象**非继承属性**（数组形式）。

-  **区别：**`Object.keys()` 无法返回**不可遍历**的属性；后者可以。

-  **示例：**

```javascript
Object.keys([]); // []
Object.getOwnPropertyNames([]) // [ 'length' ]，可以用来随时查看内置对象的属性名
```

-----

## 控制对象状态

-  **作用**

> 冻结对象的读写状态，防止对象被改变。

- **用法**

  **三种冻结方法:**`preventExtensions`、`seal` 和 freeze。

- **示例**

```javascript
// preventExtensions 的
var obj = new Object(); // 这种形式等价于 var obj = {}。
Object.preventExtensions(obj); // 阻止添加新属性。
obj.newProp = '新属性'; // 试图添加新属性。
obj.newProp; // undefined，严格模式会报错。
Object.isExtensible(obj); // false ，Extensible 意为可扩充。

// seal 的
var obj2 = { oldProp: '已存在属性'};
Object.seal(obj2); // 既无法添加新属性，也无法删除旧属性，还设置了 configurable:false。
delete obj2.oldProp; // 试图删除旧属性。
obj2.oldProp; // "已存在属性"，严格模式还会报错
Object.isSealed(obj2); // true，注意 seal 的语义是封印，内涵否定意味。
// 添加属性同 preventExtensions。
// preventExtensions 和 seal 之后的对象，属性都还是 writable 的，可以修改属性值。

// freeze 的
var obj3 = { oldProp: '已存在属性'};
Object.freeze(obj3); // 阻止增删属性及修改属性值。不可修改的实质是将 configurable 和 writable 置为 false。
Object.isFrozen(obj3); // true
```

------

## 初步认识 JavaScript 内置回调函数[^3]

[^3]: call()、apply()和bind()。

- **作用**

> 都是通过**重定义 this 指向**，实现对象之间函数的“**借用**”。 

- **区别**

  浅显的，它们需要的**参数**和**返回**有不同。

- **用法**

  1. `obj.funObject.call(thisObject,param1,...,paramN);`

  **参数与返回：**首参 thisObject 传给 funObject 里的 this 指针，余参作为 funObject 的普通参数。无返回，直接调用 funObject。

  2. `obj.funObject.apply(thisObject,[param1,...,paramN]);` 

  **参数与返回：**首参同上，余参需要以数组形式传入。无返回，直接调用 funObject。

  3. `obj.funObject.bind(thisObject,[param1,...,paramN])();` 

  **参数与返回：**首参同上，余参需要以数组形式传入。返回替换了 this 的 funObject 函数。所以想执行 funObject 需要加一个“()”。

- **示例**

```javascript
Array.prototype.join.call('hello', '-'); // "h-e-l-l-o"
// 数组原型调用 call 将实例方法 join 用到字符串（类数组对象）上，实现给字符串字符间添加连接符。相当于字符串“借用了”数组原型的 join 方法。
Math.max.apply(null, [1,4,2,8,5,7]); // 8，Math.max 原本不能计算数字数组参数中的最大数字。
```

-  **想法**
  只有对 funObject **内部结构**足够了解，才能知道怎么用 call/apply/bind。补充：**构造函数的继承**例外。

## sort() 

- **作用**

> 给数组元素排序。

- **用法**

  无参按默认字典排序；传入参数函数，指定排序规则。

-  **示例**

```javascript
[10111, 1101, 111].sort(); // [10111, 1101, 111]
[10111, 1101, 111].sort((f,b)=>f-b); // [111, 1101, 10111]
// 参数函数需双参以作比较，默认不改变原数组顺序，除非满足 return 指定换位条件。（需要将逻辑转换成表达式值大于零，转换过程示例：递增排序 --(对立面)--> 递减 --(逻辑式)--> f>b --(算术式)--> f-b）。
// 一句话理解排序规则函数：默认原始排序，满足换位条件才反序。
```

------

## map()

- **作用**

> 根据传入函数参数，对数组元素进行统一处理，返回一个新数组，不改变原数组。

- **用法**

  `map`本身可传**双参**，首参为**函参**，二参为**回调对象**。函参又有三个可选参数，依次为：**当前元素**、**元素索引**、**数组本身**。

- **示例**

```javascript
[1,2,3].map((elem,index,arr)=>{console.log('['+(arr[index]-1)+']'+elem)}) // [0]1 [1]2 [2]3
```

------

## reduce()/reduceRigeht()

- **作用**

> 根据参数对**数组元素**做一些与**积累量**相关的操作。

- **用法**

  `reduce`/`reduceRigeht` 本身可传**双参**，首参为**函数**，二参为**积累量初值**。参数函数又有四个可选参数，依次为：**累计值**（默认首元素起）、**当前元素**（默认第二元素起）、**元素索引**、**数组本身**

- **示例**

```javascript
[1, 2, 3, 4, 5].reduce( (a, b) => a + b); // 15
[1, 2, 3, 4, 5].reduce( (a, b) => a + b,10); // 25
function findLongest(entries) { 
return entries.reduce(function (longest, entry) {
		return entry.length > longest.length ? entry : longest;
	 }, '');
}
findLongest(['aaa', 'bb', 'c']) // "aaa"，找出字符数组最长元素。
```

------

## 正则表达式

- **目的**

> 正则表达式是用于匹配**字符串**中**字符组合**的**模式**。
>

- **注意**

在 JavaScript 中，**正则表达式也是对象**。正则式里的**空格也将输出**。

- **用法**

  - **概括**

  一般通过**正则式**的`RegExp`的`exec`和`test`方法，或者**字符串**的`match`、`matchAll`、`replace`、`search`和`split`方法来使用。

  - **创建**

  1. `var re = /foo+bar/;`，**字面量**方式，适用于**静态使用**正则式。
  2. `var re = new RegExp('foo+bar');`，适用于**动态使用**正则式，RegExp 也接受双参，二参表示**修饰符**。

- **一些概念**
  
  1. **括号“()”：**在正则表达式中“()”常用作记忆设备。即这部分所匹配的字符将会被记住以备后续使用。又称**捕获括号**。
  
  2. **符号结核律：**
     **左结合符**：`*`|`+`|`?`|`$`|`.` 与符号左边字符结合，形成词义。
     **右结合符：**`\`|`^` 与符号右边字符结合，形成词义。
     **可左可右：**`\b`|`\B`。
     **二值连接：**`|`。
  
  3. **符号分类：**
     **断言（Assertions）**：`^`|`$`|`\b`|`\B`|`x(?=y)`|`x(?!y)`|`(?<=y)x` ，表示一个匹配在某些条件下发生。断言又可划分为向前断言、向后断言和条件表达式。
     **字符类：**区分不同类型的字符，例如区分字母和数字。
     **组织和范围：**表示表达式字符的分组和范围。
     **量词（Quantifiers）：**表示匹配的字符或表达式的数量。
     **Unicode 属性转义：**基于`unicode`字符属性区分字符。
     
  4. **匹配子串[^4]：** 
     **目的：**正则式**匹配环节**,以及正则式的**替换环节**，都可能需要用到子字符串，分别用以构建逻辑和控制输出格式。
     **语法：**子串写在捕获括号内。子串有有序标记，在上述两个环节各有两种标记语法，正则式中：`\1`、`\2`、...、`\n`；转换环节：`$1`、`$2`、...、`$n`。
     **注意：**有序标记只是子串匹配结果的**简单替换**。
     
     [^4]:**勘误**：这里学得很**不完整**，内容属于**捕获组**范畴。子字符串仅为自己的理解。
     
  5. **修饰符：**
      举例说明：`/a/gimsuy.flags; // 'gimsuy'`，每个字符各有含义，依次为：global、ignoreCase、multiline……
  
- **符号详解**[^5]

  - `\`，转义符，转义包含两层含义：将其后非特殊字符（字面量）转义成特殊字符；将特殊字符转移成其字面量。
  - `^`，行首判断符/脱字符，前者匹配输入开始（会被换行符影响，可以设置.m参消除），“[^reg]”表示与[]里面匹配规则的对立。单独`[^]`表示匹配一切字符。
  - `$`，匹配输入的结束，换行影响及处理同上。
  - `*`，匹配0或多次，等价于`{0,}`。
  - `+`，匹配1或多次，等价于`{1,}`。
  - `?`，匹配匹配前面一个表达式 0 次或者 1 次。等价于`{0,1}`。
  - `.`，默认匹配除换行符之外的任何单个字符。
  

// TODO 暂时记到这里	

[^5]:**说明：**只总结单符号，**多字符符号暂不总结**，仅在示例中做尝试。	

- **示例**
1. 使用转义
```javascript
RegExp('[a-z]\\s').test('keep think'); // true
// ‘\’在字符串和正则表达式中都有转义的作用，结合使用时还需进行字符串层面的转义。
```
  2. 理解量词

```javascript
/no?d/.test('node'); // true
/no?d/.test('noodles'); // false
/no+d/.test('noodles'); // false
/no*d/.test('hand'); // true
/no+d/.test('hand'); // false
// 上述量词默认贪婪模式，匹配尽可能多的量词标识字符，转换成非贪婪模式只需在量词后添加‘?’。
```

3. 匹配子串：

```javascript
'foo bar barfoo'.match(/(foo) (bar) \2\1/);
// 结果：['foo bar barfoo','foo','bar']，返回的是数组对象，首元素为匹配结果，后面依次为子字符串。还有其他属性暂不关注。
'fooo bar fooo bar'.match(RegExp('(foo*) (bar) \\1 \\2'));
// 结果：['fooo bar fooo bar','fooo','bar'],测试串里，两个"foo*"里’o‘的个数相同才能匹配。印证了，子串标记只是子串匹配结果的简单替代。
'abcdef'.replace(/(c)(d)/,'[前文：$`][匹配串组：$&][后文：$\'][串组成员：[$1,$2]]');
// 结果："ab[前文：ab][匹配串组：cd][后文：ef][串组成员：[c,d]]ef"，本例旨在说明替代参数写法及含义。
'3 and 5'.replace(/[0-9]+/g,match=>2*match); // "6 and 10"，二参还可以为函数。
/y((..)\2)\1/.exec('yabababab') 
// 结果：yabababab,abab,ab，未嵌套捕获括号时，标记次序是指“从左到右”，发生嵌套则指“由外到内”。还未搞清楚既有嵌套，又有并列的规则。
```

4. 邮箱正则式（尝试）：

```javascript
/^\w+@\w+(?:\.\w+)+$/.test('123_xxx@xxx.xxx.xx'); // true
// 尝试使用了非捕获组“(?:X)”，发现其优先级很低。
// ‘-’不在‘\w’之内。
```

5. 匹配标签：

```javascript
/<([\w-]+)([^>]*)>(.*?)<\/\1>/g.exec('<i class="demo">Hello</i>');
// ["<i class="demo">Hello</i>", "i", " class="demo"", "Hello"]
```

6.先/后行断言及其否定：

```javascript
'123%45%6%'.match(/\d+(?=%)/g); // ["123", "45", "6"]
'123%45%6%'.match(/\d+(?!%)/g); // ["12", "4"]
'123%45%6%'.match(/(?<=%)\d+/g); // ["45", "6"]
'123%45%6%'.match(/(?<!%)\d+/g); // ["123", "5"]
```

------

## JSON 对象详解

- **概念**

> 是一种用于**数据交换**的文本格式。

- **目的**

> 取代繁琐笨重的 XML 格式。
>

- **主要特点**

1. 书写简单，一目了然；
2. 符合 JavaScript 原生语法，可由解释引擎直接处理，无需解析代码。

- **语法规定[^6]**

1. 复合类型的值只能是数组或对象，不能是函数、正则表达式对象、日期对象。

2. 原始类型的值只有四种：**字符串**、**数值**（必须以十进制表示）、**布尔值**和**null**（不能使用`NaN`, `Infinity`, `-Infinity`和`undefined`）。

3. 字符串**必须**使用**双引号**表示，不能使用单引号。

4. 对象的键名必须放在双引号里面。

5. 数组或对象**最后一个成员的后面，不能加逗号**。

[^6]:关于值的类型和格式。

-  **JavaScript支持**（通过原生对象 JSON 处理 JOSN 格式数据）

1. **JSON.stringify()：**将一个值转为 JSON 字符串。三参，一参为待转 JSON 对象；二参是数组则指定对象待转属性，是函数则用以（以递归方式）更改返回键值；三参起修饰作用，增加可读性。若参数对象有自定义的`toJSON()`，则会覆盖默认处理方式。

2. **JSON.parse()：**将 JSON 字符串转换成对应的值。双参，一参待转 JSON 字符串；二参需函数，用以更改返回键值。
- **示例**

```javascript
JSON.stringify(Object.defineProperties({},{foo:{value:6,enumberable:false}}));// {}
// 不可遍历属性会被忽略

JSON.stringify({p1:1,p2:2,p3:3},['p1']); // "{"p1":1}"
// 二参对狭义对象有效，数组无效；单个属性名也需使用数组。另外，属性名类型是字符串，对象声明里没有引号只是简写。

try { // 通常用 try-catch 包裹转换以解析错误。
JSON.parse("'String'");
} catch(e) {
	 console.log('parsing error');
  } 	
```

------

## prototype 属性

- **作用**

> JavaScript 里实现**继承机制**的具体方式。

- **用法**
  **构造函数**的`prototype`属性指向一个对象，被称作**原型对象**，原型对象的属性和方法被视为**共有资源**，被该构造函数的所有**实例**共享。
- **进一步理解**
  在 JavaScript 里，以构造函数实现‘**类**’这个概念，类可以理解为“**形共享**”。而**继承**则是在“形共享”的基础上，还要求“**值共享**”。于是， JavaScript 就通过“**构造函数+prototype 属性**”的方式，实现继承。
- **示例**

```javascript
var ConstructFun = function(){ // 这里是无参构造，当然还可以是含参构造
	this.pubTypeProp='形共享-属性'; // 这里赋的值仅为初始值。
    this.pubTypeFun = function (){
        console.log('形共享-方法')
    }
}
var f1 = new ConstructFun();
var f2 = new ConstructFun();
// 构造函数创建的属性和方法是“形共享”的
f1.pubTypeProp === f2.pubTypeProp; // true，值比较，初值相同而已，不要被干扰。
f1.pubTypeFun === f2.pubTypeFun; // false,址比较，因而‘值’并未共享。

// 原型对象创建的属性和方法是“形-值共享”的
ConstructFun.prototype.pubTypeValueProp = '形值都共享-属性'; // 原型对象上创建的方法
ConstructFun.prototype.pubTypeValueFun = function(){
	console.log('形值都共享-方法');
}
f1.pubTypeValueFun === f2.pubTypeValueFun; // true,‘值’也共享了。

// 注意覆盖（overriding）
f1.pubTypeValueProp; // 形值都共享-属性
f1.hasOwnProperty('pubTypeValueProp'); // false
f1.pubTypeValueProp = '改变实例的值'; // 这种通过实例给继承属性的赋值操作,会创建同名私有属性，覆盖实例的此继承属性。
f1.hasOwnProperty('pubTypeValueProp'); // true

// 未被覆盖的属性和方法
f2.pubTypeValueProp; // 形值都共享-属性
ConstructFun.prototype.pubTypeValueProp = '通过原型修改继承属性';
f2.pubTypeValueProp; // 通过原型修改继承属性
```

- **补充**

  **原型链** 

  1. 任何一个对象，都可以充当其他对象的原型；
  2. 由于原型对象也是对象，所以它也有自己的原型。

  以上两点就产生了原型链。查看对象原型的方法是`Object.getPrototypeOf()`，顶层原型对象一般认为是 `Object.prototype`（它也有自己的原型：`null`，但 JavaScript 引擎查找对象属性时，只会追溯到 Object.prototype）。

  ------

## 构造函数的继承

- **作用**

> 基于**构造函数**层面的继承（相较于基于实例的继承）。

- **用法**
1. 在子类的构造函数中，调用父类的构造函数。
   **伪码**：

```javascript
function Sub(value) {
  Super.call(this);
  this.prop = value;
}
```

2. 让子类的原型指向父类的原型。

   **伪码**：

```javascript
Sub.prototype = Object.create(Super.prototype);
Sub.prototype.constructor = Sub;
Sub.prototype.method = '...';
```

- **示例**

```javascript
// 父类（构造函数）
function Tree(){
    this.branch="枝";
    this.leaf="叶";
    this.root="根"
}
Tree.prototype.beMadeUpOf = function(){
	var form = Object.getOwnPropertyNames(this); // 可选择直接打印 form，后面只是为了复习 forEach 的知识。
    var result = [];
    form.forEach(
        i=>{result.push(this[i])}); // ES6 语法
    console.log(this.constructor.name +
                ' is made up of:' + result.toString())
}

// 子类（构造函数）
// 第一步：子类调用父类构造函数
function FruitTree(){
    Tree.call(this);
	this.fruit = '果实';
}
// 第二步：子类原型指向父类
FruitTree.prototype = Object.create(Tree.prototype); // 修改原型对象。必须用 Object.create 方式，指向一个父类原型复制品。而不是直接赋值 Tree.prototype，指向父类原型。这样，下一行操作将不至于影响父类原型。
FruitTree.prototype.constructor = FruitTree; // 修改原型对象时，需要同时修改 constructor 属性。

// 验证
var appleTree = new FruitTree(); 
appleTree instanceof FruitTree; // true
appleTree instanceof Tree; // true
appleTree.beMadeUpOf(); // FruitTree is made up of:枝,叶,根,果实
// 不太清楚细节（需要深究 create 方法），总之，这样就实现了构造函数的继承，测试也符合预期，这里不一一列举了。
```





## 'use strict' 常见规范

1. 不能使用未声明的变量；
2. 函数里的 this 不能指向顶层对象；
3. 只读属性不可写；
4. 无法删除不可配置属性；
5. 无法删除变量；
  6. 不允许函数参数重名；
  7. 八进制不能使用`0`前缀，只能使用`0o`前缀；
  8. 禁止 with 语句；
  9. 为 eval 设置作用域。


说明和举例详见阮先生的[教程](https://wangdoc.com/javascript/oop/strict.html "关于严格模式")

------

## 回调函数

- **作用**

> 实现**异步操作**最基本的方式。

- **用法**（伪码）

```javascript
function f1(callback) {
  // ...
  callback();
}
function f2() {
  // ...
}
f1(f2);
```

- **示例**

```javascript
function async(arg, callback) {
  console.log('参数为 ' + arg +' , 1秒后返回结果');
  setTimeout(function () { callback(arg * 2); }, 1000);
}
function final(value) {
  console.log('完成: ', value);
}

async(1, function (value) {
  async(2, function (value) {
    async(3, function (value) {
      async(4, function (value) {
        async(5, function (value) {
          async(6, final);
        });
      });
    });
  });
});
// 参数为 1 , 1秒后返回结果
// 参数为 2 , 1秒后返回结果
// 参数为 3 , 1秒后返回结果
// 参数为 4 , 1秒后返回结果
// 参数为 5 , 1秒后返回结果
// 参数为 6 , 1秒后返回结果
// 完成:  12
```

教程里的[示例](https://wangdoc.com/javascript/async/general.html#异步操作的流程控制 )，里面还有关于**异步任务流程**的知识，需要研读。

- **优缺点**
  - 优点：简单、容易理解和实现；
  - 缺点：不利于代码的阅读和维护；各个部分之间高度耦合（coupling），使得程序结构混乱、流程难以追踪（尤其是多个回调函数嵌套的情况）；每个任务只能指定一个回调函数。

------

## 定时器

- **作用**

> 定时执行代码，向任务队列添加定时任务。

- **用法**（伪码）

1. **setTimeout()**

```javascript
// 执行代码
var timerId = setTimeout(code, delay); 
// code 需为字符串形式(很像 eval，是否会产生相关问题)；
// delay 指定延迟执行的时间（毫秒）；
// 函数返回定时器编号，用以方便取消该定时器。

// 执行回调函数
var timerId = setTimeout(funcName/anonFunc, delay,funcP1,funcP2,...,funcPn); // 回调函数可以写函数名或完整的匿名函数。delay 后面的参数会作为回调函数的参数，所以务必对应。
```

2. **setInterval()**
   参数及返回用法与 setTimeout 完全一致，区别在于 setTimeout 只会执行一次定时任务，而 setInterval 会无限次执行。
   另外，值得注意的是，两者`delay`的实际含义是**有差异**的。都可以理解为时间间隔，不过，setTimeout 中，间隔含义为：前一**个**任务执行**完毕**，到后一**个**任务**开始**执行的时间；setInterval 中，间隔含义为：前一**次**任务**开始**执行，到后一**次**任务**开始**执行的时间。

- **例子**

```javascript
// setInterval 常用来实现轮询的
var i = 1;
var ood = setInterval(function(){
    if(i>23){
        clearTimeout(timer); // 取消参数对应的定时器，并返回计数器编号
    	clearInterval(ood); // 同上
    	console.log('Enough!');
    	i = 1;
    }else if(1&i){ // 轮询一般会判断外界条件是否变化，这里观察 i 是否为奇数。
        console.log(i+'是奇数');
    }
},1000);

// 嵌套的 setTimeout 模拟 setInterval （时间间隔有差异）
var timer = setTimeout(function f() {
  console.log(i++);
  timer = setTimeout(f, 2000);
}, 2000);

```

- **setTimeout(f,0)**
  实际上，回调函数 f 不会立即执行，而是在下一轮**事件循环（Event Loop）**开始时，最先执行。这个特殊的定时器有许多实用的使用场景，详见[教程](https://wangdoc.com/javascript/async/timer.html#settimeoutf-0 "setTimeout(f,0) 使用场景")。

------

## 初识 Promise 对象

- **作用**

> Promise 为**异步操作**提供**统一接口**，起代理（proxy）作用，使得异步操作具备同步操作的接口。

- **进一步了解**

  - **对象状态**
    Promise 对象通过自身的状态，来控制异步操作。
    异步操作状态有三种：

    1. `pending` - 等待

    2. `fulfilled` - 成功

    3. `rejected` - 失败

    `fulfilled`和`rejected`合在一起称为`resolved`（已定型）[^7]。

    状态变化只有两种：

    - 等待 -> 成功
    - 等待 -> 失败

    当状态成为**已定型**时，状态将无法再改变，这就如同**承诺**一样，也即`Promise`名字的内涵。

    对应两种最终结果：

    - 成功：实例返回一个值，并置状态为 `fulfilled`；
    - 失败：实例抛出一个错误，并置状态为 `rejected`。

    [^7]:注意区别于后面出现的 resolve 和 reject 参数(名字可自取)，它们是 JavaScript 引擎提供的函数。resolve 是 fulfilled 状态会执行的函数，是函数；而 resolved 只是一个概念。

  - **then 方法**

    Promise 实例的`then`方法，用来添加回调函数。

    接受两个参数：

    1. 首参：异步操作**成功**时的回调函数
    2. 二参：异步操作**失败**时的回调函数（可省）

    链式使用：

    相当于嵌套的回调函数。但每个回调都拥有状态信息，能更好地控制回调函数，书写起来也更方便。

  - **微任务**（microtask）
    Promise 的回调函数属于异步任务，会在同步任务之后执行。不过不同于一般的异步任务，微任务将异步任务添加在本轮事件循环，而不是下一轮。

- **使用**（伪码）

```javascript
function f1(resolve, reject) {
	// 异步代码...
    if (true){/* 异步操作成功 */
        resolve(value); // 置状态为 fulfilled，并返回 value，作为下一层内嵌回调函数的参数，即紧邻的 then 方法指定的回调函数的参数。
	} else { /* 异步操作失败 */
        reject(new Error()); // 置状态为 rejected，并抛出的错误。错误具有传递性，可被任何一层内嵌回调函数捕捉。
    }
}

// Promise 是一个对象，也是一个构造函数。
var p1 = new Promise(f1); // 传入异步函数 f1,返回一个 Promise 实例。更常见的做法是，直接传入一个匿名函数。
p1.then(f2).then(f3); // 用 then 方法指定下一步回调的函数，后面可跟多个 then，与嵌套回调函数等效。

```

- **示例**

```javascript
// 关于构造函数
function timeout(ms) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, ms, 'done');
  });
}
timeout(100); // 返回了一个 Promise 实例。
// 观察到实例有 [[PromiseState]] 和 [[PromiseResult]] 两个属性，值分别为 fulfilled 和 done。
// 第一次见这种由“[[]]”，包裹的属性，不知道该如何称呼。
// 这种属性不能被正常访问到。

// 关于 then
var p1 = new Promise(function (resolve, reject) {
  resolve('成功');
});
p1.then(console.log, console.error); // "成功"
var p2 = new Promise(function (resolve, reject) {
  reject(new Error('失败'));
});
p2.then(); // Error: 失败

// 关于微任务
setTimeout(function() {
  console.log(1);
}, 0); // 放到下一轮事件循环任务队列的头部
new Promise(function (resolve, reject) {
  resolve(2);
}).then(console.log); // 追加到本轮事件循环任务队列的尾部
console.log(3); // 同步任务在本轮事件循环
// 3
// 2
// 1
```

优缺点详见[教程](https://wangdoc.com/javascript/async/promise.html#%E5%B0%8F%E7%BB%93 "Promise 优缺点")。

------

## 初识 DOM

- **概念**

> DOM（Document Object Model），文档对象模型，是 JavaScript 操作网页的接口 。

- **作用**

> DOM 将网页转为一个 JavaScript 对象，从而可以用脚本对网页进行各种操作。

- **进一步了解**
  - 浏览器根据 DOM 模型，将结构化文档（HTML、XML 等）解析成树状结构（DOM Tree）。
  - DOM Tree 是由一系列节点（node）构成的，所有节点，以及结构树本身，都有规范的对外接口。
  - DOM 只是一个接口规范，可以用各种语言实现。

- **节点**

  - 七种节点类型
    - `Document`：整个文档树的顶层节点
    - `DocumentType`：`doctype`标签（比如`<!DOCTYPE html>`）
    - `Element`：网页的各种HTML标签（比如`<body>`、`<a>`等）
    - `Attr`：网页元素的属性（比如`class="right"`）
    - `Text`：标签之间或标签包含的文本
    - `Comment`：注释
    - `DocumentFragment`：文档的片段

  - 节点树的组成
    - `document`节点，代表整个文档树

## 语法查漏补缺

1. JavaScript 会自动添加行末的分号`;`，但强烈建议为代码手动加上分号。

2. 全局变量要大写表示 UPPER_VAR。

3. 分清楚**数组操作**及**操作数组**的函数。

   - 区分原则：是否改变了原数组。

   - 数组操作：`pop`|`push`|`shift`|`unshift`|`reverse`|`splice`|`sort`

   - 操作数组：`join`|`concat`|`slice`|`forEach`|`map`|`filter`|`some`|`every`|`reduce`|`reduceRight`|`indexOf`	

   - 更多说明：某些操作数组的函数，如 forEach 等，能改变传入的回调对象。如果该对象是原数组，那么也就改变了原数组。这不在区分原则考虑的范围之内。

4. 构造函数两个特点：

   1. 函数体内部使用了 this 关键字，代表了所要生成的对象实例。

   2. 生成对象的时候，必须使用new命令，使得构造函数执行并返回构造好的 this 对象。

   （**注意**：不要在构造函数内 return，这会干扰返回 this 对象，除非你知道你在干什么。）

5.  为了保持简单，JavaScript 是**单线程**的，一开始是这样，将来也不会变。这是这门语言的**核心特征**。

## 一些有必要记录的示例

- **输出一个字符串里的四字节字符**

```javascript
String.fromCharCode('??'.charCodeAt(0),'??'.charCodeAt(1)); // '??'，某些编辑器无法解析四字节字符，会变成'??'
```

- **判断奇偶**

```javascript
1&Number; // 奇数1，偶数0。Number 指代一切 number 类型的数字。
```

- **骰子游戏**

```javascript
// 任意范围的随机整数生成函数
function getRandomInt(min, max) { 
	return Math.floor(Math.random() * (max - min + 1)) + min;
}
// 掷骰子函数
var dice = ()=>[getRandomInt(1,6),getRandomInt(1,6),getRandomInt(1,6)];
dice(); // 返回由3个1~6间随机整数组成的数组
```

- **一种长字符串换行写的技巧**

```javascript
var ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
ALPHABET += 'abcdefghijklmnopqrstuvwxyz';
ALPHABET += '0123456789-_';
```

- **方便测试正则式**

```javascript
function regTest(regular,string){
   var reg = regular;
   var str = string;
   function execTest(){ 
       r = reg.exec(str);
       console.log(String(r));
       console.log(r === null ? 'Not exist.' : r.index);
       console.log(reg.lastIndex);
   }
   return execTest;
}
// 在浏览器里运行一遍即可使用
```




***