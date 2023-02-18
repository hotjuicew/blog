---
title: "FCC_JS笔记"
date: 2022-07-10T13:49:32+08:00
categories: ['JavaScript']
tags: []
---
# JavaScript 

## 基础 JavaScript

1.当你使用 let 时，同名的变量只能声明一次。
const 意味着它常量值，这意味着一旦一个变量被赋值为 const，它就不能被重新赋值
2.字符串的不变性
在 JavaScript 中，字符串（String）的值是不可变的（immutable），这意味着一旦字符串被创建就不能被改变。

例如，下面的代码：
```js
let myStr = "Bob";
myStr[0] = "J";
```
是不会把变量 myStr 的值改变成 Job 的，因为变量 myStr 是不可变的。 注意，这并不意味着 myStr 永远不能被改变，只是字符串字面量 string literal 的各个字符不能被改变。 改变 myStr 的唯一方法是重新给它赋一个值，例如：
```js
let myStr = "Bob";
myStr = "Job";
```
3.  .push() 接受一个或多个参数（parameters），并把它压入到数组的末尾。.pop() 函数移除数组末尾的元素并返回这个元素。 .shift() 工作原理就像 .pop()，但它移除的是第一个元素，而不是最后一个。.unshift() 函数用起来就像 .push() 函数一样，但不是在数组的末尾添加元素，unshift() 在数组的头部添加元素。
4.  严格相等运算符（===）是相对相等操作符（==）的另一种比较操作符。 与相等操作符转换数据类型不同，严格相等运算符不会做类型转换。
5.  如果你的对象有非字符串属性的话，JavaScript 会自动将它们转为字符串。所以js属性名都是字符串
6.  读取对象属性可以用点表示法和方括号表示法。对名称中带有空格的属性使用括号表示法，并且要把这个属性加上引号。
```js
const gloveBoxContents = myStorage.car.inside['glove box']
```
7.  可以像更改属性一样给 JavaScript 对象添加属性。同样可以删除对象的属性，例如：
```js
delete ourDog.bark;
```
8.对象和字典一样，可以用来存储键/值对。 如果数据是扁平的，你可以用对象来查找你想要的值，而不是链式使用 switch 或 if/else 语句。
```js
const alpha = {
  1:"Z",
  2:"Y",
  3:"X",
  4:"W",
  ...
  24:"C",
  25:"B",
  26:"A"
};

alpha[2];
alpha[24];

const value = 2;
alpha[value];
```
alpha[2] 是字符串 Y，alpha[24] 是字符串 C，alpha[value] 是字符串 Y。
9.检查一个对象属性是否存在.
```js
const myObj = {
  top: "hat",
  bottom: "pants"
};

myObj.hasOwnProperty("top");
myObj.hasOwnProperty("middle");
```
第一个 hasOwnProperty 返回 true，第二个返回 false。
10.Math.random()生成0-1，左闭右开
11.Math.floor() 向下取整，获得它最近的整数。
12.生成某个范围内的随机整数
```js
Math.floor(Math.random() * (max - min + 1)) + min
```
13.parseInt() 函数解析一个字符串返回一个整数。

## ES6 

1.优先使用const
2.const 声明并不会真的保护数据不被改变。 
使用 const 声明只能防止变量标识符的重新分配。

```js
const s = [5, 6, 7];
s = [1, 2, 3];
s[2] = 45;
console.log(s);
```
s = [1, 2, 3] 将导致错误。 console.log 将显示值 [5, 6, 45]。
但可以使用对各元素赋值的方法来改变对象中的内容
为了确保数据不被改变，JavaScript 提供了一个函数 Object.freeze。任何更改对象的尝试都将被拒绝，如果脚本在严格模式下运行，将抛出错误。
3.箭头函数`const myFunc = () => "value";`
（1）当箭头函数函数体有多行语句，用 {} 包裹起来，表示代码块，当只有一行语句，并且需要返回结果时，可以省略 {} , 结果会自动返回。
```js
var f = (a,b) => {
 let result = a+b;
 return result;
}
f(6,2);  // 8
```
（2）当箭头函数要返回对象的时候，为了区分于代码块，要用 () 将对象包裹起来
```js
// 报错
var f = (id,name) => {id: id, name: name};
f(6,2);  // SyntaxError: Unexpected token :
 
// 不报错
var f = (id,name) => ({id: id, name: name});
f(6,2);  // {id: 6, name: 2}
```

4.ES6 里允许给函数传入默认参数，来构建更加灵活的函数。

```js
const greeting = (name = "Anonymous") => "Hello " + name;
```
5.rest 操作符(也就是...)可以用于创建有一个变量来接受任意数量的参数的函数。 这些参数被储存在一个可以在函数内部读取的数组中。

```js
// 使sum函数可以接收任意数量的参数，并返回它们的总和。
const sum=(...args)=>{
  return args.reduce((a,b)=> a+b,0)//这里把0设为初始值
}
```
补充：reduce() 方法对数组中的每个元素按序执行一个由您提供的 reducer 函数，每一次运行 reducer 会将先前元素的计算结果作为参数传入，最后将其结果汇总为单个返回值。
第一次执行回调函数时，不存在“上一次的计算结果”。如果需要回调函数从数组索引为 0 的元素开始执行，则需要传递初始值。否则，数组索引为 0 的元素将被作为初始值 initialValue，迭代器将从第二个元素开始执行（索引为 1 而不是 0）。
6.展开操作符(...arr) ，可以展开数组，把数组变成..., ..., ...的形式
 ps看上去和rest 操作符一样的
下面的例子中，Math.max() 函数中需要传入的是一系列由逗号分隔的参数，而不是一个数组。 展开操作符可以提升代码的可读性，使代码易于维护。
```js
const arr = [6, 89, 3, 45];
const maximus = Math.max(...arr);
//maximus 的值应该是 89。
```
...arr 返回一个解压的数组。 也就是说，它展开数组。 然而，展开操作符只能够在函数的参数中或者数组中使用。
```
const spreaded = ...arr;//报错
const arr2 = [...arr1];//可以
```
7.解构赋值
```js
const user = { name: 'John Doe', age: 34 };
const { name, age } = user;
```
在这里，自动创建 name 和 age 变量，并将 user 对象相应属性的值赋值给它们。name 的值应该是字符串 John Doe， age 的值应该是数字 34。作用相当于
```js
const user = { name: 'John Doe', age: 34 };
const name = user.name;
const age = user.age;
```
又一个例子
```js
const HIGH_TEMPERATURES = {
  yesterday: 75,
  today: 77,
  tomorrow: 80
};
const {today,tomorrow}=HIGH_TEMPERATURES
```
8.可以给解构的值赋予一个新的变量名， 通过在赋值的时候将新的变量名放在冒号后面来实现。
```js
const user = { name: 'John Doe', age: 34 };
const { name: userName, age: userAge } = user;
```
9.解构赋值可以嵌套
10.使用解构赋值从数组中分配变量
```js
const [a, b,,, c] = [1, 2, 3, 4, 5, 6];
console.log(a, b, c);
```
控制台将显示 a、b 和 c 的值为 1, 2, 5。
11.解构数组
```js
const [a, b,,, c] = [1, 2, 3, 4, 5, 6];
console.log(a, b, c);
```
控制台将显示 a、b 和 c 的值为 1, 2, 5。
```js
let a = 8, b = 6;
// 使用数组解构来交换变量 a 与 b 的值，使 a 接收 b 的值，而 b 接收 a 的值。
[a,b]=[b,a]
```
用这个方法可以交换两个数的数值

解构数组的某些情况下，我们可能希望将剩下的元素放进另一个数组里面。
```js
const [a, b, ...arr] = [1, 2, 3, 4, 5, 7];
console.log(a, b);
console.log(arr);
```
控制台将显示 1, 2 和 [3, 4, 5, 7]。
12.在某些情况下，你可以在函数的参数里直接解构对象。
请看以下代码：
```js
const profileUpdate = (profileData) => {
  const { name, age, nationality, location } = profileData;

}
```
上面的操作解构了传给函数的对象。 这样的操作也可以直接在参数里完成：
```js
const profileUpdate = ({ name, age, nationality, location }) => {

}
```
当 profileData 被传递到上面的函数时，从函数参数中解构出值以在函数内使用。
另一个例子：
```js
const stats = {
  max: 56.78,
  standard_deviation: 4.34,
  median: 34.54,
  mode: 23.87,
  min: -0.75,
  average: 35.85
};
const half = ({max,min}) => (max + min) / 2.0; 
```
13.模板字符串可以使用多行字符串和字符串插值功能。
请看以下代码：
```js
const person = {
  name: "Zodiac Hasbro",
  age: 56
};

const greeting = `Hello, my name is ${person.name}!
I am ${person.age} years old.`;

console.log(greeting);
```
控制台将显示字符串 Hello, my name is Zodiac Hasbro! 和 I am 56 years old.。

这里发生了许多事情。 首先，这个例子使用反引号（`），而不是引号（' 或者 "）将字符串括起来。 其次，注意代码和输出中的字符串都是多行的。 不需要在字符串中插入 \n。 上面使用的 ${variable} 语法是一个占位符。 这样一来，你将不再需要使用 + 运算符来连接字符串。 当需要在字符串里增加变量的时候，你只需要在变量的外面括上 ${ 和 }，并将其放在模板字符串里就可以了。 同样，你可以在字符串中包含其他表达式，例如 ${a + b}。 这个新的方式使你可以更灵活地创建复杂的字符串。
14.使用简单字段编写简洁的对象字面量声明
请看以下代码：
```js
const getMousePosition = (x, y) => ({
  x: x,
  y: y
});
```
getMousePosition 简单的函数，返回拥有两个属性的对象。 ES6 提供了一个语法糖，消除了类似 x: x 这种冗余的写法。 你可以只写一次 x，解释器会自动将其转换成 x: x（或效果相同的内容）。 下面是使用这种语法重写的同样的函数：
```js
const getMousePosition = (x, y) => ({ x, y });
```
另一个例子
```js
const createPerson = (name, age, gender) => {
  return {
    name: name,
    age: age,
    gender: gender
  };
};
```
可简化为
```js
const createPerson = (name, age, gender) => {
  return {
    name, age, gender
  };
};
```
15.用 ES6 的语法在对象中定义函数的时候，可以删除 function 关键词和冒号。 请看以下例子：
```js
const person = {
  name: "Taylor",
  sayHello() {
    return `Hello! My name is ${this.name}.`;
  }
};
```
等同于
```js
const person = {
  name: "Taylor",
  sayHello: function() {
    return `Hello! My name is ${this.name}.`;
  }
};
```
16.使用 class 语法定义构造函数 (class 只是一个语法糖)
在 ES5 里面，我们通常会定义一个构造函数 ，然后使用 new 关键字来实例化一个对象：
```js
var SpaceShuttle = function(targetPlanet){
  this.targetPlanet = targetPlanet;
}
var zeus = new SpaceShuttle('Jupiter');
```
class 语法只是简单地替换了构造函数  的写法：
```js
class SpaceShuttle {
  constructor(targetPlanet) {
    this.targetPlanet = targetPlanet;
  }
}
const zeus = new SpaceShuttle('Jupiter');
```
**注意：**首字母大写驼峰命名法 UpperCamelCase 是 ES6 class 命名的惯例，就像上面的 SpaceShuttle。

constructor 方法是一个特殊方法，用于创建和初始化 class 创建的对象。
17.使用 getter 和 setter 来控制对象的访问
getter和setter一般放到class里面
Getter 函数的作用是可以让对象返回一个私有变量，而不需要直接去访问私有变量。
Setter 函数的作用是可以基于传进的参数来修改对象中私有变量。 这些修改可以是计算，或者是直接替换之前的值。
```js
class Book {
  constructor(author) {
    this._author = author;
  }
  // getter
  get writer() {
    return this._author;
  }
  // setter
  set writer(updatedAuthor) {
    this._author = updatedAuthor;
  }
}
const novel = new Book('anonymous');
console.log(novel.writer);
novel.writer = 'newAuthor';
console.log(novel.writer);
```
注意： 通常会在私有变量前添加下划线（_）。 然而，这种做法本身并不是将变量变成私有的,这只是一种书写习惯
18.创建一个模块脚本
```js
<script type="module" src="filename.js"></script>
```
使用了 module 类型的脚本可以使用 import 和 export 特性

19.用 export 来重用代码块

假设有一个文件 `math_functions.js`，该文件包含了数学运算相关的一些函数。 其中一个存储在变量 `add` 里，该函数接受两个数字作为参数返回它们的和。 你想在几个不同的 JavaScript 文件中使用这个函数。 要实现这个目的，就需要 `export` 它。

```js
export const add = (x, y) => {
  return x + y;
}
```

上面是导出单个函数常用方法，还可以这样导出：

```js
const add = (x, y) => {
  return x + y;
}

export { add };
```

导出变量和函数后，就可以在其它文件里导入使用从而避免了代码冗余。 重复第一个例子的代码可以导出多个对象或函数，在第二个例子里面的导出语句中添加更多值也可以导出多项，例子如下：

```js
export { add, subtract };
```

20.通过 import 复用 JavaScript 代码
import 可以导入文件或模块的一部分。 在之前的课程里，例子从 math_functions.js 文件里导出了 add。 下面看一下如何在其它文件导入它：

```js
import { add } from './math_functions.js';
```
在这里，import 会在 math_functions.js 里找到 add，只导入这个函数，忽略剩余的部分。 ./ 告诉程序在当前文件的相同目录寻找 math_functions.js 文件。 用这种方式导入时，相对路径（./）和文件扩展名（.js）都是必需的。

通过在 import 语句里添加项目，可以从文件里导入多个项目，如下：
```js
import { add, subtract } from './math_functions.js';
```
添加 import 语句，使当前文件可以使用你在之前课程里导出的 uppercaseString 和 lowercaseString 函数。 函数在当前路径下的 string_functions.js 文件里。
21.用 * 从文件中导入所有内容

假设你有一个文件，你希望将其所有内容导入到当前文件中。 可以用 `import * as` 语法来实现。 下面是一个从同目录下的 `math_functions.js` 文件中导入所有内容的例子：

```js
import * as myMathModule from "./math_functions.js";
```

上面的 `import` 语句会创建一个叫作 `myMathModule` 的对象。 这只是一个变量名，可以随便命名。 对象包含 `math_functions.js` 文件里的所有导出，可以像访问对象的属性那样访问里面的函数。 下面是使用导入的 `add` 和 `subtract` 函数的例子：

```js
myMathModule.add(2,3);
myMathModule.subtract(5,3);
```

22.用 export default 创建一个默认导出

在 `export` 的课程中，你学习了命名导出语法， 这可以在其他文件中引用一些函数或者变量。

还需要了解另外一种被称为默认导出的 `export` 的语法。 在文件中只有一个值需要导出的时候，通常会使用这种语法。 它也常常用于给文件或者模块创建返回值。

下面是使用 `export default` 的例子：

```js
export default function add(x, y) {
  return x + y;
}

export default function(x, y) {
  return x + y;
}
```

第一个是命名函数，第二个是匿名函数。

`export default` 用于为模块或文件声明一个返回值，在每个文件或者模块中应当只默认导出一个值。 此外，你不能将 `export default` 与 `var`、`let` 或 `const` 同时使用。

23.导入一个默认的导出

在上一个挑战里，学习了 `export default` 的用法。 还需要一种 `import` 的语法来导入默认的导出。 在下面的例子里，`add` 是 `math_functions.js` 文件的默认导出。 以下是如何导入它：

```js
import add from "./math_functions.js";
```

这个语法有一处特别的地方， 被导入的 `add` 值没有被花括号（`{}`）所包围。 `add` 只是一个变量的名字，对应 `math_functions.js` 文件的任何默认导出值。 在导入默认导出时，可以使用任何名字。

24.创建一个 JavaScript Promise

Promise 是异步编程的一种解决方案 - 它在未来的某时会生成一个值。 任务完成，分执行成功和执行失败两种情况。 `Promise` 是构造器函数，需要通过 `new` 关键字来创建。 构造器参数是一个函数，该函数有两个参数 - `resolve` 和 `reject`。 通过它们来判断 promise 的执行结果。 用法如下：

```js
const myPromise = new Promise((resolve, reject) => {

});
```

25.通过 resolve 和 reject 完成 Promise

Promise 有三个状态：`pending`、`fulfilled` 和 `rejected`。 上一个挑战里创建的 promise 一直阻塞在 `pending` 状态里，因为没有调用 promise 的完成方法。 Promise 提供的 `resolve` 和 `reject` 参数就是用来结束 promise 的。 Promise 成功时调用 `resolve`，promise 执行失败时调用 `reject`， 如下文所述，这些方法需要有一个参数。

```js
const myPromise = new Promise((resolve, reject) => {
  if(condition here) {
    resolve("Promise was fulfilled");
  } else {
    reject("Promise was rejected");
  }
});
```

上面的示例使用字符串作为这些函数的参数，但参数实际上可以是任何格式。 通常，它可能是一个包含数据的对象，你可以将它放在网站或其他地方。

以下是一个例子，使 promise 可以处理成功和失败情况。 如果 `responseFromServer` 是 `true`，调用 `resolve` 方法使 promise 成功。 给 `resolve` 传递值为 `We got the data` 的字符串。 如果 `responseFromServer` 是 `false`， 使用 `reject` 方法并传入值为 `Data not received` 的字符串。
```js
const makeServerRequest = new Promise((resolve, reject) => {
  // responseFromServer 表示从服务器获得一个响应
  let responseFromServer;
  if(responseFromServer) {
    resolve('We got the data')
  } else {  
    reject ('Data not received')
  }
});
```

26.用 then 处理 Promise 完成的情况

当程序需要花费未知的时间才能完成时（比如一些异步操作），一般是服务器请求，promise 很有用。 服务器请求会花费一些时间，当结束时，需要根据服务器的响应执行一些操作。 这可以用 `then` 方法来实现， 当 promise 完成 `resolve` 时会触发 `then` 方法。

```js
const makeServerRequest = new Promise((resolve, reject) => {
  // responseFromServer 设置为 true，表示从服务器获得有效响应
  let responseFromServer = true;

  if(responseFromServer) {
    resolve("We got the data");
  } else {  
    reject("Data not received");
  }
});
makeServerRequest.then(
  result => {
console.log(result)
}
)
```

27.使用 catch 处理 Promise 失败的情况

当 promise 失败时会调用 `catch` 方法。 当 promise 的 `reject` 方法执行时会直接调用。 用法如下：

```js
myPromise.catch(error => {

});
```

`error` 是传入 `reject` 方法的参数。

```js
const makeServerRequest = new Promise((resolve, reject) => {
  // responseFromServer 设置为 false，表示从服务器获得无效响应
  let responseFromServer = false;

  if(responseFromServer) {
    resolve("We got the data");
  } else {  
    reject("Data not received");
  }
});

makeServerRequest.then(result => {
  console.log(result);
});
makeServerRequest.catch(error => {
  console.log(error);
});
```
## 正则表达式
1.JavaScript 中有多种使用正则表达式的方法。 测试正则表达式的一种方法是使用 `.test()` 方法。 `.test()` 方法会把编写的正则表达式和字符串（即括号内的内容）匹配，如果成功匹配到字符，则返回 `true`，反之，返回 `false`。
```js
let testStr = "freeCodeCamp";
let testRegex = /Code/;
testRegex.test(testStr);
```
`test` 方法会返回 `true`。
2.|
如果你想匹配 `yes` 或 `no`，你需要的正则表达式是 `/yes|no/`。
3.i忽略大小写
这里给出使用该标志的一个实例 /ignorecase/i。 这个字符串可以匹配字符串 ignorecase、igNoreCase 和 IgnoreCase。
4.提取匹配项
`.test()` 方法。 只是检查了一个匹配模式是否存在于字符串中。 还可以使用 `.match() `方法来提取找到的实际匹配项。可以使用字符串来调用 .match() 方法，并在括号内传入正则表达式。

请看下面的举例：

```js
"Hello, World!".match(/Hello/);
let ourStr = "Regular expressions";
let ourRegex = /expressions/;
ourStr.match(ourRegex);
```
这里第一个 `match` 将返回 `["Hello"]` 第二个将返回 `["expressions"]`。
5.全局匹配
若要多次搜寻或提取模式匹配，可以使用 g 标志。如果不使用g的话，默认只能提取或搜寻一次匹配。

```js
let testStr = "Repeat, Repeat, Repeat";
let ourRegex = /Repeat/;
testStr.match(ourRegex);
```
在这里 `match` 将返回 `["Repeat"]`。
若要多次搜寻或提取模式匹配，可以使用 `g` 标志。
```js
let repeatRegex = /Repeat/g;
testStr.match(repeatRegex);
```
这里 `match` 返回值 `["Repeat", "Repeat", "Repeat"]`
6.用通配符.匹配任何内容
通配符 . 将匹配任何一个字符。 可以像使用正则表达式中任何其他字符一样使用通配符。 例如，如果想匹配 hug、huh、hut 和 hum，可以使用正则表达式 /hu./
7.可以使用字符集 更灵活的匹配字符。 可以把字符集放在方括号（[ 和 ]）之间来定义一组需要匹配的字符串。
例如，如果想要匹配 bag、big 和 bug，但是不想匹配 bog。 可以创建正则表达式 /b[aiu]g/ 来执行此操作。 [aiu] 是只匹配字符 a、i 或者 u 的字符集。
如果要匹配连续的字符， 可以使用连字符（`-`）来定义要匹配的字符范围。
例如，要匹配小写字母 `a` 到 `e`，你可以使用 `/[a-e]/`。`/[0-5]/` 匹配 `0` 和 `5` 之间的任意数字，包含 `0` 和 `5`。
创建一个正则表达式，使其可以匹配 `h` 和 `s` 之间的一系列字母，以及 `2` 和 `6` 之间的一系列数字。 

```js
let myRegex = /[h-s2-6]/ig; 
```
8.也可以创建一个不想匹配的字符集合。 这些类型的字符集称为否定字符集
要创建否定字符集，需要在开始括号后面和不想匹配的字符前面放置脱字符（即^）。

例如，/[^aeiou]/gi 匹配所有非元音字符。 注意，字符 .、!、[、@、/ 和空白字符等也会被匹配，该否定字符集仅排除元音字符。
9.可以使用 + 符号来匹配出现一次或重复出现多次的字符
例如，/a+/g 会在 abc 中匹配到一个匹配项，并且返回 ["a"]。 因为 + 的存在，它也会在 aabc 中匹配到一个匹配项，然后返回 ["aa"]。
如果它是检查字符串 abab，它将匹配到两个匹配项并且返回["a", "a"]，因为a字符不连续，在它们之间有一个b字符。 最后，因为在字符串 bcd 中没有 a，因此找不到匹配项。
10.字符后加*可以匹配出现零次或多次的字符

```js
let soccerWord = "gooooooooal!";
let gPhrase = "gut feeling";
let oPhrase = "over the moon";
let goRegex = /go*/;//匹配0个或多个o
soccerWord.match(goRegex);
gPhrase.match(goRegex);
oPhrase.match(goRegex);
```
11.正则表达式默认是贪婪匹配。贪婪（greedy）匹配会匹配到符合正则表达式匹配模式的字符串的最长可能部分，并将其作为匹配项返回。 另一种方案称为懒惰（lazy）匹配，它会匹配到满足正则表达式的字符串的最小可能部分。
可以在限定符后面加`？`来将此正则表达式变成懒惰匹配

12.`^`符号的另一种用法

在之前的挑战中，使用字符集中前插入符号（`^`）来创建一个否定字符集，形如 `[^thingsThatWillNotBeMatched]`。 除了在字符集中使用之外，插入符号（^）用于匹配文本是否在字符串的开始位置
```js
let firstString = "Ricky is first and can be found.";
let firstRegex = /^Ricky/;
firstRegex.test(firstString);
let notFirst = "You can't find Ricky now.";
firstRegex.test(notFirst);
```
第一次 `test` 调用将返回 `true`，而第二次调用将返回 `false`。
13.与^相对， $ 来搜寻字符串的结尾

```js
let theEnding = "This is a never ending story";
let storyRegex = /story$/;
storyRegex.test(theEnding);
let noEnding = "Sometimes a story will have to end";
storyRegex.test(noEnding);
```
第一次 `test` 调用将返回 `true`, 而第二次调用将返回 `false`。
14.元字符\w等同于[A-Za-z0-9_]，此字符类匹配大写字母和小写字母、数字以及下划线字符 (`_`)。
可以使用 \W 搜寻和 \w相反的匹配模式。\W匹配非字母数字字符
15.\d等同于[0-9]，\D等同于字符串 [^0-9]
16.\s匹配空白字符，\S 匹配非空白字符，不匹配空格、回车符、制表符、换页符和换行符

17.数量说明符{}匹配出现的次数
例如，要匹配出现 3 到 5 次字母 a 的在字符串 ah，正则表达式应为/a{3,5}h/。也可以只指定上限 /a{,5}h/或只指定下限/a{3,}h/。也可以指定匹配的确切数量/a{3}h/
18.符号后加? 指定可能存在的元素
例如，美式英语和英式英语略有不同，可以使用问号来匹配两种拼写。
```js
let american = "color";
let british = "colour";
let rainbowRegex= /colou?r/;
rainbowRegex.test(american);
rainbowRegex.test(british);
```
上面的 `test` 都会返回 `true`。

19.正向先行断言和负向先行断言
正向先行断言会查看并确保搜索匹配模式中的元素存在，但实际上并不匹配。 正向先行断言的用法是 (?=...)，其中 ... 就是需要存在但不会被匹配的部分。
另一方面，负向先行断言会查看并确保搜索匹配模式中的元素不存在。 负向先行断言的用法是 (?!...)，其中 ... 是希望不存在的匹配模式。 如果负向先行断言部分不存在，将返回匹配模式的其余部分。

```js
let quit = "qu";
let noquit = "qt";
let quRegex= /q(?=u)/;
let qRegex = /q(?!u)/;
quit.match(quRegex);
noquit.match(qRegex);
```

这两次 `match` 调用都将返回 `["q"]`。

先行断言的更实际用途是检查一个字符串中的两个或更多匹配模式。 这里有一个简单的密码检查器，密码规则是 3 到 6 个字符且至少包含一个数字：

```js
let password = "abc123";
let checkPass = /(?=\w{3,6})(?=\D*\d)/;
checkPass.test(password);
```

20.`()` 来检查字符组
如果想在字符串找到 `Penguin` 或 `Pumpkin`，可以用这个正则表达式：`/P(engu|umpk)in/g`。
然后使用 `test()` 方法检查 test 字符串里面是否包含字符组。
```js
let testStr = "Pumpkin";
let testRegex = /P(engu|umpk)in/;
testRegex.test(testStr);
```
`test` 方法会返回 `true`。

21.使用捕获组重用模式你可以使用 `/row row row/`。但如果你不知道重复的特定单词，怎么办？ 捕获组 可以用于找到重复的子字符串。捕获组是通过把要捕获的正则表达式放在括号中来构建的。 在这个例子里， 目标是捕获一个包含字母数字字符的词，所以捕获组是将 `\w+` 放在括号中：`/(\w+)/`。分组匹配的子字符串被保存到一个临时的“变量”， 可以使用同一正则表达式和反斜线及捕获组的编号来访问它（例如：`\1`）。 捕获组按其开头括号的位置自动编号（从左到右），从 1 开始。下面的示例是匹配被空格隔开的两个相同单词：

```js
let repeatRegex = /(\w+) \1 \1/;
repeatRegex.test(repeatStr); // Returns true
repeatStr.match(repeatRegex); // Returns ["row row row", "row"]
```
在 `reRegex` 中使用捕获组来匹配一个只由相同的数字重复三次组成的由空格分隔字符串。
```js
let repeatNum = "42 42 42";
let reRegex = /^(\d+) \1 \1$/; // 如果不加^和$，就可以匹配3个及以上的42，加了之后就只能匹配42 42 42
let result = reRegex.test(repeatNum);
```

22.可以在字符串上使用 `.replace()` 方法来搜索并替换字符串中的文本。 `.replace()` 的输入首先是想要搜索的正则表达式匹配模式。 第二个参数是用于替换匹配的字符串或用于执行某些操作的函数。

```js
let wrongText = "The sky is silver.";
let silverRegex = /silver/;
wrongText.replace(silverRegex, "blue");
```

`replace` 调用将返回字符串 `The sky is blue.`。

你还可以使用美元符号（`$`）访问替换字符串中的捕获组。

```js
"Code Camp".replace(/(\w+)\s(\w+)/, '$2 $1');
```

调用 `replace` 将返回字符串 `Camp Code`。

23.删除开头和结尾的空白
```js
let hello = "   Hello, World!  ";
let wsRegex = /^\s+|\s+$/g; 
let result = hello.replace(wsRegex,"");
```
## 调试
1.console.log()可以在控制台看到日志，console.clear() 清除控制台日志
2.使用 typeof 检查变量的类型
当你以 JavaScript 对象（JSON）的形式访问和使用外部数据时尤其要小心类型错误
3.捕获拼错的变量名和函数名
一个语法级别的问题是打字太快带来的低级拼写错误。
变量或函数名的错写、漏写或大小写弄混都会让浏览器尝试查找并不存在的东西，并报出“引用错误”。 JavaScript 变量和函数名称区分大小写。
## 基础数据结构
1.数组可以存储不同类型的数据
```js
let simpleArray = ['one', 2, 'three', true, false, undefined, null];
console.log(simpleArray.length);
```
调用 `console.log` 显示 7。

#### Array.prototype.splice()

2.splice() 可以让我们从数组中的**任意位置连续**删除**任意数量**的元素。
返回值是包含**已删除元素**的数组。
splice() 最多可以接受 3 个参数
splice() 的第一个参数（ 必需；在只有一个参数的情况下，*slice*()方法返回从该参数指定位置开始到当前数组末尾的所有项。）代表从数组中的哪个索引开始移除元素，而第二个参数（可选）表示要从数组中的这个位置开始删除多少个元素。 例如：
 例如：

```js
let array = ['today', 'was', 'not', 'so', 'great'];
array.splice(2, 2);
```
这里我们移除 2 个元素，首先是第三个元素（索引为 2）。 `array` 会有值 `['today', 'was', 'great']`。
`splice()` 不仅会修改调用该方法的数组，还会返回一个包含被移除元素的数组
3.splice()替换元素
第三个参数可以是一个或多个元素，这些元素会被添加到删除位置。 这样，我们能够便捷地将数组中的一个或多个连续元素换成其他的元素。

4. 数组的slice()方法 。 它提取数组中的元素，将其作为一个新的数组返回，不改变原数组
    slice() 只接收 2 个输入参数：第一个是开始提取元素的位置（索引），第二个是提取元素的结束位置（索引）。左闭右开。
    字符串的slice()方法类似。它提取字符串的一部分并将其作为新字符串返回

  **用 splice 方法删除 JavaScript Array 中的特定值的元素**

  如果知道想要从数组中删除的值，也可以用 `splice` 方法。但是也要先获取目标元素的索引，然后用根据索引来删除该元素

  ```js
  var array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
  
  for( var i = 0; i < array.length-1; i++){ 
     if ( array[i] === 5) {
       arr.splice(i, 1); 
         i--
     }
  }
  
  //=> [1, 2, 3, 4, 6, 7, 8, 9, 0]
  ```

5.使用展开运算符...复制数组

```js
let thisArray = [true, true, undefined, false, null];
let thatArray = [...thisArray];
```
thatArray 等于 [true, true, undefined, false, null]。 thisArray 保持不变， thatArray 包含与 thisArray 相同的元素。
6.展开语法（spread）的另一个重要用途是合并数组，或者将某个数组的所有元素插入到另一个数组的任意位置。

```js
let thisArray = ['sage', 'rosemary', 'parsley', 'thyme'];
let thatArray = ['basil', 'cilantro', ...thisArray, 'coriander'];
```
7.使用 indexOf() 检查元素是否存在
string的indexOf() 方法接受一个元素作为输入参数，并返回该元素在数组中的位置（索引）；若该元素不存在于数组中则返回 -1。

8.对象（object）本质上是键值对（key-value pair）的集合。 或者说，一系列被映射到唯一标识符的数据就是对象；习惯上，唯一标识符叫做属性（property）或者键（key）；数据叫做值（value）。 让我们来看一个简单的例子：

```js
const tekkenCharacter = {
  player: 'Hwoarang',
  fightingStyle: 'Tae Kwon Doe',
  human: true
};
```

上面的代码定义了一个叫做 `tekkenCharacter` 的“铁拳”游戏人物对象。 它有三个属性，每个属性都对应一个特定的值。 如果我们想为它再添加一个叫做 `origin` 的属性，可以这样写：

```js
tekkenCharacter.origin = 'South Korea';
```

上面的代码中，我们使用了点号表示法。 如果我们现在输出 `tekkenCharacter` 对象，便可以看到它具有 `origin` 属性。 接下来，因为这个人物在游戏中有着与众不同的橘色头发， 我们可以通过方括号表示法来为它添加这个属性，像这样：

```js
tekkenCharacter['hair color'] = 'dyed orange';
```

如果要设置的属性中存在空格，或者要设置的属性是一个变量，那我们必须使用方括号表示法（bracket notation）来为对象添加属性。 在上面的代码中，我们把属性（hair color）放到引号里，以此来表示整个字符串都是需要设置的属性。 如果我们不加上引号，那么中括号里的内容会被当作一个变量来解析，这个变量对应的值就会作为要设置的属性， 请看这段代码：

```js
const eyes = 'eye color';

tekkenCharacter[eyes] = 'brown';
```

执行以上所有示例代码后，对象会变成这样：

```js
{
  player: 'Hwoarang',
  fightingStyle: 'Tae Kwon Doe',
  human: true,
  origin: 'South Korea',
  'hair color': 'dyed orange',
  'eye color': 'brown'
};
```

总结：用点表示法，可以省略引号，用方括号表示法不能省略引号
```js
foods.bananas =13
foods['grapes']=35
```

如果要设置的属性中存在空格，或者要设置的属性是一个变量，那我们必须使用方括号表示法

9.使用 delete 关键字删除对象属性
10.检查对象是否具有某个属性
两种不同的方式来实现这个功能： 一个是通过 `hasOwnProperty()` 方法，另一个是使用 `in` 关键字。 假如我们有一个 `users` 对象，为检查它是否含有 `Alan` 属性，可以这样写：

```js
users.hasOwnProperty('Alan');
'Alan' in users;
```
这两者结果都应该为 `true`。

11.使用 for...in 语句遍历对象

```js
for (let user in users) {
  console.log(user);
}
```
12.使用 Object.keys() 生成由对象的所有属性组成的数组
我们可以给 Object.keys() 方法传入一个对象作为参数，来生成包含对象所有键的数组。 这会返回一个由对象中所有属性（字符串）组成的数组。 需要注意的是，数组中元素的顺序是不确定的。

```js
let users = {
  Alan: {
    age: 27,
    online: false
  },
  Jeff: {
    age: 32,
    online: true
  },
  Sarah: {
    age: 48,
    online: false
  },
  Ryan: {
    age: 19,
    online: true
  }
};
function getArrayOfUsers(obj) {
return Object.keys(obj)
}
console.log(getArrayOfUsers(users));
```
输出[ 'Alan', 'Jeff', 'Sarah', 'Ryan' ]
13. Map 和 Set这两种数据结构与我们现在学到的对象十分类似，但它们在对象的基础上提供了一些额外的功能。

#### Array.prototype.slice() 截取数组

**`slice()`** 方法返回一个新的数组对象，这一对象是一个由 `begin` 和 `end` 决定的原数组的**浅拷贝**（包括 `begin`，不包括`end`）。原始数组不会被改变。

## 基础算法

1.反转字符串
请反转传入函数的字符串。
在反转字符串之前，你可能需要将其切分成包含字符的数组。
函数的返回结果应为字符串。
```js
function reverseString(str) {
  let newStr=''
  for(let i=str.length-1;i>=0;i--){
    newStr+=str[i]
  }
  return newStr;
}
```
2.找出字符串中的最长单词
返回给出的句子中，最长单词的长度。
函数的返回值应是一个数字。
```js
function findLongestWordLength(str) {
  let words = str.split(' ');
  let maxLength = 0;
  for (let i = 0; i < words.length; i++) {
    if (words[i].length > maxLength) {
      maxLength = words[i].length;
    }
  }
  return maxLength;
}
findLongestWordLength("The quick brown fox jumped over the lazy dog");
```

3.确认结尾
检查字符串（第一个参数 `str`）是否以给定的目标字符串（第二个参数 `target`）结束。
这个挑战 可以*用 ES2015 引入的 `.endsWith()` 方法来解决。但在这个挑战中，请使用 JavaScript 的字符串子串方法。
4.重复输出字符串
实现JavaScript 内置的 .repeat() 方法。

5.截断字符串

如果传入的字符串（第一个参数）的长度大于传入的值（第二个参数），请在这个位置截断它， 并在后面加上 `...`，然后返回结果。
```js
function truncateString(str, num) {
  if (str.length > num) {
    return str.slice(0, num) + "...";
  } else {
    return str;
  }
}
```

6.`replace()`方法

`string.replace(searchValue, newValue)`

searchValue是要被替换的值或正则表达式。newValue是新文本 或者 返回替换文本的函数
返回一个替换了值的新字符串。
该方法不会更改原始字符串。
```js
let text = "Mr Blue has a blue house and a blue car";
let result = text.replace(/blue|house|car/gi, function (x) {
  return x.toUpperCase();
});
```
```js
let text = "Mr Blue has a blue house and a blue car";
let result = text.replace(/blue/gi, "red");
```
7.句中单词首字母大写
请将传入的字符串中，每个单词的第一个字母变成大写并返回。 注意除首字母外，其余的字符都应是小写的。
```js
function titleCase(str) {
  return str
    .toLowerCase()
    .replace(/(^|\s)\S/g, L => L.toUpperCase());
}
```
8.array.filter()
filter()创建一个新数组，其中包含通过所提供函数实现的测试的所有元素
eg 返回数组 ages 中所有元素都大于 18 的元素:

```js
var ages = [32, 33, 16, 40];

function checkAdult(age) {
    return age >= 18;
}

function myFunction() {
    document.getElementById("demo").innerHTML = ages.filter(checkAdult);
}
```
9.从数组中移除所有假值（falsy values）。
JavaScript 中的假值有 false、null、0、""、undefined、NaN。

```js
function bouncer(arr) {
  return arr.filter(Boolean);
}
bouncer([7, "ate", "", false, 9]);
```
补充：
Boolean（布尔）对象用于将非布尔值转换为布尔值（true 或者 false）。
```js
var b1=new Boolean(0);//b1===false
var b2=new Boolean(1);//b2===true
var b3=new Boolean("");//b3===false
var b4=new Boolean(null);//b4===false
```
10. 
#### Array.prototype.sort()

    该方法对数组的元素进行**就地**排序并返回排序后的数组.
    默认排序顺序是升序，将元素转换为字符串，然后比较它们的 UTF-16 代码单元值序列。
    可传入一个参数`compareFunction(a, b)`：指定定义排序顺序的函数。

| `compareFunction(a, b)`返回值 | 排序                   |
| :---------------------------- | :--------------------- |
| > 0                           | b先a后           |
| < 0                           | a先b 后          |
| === 0                         | a和b保持原始顺序 |
```js
//如果数组中是数字
const numbers = [4, 2, 5, 1, 3];
numbers.sort((a, b) => a - b);// [1, 2, 3, 4, 5] 升序
numbers.sort((a, b) => b - a);// [5, 4, 3, 2, 1] 降序

//如果数组中是字符
const words = ["a", "d", "c", "a", "z", "g"]

//[ 'a', 'a', 'c', 'd', 'g', 'z' ]
words.sort((a, b) =>a === b ? 0 : a < b ? -1 : 1 )

//[ 'z', 'g', 'd', 'c', 'a', 'a' ]
words.sort((a, b) =>a === b ? 0 : a < b ? 1 : -1 )
```

补充：在不更改原始数组的前提下返回排序后的数组
`sort` 方法会产生改变原始数组中元素顺序的副作用。 换句话说，它会改变数组的位置。 避免这种情况的一种方法是先将空数组连接到正在排序的数组上（记住 `slice` 和 `concat` 返回一个新数组），再用`sort`方法。
```js
function nonMutatingSort(arr) {
  // 只修改这一行下面的代码
  return arr.concat([]).sort(
    (a,b)=>a-b
  )

  // 只修改这一行上面的代码
}
```

11.

#### String.prototype.split()
该方法用于把一个字符串分割成字符串数组。 参数separator可以是正则表达式
提示： 如果把空字符串 ("") 用作 separator，那么 stringObject 中的每个字符之间都会被分割。
 split() 方法不改变原始字符串。

```js
str.split(separator, limit)
```

参数：
- separator   可选。字符串或正则表达式，从该参数指定的地方分割 string Object。
- limit   可选。该参数可指定返回的数组的最大长度。如果设置了该参数，返回的子串不会多于这个参数指定的数组。如果没有设置该参数，整个字符串都会被分割，不考虑它的长度。
```js
let word='hello word'
word.split('')//[ 'h', 'e', 'l', 'l', 'o', ' ', 'w', 'o', 'r', 'd' ]
word.split(' ')//[ 'hello', 'word' ]
```
12 string的indexOf()方法
数组有indexOf()方法，string也有
该方法给定一个参数：要搜索的子字符串，搜索整个调用字符串，并返回指定子字符串第一次出现的索引。给定第二个参数：一个数字，该方法返回指定子字符串在大于或等于指定数字的索引处的第一次出现。
13.比较字符串
如果数组里的第一个字符串包含了第二个字符串中的所有字母，则返回 true。
例如，["hello", "Hello"] 应该返回 true。因为在忽略大小写的情况下，第一个字符串包含了第二个字符串里出现的所有字母。
["hello", "hey"] 应该返回 false。因为 hello 并不包含字符 y。
最后，["Alien", "line"] 应该返回 true。因为 line 中的所有字母都出现在了 Alien 中。

```js
function mutation(arr) {
  let test = arr[1].toLowerCase();
  let target = arr[0].toLowerCase();
  for (let i = 0; i < test.length; i++) {
    //利用string的indexOf方法检查元素是否在该字符串中
    if (target.indexOf(test[i]) < 0) return false;
  }
  return true;
}
mutation(["hello", "Hello"]);
```
## 面向对象编程
1.凡是通过构造函数创建出的新对象，这个对象都叫做这个构造函数的 实例。
对象 instanceof 构造函数  可验证对象是否由这个构造函数创建的
```js
let Bird = function(name, color) {
  this.name = name;
  this.color = color;
  this.numLegs = 2;
}
let crow = new Bird("Alexis", "black");
crow instanceof Bird;
```
2.使用原型属性来减少重复代码
所有 `Bird` 实例可能会有相同的 `numLegs` 值，所以在每一个 `Bird` 的实例中本质上都有一个重复的变量 `numLegs`。
当只有两个实例时可能并不是什么问题，但想象一下如果有数百万个实例。 这将会产生许许多多重复的变量。
更好的方法是使用 `Bird` 的 `prototype`。 `prototype` 是一个可以在所有 `Bird` 实例之间共享的对象。 以下是一个在 `Bird prototype` 中添加 `numLegs` 属性的示例：
```js
Bird.prototype.numLegs = 2;
```
现在所有的 `Bird` 实例都拥有了共同的 `numLegs` 属性值。
```js
console.log(duck.numLegs);
console.log(canary.numLegs);
```
JavaScript 中几乎所有的对象都有一个 prototype 属性，这个属性是属于它所在的构造函数。
3.现在你已经了解了两种属性: 自身属性和 `prototype` 属性。 自身属性是直接在对象上定义的。 而原型属性在 `prototype` 上定义。.hasOwnProperty(原型属性) 返回false
4.构造函数属性

实例对象都有一个特殊的 `constructor` 属性：

```js
let duck = new Bird();
let beagle = new Dog();

console.log(duck.constructor === Bird); 
console.log(beagle.constructor === Dog);
```

这两次 `console.log` 调用都将在控制台中显示 `true`。
需要注意到的是这个 `constructor` 属性是对创建这个实例的构造函数的一个引用。 `constructor` 属性的一个好处是可以通过检查这个属性来找出它是一个什么对象。 

下面是一个例子，来看看是怎么使用的：

```js
function joinBirdFraternity(candidate) {
  if (candidate.constructor === Bird) {
    return true;
  } else {
    return false;
  }
}
```

**注意：** 由于 `constructor` 属性可以被重写（在下面两节挑战中将会遇到），所以最好使用`instanceof` 方法来检查对象的类型。

5.将原型更改为新对象

到目前为止，你已经可以单独给 `prototype` 添加属性了：

```js
Bird.prototype.numLegs = 2;
```

需要添加多个属性的，这未免会显得拖沓。

```js
Bird.prototype.eat = function() {
  console.log("nom nom nom");
}

Bird.prototype.describe = function() {
  console.log("My name is " + this.name);
}
```
一种更有效的方法就是给对象的 `prototype` 设置为一个已经包含了属性的新对象。 这样一来，所有属性都可以一次性添加进来：
```js
Bird.prototype = {
  numLegs: 2, 
  eat: function() {
    console.log("nom nom nom");
  },
  describe: function() {
    console.log("My name is " + this.name);
  }
};
```
6.更改原型时，记得设置构造函数属性

手动设置一个新对象的原型有一个重要的副作用。 它清除了 `constructor` 属性！ 此属性可以用来检查是哪个构造函数创建了实例，但由于该属性已被覆盖，它现在给出了错误的结果：

```js
duck.constructor === Bird;
duck.constructor === Object;
duck instanceof Bird;
```

按顺序，这些表达式会返回 `false`、`true` 和 `true`。

为了解决这个问题，凡是手动给新对象重新设置过原型对象的，都别忘记在原型对象中定义一个 `constructor` 属性：

```js
Bird.prototype = {
  constructor: Bird,
  numLegs: 2,
  eat: function() {
    console.log("nom nom nom");
  },
  describe: function() {
    console.log("My name is " + this.name); 
  }
};
```

7.`.prototype.isPrototypeOf()`

`Bird` 构造函数创建了一个 `duck` 对象：

```js
function Bird(name) {
  this.name = name;
}

let duck = new Bird("Donald");
```

duck 从 Bird 构造函数那里继承了它的 prototype。 你可以使用 isPrototypeOf`方法来验证他们之间的关系：
```js
Bird.prototype.isPrototypeOf(duck);
```
这将返回 true。
8.了解原型链

JavaScript 中所有的对象（除了少数例外）都有自己的 `prototype`。 而且，对象的 `prototype` 本身也是一个对象。

```js
function Bird(name) {
  this.name = name;
}

typeof Bird.prototype;
```

正因为 `prototype` 是一个对象，所以 `prototype` 对象也有它自己的 `prototype`！ 这样看来的话，`Bird.prototype` 的 `prototype` 就是 `Object.prototype`：

```js
Object.prototype.isPrototypeOf(Bird.prototype);
```

这有什么作用呢？ 你可能还记得我们在上一个挑战中学到的 `hasOwnProperty` 方法：

```js
let duck = new Bird("Donald");
duck.hasOwnProperty("name");
```

`hasOwnProperty` 是定义在 `Object.prototype` 上的一个方法，尽管在 `Bird.prototype` 和 `duck`上并没有定义该方法，但是我们依然可以在这两个对象上访问到。 这就是 `prototype` 链的一个例子。 在这个`prototype` 链中，`Bird` 是 `duck` 的 `supertype`，而 `duck` 是 `subtype`。 `Object` 则是 `Bird` 和 `duck` 实例共同的 `supertype`。 `Object` 是 JavaScript 中所有对象的 `supertype`，也就是原型链的最顶层。 因此，所有对象都可以访问 `hasOwnProperty` 方法。

9. 你已经学会了一种创建 `Animal` 实例的方法，即使用 `new` 操作符：

```js
let animal = new Animal();
```

此语法用于继承时会存在一些缺点，这些缺点对于当前我们这个挑战来说太复杂了。 相反，我们学习另外一种没有这些缺点的方法来替代 new 操作：

```js
let animal = Object.create(Animal.prototype);
```

`Object.create(obj)` 创建了一个新对象，并指定了 `obj` 作为新对象的 `prototype`。 回忆一下，我们之前说过 `prototype` 就像是创建对象的“配方”。 如果我们把 `animal` 的 `prototype` 设置为与 `Animal` 构造函数的 `prototype` 一样，那么就相当于让 `animal` 这个实例具有与 `Animal` 的其他实例相同的“配方”了。

```js
animal.eat();
animal instanceof Animal;
```

`instanceof` 方法会返回 `true`.

10.将子辈的原型设置为父辈的实例

在上一个挑战中，我们学习了从超类（或者叫父类） `Animal` 继承其行为的第一个步骤：创建一个 `Animal` 的新实例。这一节挑战我们将学习第二个步骤：给子类型（或者子类）设置 `prototype`。 这样一来，`Bird` 就是 `Animal` 的一个实例了。

```js
Bird.prototype = Object.create(Animal.prototype);
```

请记住，`prototype` 类似于创建对象的“配方”。 从某种意义上来说，`Bird` 对象的配方包含了 `Animal` 的所有关键“成分”。

```js
let duck = new Bird("Donald");
duck.eat();
```

`duck` 继承了`Animal` 的所有属性，其中包括了 `eat` 方法。

题目：

```js
function Animal() { }

Animal.prototype = {
  constructor: Animal,
  eat: function() {
    console.log("nom nom nom");
  }
};
function Dog() { }

//实现一个继承自 Animal 的 Dog 实例。
Dog.prototype = Object.create(Animal.prototype);

let beagle = new Dog();
```

11.重置一个继承的构造函数属性

当一个对象从另一个对象那里继承了其 `prototype` 时，那它也继承了父类的 constructor 属性。

请看下面的举例：

```js
function Bird() { }
Bird.prototype = Object.create(Animal.prototype);
let duck = new Bird();
duck.constructor
```

但是 `duck` 和其他所有 `Bird` 的实例都应该表明它们是由 `Bird` 创建的，而不是由 `Animal` 创建的。 为此，你可以手动将 `Bird` 的构造函数属性设置为 `Bird` 对象：

```js
Bird.prototype.constructor = Bird;
duck.constructor
```

题目：
```js
function Animal() { }
function Bird() { }
function Dog() { }

Bird.prototype = Object.create(Animal.prototype);
Dog.prototype = Object.create(Animal.prototype);

//使得 duck.constructor 和 beagle.constructor 返回各自的构造函数
Bird.prototype.constructor = Bird;
Dog.prototype.constructor = Dog;

let duck = new Bird();
let beagle = new Dog();
```

12.继承后添加方法

从超类构造函数继承其 `prototype` 对象的构造函数，除了继承的方法外，还可以拥有自己的方法。

请看举例：`Bird` 是一个构造函数，它继承了 `Animal` 的 `prototype`：

```js
function Animal() { }
Animal.prototype.eat = function() {
  console.log("nom nom nom");
};
function Bird() { }
Bird.prototype = Object.create(Animal.prototype);
Bird.prototype.constructor = Bird;
```

除了从 `Animal` 构造函数继承的行为之外，还需要给 `Bird` 对象添加它独有的行为。 这里，我们给 `Bird` 对象添加一个 `fly()` 函数。 函数会以一种与其他构造函数相同的方式添加到 `Bird's` 的 `prototype` 中：

```js
Bird.prototype.fly = function() {
  console.log("I'm flying!");
};
```

现在 `Bird` 的实例中就有了 `eat()` 和 `fly()` 这两个方法：

```js
let duck = new Bird();
duck.eat();
duck.fly();
```

`duck.eat()` 将在控制台中显示字符串 `nom nom nom`， `duck.fly()` 将显示字符串 `I'm flying!`。

13.重写继承的方法

在上一个挑战中，我们学习了一个对象可以通过引用另一个对象的 `prototype` 来继承其属性和行为（或方法）：

```js
ChildObject.prototype = Object.create(ParentObject.prototype);
```

然后，`ChildObject` 将自己的方法链接到它的 `prototype`中：

```js
ChildObject.prototype.methodName = function() {...};
```

我们还可以重写继承的方法。 以同样的方式 - 通过使用一个与需要重写的方法相同的方法名，向`ChildObject.prototype` 中添加方法。 请看下面的举例：`Bird` 重写了从 `Animal` 继承来的 `eat()` 方法：

```js
function Animal() { }
Animal.prototype.eat = function() {
  return "nom nom nom";
};
function Bird() { }

Bird.prototype = Object.create(Animal.prototype);

Bird.prototype.eat = function() {
  return "peck peck peck";
};
```

如果你有一个实例：`let duck = new Bird();`，然后你调用了 `duck.eat()`，以下就是 JavaScript 在 `duck` 的 `prototype` 链上寻找方法的过程：

(1). `duck` => `eat()` 是定义在这里吗？ 不是。
(2). `Bird` => `eat()` 是定义在这里吗？ => 是的。 执行它并停止往上搜索。
(3). `Animal` => 这里也定义了 `eat()` 方法，但是 JavaScript 在到达这层原型链之前已停止了搜索。
(4). Object => JavaScript 在到达这层原型链之前也已经停止了搜索。
14.使用 Mixin 在不相关对象之间添加共同行为
正如你所见，行为是可以通过继承来共享的。 然而，在有些情况下，继承不是最好的解决方案。 继承不适用于不相关的对象，比如 Bird 和 Airplane。 虽然它们都可以飞行，但是 Bird 并不是一种 Airplane，反之亦然。

对于不相关的对象，更好的方法是使用 mixins。 mixin 允许其他对象使用函数集合。
```js
let flyMixin = function(obj) {
  obj.fly = function() {
    console.log("Flying, wooosh!");
  }
};
```
flyMixin 能接受任何对象，并为其提供 fly 方法。
```js
let bird = {
  name: "Donald",
  numLegs: 2
};

let plane = {
  model: "777",
  numPassengers: 524
};

flyMixin(bird);
flyMixin(plane);
```
这里的 flyMixin 接收了bird 和 plane 对象，然后将 fly 方法分配给了每一个对象。 现在 bird 和 plane 都可以飞行了：
```js
bird.fly();
plane.fly();
```
控制台将显示字符串 Flying, wooosh! 两次，每 .fly() 调用都会显示。

注意观察 mixin 是如何允许相同的 fly 方法被不相关的对象 bird 和 plane 重用的。

15.使用闭包保护对象内的属性不被外部修改

在上一次挑战中，`bird` 有一个公共属性 `name`。 公共属性的定义就是：它可以在 `bird` 的定义范围之外被访问和更改。

```js
bird.name = "Duffy";
```

因此，代码的任何地方都可以轻松地将 `bird` 的 name 属性更改为任意值。 想想密码和银行账户之类的东西，如果代码库的任何部分都可以轻易改变他们。 那么将会引起很多问题。

使属性私有化最简单的方法就是在构造函数中创建变量。 可以将该变量范围限定在构造函数中，而不是全局可用。 这样，属性只能由构造函数中的方法访问和更改。

```js
function Bird() {
  let hatchedEgg = 10;

  this.getHatchedEggCount = function() { 
    return hatchedEgg;
  };
}
let ducky = new Bird();
ducky.getHatchedEggCount();
```

这里的 `getHatchedEggCount` 是一种特权方法，因为它可以访问私有属性 `hatchedEgg`。 这是因为 `hatchedEgg` 是在与 `getHatchedEggCount` 相同的上下文中声明的。 在 JavaScript 中，函数总是可以访问创建它的上下文。 这就叫做 `closure`。

题目：更改在 Bird 函数中声明的 weight 方法，使其成为私有变量。 然后，创建一个返回 weight 值 15 的 getWeight 方法。

```js
function Bird() {
  this.weight = 15;


}
```
改成
```js
function Bird() {
  let weight = 15;
  this.getWeight=()=>{
    return weight
  }
}
```

16.了解立即调用函数表达（IIFE）

JavaScript 中的一个常见模式就是，函数在声明后立刻执行：

```js
(function () {
  console.log("Chirp, chirp!");
})();
```
箭头表达式
```js
(() =>{
  console.log("Chirp, chirp!");
})();
```

这是一个匿名函数表达式，立即执行并输出 `Chirp, chirp!`。

请注意，函数没有名称，也不存储在变量中。 函数表达式末尾的两个括号（）会让它被立即执行或调用。 这种模式被叫做立即调用函数表达式（immediately invoked function expression) 或者IIFE。

题目：重写函数 makeNest，并删除它的调用，取而代之是一个匿名的立即调用函数表达式（IIFE）。

```js
function makeNest() {
  console.log("A cozy nest is ready");
}
```
```js
(function() {
  console.log("A cozy nest is ready");
})();
```

17.使用 IIFE 创建一个模块

一个立即调用函数表达式（IIFE）通常用于将相关功能分组到单个对象或者是 module 中。 例如，先前的挑战中定义了两个 mixins：

```js
function glideMixin(obj) {
  obj.glide = function() {
    console.log("Gliding on the water");
  };
}
function flyMixin(obj) {
  obj.fly = function() {
    console.log("Flying, wooosh!");
  };
}
```

我们可以将这些 mixins 分成以下模块：

```js
let motionModule = (function () {
  return {
    glideMixin: function(obj) {
      obj.glide = function() {
        console.log("Gliding on the water");
      };
    },
    flyMixin: function(obj) {
      obj.fly = function() {
        console.log("Flying, wooosh!");
      };
    }
  }
})();
```

注意：一个立即调用函数表达式（IIFE）返回了一个 `motionModule` 对象。 返回的这个对象包含了作为对象属性的所有 mixin 行为。 module 模式的优点是，所有的运动相关的行为都可以打包成一个对象，然后由代码的其他部分使用。 下面是一个使用它的例子：

```js
motionModule.glideMixin(duck);
duck.glide();
```

## 函数式编程

1.了解函数式编程术语
	·Callbacks 是被传递到另一个函数中调用的函数。 你应该已经在其他函数中看过这个写法，例如在 filter 中，回调函数告诉 JavaScript 以什么规则过滤数组。
	·函数就像其他正常值一样，可以赋值给变量、传递给另一个函数，或从其它函数返回，这种函数叫做头z等 first class 函数。 在 JavaScript 中，所有函数都是头等函数。
	·将其他函数为参数或返回值的函数叫做高阶 ( higher order) 函数。
	·当函数被传递给另一个函数或从另一个函数返回时，那些传入或返回的函数可以叫做 lambda。
2.splice() 应始终谨慎使用，因为它会改变当前数组。
有关 splice 和 slice 之间的文档和差异
splice()返回值是 包含已删除元素的数组。同时也会改变当前数组
slice()返回值是 包含提取元素的数组。不会改变当前数组
3.
#### Array.prototype.map()

   map方法是迭代数组中每一项的方式之一。 在对每个元素应用回调函数后，它会创建一个新数组(不改变原来的数组)。 它这样做时没有改变原始数组。

当调用回调函数时，传入了三个参数。 第一个参数（必须）是当前正在处理的数组项。 第二个参数（可选）是当前数组项的索引值，第三个参数（可选）是在其上调用 `map` 方法的数组。

看下在 `users` 上使用 `map` 方法的例子，返回了一个新数组只包含了用户的名字。 为了简化，例子里只使用了回调函数的第一个参数。

```js
const users = [
  { name: 'John', age: 34 },
  { name: 'Amy', age: 20 },
  { name: 'camperCat', age: 10 }
];

const names = users.map(user => user.name);
console.log(names);
```
控制台将显示值 `[ 'John', 'Amy', 'camperCat' ]`。


题目
```js
const ratings = watchList.map(item => ({
  title: item["Title"],
  rating: item["imdbRating"]
}));
```
4.
#### Array.prototype.forEach() 
该方法用于调用数组的每个元素，并将元素传递给回调函数。
回调函数接收三个参数。 第一个参数（必须）是当前正在被处理的元素。 第二个参数（可选）是这个元素的索引，第三个参数（可选）是在其上调用 forEach 方法的数组。   
题目：写一个和 Array.prototype.map() 一样的 Array.prototype.myMap()。 不能使用内置的 map 方法。 在 myMap 方法内，可以使用 this 访问 Array 实例。

```js

const s = [23, 65, 98, 5];

Array.prototype.myMap = function(callback) {
  let newArray = [];
  this.forEach(a => newArray.push(callback(a)));//回调函数中必定需要一个参数 代表当前元素
  return newArray;
};

const new_s = s.myMap(function(item) {
  return item * 2;
});
console.log(new_s)
```
5. 
#### Array.prototype.filter()）
   filter 接收一个回调函数，将回调函数内的逻辑应用于数组的每个元素，新数组包含根据回调函数内条件返回 true 的元素。 换言之，它根据传递给它的函数过滤数组。 和 map 一样，filter 不会改变原始数组。
   回调函数接收三个参数。 第一个参数（必须）是当前正在被处理的元素。 第二个参数（可选）是这个元素的索引，第三个参数（可选）是在其上调用 filter 方法的数组。

   练习：`watchList` 变量中包含一组存有多部电影信息对象。 结合 `filter` 和 `map` 返回一个 `watchList` 只包含 `title` 和 `rating` 属性的新数组。 新数组只包含 `imdbRating` 值大于或等于 8.0 的对象。 请注意，`rating` 值在对象中保存为字符串，你可能需要将它转换成数字来执行运算。

```js
// 全局变量
const watchList = [
  {
    "Title": "Inception",
    "Year": "2010",
    "Rated": "PG-13",
    "Released": "16 Jul 2010",
    "Runtime": "148 min",
    "Genre": "Action, Adventure, Crime",
    "Director": "Christopher Nolan",
    "Writer": "Christopher Nolan",
    "Actors": "Leonardo DiCaprio, Joseph Gordon-Levitt, Elliot Page, Tom Hardy",
    "Plot": "A thief, who steals corporate secrets through use of dream-sharing technology, is given the inverse task of planting an idea into the mind of a CEO.",
    "Language": "English, Japanese, French",
    "Country": "USA, UK",
    "Awards": "Won 4 Oscars. Another 143 wins & 198 nominations.",
    "Poster": "http://ia.media-imdb.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
    "Metascore": "74",
    "imdbRating": "8.8",
    "imdbVotes": "1,446,708",
    "imdbID": "tt1375666",
    "Type": "movie",
    "Response": "True"
  },
  {
    "Title": "Interstellar",
    "Year": "2014",
    "Rated": "PG-13",
    "Released": "07 Nov 2014",
    "Runtime": "169 min",
    "Genre": "Adventure, Drama, Sci-Fi",
    "Director": "Christopher Nolan",
    "Writer": "Jonathan Nolan, Christopher Nolan",
    "Actors": "Ellen Burstyn, Matthew McConaughey, Mackenzie Foy, John Lithgow",
    "Plot": "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
    "Language": "English",
    "Country": "USA, UK",
    "Awards": "Won 1 Oscar. Another 39 wins & 132 nominations.",
    "Poster": "http://ia.media-imdb.com/images/M/MV5BMjIxNTU4MzY4MF5BMl5BanBnXkFtZTgwMzM4ODI3MjE@._V1_SX300.jpg",
    "Metascore": "74",
    "imdbRating": "8.6",
    "imdbVotes": "910,366",
    "imdbID": "tt0816692",
    "Type": "movie",
    "Response": "True"
  },
  {
    "Title": "The Dark Knight",
    "Year": "2008",
    "Rated": "PG-13",
    "Released": "18 Jul 2008",
    "Runtime": "152 min",
    "Genre": "Action, Adventure, Crime",
    "Director": "Christopher Nolan",
    "Writer": "Jonathan Nolan (screenplay), Christopher Nolan (screenplay), Christopher Nolan (story), David S. Goyer (story), Bob Kane (characters)",
    "Actors": "Christian Bale, Heath Ledger, Aaron Eckhart, Michael Caine",
    "Plot": "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, the caped crusader must come to terms with one of the greatest psychological tests of his ability to fight injustice.",
    "Language": "English, Mandarin",
    "Country": "USA, UK",
    "Awards": "Won 2 Oscars. Another 146 wins & 142 nominations.",
    "Poster": "http://ia.media-imdb.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_SX300.jpg",
    "Metascore": "82",
    "imdbRating": "9.0",
    "imdbVotes": "1,652,832",
    "imdbID": "tt0468569",
    "Type": "movie",
    "Response": "True"
  },
  {
    "Title": "Batman Begins",
    "Year": "2005",
    "Rated": "PG-13",
    "Released": "15 Jun 2005",
    "Runtime": "140 min",
    "Genre": "Action, Adventure",
    "Director": "Christopher Nolan",
    "Writer": "Bob Kane (characters), David S. Goyer (story), Christopher Nolan (screenplay), David S. Goyer (screenplay)",
    "Actors": "Christian Bale, Michael Caine, Liam Neeson, Katie Holmes",
    "Plot": "After training with his mentor, Batman begins his fight to free crime-ridden Gotham City from the corruption that Scarecrow and the League of Shadows have cast upon it.",
    "Language": "English, Urdu, Mandarin",
    "Country": "USA, UK",
    "Awards": "Nominated for 1 Oscar. Another 15 wins & 66 nominations.",
    "Poster": "http://ia.media-imdb.com/images/M/MV5BNTM3OTc0MzM2OV5BMl5BanBnXkFtZTYwNzUwMTI3._V1_SX300.jpg",
    "Metascore": "70",
    "imdbRating": "8.3",
    "imdbVotes": "972,584",
    "imdbID": "tt0372784",
    "Type": "movie",
    "Response": "True"
  },
  {
    "Title": "Avatar",
    "Year": "2009",
    "Rated": "PG-13",
    "Released": "18 Dec 2009",
    "Runtime": "162 min",
    "Genre": "Action, Adventure, Fantasy",
    "Director": "James Cameron",
    "Writer": "James Cameron",
    "Actors": "Sam Worthington, Zoe Saldana, Sigourney Weaver, Stephen Lang",
    "Plot": "A paraplegic marine dispatched to the moon Pandora on a unique mission becomes torn between following his orders and protecting the world he feels is his home.",
    "Language": "English, Spanish",
    "Country": "USA, UK",
    "Awards": "Won 3 Oscars. Another 80 wins & 121 nominations.",
    "Poster": "http://ia.media-imdb.com/images/M/MV5BMTYwOTEwNjAzMl5BMl5BanBnXkFtZTcwODc5MTUwMw@@._V1_SX300.jpg",
    "Metascore": "83",
    "imdbRating": "7.9",
    "imdbVotes": "876,575",
    "imdbID": "tt0499549",
    "Type": "movie",
    "Response": "True"
  }
];

// 只修改这一行下面的代码

const filteredList = watchList.map((item)=>({//当箭头函数要返回对象的时候，为了区分于代码块，要用 () 将对象包裹起来
  title:item['Title'],
  rating:item['imdbRating'] 
})).filter((item)=>item['rating']>8.0)


// 只修改这一行上面的代码

console.log(filteredList);
```

6. 
#### Array.prototype.concat()
在一个数组上调用 concat 方法，然后提供另一个数组作为参数添加到第一个数组末尾。
该方法用于合并两个或多个数组。此方法不会更改现有数组，而是返回一个新数组。

 将 concat 方法与 push 方法做比较。 push 将元素添加到调用它的数组的末尾，这样会改变该数组。
7.

#### Array.prototype.reduce()

```js
let 结果 = 数组.reduct(累加器, 初始化值)
//累加器
(累加结果, 当前值, 当前索引)=>{

	return 处理结果
}
```

reduce()方法是 JavaScript 所有数组操作中最常用的方法。 几乎可以用reduce方法解决所有数组处理问题。reduce方法是处理数组更通用的方式，而且filter和map方法都可以当作是reduce的特殊实现。 
`array.reduce(function(total, currentValue, currentIndex, arr), initialValue)`

该方法接收一个函数作为累加器，数组中的每个值（从左到右）开始缩减，最终计算为一个值。
第一次运行回调时没有“先前计算的返回值”。如果提供，则可以使用初始值代替它。否则，将索引 0 处的数组元素用作初始值，并从下一个元素（索引 1 而不是索引 0）开始迭代。

回调函数function(total,currentValue, index,arr)接受四个参数。 第一个参数是初始值, 或者计算结束后的**返回值**。第二个参数是当前正在处理的数组**元素**。第三个参数是当前数组元素的索引。第四个参数是当前数组元素所在的数组。
除了回调函数，reduce 还有一个额外的参数做为叠加器的初始值。 如果没有第二个参数，会跳过第一次迭代，第二次迭代给叠加器传入数组的第一个元素。

累加和

```js
// reduce 案例1：累加和
let arr = [1,2,3,4,5]

let s = arr.reduce( (sum,current,index)=>{

    return sum + current
} , 0)


console.info(s)
```

对象数组的累加和

```js
//案例2：对象数组的累加和
let arr = [
    {
        name: 'jack',
        count: 10
    },
    {
        name: 'rose',
        count: 20
    }
]
let s = arr.reduce((sum,current,index)=>{
    return sum + current.count
},0);


console.info(s)
```

题目：watchList 是包含一些电影信息的对象。 使用 reduce 查找由 Christopher Nolan 导演的电影的 IMDB 评级平均值。 回想一下之前的挑战，如何 filter 数据，以及使用 map 来获取你想要的数据。 您可能需要创建其他变量，并从 getRating 函数返回平均评分。 请注意，评级在对象中是字符串，需要将其转换为数字再用于数学运算。

```js
// 全局变量
const watchList = [
  {
    "Title": "Inception",
    "Year": "2010",
    "Rated": "PG-13",
    "Released": "16 Jul 2010",
    "Runtime": "148 min",
    "Genre": "Action, Adventure, Crime",
    "Director": "Christopher Nolan",
    "Writer": "Christopher Nolan",
    "Actors": "Leonardo DiCaprio, Joseph Gordon-Levitt, Elliot Page, Tom Hardy",
    "Plot": "A thief, who steals corporate secrets through use of dream-sharing technology, is given the inverse task of planting an idea into the mind of a CEO.",
    "Language": "English, Japanese, French",
    "Country": "USA, UK",
    "Awards": "Won 4 Oscars. Another 143 wins & 198 nominations.",
    "Poster": "http://ia.media-imdb.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
    "Metascore": "74",
    "imdbRating": "8.8",
    "imdbVotes": "1,446,708",
    "imdbID": "tt1375666",
    "Type": "movie",
    "Response": "True"
  },
  {
    "Title": "Interstellar",
    "Year": "2014",
    "Rated": "PG-13",
    "Released": "07 Nov 2014",
    "Runtime": "169 min",
    "Genre": "Adventure, Drama, Sci-Fi",
    "Director": "Christopher Nolan",
    "Writer": "Jonathan Nolan, Christopher Nolan",
    "Actors": "Ellen Burstyn, Matthew McConaughey, Mackenzie Foy, John Lithgow",
    "Plot": "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
    "Language": "English",
    "Country": "USA, UK",
    "Awards": "Won 1 Oscar. Another 39 wins & 132 nominations.",
    "Poster": "http://ia.media-imdb.com/images/M/MV5BMjIxNTU4MzY4MF5BMl5BanBnXkFtZTgwMzM4ODI3MjE@._V1_SX300.jpg",
    "Metascore": "74",
    "imdbRating": "8.6",
    "imdbVotes": "910,366",
    "imdbID": "tt0816692",
    "Type": "movie",
    "Response": "True"
  },
  {
    "Title": "The Dark Knight",
    "Year": "2008",
    "Rated": "PG-13",
    "Released": "18 Jul 2008",
    "Runtime": "152 min",
    "Genre": "Action, Adventure, Crime",
    "Director": "Christopher Nolan",
    "Writer": "Jonathan Nolan (screenplay), Christopher Nolan (screenplay), Christopher Nolan (story), David S. Goyer (story), Bob Kane (characters)",
    "Actors": "Christian Bale, Heath Ledger, Aaron Eckhart, Michael Caine",
    "Plot": "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, the caped crusader must come to terms with one of the greatest psychological tests of his ability to fight injustice.",
    "Language": "English, Mandarin",
    "Country": "USA, UK",
    "Awards": "Won 2 Oscars. Another 146 wins & 142 nominations.",
    "Poster": "http://ia.media-imdb.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_SX300.jpg",
    "Metascore": "82",
    "imdbRating": "9.0",
    "imdbVotes": "1,652,832",
    "imdbID": "tt0468569",
    "Type": "movie",
    "Response": "True"
  },
  {
    "Title": "Batman Begins",
    "Year": "2005",
    "Rated": "PG-13",
    "Released": "15 Jun 2005",
    "Runtime": "140 min",
    "Genre": "Action, Adventure",
    "Director": "Christopher Nolan",
    "Writer": "Bob Kane (characters), David S. Goyer (story), Christopher Nolan (screenplay), David S. Goyer (screenplay)",
    "Actors": "Christian Bale, Michael Caine, Liam Neeson, Katie Holmes",
    "Plot": "After training with his mentor, Batman begins his fight to free crime-ridden Gotham City from the corruption that Scarecrow and the League of Shadows have cast upon it.",
    "Language": "English, Urdu, Mandarin",
    "Country": "USA, UK",
    "Awards": "Nominated for 1 Oscar. Another 15 wins & 66 nominations.",
    "Poster": "http://ia.media-imdb.com/images/M/MV5BNTM3OTc0MzM2OV5BMl5BanBnXkFtZTYwNzUwMTI3._V1_SX300.jpg",
    "Metascore": "70",
    "imdbRating": "8.3",
    "imdbVotes": "972,584",
    "imdbID": "tt0372784",
    "Type": "movie",
    "Response": "True"
  },
  {
    "Title": "Avatar",
    "Year": "2009",
    "Rated": "PG-13",
    "Released": "18 Dec 2009",
    "Runtime": "162 min",
    "Genre": "Action, Adventure, Fantasy",
    "Director": "James Cameron",
    "Writer": "James Cameron",
    "Actors": "Sam Worthington, Zoe Saldana, Sigourney Weaver, Stephen Lang",
    "Plot": "A paraplegic marine dispatched to the moon Pandora on a unique mission becomes torn between following his orders and protecting the world he feels is his home.",
    "Language": "English, Spanish",
    "Country": "USA, UK",
    "Awards": "Won 3 Oscars. Another 80 wins & 121 nominations.",
    "Poster": "http://ia.media-imdb.com/images/M/MV5BMTYwOTEwNjAzMl5BMl5BanBnXkFtZTcwODc5MTUwMw@@._V1_SX300.jpg",
    "Metascore": "83",
    "imdbRating": "7.9",
    "imdbVotes": "876,575",
    "imdbID": "tt0499549",
    "Type": "movie",
    "Response": "True"
  }
];

function getRating(watchList){
  const averageRating = watchList
    // use filter to find films directed by Christopher Nolan
    .filter(film => film.Director === "Christopher Nolan")
    // Use map to convert their ratings from strings to numbers
    .map(film => Number(film.imdbRating))
    // Use reduce to add together their ratings
    .reduce((sumOfRatings, rating) => sumOfRatings + rating) /
  // Divide by the number of Nolan films to get the average rating
  watchList.filter(film => film.Director === "Christopher Nolan").length;
  // Add your code above this line
  return averageRating;
}

console.log(getRating(watchList));
```

8.完成 `squareList` 函数的代码。 传递一个包含实数的数组给函数时，函数应返回一个新的数组，*只*包含正整数（小数不是整数）的平方值， 例如传递 `[-3, 4.8, 5, 3, -3.2]` ，返回[25,9]。

```js
const squareList = arr => {
  // 只修改这一行下面的代码
  return arr.filter(
    (item)=>item>0&&item%1===0
  ).map(
    (item)=>item*item
  )
  return arr;
  // 只修改这一行上面的代码
};

const squaredIntegers = squareList([-3, 4.8, 5, 3, -3.2]);
console.log(squaredIntegers);
```

9.

#### Array.prototype.join()  数组转字符
`array.join(separator)`
该方法把数组中的所有元素转换为一个字符串
元素是通过指定的分隔符(可选。如果省略该参数，则使用逗号作为分隔符。)进行分隔的。

`.join('')`数组转字符

举个例子：

```js
const arr = ["Hello", "World"];
const str = arr.join(" ");
```

`str` 的值应该是字符串 `Hello World`。



10.解决一个实际问题。
许多内容管理站点（CMS）为了让添加书签更简单，会将帖子的标题添加到 URL 上。 举个例子，如果你写了一篇标题为 `Stop Using Reduce` 的帖子，URL很可能会包含标题字符串的某种形式 (如：`.../stop-using-reduce`)。 你可能已经在 freeCodeCamp 网站上注意到了这一点。

填写 `urlSlug` 函数，将字符串 `title` 转换成带有连字符号的 URL。 您可以使用本节中介绍的任何方法，但不要用 `replace` 方法。 以下是本次挑战的要求：
输入包含空格和标题大小写单词的字符串
输出字符串，单词之间的空格用连字符 (`-`) 替换
输出应该是小写字母
输出不应有任何空格
```js
function urlSlug(title) {
return title
.trim()
.split(/\s+/).map(
  (item)=>item.toLowerCase()
)
.join('-')

}

console.log(urlSlug(" Winter Is  Coming"))
```
11.
#### String.prototype.trim()
该方法从字符串的两端删除空格并返回一个新字符串，而不修改原始字符串。此上下文中的空白是所有空白字符（空格、制表符、不间断空格等）和所有行终止符（LF、CR 等）。

12.
#### Array.prototype.every()
该方法测试一个数组内的所有元素是否**都**能通过某个指定函数的测试。参数是一个函数。它返回一个布尔值。
备注：若收到一个空数组，此方法在任何情况下都会返回 true。

举个例子，下面的代码检测数组 `numbers` 的所有元素是否都小于 10：

```js
const numbers = [1, 5, 8, 0, 10, 11];

numbers.every((currentValue)=> currentValue < 10);
```

`every` 方法在这里会返回 `false`。



类似的，Array.prototype.some()方法测试数组中是不是至少有 1 个元素通过了被提供的函数测试。它返回一个布尔值。

13.函数柯里化和局部调用

arity（参数个数）是函数所需的形参的数量。 函数柯里化（Currying）意思是把接受多个 arity 的函数变换成接受单一 arity 的函数。

换句话说，就是重构函数让它接收一个参数，然后返回接收下一个参数的函数，依此类推。

举个例子：

```js
function unCurried(x, y) {
  return x + y;
}

function curried(x) {
  return function(y) {
    return x + y;
  }
}

const curried = x => y => x + y

curried(1)(2)
```

`curried(1)(2)` 会返回 `3`。

柯里化在不能一次为函数提供所有参数情况下很有用。 因为它可以将每个函数的调用保存到一个变量中，该变量将保存返回的函数引用，该引用在下一个参数可用时接受该参数。 下面是使用柯里化函数的例子：

```js
const funcForY = curried(1);
console.log(funcForY(2)); // 3
```

类似地，局部调用（ partial application）的意思是一次对一个函数应用几个参数，然后返回另一个应用更多参数的函数。 这是一个示例：

```js
function impartial(x, y, z) {
  return x + y + z;
}

const partialFn = impartial.bind(this, 1, 2);
partialFn(10); // 13
```

#### 字符串转数组

```js
// 第一种 split拆分
"abc".split('')
 ==> ["a","b","c"]
// 第二种 [...]
[..."abc"]
 ==> ["a","b","c"]
 Array.from("abc")
==> ["a","b","c"]
```

#### 数组转字符串

`toString()`


## jQuery

1.`<body>`里面添加`<script>`，在 script 标签中添加代码  `$(document).ready(function(){});`

2.所有的 jQuery 函数都以 `$` 开头，jQuery 通常选取并操作带有选择器（selector）的 HTML 标签。

比如，想要给 `button` 元素添加跳跃效果。 只需要在 document ready 函数内添加如下代码：

```js
$("button").addClass("animated bounce");
```

题目：请注意，我们已经在后台引入了 jQuery 库和 Animate.css 库，所以你可以在编辑器里直接使用它们。 你将使用 jQuery 将 Animate.css `bounce` class 应用于 `button` 元素。

3.使用 jQuery class 选择器选择元素

如何使所有的 `button` 标签都有弹跳的动画效果？ 用 `$("button")` 选取所有的 button 标签，并用 `.addClass("animated bounce");` 给其添加一些 CSS 属性。

jQuery 的 `.addClass()` 方法用来给标签添加类。

首先，使用 `$(".well")` 选取类为 `well` 的 `div` 标签。

值得注意的是，和 CSS 声明一样，在类名前需要添加 `.`。

然后，用 jQuery 的 `.addClass()` 方法添加 `animated` 和 `shake` class。

例如，在 `document ready function` 中添加下面的代码，使所有类为 `text-primary` 的标签抖动：

```js
$(".text-primary").addClass("animated shake");
```

4.使用 jQuery id 选择器选择元素

也能通过 id 属性选取标签。

首先，用 `$("#target3")` 选择器选取 id 为 `target3` 的 `button` 标签。

注意，和 CSS 声明一样，在 id 名前需要添加 `#`。

然后，用 jQuery 的 `.addClass()` 方法添加 `animated` 和 `fadeOut` 类。

下面的代码的效果是使 id 为 `target6` 的 `button` 标签淡出：

```js
$("#target6").addClass("animated fadeOut");
```

5.现在学写了三种选取标签的方法：用标签选择器： `$("button")`，用类选择器：`$(".btn")` 以及用 id 选择器：`$("#target1")` 。

6.使用 jQuery 从元素中移除 class

和用 jQuery 的 `addClass()` 方法给标签添加类一样，也可以利用 jQuery 的 `removeClass()` 方法移除它们。

下面是为指定按钮执行上面的操作的代码：

```js
$("#target2").removeClass("btn-default");
```

7.使用 jQuery 更改元素的 CSS

jQuery 有一个 `.css()` 方法，能改变标签的 CSS。

下面的代码效果是把颜色变蓝：

```js
$("#target1").css("color", "blue");
```

这与通常的 CSS 声明略有不同，因为这个 CSS 属性和它的值在英文引号里，并且它们用逗号而不是冒号间隔开。

8.使用 jQuery 禁用元素

还能用 jQuery 改变 HTML 标签的非 CSS 属性， 例如：禁用按钮。

当禁用按钮时，它将变成灰色并无法点击。

jQuery 有一个 `.prop()` 方法，可以用其调整标签的属性。

下面是禁用所有的按钮的代码：

```js
$("button").prop("disabled", true);
```

9.使用 jQuery 更改元素内部的文本

可以通过 jQuery 改变元素开始和结束标签之间的文本。 甚至改变 HTML 标签。

jQuery 有一个 `.html()` 函数，能用其在标签里添加 HTML 标签和文本， 函数提供的内容将完全替换之前标签的内容。

下面是重写并强调标题文本的代码：

```js
$("h3").html("<em>jQuery Playground</em>");
```

效果是把
```html
<h3 class="text-primary text-center">jQuery Playground</h3>
```
改成
```html
<h3 class="text-primary text-center"><em>jQuery Playground</em></h3>
```

jQuery 还有一个类似的函数 `.text()`，可以在不添加标签的前提下改变标签内的文本。 换句话说，这个函数不会传递给它的任何 HTML 标记，而是单纯地替换现有内容的文本。

注意，`<i>` 标签虽然传统上用来强调文本，但此后常用作图标的标签。 `<em>` 标签作为强调标签现在已被广泛接受。 

10.使用 用 jQuery 从页面移除 HTML 标签。

jQuery 有一个 `.remove()` 方法，能完全移除 HTML 标签。

11.现在来把标签从一个 `div` 移动到另一个里。

jQuery 有一个 `appendTo()` 方法，可以选取 HTML 标签并将其添加到另一个标签里面。

例如，如果要把 `target4` 从 right well 移到 left well，可以设置如下：

```js
$("#target4").appendTo("#left-well");
```

12.使用 jQuery 克隆元素

除了移动标签，也可以把元素从一个地方复制到另一地方。

jQuery 有一个 `clone()` 方法，可以复制标签。

例如，如果想把 `target2` 从 `left-well` 复制到 `right-well`，可以设置如下：

```js
$("#target2").clone().appendTo("#right-well");
```

是否注意到这两个 jQuery 函数连在一起了？ 这被称为链式调用（function chaining），是一种用 jQuery 实现效果的简便方法。

13.jQuery 有一个 `parent()` 方法，可以访问被选取标签的父标签。

下面的代码展示了使用 `parent()` 方法把 `left-well` 标签的父标签背景色设置成蓝色（blue）：

```js
$("#left-well").parent().css("background-color", "blue")
```

14.jQuery 有一个 `children()` 方法，可以访问被选取标签的子标签。

下面的代码展示了用 `children()` 方法把 `left-well` 标签的子标签的颜色设置成 `blue`（蓝色）：

```js
$("#left-well").children().css("color", "blue")
```

15.选择元素的特定子元素

`target:nth-child(n)` CSS 选择器可以选取指定 class 或者元素类型的的第 n 个标签。

下面的代码展示了给每个区域（well）的第 3 个标签设置弹跳（bounce）动画效果：

```js
$(".target:nth-child(3)").addClass("animated bounce");
```

16.可以用基于位置的奇 `:odd` 和偶 `:even` 选择器选取标签。

注意，jQuery 是零索引（zero-indexed）的，位置编号从 0开始。

下面的代码展示了选取所有 `target` class 元素的奇数元素并设置 sheke 效果：

```js
$(".target:odd").addClass("animated shake");
```



# LeetCode

### 2.两数之和

#### Map.prototype.get()

`myMap.get(key);` 方法返回某个 `Map` 对象中的一个指定元素。

思路: 一次循环，使用Map进行记录
通过Map，在循环的时候进行查找我们将Map的Key定义为nums[i]，Value定义为i。
那么，每次循环到一个数的时候，我们就可以在Map中查找是否存在key === target - nums[i]，如果存在则可以直接返回对应的两个下标，否则，将当前的值记入到HashMap中。

```js
var twoSum = function(nums, target) {
    const map = new Map();
    for(let i = 0, len = nums.length;i < len;i++) {
        if(map.has(target - nums[i])) {
            return [map.get(target - nums[i]), i];
        }
        map.set(nums[i], i);//把要找的数放到map里，key为值，val为索引
    }
    return [];
};

```



### 3. 无重复字符的最长子串

####  Set.prototype.has()

**has()** 方法返回一个布尔值来指示对应的值 value 是否存在 Set 对象中。

```js
/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function (s) {
  // 定义滑动窗口左右指针 l,r 以及字符串长度 n 最终结果 max
  let l = 0,
    r = 0,
    n = s.length,
    max = 0,
    // 定义 set 用来记录当前已经出现过的字符，用来作为是否重复出现过的依据
    set = new Set()
  // 约束窗口可滑动的范围:右指针不超过字符串长度，左指针不超过右指针
  while (l <= r && r < n) {
    // 如果当前字符未记录过：
    // 1. 比较当前左右两指针间窗口大小和当前max大小，更新max
    // 2. 记录当前字符到set中
    // 3. 因为当前仍未发生重复，因此窗口可以继续扩大范围，右指针向右平移
    if (!set.has(s[r])) {
      max = Math.max(r - l + 1, max)
      set.add(s[r])
      r++
    } else {
      // 如果当前字符已经被记录过：
      // 1. 右指针保持不动
      // 2. 在set中移除左指针对应的字符 左指针右移缩小窗口大小
      set.delete(s[l])
      l++
    }
  }
  return max
}

```

```js
//我的
var lengthOfLongestSubstring = function(s) {
    let left=0,
        right=0,
        max=0,
    set=new Set()
    while(left<=right&&right<s.length){
        while(!set.has(s[right])&&right<s.length){
            max=Math.max(right-left+1,max)
            set.add(s[right])
            right++

        }
        set.delete(s[left])//别忘了
        left++
    }
    return max

};

```

### 5. 最长回文子串

#### String.prototype.substring()

返回一个字符串在开始索引到结束索引之间的一个子集（左闭右开）

```js
/**
 * @param {string} s
 * @return {string}
 */

function longestPalindrome(s){
    let res = '';
    for (let i = 0; i < s.length; i++) {
        // 寻找长度为奇数的回文子串(以当前元素向两边扩散)
        const s1 = palindrome(s, i, i);
        // 寻找长度为偶数的回文子串(以s[i],s[i + 1])向两边扩散
        const s2 = palindrome(s, i, i + 1);
        res = res.length > s1.length ? res : s1;
        res = res.length > s2.length ? res : s2;
    }
    return res;
}

function palindrome(s, l, r) {
    // 左右指针，从s[l]和s[r]向两边扩散，找到最长回文串
    while (l >= 0 && r < s.length && s[l] === s[r]) {
        l--; r++;
    }
    return s.substring(l + 1, r );
}

```

```js
//mine
/**
 * @param {string} s
 * @return {string}
 */
var longestPalindrome = function(s) {
    let maxStr=''
    for(let i=0;i<s.length;i++){
        let s1=Palindrome(s,i,i)
        let s2=Palindrome(s,i,i+1)
        maxStr=maxStr.length>s1.length?maxStr:s1
        maxStr=maxStr.length>s2.length?maxStr:s2
    }
    return maxStr
}

var Palindrome = function(s,l,r) {
    while(l>=0&&r<s.length&&s[l]===s[r]){
        l--
        r++
    }
    return s.substring(l+1,r)
}

```

### 6.Z 字形变换

别人的思路：

- 整体的思路是遍历字符串，遍历过程中将每行都看成新的字符串构成字符串数组
- 如果 numRows=1 则说明当前字符串即为结果，直接返回
- 否则整个字符串需要经历，向下向右，向下向右，这样的反复循环过程，设定 down 变量表示是否向下，locloc 变量表示当前字符串数组的下标
- 如果 down 为 true，则 loc+=1，字符串数组下标向后移动，将当前字符加入当前字符串中
- 如果 downdown 为 false，则表示向右，则 loc-=1，字符串数组下标向前移动，将当前字符加入当前字符串中
  时间复杂度：O(n)O(n)，nn为字符串s的长度

```js
//mine
/**
 * @param {string} s
 * @param {number} numRows
 * @return {string}
 */
var convert = function (s, numRows) {
    let strs = []
    for(let i = 0; i< numRows; i++) strs[i] = ""//记得将数组每项初始化为字符串
    let down = false
    let rowNum = 0
    let result=''
    if(numRows == 1)
        return s;
    for (const item of s) {
        if (rowNum === numRows - 1 || rowNum === 0) {
            down = !down
        }
        if (down === true) {
            strs[rowNum]+=item
            rowNum++
        }
        if (down === false) {
            strs[rowNum]+=item
            rowNum--
        }
        
    }
    for(const item of strs){
            result+=item
        }
    return result
};

```

### 7. 整数反转

#### Array.prototype.reverse()

`**reverse()**` 方法将数组中元素的位置颠倒，并返回该数组。数组的第一个元素会变成最后一个，数组的最后一个元素变成第一个。该方法会改变原数组。  但是本题不能用这个函数

#### parseInt() 字符串转换成数字

`parseInt(string[, radix])` 解析一个字符串并返回指定基数的十进制整数，`radix` (可选)是 2-36 之间的整数，表示被解析字符串的基数。

js中取模运算（%）还是和c语言一样，但是/运算结果并不会舍去小数,所以要用parseInt()函数来转化成整数



```js
/**
 * @param {number} x
 * @return {number}
 */
 const reverse=(x)=>{
    let a,sum=0,max=Math.pow(2,31)-1,min=-max-1
    if(x>max|| x<min)  return 0
    while(x!==0){
        a=x%10
        x=parseInt(x/10)
        sum=sum*10+a
    }
    if(sum>max || sum<min)  return 0
    return sum
}

```

```js
//我的  搞复杂了qaq
/**
 * @param {number} x
 * @return {number}
 */
var reverse = function (x) {
    let negNum = false
    let str = []
    if (x < 0) {
        x = -x
        negNum = true
    }
    let mo = 10
    while (x > 0) {
        str.push(x % mo)
        x = parseInt(x / mo)
    }
    if (negNum === true) {
        str.unshift('-')
    }
    let result = Number(str.join(''))
    if (result > Math.pow(2, 31) - 1 || result < Math.pow(-2, 31)) return 0;
    return result
};
```

### 8. 字符串转换整数 (atoi)

#### isNaN()

`isNaN()` 函数用来确定一个值是否为NaN

```js
//mine 利用parseInt就可以满足绝大部分题目的要求
/**
 * @param {string} s
 * @return {number}
 */
var myAtoi = function(s) {
    let result=parseInt(s，10)
    if (result < Math.pow(-2, 31) || result > Math.pow(2, 31) - 1) {
        return result < Math.pow(-2, 31) ? Math.pow(-2, 31) : Math.pow(2, 31) - 1;
    }
    if(isNaN(result)){
        return 0
    }
    return result
};
```

### 9. 回文数

#### toString()   

用于任何东西转字符串

```js
//我的 转字符串+双指针
/**
 * @param {number} x
 * @return {boolean}
 */
var isPalindrome = function (x) {
    let arr = x.toString().split('')
    for (let l = 0, r = arr.length - 1; l <= arr.length / 2 && r >= arr.length / 2; l++, r--) {
        if (arr[l] !== arr[r]) return false
    }
    return true
};
```

### 11. 盛最多水的容器

这道题要解决的问题是，找寻最大的一组(i,j)，使得Area最大。这道题最粗暴的方法当然是O(n^2)，当然对于medium难度的题目来说，显然不能这么做

思路：用双指针i，j循环height数，i，j对应高度较小的那个先向内移动，不断计算面积，更新最大面积

```js
var maxArea = function(height) {
    let max = 0;
    for (let i = 0, j = height.length - 1; i < j;) {//双指针i，j循环height数组
      	//i，j较小的那个先向内移动 如果高的指针先移动，那肯定不如当前的面积大
        const minHeight = height[i] < height[j] ? height[i++] : height[j--];
        const area = (j - i + 1) * minHeight;//计算面积
        max = Math.max(max, area);//更新最大面积
    }
    return max;
};
```

```js
//mine
/**
 * @param {number[]} height
 * @return {number}
 */
var maxArea = function(height) {
    let max,minHgt,minus
for(let l=0,r=height.length-1;l<r;){
minus=r-l
minHgt=height[l]<height[r]?height[l++]:height[r--]
max=max>minHgt*minus?max:minHgt*minus
}
return max
};
```

### 12.整数转罗马数字



### 14.最长公共前缀


```js
var longestCommonPrefix = function(strs) {
    if(strs.length == 0) 
        return "";
    let ans = strs[0];//ans初始值为字符串数组的第一个
    for(let i =1;i<strs.length;i++) {//循环字符串数组
        let j=0;
        for(;j<ans.length && j < strs[i].length;j++) {//循环字符，找到第一个不相同的位置
            if(ans[j] != strs[i][j])
                break;
        }
        ans = ans.substr(0, j);//从0号位置到第一个不相同的位置 截取字符串
        if(ans === "")
            return ans;
    }
    return ans;

```
```js
//我的 暴力做法 不好
//而且这里不用把字符串转换为数组，直接当二维数组做。字符串底层本质一串字符组成的*只读*字符数组
/**
 * @param {string[]} strs
 * @return {string}
 */
var longestCommonPrefix = function(strs) {
    for(item of strs){
        item.split('')
    }
    let res=''
    let minLen=999
    for(let i=0;i<strs.length;i++){
        minLen=minLen<strs[i].length?minLen:strs[i].length
    }
    for(let i=0;i<minLen;i++){
        let toge=strs[0][i]
        let target =true
        for(let j=0;j<strs.length;j++){
            if(strs[j][i]!==toge){
                target=false
                return res
            }
        }
        if(target===true)res+=toge
    }
    return res
};
```



### 15. 三数之和

方法一.c=-(a+b): 确定了a和b，那就可以想两数之和一样，在map中寻找-(a+b)，减少一层循环，时间复杂度O(n^2)，空间复杂度O(n)。

方法二.双指针法。排序然后查找

思路：先排序数组，数组长度必须大于3，循环数组，假如当前循环到了i索引，则定义两个指针L = i+1，和R = nums.length-1,如果和sum=nums[i] + nums[L] + nums[R]小于0，则向右移动左指针，如果sum大于0，则左移右指针，如果sum等于0，则正好找到了这3个数，然后在尝试L++,R--，继续寻找中间是否有三个数之和等于0，注意在循环的过程中遇见相同的三个数需要去重。
复杂度分析：时间复杂度O(n^2)，n为数组的长度。空间复杂度O(logn)，即排序所需要的空间

![img](https://pic.leetcode-cn.com/1632108374-OljZRm-15.%E4%B8%89%E6%95%B0%E4%B9%8B%E5%92%8C.gif)

```js
//mine
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSum = function(nums) {
    nums.sort((a,b)=>a-b)
    let l,r
    let result=[]
    for(let i=0;i<nums.length;i++){
        l=i+1
        r=nums.length-1
        // 如果当前数字大于0，则三数之和一定大于0，所以结束循环
        if (nums[i]+nums[l]+nums[r]===0>0)return result
        if(i > 0 && nums[i] === nums[i-1]) continue; // 去重
        while(l<r){
            if (nums[i]+nums[l]+nums[r]===0){
                result.push([nums[i],nums[l],nums[r]])//可以直接这样
                while (l<r && nums[l] === nums[l+1]) l++; // 去重
                while (l<r && nums[r] === nums[r-1]) r--; // 去重

            }
            if(nums[i]+nums[l]+nums[r]>0){
                r--
            }else {
                l++
            }

        }
    }
    return result
};
```

### 16. 最接近的三数之和

和上一题很像，排序+双指针

```js
var threeSumClosest = function (nums, target) {
    nums.sort((a, b) => a - b)
    let l, r, min = 999
    for (let i = 0; i < nums.length; i++) {
        let smallMin = 999
        l = i + 1
        r = nums.length - 1
        while (l < r) {
            smallMin = nums[i] + nums[l] + nums[r]
            if (nums[i] + nums[l] + nums[r] < target) l++
            else if (nums[i] + nums[l] + nums[r] > target) r--
            else if (nums[i] + nums[l] + nums[r] === target) return target
        }
        min = Math.abs(min - target) < Math.abs(smallMin - target) ? min : smallMin
    }
    return min
};
```

### 17. 电话号码的字母组合

什么是回溯？回溯是递归的一种形式。（DFS）

通常情况下，你会面临很多选择，你必须从中选择一个。在你做出选择后，你会得到一组新的选项；你得到的选择取决于你做出的选择。这个过程反复进行，直到达到最终状态。如果你做出了一系列正确的选择，你的最终状态就是目标状态；如果你没有，那就不是正确答案了



```js
//输入：digits = "23"
//输出：["ad","ae","af","bd","be","bf","cd","ce","cf"]
var letterCombinations = (digits) => {
    if (digits.length == 0) return [];
    const res = [];
    const map = {//建立电话号码和字母的映射关系
        2: "abc",
        3: "def",
        4: "ghi",
        5: "jkl",
        6: "mno",
        7: "pqrs",
        8: "tuv",
        9: "wxyz",
    };

    const dfs = (alreadyStr, i) => {//alreadyStr是已经递归每一层的字符串，i是扫描digits的指针
        if (i > digits.length - 1) {//边界条件，递归的出口
            res.push(alreadyStr); //其中一个分支的解推入res
            return; //结束递归分支，进入另一个分支
        }
        const letters = map[digits[i]]; //取出数字对应的字母
        for (const l of letters) {
            //进入不同字母的分支
            dfs(alreadyStr + l, i + 1); //新对应的字符串，i右移，继续递归
        }
    };
    dfs("", 0); // 递归入口，传入空字符串，i初始为0的位置
    return res;
};

console.log(letterCombinations("234"))
```

```js
//mine
/**
 * @param {string} digits
 * @return {string[]}
 */
var letterCombinations = function(digits) {
    let map={
        2:'abc',
        3:'def',
        4:'ghi',
        5:'jkl',
        6:'mno',
        7:'pqrs',
        8:'tuv',
        9:'wxyz'
    }
    let res=[]
    if(digits.length===0)return []
    //alreadyStr是已经选择了的字符串
    const dfs= (alreadyStr,i)=>{//i是指向digits每个数字的指针
        if(i>digits.length-1){
            res.push(alreadyStr)
            return
        }
        const letters=map[digits[i]]
        for(let choose of letters){
            dfs(alreadyStr+choose,i+1)//这里的i+1不能写成i++
        }
    }

    dfs('',0)
    return res;
};
```

### 18. 四数之和

在三数之和的基础上再加上一层for循环

### 19.删除链表的倒数第 N 个结点

思路：首先这里我推荐使用虚拟头结点，这样方面处理删除实际头结点的逻辑。新建dummy节点指向head，指针n1，n2指向head，循环n2指针到n的位置，然后在同时移动n1，n2，直到结尾，n1，n2的距离是n，此时n1的位置就是需要删除元素的位置

```js
//mine
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} n
 * @return {ListNode}
 */
var removeNthFromEnd = function(head, n) {
let dummy=new ListNode()
dummy.next=head
let l=dummy
let r=dummy
for(let i=0;i<n;i++){//r先后移n位
    r=r.next
}
while(r.next!==null){//同时移动l，r。要删去的点是l.next节点
    l=l.next
    r=r.next
}
l.next=l.next.next//通过l删除l.next节点
dummy=dummy.next
return dummy
};
```

### 20. 有效的括号

#### in

如果指定的属性在指定的对象或其原型链中，则**`in` 运算符**返回`true`。`prop in object`

```js
//mine
var isValid = function(s) {
const stack=[]
const map={
    '(':')',
    '[':']',
    '{':'}'
}
let popThing
for(let item of s){
    if(item in map){
        stack.push(item)
    }else{
        popThing=stack.pop()
        if(item!==map[popThing]) return false
    }
}
    if(stack.length>0)return false
    return true
};
```

试着按模块刷题了。。。

## 数组

### 704. 二分查找

#### `>> 1`左移一位

想要在js中实现/2舍去小数的效果只需>>1

定义左右指针

```js
//mine
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var search = function (nums, target) {
    let l = 0, r = nums.length - 1
    let m
    while (l <= r) {
        m = (l + r) >> 1
        if (nums[m] === target) return m
        nums[m] < target ? l = m + 1 : r = m - 1//注意不能写成m
    }
    return -1
};
```

### 27. 移除元素

遍历一遍数组,找出与val值相同的数组元素，然后使用splice方法删除。

```js
//mine
/**
 * @param {number[]} nums
 * @param {number} val
 * @return {number}
 */
var removeElement = function(nums, val) {
    let res=nums.length
for(let i=0;i<nums.length;i++){
    if(nums[i]===val){
        nums.splice(i,1)
        i--//不要忘了这一步
        res--
    }
}
};
```

### 977.有序数组的平方

#### Array.prototype.map()

**`map()`** 方法创建一个新数组，这个新数组由原数组中的每个元素都调用一次提供的函数后的返回值组成。



#### 求幂 (**),它等效于`Math.pow`

```js
//mine
/**
 * @param {number[]} nums
 * @return {number[]}
 */
var sortedSquares = function (nums) {
    let res = nums.map(val => val ** 2)
    return res.sort((a, b) => a - b)
};
```

```js
// 两个指针，l指向头，r指向尾
// 两头开始遍历，比较平方数，然后从大到小，以此把数据放进新数组中
var sortedSquares = function(nums) {
    let [l, r] = [0, nums.length - 1];
    let temp = [];
    while (l <= r) {
        const m = nums[l] ** 2;
        const n = nums[r] ** 2;
        if (m > n) {
            temp.unshift(m);
            ++l;
        } else {
            temp.unshift(n);
            --r;
        }
    }
    return temp;
};
```

### 209.长度最小的子数组

```js
//mine 暴力解法qaq
/**
 * @param {number} target
 * @param {number[]} nums
 * @return {number}
 */
var minSubArrayLen = function (target, nums) {
    let l, r
    let res = Infinity
    let sum
    let havFlag = false
    for (l = 0; l < nums.length; l++) {
        r = l
        sum = nums[l]
        if (sum >= target) return 1
        while (r < nums.length - 1) {
            r++
            sum += nums[r]
            if (sum >= target) {
                res = res < r - l + 1 ? res : r - l + 1
                havFlag = true
            }
        }
    }
    if (havFlag === false) return 0
    return res
};
console.log(minSubArrayLen(11, [1, 2, 3, 4, 5]))
```

#### 滑动窗口法

可以用来解决一些查找满足一定条件的连续区间的性质（长度等）的问题。由于区间连续，因此当区间发生变化时，可以通过旧有的计算结果对搜索空间进行剪枝，这样便减少了重复计算，降低了时间复杂度。往往类似于“请找到满足xx的最x的**区间（子串、子数组）**的xx”这类问题都可以使用该方法进行解决。

滑动窗口算法的思路是这样：

1、我们在字符串 S 中使用双指针中的左右指针技巧，初始化 left = right = 0，把索引闭区间 [left, right] 称为一个「窗口」。

2、我们先不断地增加 right 指针扩大窗口 [left, right]，直到窗口中的字符串符合要求（包含了 T 中的所有字符）。

3、此时，我们停止增加 right，转而不断增加 left 指针缩小窗口 [left, right]，直到窗口中的字符串不再符合要求（不包含 T 中的所有字符了）。同时，每次增加 left，我们都要更新一轮结果。

4、重复第 2 和第 3 步，直到 right 到达字符串 S 的尽头。

这个思路其实也不难，第 2 步相当于在寻找一个「可行解」，然后第 3 步在优化这个「可行解」，最终找到最优解。左右指针轮流前进，窗口大小增增减减，窗口不断向右滑动。


```js
var minSubArrayLen = function(target, nums) {
    const len = nums.length;
    let l = r = sum = 0, 
        res = len + 1; //最大的窗口不会超过自身长度
    while(r < len) {
        sum += nums[r++];//扩大窗口
        while(sum >= target) {
            res = res < r - l ? res : r - l;//更新最小值
            sum-=nums[l++];//缩小窗口
        }
    }
    return res > len ? 0 : res;
};
```

```js
//mine
/**
 * @param {number} target
 * @param {number[]} nums
 * @return {number}
 */
var minSubArrayLen = function(target, nums) {
    let l=0,r=0
    let res=nums.length+1
    let sum=0
    for(;r<nums.length;r++){
        sum+=nums[r]
        if(sum>=target){
            res=res<r-l+1?res:r-l+1
            while(l<=r&&sum>=target){
                l++
                sum-=nums[l-1]
                if(sum>=target)res=res<r-l+1?res:r-l+1
            }
        }
    }
    if(res===nums.length+1)return 0
    return res
};

```

### 904. 水果成篮

#### Array.prototype.includes()

**`includes()`** 方法用来判断一个数组是否包含一个指定的值，根据情况，如果包含则返回 `true`，否则返回 `false`。

#### String.prototype.includes()

**`includes()`** 方法用于判断一个字符串是否包含在另一个字符串中，根据情况返回 true 或 false。

```js

var totalFruit = function(fruits) {
    let l = 0;//起始指针
    let maxLen = 0;//窗口的最大长度 其中最多包涵两种水果
    let n = 0//右指针的结束位置
    let arr = [fruits[l]]//水果的种类数组

    for(let r = 0; r < fruits.length; r++){//窗口的右指针不断前进
        if(!arr.includes(fruits[r])){//如果窗口中不包含 进窗口的水果
            if(arr.length <= 1){//如果只有一种水果
                arr[1] = fruits[r]//将这种水果加入arr数组
            }else{//如果有两种水果
                l = n//更新窗口的左边界
                arr[0] = fruits[r-1]//更新arr中水果的种类
                arr[1] = fruits[r]
            }
        }
       
        if(fruits[r] !== fruits[n]){//如果进来了一种新的类型的水果 更新前一种水果的位置
            n = r
        }

        maxLen = Math.max(maxLen,r-l+1)//更新滑动窗口的最大值
    }
    return maxLen

};
```

### 59. 螺旋矩阵 II

用二维数组来实现矩阵

```js
/**
 * @param {number} n
 * @return {number[][]}
 */
var generateMatrix = function (n) {
    let matrix = []
    for (let i = 0; i < n; i++) {
        matrix[i] = []
    }
    let startX = 0, startY = 0
    let offset = 1
    let count = 1
    let i, j
    let loop = n >> 1
    while (loop--) {
        //每次的开始位置不是固定的，所以用变量表示
        for (j = startY; j < n - offset; j++) {
            matrix[startX][j] = count++
        }
        for (i = startX; i < n - offset; i++) {
            matrix[i][j] = count++
        }
        for (; j > startY; j--) {
            matrix[i][j] = count++
        }
        for (; i > startX; i--) {
            matrix[i][j] = count++
        }
        startX++;
        startY++;

        // offset 控制每一圈里每一条边遍历的长度
        offset += 1;
    }
    // 如果n为奇数的话，需要单独给矩阵最中间的位置赋值
    if (n % 2) {
        matrix[n >> 1][n >> 1] = count;
    }
    return matrix;
};
```

## 链表

定义链表

```js
class ListNode {
  val;
  next = null;
  constructor(value) {
    this.val = value;
    this.next = null;
  }
}
```

### 203. 移除链表元素

```js
//mine
/**
 * @param {ListNode} head
 * @param {number} val
 * @return {ListNode}
 */
var removeElements = function(head, val) {
    let newHead=new ListNode(0)
    newHead.next=head
    let i=newHead
    while(i.next){
        if(i.next.val===val){
            if(i.next.next){
                i.next=i.next.next
            }else i.next=null

        }else i=i.next
    }
    newHead=newHead.next
    return newHead
};
```



```js

var removeElements = function(head, val) {
    const dummyHead = new ListNode(0);//创建dummy节点，将dummy节点的next指向head，temp指向dummy
    dummyHead.next = head;
    let temp = dummyHead;
    while (temp.next !== null) {//当temp的next不为null 不断循环节点
        if (temp.next.val == val) {
            temp.next = temp.next.next;//当temp的next值是要删除的 则删除该节点
        } else {
            temp = temp.next;//移动temp指针
        }
    }
    return dummyHead.next;
};

```

### 206. 反转链表

```js
//mine 不巧妙的方法
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var reverseList = function (head) {
    if (!head) return head
    let tmp = head
    let arr = []
    while (tmp.next) {
        arr.push(tmp.val)//最后一个节点还没存放进去
        tmp = tmp.next
    }
    let tmp2 = tmp
    for (let i = arr.length - 1; i >= 0; i--) {
        tmp2.next = new ListNode(arr.pop())
        tmp2 = tmp2.next
    }
    return tmp
};
```

**双指针迭代**
首先定义一个cur指针，指向头结点，再定义一个pre指针，初始化为null。

然后就要开始反转了，首先要把 cur->next 节点用tmp指针保存一下，也就是保存一下这个节点。

为什么要保存一下这个节点呢，因为接下来要改变 cur->next 的指向了，将cur->next 指向pre ，此时已经反转了第一个节点了。

接下来，就是循环走如下代码逻辑了，继续移动pre和cur指针。

最后，cur 指针已经指向了null，循环结束，链表也反转完毕了。 此时我们return pre指针就可以了，pre指针就指向了新的头结点。动画演示如下：
![img](https://tva1.sinaimg.cn/large/008eGmZEly1gnrf1oboupg30gy0c44qp.gif)

```js
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var reverseList = function(head) {
    let pre=null
    let cur=new ListNode()
    cur=head
    let tmp=cur
    while(cur){
       tmp = cur.next;
       cur.next=pre
        pre = cur
        cur=tmp
    }
    return pre
};
```

### 24. 两两交换链表中的节点

![img](https://code-thinking.cdn.bcebos.com/pics/24.%E4%B8%A4%E4%B8%A4%E4%BA%A4%E6%8D%A2%E9%93%BE%E8%A1%A8%E4%B8%AD%E7%9A%84%E8%8A%82%E7%82%B91.png)

```js
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var swapPairs = function (head) {
  let dummy = new ListNode(0, head), temp = dummy;
  while (temp.next && temp.next.next) {
    let r = temp.next.next, l = temp.next;
    l.next = r.next;
    r.next = l;
    temp.next = r;
    temp = l;
  }
  return dummy.next;
};

```

```js
//mine
var swapPairs = function (head) {
//dummy->dummy2->head
  let dummy=new ListNode(0)
  let dummy2=new ListNode(0)
  dummy.next=dummy2
  dummy2.next=head
  let tmp=dummy
  let l,r
  while(tmp.next.next&&tmp.next.next.next){
      l=tmp.next.next
      r=tmp.next.next.next
      //交换
      l.next=r.next
      r.next=l
      tmp.next.next=r
      //tmp移动
      tmp=tmp.next.next
  }
  return dummy.next.next
};

```

### 面试题 02.07. 链表相交

只要两个指针相等 就跳出循环
只要它们两个之中的一个为空 就让它们跳回开头

如果有交点 在两个指针分别走过另一个指针“来时的路”期间 一定会相遇——也就是返回相遇的那个点，下方代码中直接返回a了
如果没交点 在两个指针必定同时走完彼此的路（a链长度+b链长度=b链长度+a链长度）——也就是a(null) === b(null) 返回a(null)

```js
var getIntersectionNode = function(headA, headB) {
    let a = headA;
    let b = headB;
    if(a === null || b === null){
        return null;
    }
    while(a !== b){
        a = a===null ? headB : a.next;
        b = b===null ? headA : b.next;
    }
    return a;
};

```

### 142. 环形链表 II

方法1.哈希表
思路：遍历链表，将节点加入一个set中，每次判断当前节点是否在set中，如果存在重复的节点，这个节点就是入环节点
复杂度：时间复杂度O(n)，空间复杂度O(n)
js：

```js
var detectCycle = function(head) {
    const visited = new Set();
    while (head !== null) {//终止条件，如果没有环 跳出循环
        if (visited.has(head)) {//如果存在重复的节点，这个节点就是入环节点
            return head;
        }
        visited.add(head);//将节点加入set中
        head = head.next;
    }
    return null;
};
```

```js
//mine

/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var detectCycle = function(head) {
    let visited=new Set()
    let i=new ListNode()
    i=head
    while(i!== null){
        if(visited.has(i)){return i}
        visited.add(i)
        i=i.next
    }
    return null
};
```

## 哈希表

常见的三种哈希结构

当我们想使用哈希法来解决问题的时候，我们一般会选择如下三种数据结构。

- 数组

- set （集合）Set 与数组类似， 只是Set 集合中的元素不重复。
  **js Set用法补充**
    1、JS中Set的定义：
  
  ```js
   var set = new Set();
  ```
  
    2、JS中Set的遍历：

   
  
  ```js
   set.forEach(function (element, sameElement, set) {
            console.log(element);
        }
  ```
  
    3、JS中Set的操作方法：
    (1)：数组与Set之间的转换：

    一：数组转Set：
  
  ```js
  var arr = ["1","2","1","2","3","1"];
  var set = new Set(arr);
  //得到一个新的Set：{"1","2","3"};
  ```

    二：Set转数组：

  ```js
  var arr1= Array.from(set );
  //得到一个新的数组：["1","2","3"];
  ```

    (2)：使用Set给数组去重：
  
  ```js
  //定义一个新的数组：
  var arr = ["1","2","1","2","3","1"];
  ```
  
    方法一：
  
  ```js
  var arr1 = Array.from(new Set(arr));
  //得到一个新的数组：["1","2","3"];
  ```

    方法二：
  
  ```js
  var arr1 = [...new Set(arr)];
  //得到一个新的数组：["1","2","3"];
  ```
  
    (3)：求两个Set的并集，交集，差集：
  
  ```js
  var arr1 = ["1","2","3"];
  var arr2 = ["1","2"];
  var set1= new Set(arr1);
  var set2= new Set(arr2);
  
  //并集后：
  var newSet1 = new Set([...set1,...set2]);
  //得到一个新的Set：{"1","2","3"};
  
  //交集后：
  var newSet2 = new Set([...set1].filter(x => set2.has(x)));
  //得到一个新的Set：{"1", "2"};
  
  //差集后：
  var newSet3 = new Set([...set1].filter(x => !set2.has(x)));
  //得到一个新的Set：{"3"};
  ```
  
- map(映射)

  ```js
  var m = new Map([['Michael', 95], ['Bob', 75], ['Tracy', 85]]);
  m.get('Michael'); // 95
  ```

  ```js
  var m = new Map(); // 空Map
  m.set('Adam', 67); // 添加新的key-value
  m.set('Bob', 59);
  m.has('Adam'); // 是否存在key 'Adam': true
  m.get('Adam'); // 67
  m.delete('Adam'); // 删除key 'Adam'
  m.get('Adam'); // undefined
  ```

  

### 242.有效的字母异位词

方法一：准备一个数组，循环字符串s，每个元素出现一次加1，然后循环t元素，每次出现的字符减1，如果t中出现一些不在s中的字符 则返回false，所有循环结束 说明两个字符串中每个字符的数量相同
#### String.prototype.codePointAt()

`str.codePointAt(pos)`方法返回 一个 Unicode 编码点值的非负整数。pos:这个字符串中需要转码的元素的位置(开始值为0)。

**Array.prototype.fill**()

`fill()` 方法用一个固定值填充一个数组中从起始索引到终止索引内的全部元素。

```
console.log([1, 2, 3].fill(4));                // [4, 4, 4]
```



```js
var isAnagram = function(s, t) {
    if (s.length !== t.length) {//长度不想等 直接返回false
        return false;
    }
    const table = new Array(26).fill(0);//大小为26的数组
    for (let i = 0; i < s.length; ++i) {//循环字符串s，每个元素出现一次加1
        table[s.codePointAt(i) - 'a'.codePointAt(0)]++;
    }
    for (let i = 0; i < t.length; ++i) {//循环t元素
        table[t.codePointAt(i) - 'a'.codePointAt(0)]--;//每次出现的字符减1
      	//如果t中出现一些字符对于s中的字符 则返回false
        if (table[t.codePointAt(i) - 'a'.codePointAt(0)] < 0) {
            return false;
        }
    }
    return true;//所有循环结束 说明两个字符串中每个字符的数量相同
}
```

```js
//mine
/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var isAnagram = function (s, t) {
    let arr = new Array(26).fill(0)
    for (item of s) {
        arr[item.codePointAt(0) - 'a'.codePointAt(0)]++
    }
    for (item of t) {
        arr[item.codePointAt(0) - 'a'.codePointAt(0)]--
    }
    for (item of arr) {
        if (item !== 0) return false
    }
    return true
};
```

方法二：两个字符串转成数组，排序后转回字符串进行比较

```js
//mine
/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var isAnagram = function(s, t) {
let arrs=[...s]
let arrt=[...t]
arrs.sort((a,b)=>a===b?0:a<b?-1:1)
arrt.sort((a,b)=>a===b?0:a<b?-1:1)
sortedS=arrs.toString()
sortedT=arrt.toString()
return sortedS===sortedT
};
```

### 349. 两个数组的交集

```js
/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
 */
var intersection = function (nums1, nums2) {
    let arrL, arrS
    let res = []
    nums1.length > nums2.length ? (arrL = nums1, arrS = nums2) : (arrL = nums2, arrS = nums1)
    for (let item of arrS) {
        if (arrL.indexOf(item) !== -1) res.push(item)
    }
    res = [...new Set(res)]//给数组去重
    return res
};
```

### 202. 快乐数

其实就是看他会不会进入一个循环，进入循环就不快乐了

```js

// 获取当前数的按位平方和
function getNextHappy(n) {
    const ns = Array.from(String(n))
    return ns.reduce((a, c) => a + c * c, 0)
}

var isHappy = function(n) {
    let happy = n
    // 申请一个映射表检测是否循环
    const happyMap = { [happy]:true }
    // 不断迭代直到确认是快乐数
    while(happy !== 1) {
        // 更新平方和
        happy = getNextHappy(happy)
        // 如果循环就完了, 不快乐
        if (happyMap.hasOwnProperty(happy)) return false
        // 更新映射表
        happyMap[happy] = true
    }
    // 如果能到这里就有快乐
    return true
};
```

```js
//mine!
/**
 * @param {number} n
 * @return {boolean}
 */

    // 获取当前数的按位平方和
const getSum = function (num) {
        let arr = num.toString().split('')
        let res = 0
        for (item of arr) {
            res += item ** 2
        }
        return res
    }
var isHappy = function (n) {
    let set = new Set()
    let num = n
    while (num !== 1) {
        num = getSum(num)
        if (!set.has(num)) set.add(num)
        else return false

    }
    return true

};
```

## 字符串

### 344.反转字符串

```js
//mine 简单
/**
 * @param {character[]} s
 * @return {void} Do not return anything, modify s in-place instead.
 */
var reverseString = function (s) {
    let tmp
    for (let l = 0, r = s.length - 1; l < r; l++, r--) {
        tmp = s[l]
        s[l] = s[r]
        s[r] = tmp
    }
    return s
};

```

###  541. 反转字符串II

```js
//mine
/**
 * @param {string} s
 * @param {number} k
 * @return {string}
 */
var reverse = function (a, b, arr) {
    let tmp
    for (; a < b; a++, b--) {
        tmp = arr[a]
        arr[a] = arr[b]
        arr[b] = tmp
    }
    return arr
}
var reverseStr = function (s, k) {
    let arr = s.split('')
    if (arr.length < 4) return arr.join('')
    for (let l = 0, r = 2 * k - 1; arr[l]; l += 2 * k, r += 2 * k) {
        if (arr[r]) reverse(l, l + k - 1, arr)
        else if (arr[l + k - 1]) reverse(l, l + k - 1, arr)
        else reverse(l, arr.length, arr)
    }
    return arr.join('')
};
```

### 剑指 Offer 05. 替换空格

```js
//mine
var replaceSpace = function(s) {
    let arr=s.split('')
    for (let i = 0; i <arr.length; i++) {
        if(arr[i]===' ')arr[i]='%20'
    }
    return arr.join('')
};
```

### 151. 颠倒字符串中的单词

```js
//mine
/**
 * @param {string} s
 * @return {string}
 */
var reverseWords = function(s) {
    let arr=s.trim().split(' ').reverse()
    for(let i=0;i<arr.length;i++){
        if(arr[i]===''){
            arr.splice(i,1)
            i--//别忘了
        }
    }
    return arr.join(' ')
};
```

### 剑指 Offer 58 - II. 左旋转字符串

#### String.prototype.substring()

**`substring()`** 方法返回一个字符串在开始索引到结束索引之间（左闭右开）的一个子集，或从开始索引直到字符串的末尾的一个子集。

```js
//mine easy
var reverseLeftWords = function(s, n) {
let sub1=s.substring(n)
let sub2=s.substring(0,n)
return sub1+sub2

};
```

### 28. 实现 strStr()

### 459.重复的子字符串

#### String.prototype.repeat()

`str.repeat(count)` 构造并返回一个新字符串，该字符串包含被连接在一起的指定数量的字符串的副本。

```js
//mine
/**
 * @param {string} s
 * @return {boolean}
 */
var repeatedSubstringPattern = function(s) {
    if(s.length===1)return false
    for(let count=1;count<s.length;count++){
        if(s.length%count!==0)continue
        let newStr=s.substring(0,count).repeat(s.length/count)
        if(newStr===s)return true
    }
    return false
};
```

## 栈与队列

js中一般用数组来模拟栈与队列

### 20. 有效的括号

```js
//mine
var isValid = function(s) {
const stack=[]
const map={
    '(':')',
    '[':']',
    '{':'}'
}
let popThing
for(let item of s){
    if(item in map){
        stack.push(item)
    }else{
        popThing=stack.pop()
        if(item!==map[popThing]) return false
    }
}
    if(stack.length>0)return false
    return true
};
```

### 1047. 删除字符串中的所有相邻重复项

```js
//mine
/**
 * @param {string} s
 * @return {string}
 */
var removeDuplicates = function (s) {
    let arr = s.split('')
    let stack = []
    for (let item of arr) {
        if (stack[stack.length - 1] !== item) stack.push(item)
        else stack.pop()
    }
    return stack.join('')
};
```

### 150. 逆波兰表达式求值

![img](https://code-thinking.cdn.bcebos.com/gifs/150.%E9%80%86%E6%B3%A2%E5%85%B0%E8%A1%A8%E8%BE%BE%E5%BC%8F%E6%B1%82%E5%80%BC.gif)

```js
/**
 * @param {string[]} tokens
 * @return {number}
 */
var evalRPN = function(tokens) {
    const s = new Map([
        ["+", (a, b) => a * 1  + b * 1],
        ["-", (a, b) => b - a],
        ["*", (a, b) => b * a],
        ["/", (a, b) => (b / a) | 0]
    ]);
    const stack = [];
    for (const i of tokens) {
        if(!s.has(i)) {
            stack.push(i);
            continue;
        }
        stack.push(s.get(i)(stack.pop(),stack.pop()))
    }
    return stack.pop();
};
```

```js
//mine
/**
 * @param {string[]} tokens
 * @return {number}
 */
var evalRPN = function (tokens) {
    let map = new Map(
        [['+', (a, b) => parseInt(b) + parseInt(a)],
            ['-', (a, b) => parseInt(b) - parseInt(a)],
            ['*', (a, b) => parseInt(b) * parseInt(a)],
            ['/', (a, b) => parseInt(parseInt(b) / parseInt(a))]]
    )
    let stack = []
    let tmp
    while (tokens.length) {
        tmp = tokens.shift()
        if (map.has(tmp)) {
            stack.push(map.get(tmp)(stack.pop(), stack.pop()))
        } else {
            stack.push(tmp)
        }
    }
    return stack[0]
};
```

### 239. 滑动窗口最大值

单调队列：维护窗口，向右移动时左侧超出窗口的值弹出，因为需要的是窗口内的最大值，所以只要保证窗口内的值是递减的即可，小于新加入的值全部弹出，最大值维护在队列的出口处。

### 347. 前 K 个高频元素

#### ES6中Map与对象、数组，JSON之间的相互转换

https://blog.csdn.net/jingtian678/article/details/94365296

#### Array.prototype.map()

**`map()`** 方法创建一个新数组，这个新数组由原数组中的每个元素都调用一次提供的函数后的返回值组成。



```js
var topKFrequent = function(nums, k) {
    const map = new Map()
    nums.forEach(n => {
        map.set(n, map.has(n) ? map.get(n)+1 : 1)
    })
    // 首先将字典转成数组，然后对数组中的第二个元素（频度）从小到大排序
    const list = Array.from(map).sort((a, b) => b[1] - a[1])
    // 截取频率前k高的元素
    return list.slice(0, k).map(n => n[0])
};
```

```js
//mine
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
var topKFrequent = function(nums, k) {
let map=new Map()
for(let item of nums){
    if(map.has(item)) map.set(item,map.get(item)+1)
    else map.set(item,1)
}
let arr=[...map]
//根据数组每个元素的第二个元素排序
arr.sort((a,b)=>b[1]-a[1])
return arr.slice(0,k).map((item)=>item[0])

};
```

## 二叉树

### 144. 二叉树的前序遍历

补充：什么是递归和迭代？ 递归是自己调用自己的话,迭代就是A不停的调用B。

```js
//递归
var preorderTraversal = function(root) {
  let arr = []
  var preorder = function(node, arr) {
    if (node === null) return arr
    arr.push(node.val)
    preorder(node.left, arr)
    preorder(node.right, arr)
  }
  preorder(root, arr)
  return arr
};
```

```js
//mine
/**
 * @param {TreeNode} root
 * @return {number[]}
 */
var preorderTraversal = function (root) {
    let res = []
    const preorder = function (node, res) {
        if (node === null) return res
        else {
            res.push(node.val)
            preorder(node.left, res)
            preorder(node.right, res)
        }
    }
    preorder(root, res)
    return res
};
```



### 94. 二叉树的中序遍历

```js
//mine
/**
 * @param {TreeNode} root
 * @return {number[]}
 */
var inorderTraversal = function(root) {
let res=[]
const inorder=function(node,res){
    if(node===null)return res
    else{
        inorder(node.left,res)
        res.push(node.val)
        inorder(node.right,res)
    }
    return res
}
inorder(root,res)
return res
};
```

### 145. 二叉树的后序遍历

```js
var postorderTraversal = function(root) {
let res=[]
const postorder=function(node,res){
    if(node===null)return res
    else{
        postorder(node.left,res)
        postorder(node.right,res)
        res.push(node.val)
    }
    return res
}
postorder(root,res)
return res
};
```

### 102. 二叉树的层序遍历

![img](https://pic.leetcode-cn.com/fdcd3bd27f4008948084f6ec86b58535e71f66862bd89a34bd6fe4cc42d68e89.gif)

深度优先遍历dfs

```js
var levelOrder = function (root) {
  const result = [];

  const traverse = (node, layer) => {
    if (node !== null) {
      traverse(node.left, layer + 1);
      result[layer] ? result[layer].push(node.val) : result[layer] = [node.val];
      traverse(node.right, layer + 1);
    }
  }
  traverse(root, 0);
  return result;
};
```

```js
//mine
var levelOrder = function(root) {
    let res=[]

const dfs = function(node,level,res){
    if(!node)return res
    dfs(node.left,level+1,res)
    res[level]?res[level].push(node.val):res[level]=[node.val]
    dfs(node.right,level+1,res)

}
dfs(root,0,res)
return res
};
```

### 199. 二叉树的右视图

**dfs**

```js
//mine
//dfs
var rightSideView = function (root) {
    const dfs = function (node, level, res) {
        if (!node) return res
        if (res.length === level) {//要加上这个限制条件
            res.push(node.val)
        }

        dfs(node.right, level + 1, res)
        dfs(node.left, level + 1, res)
    }
    let res = []
    dfs(root, 0, res)
    return res
};
```

### 637. 二叉树的层平均值

```js
//mine
var averageOfLevels = function(root) {
let res=[]
const dfs=function(node,level,res){
    if(!node)return res
    res[level]?res[level].push(node.val):res[level]=[node.val]
    dfs(node.left,level+1,res)
    dfs(node.right,level+1,res)
}
dfs(root,0,res)
let sum
let avg=[]
for(let i=0;i<res.length;i++){
    sum=0
    for(let j=0;j<res[i].length;j++){
        sum+=res[i][j]
    }
    avg.push(sum/res[i].length)
}
return avg
};
```

### 429. N 叉树的层序遍历

```js
//mine
var levelOrder = function(root) {
    let res=[]
    const dfs=function(node,level,res){
        if(!node)return res
        res[level]?res[level].push(node.val):res[level]=[node.val]
        if(node.children){
            for(let i=0;i<node.children.length;i++){
                dfs(node.children[i],level+1,res)
            }
        }
    }
    dfs(root,0,res)
    return res
};
```

### 226. 翻转二叉树

```js
//mine
var invertTree = function (root) {
    const dfs = function (node) {
        if (node) {
            let tmp
            tmp = node.left
            node.left = node.right
            node.right = tmp

            dfs(node.left)
            dfs(node.right)
        }
    }
    dfs(root)
    return root
};
```

### 101. 对称二叉树

对称二叉树满足条件:

左右子树根节点相等
左子树的左孩子等于右子树的右孩子
左子树的右孩子等于右子树的左孩子
递归判断，递归函数的参数是左右两棵子树，如果只传一棵子树，是无法判断是对称二叉树的，对称行为是两个子树的行为

```js
var isSymmetric = function (root) {
    if (root == null) return true
    function dfs(p, q) {
        if (p == null && q == null) return true
        if (p == null && q !== null || (p !== null && q == null)) return false
        if (p.val != q.val) return false
        return dfs(p.left, q.right) && dfs(p.right, q.left)
    }
    return dfs(root.left, root.right)
};
```

```js
//mine
var isSymmetric = function(root) {
   const dfs=function(left,right){
       if(left===null&&right===null)return true
       if((left===null&&right!==null)||(left!==null&&right===null))return false
       if(left.val===right.val)return dfs(left.left,right.right)&&dfs(left.right,right.left)
       else return false
   }
   return dfs(root.left,root.right)
};
```

### 104. 二叉树的最大深度

```js
var maxDepth = function(root) {
    if (root === null) return 0
    return 1 + Math.max(maxDepth(root.left), maxDepth(root.right))
};

```

```js
//mine
var maxDepth = function(root) {
	if(!root)return 0
	return 1+Math.max(maxDepth(root.left),maxDepth(root.right))
};
```

### 111. 二叉树的最小深度

```js
//mine
var minDepth = function(root) {
if(!root)return 0
if(!root.left)return minDepth(root.right)+1
else if(!root.right)return minDepth(root.left)+1
else return Math.min(minDepth(root.left),minDepth(root.right))+1
};
```

### 222. 完全二叉树的节点个数

完全二叉树只有两种情况，情况一：就是满二叉树，情况二：最后一层叶子节点没有满。

对于情况一，可以直接用 2^树深度 - 1 来计算，注意这里根节点深度为1。
对于情况二，分别递归左孩子，和右孩子，递归到某一深度一定会有左孩子或者右孩子为满二叉树，然后依然可以按照情况1来计算。

怎么判断子树是「满二叉树」呢？
只需要求出「左高」和「右高」，相等即为「满二叉树」
左高：顾名思义，一直通过左孩子节点求出来的高度；右高：顾名思义，一直通过右孩子节点求出来的高度

```js
var countNodes = function(root) {
    const count=function(node){
        if(!node) return 0
    
        let leftTmp=node
        let rightTmp=node
        //求左高
        let leftH=0
        while(leftH){
            leftH++
            leftH=leftH.left
        }
        //求右高
        let rightH=0
         while(rightTmp){
            rightH++
            rightTmp=rightTmp.right
        }
        if(leftH===rightH)return Math.pow(2,leftH)-1
        else return count(node.left)+count(node.right)+1
        
    }
    return count(root)
};
```

### 110. 平衡二叉树

```js
//mine
var isBalanced = function(root) {
    const height=function(node){
        if(!node)return 0
        else return 1+Math.max(height(node.left),height(node.right))
    }
    let flag=true
    const dfs=function(node){
        if(!node)return 
        let abs=Math.abs(height(node.left)-height(node.right))
        if(abs>1){
            flag=false
            return
        }else{
            dfs(node.left)
            dfs(node.right)
        }
    }
    dfs(root)
    
    return flag
};
```

### 257. 二叉树的所有路径

```js
var binaryTreePaths = function(root) {
    const paths = [];
    const dfs = (root, path) => {//传入递归的节点和路径数组
        if (root) {
            path += root.val.toString();//加入当前节点
          	//叶子结点就将所有连接起来的节点字符串加入paths中 也就是其中一条路径
            if (root.left === null && root.right === null) { 
                paths.push(path); 
            } else {
                path += "->"; //不是叶子节点继续递归左右子树
                dfs(root.left, path);
                dfs(root.right, path);
            }
        }
    }
    dfs(root, "");
    return paths;
};
```

```js
 //mine
 var binaryTreePaths = function(root) {
     let paths=[]
     const dfs=function(node,path){
         if(!node)return
         path+=node.val
         if(node.left===null&&node.right===null) {
             paths.push(path)
         }
         else{
             path+='->'
             dfs(node.left,path)
             dfs(node.right,path)
         }
     }
     dfs(root,'')
     return paths
 };
```

### 404. 左叶子之和

```js
var sumOfLeftLeaves = function(root) {
     let number = 0;
  const sum = (root) => {
    //边界条件
    if (root === null) {
      return;
    }
    //是左叶子节点
    if (root.left && !root.left.left && !root.left.right) {
      number = number + root.left.val;
    }
    //不是左叶子节点
      sum(root.left);
      sum(root.right);
  };
  sum(root);
  return number;
};
```

### 513. 找树左下角的值

```
var findBottomLeftValue = function(root) {

  let curMaxDepth = -1, curVal = 0

  var dfs = function(root, curDepth){
    if(!root) return null;
    if(curDepth > curMaxDepth){
      curMaxDepth = curDepth
      curVal = root.val
    }

    dfs(root.left, curDepth+1)
    dfs(root.right, curDepth + 1)
  }

  dfs(root, 0)
  return curVal
};

作者：yi-xiao-i
链接：https://leetcode.cn/problems/find-bottom-left-tree-value/solution/javascript-bfs-dfsqian-xu-by-yi-xiao-i-nc2z/
来源：力扣（LeetCode）
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。
```

#### js怎么跳出递归

在js 的递归循环中，找到了节点想跳出递归循环，如果是单纯的return或者break的时候，并没有阻止递归的循环

return true可以结束递归

**回溯的本质是穷举，穷举所有可能，然后选出我们想要的答案**

回溯法，一般可以解决如下几种问题：

- 组合问题：N个数里面按一定规则找出k个数的集合
- 切割问题：一个字符串按一定规则有几种切割方式
- 子集问题：一个N个数的集合里有多少符合条件的子集
- 排列问题：N个数按一定规则全排列，有几种排列方式
- 棋盘问题：N皇后，解数独等等

## 贪心算法

贪心的本质是选择每一阶段的局部最优，从而达到全局最优。

贪心算法一般分为如下四步：

- 将问题分解为若干个子问题
- 找出适合的贪心策略
- 求解每一个子问题的最优解
- 将局部最优解堆叠成全局最优解
