---
title: "ES6基础语法"
date: 2022-07-24T21:27:14+08:00
categories: ["JavaScript"]
tags: ["ES6"]
---

## 新的 ES6 语法

https://www.javascripttutorial.net/es6/

### 1.字面量的增强

ES6中对 对象字面量 进行了增强，称之为 Enhanced object literals（增强对象字面量）。 n 字面量的增强主要包括下面几部分： 

- 属性的简写：Property Shorthand 

  对象字面量是名称-值对的集合。例如：

  ```js
  function createMachine(name, status) {
      return {
          name: name,
          status: status
      };
  }
  ```

  该`createMachine()` 函数接受两个参数`name`并`status` 返回一个具有两个属性的新对象字面量：`name`和`status`。

  `name`和`status`属性采用和`name`参数`status`的值。这种语法看起来是多余的，因为在属性的名称`name`和`status`值中都提到了两次。

  当对象的属性与局部变量名称相同时，ES6 允许您通过包含不带冒号和值的名称来消除重复。

  例如，您可以将`createMachine()`ES6 中的函数重写如下：

  ```js
  function createMachine(name, status) {
      return {
          name,
          status
      };
  }
  ```

- 方法的简写：Method Shorthand 

  在 ES6 之前，在为对象字面量定义方法时，需要指定名称和完整的函数定义，如下例所示：

  ```js
  let server = {
  	name: "Server",
  	restart: function () {
  		console.log("The" + this.name + " is restarting...");
  	}
  };
  
  ```

  `function`ES6 通过删除冒号 (:) 和关键字function，使对象字面量方法的语法更加简洁。

  下面的例子`server`使用 ES6 语法重写了上面的对象。

  ```js
  let server = {
      name: 'Server',
      restart() {
          console.log("The" + this.name + " is restarting...");
      }
  };
  ```

- 计算属性名：Computed Property Name

  在 ES6 之前，您可以使用方括号 ( `[]`) 来启用对象属性的**计算属性名称**。

  方括号允许您使用字符串文字和变量作为属性名称。

  请参见以下示例：

  ```js
  let name = 'machine name';
  let machine = {
      [name]: 'server',
      'machine hours': 10000
  };
  
  console.log(machine[name]); // server
  console.log(machine['machine hours']); // 10000
  ```

  变量被初始化为的`name`值`'machine name'`。由于`machine`对象的两个属性都包含一个空格，因此您只能使用方括号引用它们。

  在 ES6 中，计算属性名称是对象字面量语法的一部分，它使用方括号表示法。

  当属性名称放在方括号内时，JavaScript 引擎会将其计算为字符串。这意味着您可以使用表达式作为属性名称。例如：

  ```js
  let prefix = 'machine';
  let machine = {
      [prefix + ' name']: 'server',
      [prefix + ' hours']: 10000
  };
  
  console.log(machine['machine name']); // server
  console.log(machine['machine hours']); // 10000
  ```

  对象的`machine`属性计算为`'machine name'`和`'machine hours'`，因此您可以将它们作为`machine`对象的属性进行引用。

### 2 var, let, const

在ES5中我们声明变量都是使用的var关键字，从ES6开始新增了两个关键字可以声明变量：let、const,  let、const不允许重复声明变量；

作用域提升的概念：在声明变量的作用域中，如果这个变量可以在声明之前被访问，那么我们可以称之为作用域提升.

暂时性死区的概念：ES6规定，`let/const` 命令会使区块形成封闭的作用域。若在声明之前使用变量，就会报错。
*总之，在代码块内，使用 `let` 命令声明变量之前，该变量都是不可用的。*
这在语法上，称为 **“暂时性死区”**

####  var vs let

1. 变量范围
- 当您在函数外部定义变量时，这些`var`变量属于全局范围。例如：

    ```js
    var counter;
    ```

    在本例中，`counter`是一个全局变量。这意味着该`counter`变量可以被任何函数访问。

    当您使用关键字在函数内声明变量时`var`，变量的范围是局部的。例如：

    ```js
    function increase() {
        var counter = 10;
    }
    // cannot access the counter variable here
    ```

    在这个例子中，`counter`变量是`increase()`函数的局部变量。它不能在函数之外访问。

- let是块范围的

2. 是否创建全局属性
- 全局var变量作为属性添加到全局对象中。The global object is `window` on the web browser and `global` on Node.js:

  ```js
  var counter = 0;
  console.log(window.counter); //  0
  ```

  let变量不会添加到全局对象中：

  ```js
  let counter = 0;
  console.log(window.counter); // undefined
  ```

3. 是否可以重复声明

   var可以，let不行
   

constES6 提供了一种使用关键字声明常量的新方法。关键字创建对值的const只读引用。

const CONSTANT_NAME = value;

按照惯例，常量标识符是大写的。

#### const
与let关键字一样，该const关键字声明了块作用域变量。但是，由 const 关键字声明的块范围变量不能被重新赋值。

### 3 默认参数

```js
ES6可以给函数参数提供默认值
function foo(m = "aaa", n = "bbb") {
  console.log(m, n)
}

// foo()
foo(0, "")
```

### 4 剩余参数（rest参数）

ES6 提供了一种新的参数，称为 rest 参数，前缀为三个点`(...)`。剩余参数允许您将不定数量的参数表示为数组。请参阅以下语法：

```js
function fn(a,b,...args) {
   //...

```

最后一个参数 ( `args`) 以三个点 ( ) 为前缀`...`。它被称为 rest 参数（`...args`）。

您传递给函数的所有参数都将映射到参数列表。在上面的语法中，第一个参数映射到`a`，第二个映射到`b`，第三个、第四个等将`args`作为数组存储在其余参数中。例如：

```js
fn(1, 2, 3, "A", "B", "C");
```

该`args`数组存储以下值：

```js
[3,'A','B','C']
```

如果只传递前两个参数，则 rest 参数将是一个空数组：

```js
fn(1,2);
```

将`args`是：

```js
[]
```

请注意， rest 参数必须出现在参数列表的末尾，否则会导致错误

### 5 展开语法（Spread Operator）//与 剩余参数 是不同的东西

ES6 提供了一个新的运算符，称为扩展运算符，由三个点组成`(...)`。展开运算符允许您展开可迭代对象的元素，例如[数组](https://www.javascripttutorial.net/javascript-array/)、[映射](https://www.javascripttutorial.net/es6/javascript-map/)或[集合](https://www.javascripttutorial.net/es6/javascript-set/)。例如：

```
const odd = [1,3,5];
const combined = [2,4,6, ...odd];
console.log(combined);
```

输出：

```
[ 2, 4, 6, 1, 3, 5 ]代码语言： JSON / JSON with Comments  ( json )
```

`...`在此示例中，位于数组前面的三个点 ( )`odd`是展开运算符。扩展运算符 ( `...`) 解包`odd`数组的元素。

#### 展开语法和数组

##### 1) 构造数组字面量

扩展运算符允许您在使用文字形式构造数组时将另一个数组插入到初始化的数组中。请参见以下示例：

```
let initialChars = ['A', 'B'];
let chars = [...initialChars, 'C', 'D'];
console.log(chars); // ["A", "B", "C", "D"]
```

##### 2) 连接数组

此外，您可以使用扩展运算符连接两个或多个数组：

```
let numbers = [1, 2];
let moreNumbers = [3, 4];
let allNumbers = [...numbers, ...moreNumbers];
console.log(allNumbers); // [1, 2, 3, 4]
```

##### 3) 复制数组（是一种浅拷贝）

此外，您可以使用扩展运算符复制数组实例：

```
let scores = [80, 70, 90];
let copiedScores = [...scores];
console.log(copiedScores); // [80, 70, 90]
```

#### 展开语法和字符串

考虑以下示例：

```
let chars = ['A', ...'BC', 'D'];
console.log(chars); // ["A", "B", "C", "D"]
```

当我们将扩展运算符应用于`'BC'`字符串时，它将字符串的每个单独的字符展开`'BC'`为单独的字符。

### 6 for…of 循环

ES6 引入了一个新的语句`for...of`来迭代一个可迭代的对象，例如：

- 内置Array, String, Map, Set, ...
- 类似数组的对象，例如`arguments`or`NodeList`
- 实现迭代器协议的用户定义对象。

#### 使用的例子：

##### 1) 遍历数组

下面的例子展示了如何使用`for...of`来迭代数组的元素：

```js
let scores = [80, 90, 70];

for (let score of scores) {
    score = score + 5;
    console.log(score);
}
```

输出：

```
85
95
75
```

在此示例中，`for...of`迭代`scores`数组的每个元素。它在每次迭代中将`scores`数组的元素分配给变量。`score`

如果你不改变循环内的变量，你应该使用 `const`关键字而不是[`let`](https://www.javascripttutorial.net/es6/javascript-let/)关键字，如下所示：

```js
let scores = [80, 90, 70];

for (const score of scores) {
    console.log(score);
}
```

输出：

```
80
90
70
```

要访问循环内数组元素的索引，可以使用`for...of`带有数组方法的语句`entries()`。

该方法在每次迭代中`array.entries()`返回一对。`[index, element]`例如：

```js
let colors = ['Red', 'Green', 'Blue'];

for (const [index, color] of colors.entries()) {
    console.log(`${color} is at index ${index}`);
}
```

输出：

```js
Red is at index 0
Green is at index 1
Blue is at index 2
```

在此示例中，我们使用数组解构将`entries()`方法的结果分配给每次迭代中的`index`和`color`变量：

```js
const [index, color] of colors.entries()
```

##### 2) 使用 for...of 就地对象解构

考虑以下示例：

```js
const ratings = [
    {user: 'John',score: 3},
    {user: 'Jane',score: 4},
    {user: 'David',score: 5},
    {user: 'Peter',score: 2},
];

let sum = 0;
for (const {score} of ratings) {
    sum += score;
}

console.log(`Total scores: ${sum}`); // 14
```

输出：

```
Total scores: 14
```

这个怎么运作：

- 是`ratings`一个对象数组。每个对象都有两个属性 user 和 score。
- `for...of`遍历数组并计算所有对象的`ratings`总分。
- 该表达式`const {score} of ratings`使用[对象解构](https://www.javascripttutorial.net/es6/javascript-object-destructuring/)`score`将当前迭代元素的属性分配给`score`变量。

##### 3) 遍历字符串

以下示例使用`for...of`循环遍历字符串的字符。

```js
let str = 'abc';
for (let c of str) {
    console.log(c);
}
```

输出：

```js
a
b
c
```

##### 4) 迭代 Map 对象

以下示例说明了如何使用该 `for...of` 语句来迭代`Map`对象。

```js
let colors = new Map();

colors.set('red', '#ff0000');
colors.set('green', '#00ff00');
colors.set('blue', '#0000ff');

for (let color of colors) {
    console.log(color);
}
```

输出：

```js
[ 'red', '#ff0000' ]
[ 'green', '#00ff00' ]
[ 'blue', '#0000ff' ]
```

##### 5) 迭代集合对象

以下示例显示了如何使用循环迭代`set`对象`for...of`：

```js
let nums = new Set([1, 2, 3]);

for (let num of nums) {
    console.log(num);
}
```

### 7 八进制和二进制文字

 八进制  Octal literals start with `0o` followed by a sequence of numbers between 0 and 7.
 二进制 Binary literals start with `0b` followed by a sequence of number 0 and 1.

### 8 模板字符串

将获得以下功能：

- 多行字符串：可以跨越多行的字符串。

- 字符串格式化：用部分字符串替换变量或表达式的值的能力。此功能也称为字符串插值。

  ```js
  let firstName = 'John',
      lastName = 'Doe';
  
  let greeting = `Hi ${firstName}, ${lastName}`;
  console.log(greeting); // Hi John, Doe
  ```

  

- HTML 转义：转换字符串以使其可以安全地包含在 HTML 中的能力。

## 解构

ES6 提供了一个称为解构赋值的新特性，它允许您将对象的属性或数组的元素分解为单独的变量

### 1 数组的解构

#### 基本使用

```js
function getScores() {
   return [70, 80, 90];
}
let [x, y, z] = getScores();

console.log(x); // 70
console.log(y); // 80
console.log(z); // 90
```

请注意，方括号`[]`看起来像数组语法，但它们不是。

如果`getScores()`函数返回一个包含两个元素的数组，则第三个变量将是`undefined`，如下所示：

```js
function getScores() {
   return [70, 80];
}

let [x, y, z] = getScores();

console.log(x); // 70
console.log(y); // 80
console.log(z); // undefined
```

如果`getScores()`函数返回一个包含三个以上元素的数组，则丢弃剩余的元素。例如：

```js
function getScores() {
   return [70, 80, 90, 100];
}

let [x, y, z] = getScores();

console.log(x); // 70
console.log(y); // 80
console.log(z); // 90
```

可以使用rest语法将数组的所有剩余元素放入一个新数组中`(...)`：返回数组的前两个元素的变量`x`和`y`接收值。并且该`args`变量接收所有剩余的参数，即返回数组的最后两个元素。

```js
let [x, y ,...args] = getScores();
console.log(x); // 70
console.log(y); // 80
console.log(args); // [90, 100]
```

使用默认值的解构赋值：

```js
function getItems() {
    return [10, 20];
}
let [, , thirdItem = 0] = getItems();

console.log(thirdItem); // 0
```

嵌套数组解构:

```js
function getProfile() {
    return [
        'John',
        'Doe',
        ['Red', 'Green', 'Blue']
    ];
}
let [
    firstName,
    lastName,
    [
        color1,
        color2,
        color3
    ]
] = getProfile();

console.log(color1, color2, color3); // Red Green Blue
```

#### 数组解构赋值应用

让我们看一些使用数组解构赋值语法的实际示例。

##### 1) 交换变量

数组解构使得在不使用临时变量的情况下交换变量值变得容易：

```js
let a = 10, 
    b = 20;

[a, b] = [b, a];

console.log(a); // 20
console.log(b); // 10
```

##### 2) 返回多个值的函数

在 JavaScript 中，函数可以返回一个值。但是，您可以返回一个包含多个值的数组，例如：

```js
function stat(a, b) {
    return [
        a + b,
        (a + b) / 2,
        a - b
    ]
}
```

然后使用数组解构赋值语法将返回数组的元素解构为变量：

```js
let [sum, average, difference] = stat(20, 10);
console.log(sum, average, difference); // 30, 15, 10
```

### 2 对象的解构

对象解构将对象的属性分配给各个变量(默认情况下，对象解构将对象的属性分配给具有相同名称的变量。)

假设您有一个`person`具有两个属性的对象：`firstName`和`lastName`。

```js
let person = {
    firstName: 'John',
    lastName: 'Doe'
};
```

在 ES6 之前，当您想将`person`对象的属性分配给变量时，您通常会这样做：

```js
let firstName = person.firstName;
let lastName = person.lastName; 
```

ES6 引入了对象解构语法，它提供了一种将对象的属性分配给变量的替代方法：

```js
let { firstName: fname, lastName: lname } = person;
```

在此示例中，`firstName`和`lastName`属性分别分配给`fName`和`lName`变量。

在这种语法中：

```js
let { property1: variable1, property2: variable2 } = object;
```

冒号 ( `:`) 之前的标识符是对象的属性，冒号之后的标识符是变量。

请注意，无论是对象文字还是对象解构语法，属性名称始终位于左侧。

如果变量与对象的属性同名，可以使代码更简洁如下：

```js
let { firstName, lastName } = person;

console.log(firstName); // 'John'
console.log(lastName); // 'Doe'
```

#### 解构函数参数

假设您有一个显示人员对象的函数：

```js
let display = (person) => console.log(`${person.firstName} ${person.lastName}`);

let person = {
    firstName: 'John',
    lastName: 'Doe'
};

display(person);
```

可以像这样解构传递给函数的对象参数：

```js
let display = ({firstName, lastName}) => console.log(`${firstName} ${lastName}`);

let person = {
    firstName: 'John',
    lastName: 'Doe'
};

display(person);
```

它看起来不那么冗长，尤其是当您使用参数对象的许多属性时。这种技术经常在 React 中使用。

## ES6 中类的使用

与 Java 和[C#](https://www.csharptutorial.net/)等其他编程语言不同，JavaScript 类是原型继承之上的语法糖。换句话说，ES6 类只是特殊的函数。

在 ES6 之前，JavaScript 没有类的概念。为了模仿一个类，您经常使用构造函数/原型模式，如下例所示：

```js
function Person(name) {
    this.name = name;
}

Person.prototype.getName = function () {
    return this.name;
};

var john = new Person("John Doe");
console.log(john.getName());
```

输出：

```
John Doe
```

这个怎么运作。

首先，创建`Person`一个构造函数，其属性名称为`name`。该`getName()`函数被分配给 ，`prototype`以便它可以被该`Person`类型的所有实例共享。

`Person`然后，使用运算符创建该类型的新实例`new`。`john`因此，该对象是原型继承`Person`的一个实例`Object`。

以下语句使用`instanceof`运算符检查是否`john`是`Person`and`Object`类型的实例：

```js
console.log(john instanceof Person); // true
console.log(john instanceof Object); // true
```

#### ES6 类声明

ES6 引入了一种用于声明类的新语法，如下例所示：

```js
class Person {
    constructor(name) {
        this.name = name;
    }
    getName() {
        return this.name;
    }
}
```

此类`Person`的行为类似于`Person`前面示例中的类型。但是，它不使用构造函数/原型模式，而是使用`class`关键字。

在`Person`类`constructor()`中，您可以在其中初始化实例的属性。`constructor()`当您实例化类的对象时，JavaScript 会自动调用该方法。

以下创建了一个新`Person`对象，该对象将自动调用该类`constructor()`的`Person`：

```js
let john = new Person("John Doe");
```

被`getName()`称为`Person`类的方法。与构造函数一样，您可以使用以下语法调用类的方法：

```js
objectName.methodName(args)
```

例如：

```js
let name = john.getName();
console.log(name); // "John Doe"
```

要验证类是特殊函数这一事实，您可以使用`typeof`运算符来检查类的类型`Person`。

```
console.log(typeof Person); // function
```

它`function`按预期返回。

该`john`对象也是`Person`和`Object`类型的一个实例：

```js
console.log(john instanceof Person); // true
console.log(john instanceof Object); // true
```





...待补充

## 箭头函数

与函数表达式相比，ES6 箭头函数为您提供了一种编写更短语法的替代方法。

下面的例子定义了一个函数表达式，它返回两个数字的和：

```JS
let add = function (x, y) {
	return x + y;
};

console.log(add(10, 20)); // 30
```

以下示例等效于上述`add()`函数表达式，但使用了箭头函数：

```JS
let add = (x, y) => x + y;

console.log(add(10, 20)); // 30;
```

在这个例子中，箭头函数有一个表达式`x + y`，所以它返回表达式的结果。

但是，如果使用块语法，则需要指定`return`关键字：

```JS
let add = (x, y) => { return x + y; };
```

`typeof`运算符返回指示箭头函数的  `function`类型。

```JS
console.log(typeof add); // function
```

箭头函数也是Function 类型的一个实例，如下例所示：

```JS
console.log(add instanceof Function); // true
```

#### 具有多个参数的 JavaScript 箭头函数

如果箭头函数有两个或更多参数，则使用以下语法：

```JS
(p1, p2, ..., pn) => expression;
```

以下表达式：

```JS
=> expression
```

等价于以下表达式：

```JS
=> { return expression; }
```

例如，要按降序对数字数组进行排序`sort()`，可以使用数组对象的方法，如下所示：

```JS
let numbers = [4,2,6];
numbers.sort(function(a,b){ 
    return b - a; 
});
console.log(numbers); // [6,4,2]
```

代码使用箭头函数语法更简洁：

```JS
let numbers = [4,2,6];
numbers.sort((a,b) => b - a);
console.log(numbers); // [6,4,2]
```

#### 带有单个参数的 JavaScript 箭头函数

如果箭头函数采用单个参数，则使用以下语法：

```JS
(p) => { statements }
```

请注意，您可以省略括号，如下所示：

```JS
p => { statements }
```

下面的示例使用箭头函数作为将`map()`字符串数组转换为字符串长度数组的方法的参数。

```JS
let names = ['John', 'Mac', 'Peter'];
let lengths = names.map(name => name.length);

console.log(lengths);
```

输出：

```JS
[ 4, 3, 5 ]
```

#### 无参数的 JavaScript 箭头函数

如果箭头函数没有参数，则需要使用括号，如下所示：

```JS
() => { statements }
```

例如：

```JS
let logDoc = () => console.log(window.document);
logDoc();
```

### 参数定义和箭头之间的换行符

JavaScript 不允许在参数定义和`=>`箭头函数中的箭头 ( ) 之间有换行符。

例如，以下代码会导致`SyntaxError`：

```JS
let multiply = (x,y) 
=> x * y; 

```

但是，以下代码可以正常工作：

```JS
let multiply = (x,y) => 
x * y;
```

JavaScript 允许您在参数之间使用换行符，如下例所示：

```JS
let multiply = (
  x,
  y
) => 
x * y;
```

### JavaScript 箭头函数和对象字面量

考虑以下示例：

```JS
let setColor = function (color) {
    return {value: color}
};

let backgroundColor = setColor('Red');
console.log(backgroundColor.value); // "Red"
```

`setColor()`函数表达式返回一个将属性`value`设置为`color`参数的对象。 

如果使用以下语法从箭头函数返回对象字面量，则会出现错误。

```JS
p => {object:literal}
```

例如，以下代码会导致错误。

```JS
let setColor = color => {value: color };
```

**由于块和对象字面量都使用大括号，JavaScript 引擎无法区分块和对象。**

要解决此问题，您**需要将对象字面量括在括号中**，如下所示：

```JS
let setColor = color => ({value: color });
```

### 箭头函数与常规函数

箭头函数和常规函数之间有两个主要区别。

1. 首先，在箭头函数中，`this`, `arguments`, `super`,`new.target`是词法的。这意味着箭头函数使用封闭词法范围中的这些变量（或构造）。
2. 其次，箭头函数不能用作函数构造函数。如果你使用`new`关键字从箭头函数创建一个新对象，你会得到一个错误。

### JavaScript 箭头函数和`this`值

在 JavaScript 中，一个新函数定义了它自己的`this`值。但是，箭头函数并非如此。请参见以下示例：

```JS
function Car() {
    this.speed = 0;

    this.speedUp = function (speed) {
        this.speed = speed;
        setTimeout(function () {
            console.log(this.speed); // undefined
        }, 1000);

    };
}

let car = new Car();
car.speedUp(50);
```

在函数的匿名函数内部`setTimeout()`，`this.speed`是`undefined`. 原因是[匿名函数](https://www.javascripttutorial.net/javascript-anonymous-functions/)`this`的隐藏了方法的。`this``speedUp()`

要解决此问题，请将`this`值分配给不会在匿名函数内隐藏的变量，如下所示：

```JS
function Car() {
    this.speed = 0;

    this.speedUp = function (speed) {
        this.speed = speed;
        let self = this;
        setTimeout(function () {
            console.log(self.speed);
        }, 1000);

    };
}

let car = new Car();
car.speedUp(50); // 50;
```

与匿名函数不同，箭头函数捕获`this`封闭上下文的值，而不是创建自己的`this`上下文。以下代码应按预期工作：

```JS
function Car() {
    this.speed = 0;

    this.speedUp = function (speed) {
        this.speed = speed;
        setTimeout(
            () => console.log(this.speed),
            1000);

    };
}

let car = new Car();
car.speedUp(50); // 50;

```

- 箭头函数没有绑定到`this`or `super`。
- 箭头函数没有`arguments`对象、`new.target`关键字和`prototype`属性

### 什么时候不该使用箭头函数？

箭头函数没有自己的值`this`和`arguments`对象。因此，您不应该将其用作事件处理程序、对象字面量的方法、原型方法，或者当您有使用该`arguments`对象的函数时。

## Symbol

Symbol是ES6中新增的一个基本数据类型，翻译为符号。 那么为什么需要Symbol呢？ 在ES6之前，对象的属性名都是字符串形式，那么很容易造成属性名的冲突。Symbol值是通过Symbol函数来生成的，生成后可以作为属性名； 也就是说在ES6中，对象的属性名可以使用字符串，也可以使用Symbol值；

### 创建Symbol

要创建新的Symbol，要使用Symbol()函数

例如：

```js
let s = Symbol('foo');
```

每次调用该Symbol()函数时都会创建一个新*的唯一值*

```js
console.log(Symbol() === Symbol()); // false
```

`Symbol()`函数接受一个 `description`作为可选参数。`description`参数将使您的符号更具描述性。

以下示例创建两个符号：`firstName`和`lastName`。

```js
let firstName = Symbol('first name'),
    lastName = Symbol('last name');
```

您可以使用该`toString()`方法访问符号的描述属性。该`console.log()`方法隐式调用`toString()`符号的方法，如下例所示：

```js
console.log(firstName); // Symbol(first name)
console.log(lastName); // Symbol(last name)
```

### 共享Symbol

ES6 为您提供了全局符号注册表，允许您在全局范围内共享符号。如果要创建将被共享的符号，请使用该`Symbol.for()`方法而不是调用该`Symbol()`函数。

该`Symbol.for()`方法接受一个可用于符号描述的参数，如下例所示：

```js
let ssn = Symbol.for('ssn');
```

该方法首先在全局符号注册表中`Symbol.for()`搜索具有  键的符号。`ssn`如果存在，则返回现有符号。否则，该`Symbol.for()`方法创建一个新符号，将其注册到具有指定键的全局符号注册表，并返回该符号。

## 用法

### 使用符号作为唯一值

每当您在代码中使用字符串或数字时，都应该使用符号。例如，您必须在任务管理应用程序中管理状态。在 ES6 之前，您会使用`open`, `in progress`, `completed`, `canceled`, 和等字符串`on hold`来表示任务的不同状态。在 ES6 中，您可以使用如下符号：

```js
let statuses = {
    OPEN: Symbol('Open'),
    IN_PROGRESS: Symbol('In progress'),
    COMPLETED: Symbol('Completed'),
    HOLD: Symbol('On hold'),
    CANCELED: Symbol('Canceled')
};
// complete a task
task.setStatus(statuses.COMPLETED);
```

## Promises

Promise 是一个封装异步操作结果的对象。

> Summary
>- A promise is an object that encapsulates the result of an asynchronous operation.
>- A promise starts in the pending state and ends in either fulfilled >state or rejected state.
>- Use `then()` method to schedule a callback to be executed when the promise is fulfilled, and `catch()` method to schedule a callback to be invoked when the promise is rejected.
>- Place the code that you want to execute in the `finally()` method whether the promise is fulfilled or rejected.

从一个实际的例子来作为切入点：
我们调用一个函数，这个函数中发送网络请求（我们可以用定时器来模拟）； 
如果发送网络请求成功了，那么告知调用者发送成功，并且将相关数据返回过去； 
如果发送网络请求失败了，那么告知调用者发送失败，并且告知错误信息；

以前的处理方法：通过回调函数

```js
function requestData(url, successCallback, failtureCallback) {
  setTimeout(() => {
    if (url==="http://hotjui.cc") {
      //发送成功了
      successCallback("一组成功的数据")
    } else {
      //发送失败了
      failtureCallback("请求url错误")
    }
  }, 1000);
}
```

但是，回调函数作为参数增加了函数的复杂性，同时回调函数过多还可能造成回调地狱的问题
promise 是一个封装**异步操作结果的****对象**。
Promise 对象的状态可以是以下之一：

**待定（pending）**: 初始状态，既没有被兑现，也没有被拒绝； 
当执行executor中的代码时，处于该状态；

**已兑现（fulfilled）**: 意味着操作成功完成；
执行了resolve时，处于该状态；

**已拒绝（rejected）**: 意味着操作失败；
执行了reject时，处于该状态

可以把上述代码重构为

```js
function requestData(url) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (url === "http://hotjui.cc") {
        //发送成功了
        resolve("一组成功的数据");//
      } else {
        //发送失败了
        reject("请求url错误");
      }
    }, 1000);
  });
}
```

观察上述代码

Promise 构造函数接受一个通常执行异步操作的回调函数。这个函数通常被称为Executor。接受两个回调函数，名称为`resolve`和`reject`。
通常我们会在Executor中确定我们的Promise状态：
如果异步操作成功完成，执行器将调用该`resolve()`函数将 Promise 的状态从挂起更改为已完成，并带有一个值。
如果发生错误，执行者将调用该`reject()`函数将 Promise 的状态从挂起更改为拒绝，并给出错误原因。
一旦 Promise 达到已完成或已拒绝状态，它就会停留在该状态并且不能进入另一个状态。

> 请注意，您在实践中很少会创建 Promise 对象。相反，您将使用库提供的Promise。

**resolve参数**
情况一：如果resolve传入一个普通的值或者对象，那么这个值会作为then回调的参数； 
情况二：如果resolve中传入的是另外一个Promise，那么这个新Promise会决定原Promise的状态
情况三：如果resolve中传入的是一个对象，并且这个对象有实现then方法，那么会执行该then方法，并且根据 then方法的结果来决定Promise的状态

### Promise的方法

### then()方法

```js
promise.then(fulfilled的回调函数,preject的回调函数);
```

该`then()`方法接受两个回调函数：`onFulfilled`和`onRejected`.
fulfilled的回调函数：当状态变成fulfilled时会回调的函数； reject的回调函数：当状态变成reject时会回调的函数

例子

```JS
let success = true;

function getUsers() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (success) {
        resolve([
          { username: 'john', email: 'john@test.com' },
          { username: 'jane', email: 'jane@test.com' },
        ]);
      } else {
        reject('Failed to the user list');
      }
    }, 1000);
  });
}

function onFulfilled(users) {
  console.log(users);
}
function onRejected(error) {
  console.log(error);
}

const promise = getUsers();
promise.then(onFulfilled, onRejected);//也可直接写成箭头函数放到里面
```

then方法本身是有返回值的，它的返回值是一个Promise，所以我们可以进行链式调用： 但是then方法返回的Promise到底处于什么样的状态呢？ 

- 当then方法中的回调函数本身在执行的时候，那么它处于pending状态； 
- 当then方法中的回调函数返回一个结果时，那么它处于fulfilled状态，并且会将结果作为resolve的参数； 
  - 情况一：返回一个普通的值； 
  - 情况二：返回一个Promise； 
  - 情况三：返回一个thenable值； 
- 当then方法抛出一个异常时，那么它处于reject状态

### catch() 方法

如果只想在 promise 的状态被拒绝时得到err，可以使用promise的`catch()`方法

```js
promise.catch(onRejected);
```

在内部，该`catch()`方法调用该`then(undefined, onRejected)`方法。

以下示例将`success`标志更改`false` 来模拟错误场景：

```js
let success = false;

function getUsers() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (success) {
        resolve([
          { username: 'john', email: 'john@test.com' },
          { username: 'jane', email: 'jane@test.com' },
        ]);
      } else {
        reject('Failed to the user list');
      }
    }, 1000);
  });
}

const promise = getUsers();

promise.catch((error) => {
  console.log(error);
});
```

### finally() 方法

有时，无论承诺是履行还是拒绝，您都希望执行相同的代码。例如：

```js
const render = () => {
  //...
};

getUsers()
  .then((users) => {
    console.log(users);
    render();
  })
  .catch((error) => {
    console.log(error);
    render();
  });
```

如您所见，函数render()在then和catch中都是重复的。

要删除此重复项并执行`render()`承诺是否已履行或被拒绝，请使用该`finally()`方法，如下所示：

```js
const render = () => {
  //...
};

getUsers()
  .then((users) => {
    console.log(users);
  })
  .catch((error) => {
    console.log(error);
  })
  .finally(() => {
    render();
  });
```

### 一个实用的 JavaScript Promise 示例

以下示例显示如何从服务器加载 JSON 文件并在网页上显示其内容。

假设您有以下 JSON 文件：

```js
https://www.javascripttutorial.net/sample/promise/api.json
```

内容如下：

```json
{
    "message": "JavaScript Promise Demo"
}
```

下面显示了包含一个按钮的 HTML 页面。单击按钮时，页面会从 JSON 文件加载数据并显示消息：

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>JavaScript Promise Demo</title>
    <link href="css/style.css" rel="stylesheet">
</head>
<body>
    <div id="container">
        <div id="message"></div>
        <button id="btnGet">Get Message</button>
    </div>
    <script src="js/promise-demo.js">
    </script>
</body>
</html>
```

下面显示了 promise-demo.js 文件：

```js
function load(url) {
  return new Promise(function (resolve, reject) {
    const request = new XMLHttpRequest();
    request.onreadystatechange = function () {
      if (this.readyState === 4 && this.status == 200) {
        resolve(this.response);
      } else {
        reject(this.status);
      }
    };
    request.open('GET', url, true);
    request.send();
  });
}

const url = 'https://www.javascripttutorial.net/sample/promise/api.json';
const btn = document.querySelector('#btnGet');
const msg = document.querySelector('#message');

btn.addEventListener('click', () => {
  load(URL)
    .then((response) => {
      const result = JSON.parse(response);
      msg.innerHTML = result.message;
    })
    .catch((error) => {
      msg.innerHTML = `Error getting the message, HTTP status: ${error}`;
    });
});

```

这个怎么运作。

首先，定义`load()`使用`XMLHttpRequest`对象从服务器加载 JSON 文件的函数：

```js
function load(url) {
  return new Promise(function (resolve, reject) {
    const request = new XMLHttpRequest();
    request.onreadystatechange = function () {
      if (this.readyState === 4 && this.status == 200) {
        resolve(this.response);
      } else {
        reject(this.status);
      }
    };
    request.open('GET', url, true);
    request.send();
  });
}
```

在执行器中，`resolve()`如果 HTTP 状态码为 200，我们会使用 Response 调用函数。否则，我们会`reject()`使用 HTTP 状态码调用函数。
然后 注册按钮点击事件监听器，调用promise对象的`then()`方法。如果加载成功，那么我们显示从服务器返回的消息。否则，我们会显示带有 HTTP 状态代码的错误消息。

```js
const url = 'https://www.javascripttutorial.net/sample/promise/api.json';
const btn = document.querySelector('#btnGet');
const msg = document.querySelector('#message');

btn.addEventListener('click', () => {
  load(URL)
    .then((response) => {
      const result = JSON.parse(response);
      msg.innerHTML = result.message;
    })
    .catch((error) => {
      msg.innerHTML = `Error getting the message, HTTP status: ${error}`;
    });
});

```

## ES6 集合

### [Map](https://www.javascripttutorial.net/es6/javascript-map/)

在 ES6 之前，我们经常使用对象通过将键映射到任何类型的值来模拟映射。但是使用对象作为映射有一些副作用：

1. 一个对象总是有一个像原型一样的默认键。
2. 对象的键必须是String或Symbol，不能使用对象作为键。
3. 对象没有表示映射大小的属性。

#### 有用的 JavaScript Map 方法

ES6 提供了一种新的集合类型，称为`Map`，解决了这些缺陷。

根据定义，`Map`对象包含键值对，其中任何类型的值都可以用作键或值。此外，一个`Map`对象会记住键的原始插入顺序。

要创建新的`Map`，请使用以下语法：

```js
let map = new Map([iterable]);
```

`Map()`接受一个可选的可迭代对象，其元素是键值对。

- `clear()`– 从地图对象中删除所有元素。
-  `delete(key)`– 删除键指定的元素。如果元素在地图中，则返回，否则返回 false。
-  `entries()`– 返回一个新的迭代器对象，该对象包含`[key, value]`映射对象中每个元素的数组。地图中对象的顺序与插入顺序相同。
-  `forEach(callback[, thisArg])`– 按插入顺序为映射中的每个键值对调用回调。可选的 thisArg 参数设置每个回调的 this 值。
-  `get(key)`– 返回与键关联的值。如果键不存在，则返回 undefined。
-  `has(key)`– 如果与键关联的值存在，则返回 true，否则返回 false。
-  `keys()`– 返回一个新的迭代器，其中包含按插入顺序排列的元素的键。
-  `set(key, value)`– 设置映射对象中键的值。它返回地图对象本身，因此您可以将此方法与其他方法链接。
-  `values()`返回一个新的迭代器对象，其中包含按插入顺序排列的每个元素的值。

```js
// 构造方法的使用
const map = new Map()
map.set(obj1, "aaa")
map.set(obj2, "bbb")
map.set(1, "ccc")
console.log(map)

const map2 = new Map([[obj1, "aaa"], [obj2, "bbb"], [2, "ddd"]])
console.log(map2)

// 3.常见的属性和方法

console.log(map2.size)//返回映射的条目数。

// set
map2.set("why", "eee")
console.log(map2)

// get(key)
console.log(map2.get("why"))

// has(key)
console.log(map2.has("why"))

// delete(key)
map2.delete("why")
console.log(map2)

// clear
// map2.clear()
// console.log(map2)

// 4.遍历map
map2.forEach((item, key) => {
  console.log(item, key)
})

for (const item of map2) {
  console.log(item[0], item[1])
}

for (const [key, value] of map2) {
  console.log(key, value)
}

```

和Map类型相似的另外一个数据结构称之为WeakMap，也是以键值对的形式存在的。 
那么和Map有什么区别呢？ 

- 区别一：WeakMap的key只能使用对象，不接受其他的类型作为key； 
- 区别二：WeakMap的key对对象想的引用是弱引用，如果没有其他引用引用这个对象，那么GC可以回收该对象

注意：WeakMap是不能遍历的

### Set

Set是一个新增的数据结构，可以用来保存数据，类似于数组，但是和数组的区别是元素不能重复。 p创建Set我们需要通过Set构造函数（暂时没有字面量创建的方式）
我们可以发现Set中存放的元素是不会重复的，那么Set有一个非常常用的功能就是给数组去重。

```js
let chars = new Set(['a', 'a', 'b', 'c', 'c']);
let newCars = [...chars]
```

要创建一个新的 empty `Set`，请使用以下语法：

```
let setObject = new Set();
```

构造`Set`函数还接受一个可选的[可迭代对象](https://www.javascripttutorial.net/es6/javascript-iterator/)。如果将可迭代对象传递给`Set`构造函数，则可迭代对象的所有元素都将添加到新集合中：

```
let setObject = new Set(iterableObject);
```

#### 有用的`Set`方法

该`Set`对象提供了以下有用的方法：

- `add(value)`– 将具有指定值的新元素附加到集合中。它返回`Set`对象，因此，您可以将此方法与另一个`Set`方法链接。
- `clear()` – 从`Set`对象中删除所有元素。
- `delete(value)`– 删除由值指定的元素。
- `entries()`– 返回一个`Iterator`包含 `[value, value]`.
- `forEach(callback [, thisArg])`–在每个调用中使用值设置为的每个元素调用[回调](https://www.javascripttutorial.net/javascript-callback/)。`Set``this``thisArg`
- `has(value)`–`true`如果具有给定值的元素在集合中，或者`false`不在集合中，则返回。
- `keys()`– 与功能相同`values()`。
- `[@@iterator]`– 返回一个新`Iterator`对象，其中包含存储在插入顺序中的所有元素的值。

#### `Set`示例

##### 从数组创建一个新集合

下面的例子展示了如何从一个数组创建一个新的 Set 。

```js
let chars = new Set(['a', 'a', 'b', 'c', 'c']);
```

集合中的所有元素都必须是唯一的，因此  仅`chars`包含 3 个不同的元素a,b,c

```js
console.log(chars);
```

输出：

```js
Set { 'a', 'b', 'c' }
```

当你对 使用 `typeof`操作符时`chars`，它会返回`object`。

```js
console.log(typeof(chars));
```

输出：

```
object
```

该 `chars`集合是该`Set`类型的一个实例，因此以下语句返回`true`。

```js
let result = chars instanceof Set;
console.log(result);
```

##### 获取 Set 的大小

要获取集合包含的元素数量，请使用对象的`size`属性`Set`：

```js
let size = chars.size;
console.log(size);//  3

```

##### 将元素添加到 Set

要将元素添加到集合中，请使用以下`add()`方法：

```js
chars.add('d');
console.log(chars);
```

输出：

```js
Set { 'a', 'b', 'c', 'd' }
```

由于该`add()`方法是可链接的，因此您可以使用链语句将多个项目添加到集合中：

```js
chars.add('e')
     .add('f');

```

##### 检查一个值是否在 Set 中

要检查集合是否具有特定元素，请使用该`has()`方法。如果集合包含元素，则该`has()`方法返回`true`，否则返回`false`。由于  `chars`集合包含`'a'`，因此以下语句返回`true`：

```js
let exist = chars.has('a');
console.log(exist);// true

```

以下语句返回`false`，因为该  `chars`集合不包含该`'z'`值。

```js
exist = chars.has('z');
console.log(exist); // false
```

##### 从集合中移除元素

要从集合中删除指定元素，请使用`delete()`方法。以下语句`'f'`从  `chars`集合中删除值。

```js
chars.delete('f');
console.log(chars); // Set {"a", "b", "c", "d", "e"}
```

输出：

```js
Set { 'a', 'b', 'c', 'd', 'e' }
```

该`delete()`方法返回`true`指示元素已成功删除。要删除集合的所有元素，请使用以下`clear()`方法：

```js
chars.clear();
console.log(chars); // Set{}
```

##### 循环 JavaScript Set 的元素

Set 对象维护其元素的插入顺序，因此，当您迭代其元素时，元素的顺序与插入顺序相同。假设您有一组用户角色，如下所示。

```js
let roles = new Set();
roles.add('admin')
    .add('editor')
    .add('subscriber');

```

以下示例使用[for...of 循环](https://www.javascripttutorial.net/es6/javascript-for-of/)遍历字符集。

```js
for (let role of roles) {
    console.log(role);
}
```

输出：

```
admin
editor
subscriber
```

## Proxy & Reflection

### Proxy

Proxy 是 ES6中新增的功能，可以用来自定义对象中的操作，设计思想主要是基于设计模式中的代理模式，其原理图大致如下。
![img](https://img-blog.csdnimg.cn/20200826154036290.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQxOTk2NDU0,size_16,color_FFFFFF,t_70#pic_center)
每次获取proxy，这个proxy就会返回对data的深拷贝，而要对data中的属性进行增删查等操作，也是直接对proxy下手就行。通过对整个对象的代理，就避免了访问之前要明确data中有什么属性的这一个过程。这样就实现了一个解耦合的过程，避免了直接操作data对象。

要创建新的Proxy Object，请使用以下语法：

```js
let proxy = new Proxy(target, handler);
```

在这种语法中：

- `target`– 是需要侦听的对象。
- `handler`– 是处理对象。is an object that contains methods to control the behaviors of the `target`. The methods inside the `handler` object are called traps.

基本的使用示例如下。

```js
let p = new Proxy(target, handler);
// `target` 代表需要添加代理的对象
// `handler` 用来自定义对象中的操作

let person01 = {
    name: "",
    testObj: {
        key1: "1",
        key2: "2",
        key3: "3",
    }
};

// 设置了一个person01的代理
let personProxy01 = new Proxy(person01, {
    get(target,key){
        // console.log('get方法被拦截。 实现原理为通过属性的getter驱动函数调用该方法');
        return target[key];
    },
    set(target,key,value){
        // console.log('set方法被拦截。实现原理为通过属性的setter驱动函数调用该方法');
        target[key]=value;
    }
})
```

proxy中的handler主要存放的是一些代理钩子函数，通过这些函数我们可以自定义一些数据劫持的方式，以此可以实现一个更优秀的订阅发布模式。

在对象的操作方法里面，建议使用ES6新增的Reflect,而Reflect里定义了对象操作的方法，利用Reflect可以方便地对被代理对象的操作。

#### Proxy Traps 捕获器

| 代理陷阱        | 覆写的特性                | 默认特性                   |
| --------------- | ------------------------- | -------------------------- |
| get             | 读取一个属性值            | Reflect.get()              |
| set             | 写入一个属性              | Reflect.set()              |
| has             | in操作                    | Reflect.has()              |
| deleteProperty  | delete操作符              | Reflect.deleteProperty()   |
| getAPrototypeof | Object.getAPrototypeof () | Reflect.getAPrototypeof () |
| setAPrototypeof | Object.setAPrototypeof () | Reflect.setAPrototypeof () |
| apply           | 调用一个函数              | Reflect.apply()            |
| construct       | 用new调用一个函数         | Reflect.construct()        |


```js
const obj = {
  name: "why", // 数据属性描述符
  age: 18
}

// 变成一个访问属性描述符
// Object.defineProperty(obj, "name", {

// })

const objProxy = new Proxy(obj, {
  // 获取值时的捕获器set()
  get: function(target, key) {
    console.log(`监听到对象的${key}属性被访问了`, target)
    return target[key]
  },

  // 设置值时的捕获器get()
  set: function(target, key, newValue) {
    console.log(`监听到对象的${key}属性被设置值`, target)
    target[key] = newValue
  },

  // 监听in的捕获器has()
  has: function(target, key) {
    console.log(`监听到对象的${key}属性in操作`, target)
    return key in target
  },

  // 监听delete的捕获器
  deleteProperty: function(target, key) {
    console.log(`监听到对象的${key}属性in操作`, target)
    delete target[key]
  }
})


// in操作符
// console.log("name" in objProxy)

// delete操作
delete objProxy.name

```

##### 1.get（）

get方法用于拦截某个属性的读取操作，可以接受三个参数

target：目标对象
propKey：属性名
receiver（可选）：proxy 实例本身（严格地说，是操作行为所针对的对象）

```js
var person = {
  name: "张三"
};

var proxy = new Proxy(person, {
  get: function(target, property) {
    if (property in target) {
      return target[property];
    } else {
      throw new ReferenceError("Property \"" + property + "\" does not exist.");
    }
  }
});

proxy.name // "张三"
proxy.age // 抛出一个错误
```


上面代码表示，如果访问目标对象不存在的属性，会抛出一个错误。如果没有这个拦截函数，访问不存在的属性，只会返回undefined。

get方法可以继承。

```js
let proto = new Proxy({}, {
  get(target, propertyKey, receiver) {
    console.log('GET ' + propertyKey);
    return target[propertyKey];
  }
});

let obj = Object.create(proto);
obj.foo // "GET foo"
```

上面代码中，拦截操作定义在Prototype对象上面，所以如果读取obj对象继承的属性时，拦截会生效。

##### 2.set()

set方法用来拦截某个属性的赋值操作

target：目标对象
propKey：属性名
propValue：属性值
receiver（可选）：proxy 实例本身（原始的操作行为所在的那个对象，简单来说，如果要调用一个属性，谁调用了那个属性，receiver就是谁）

```js
let validator = {
  set: function(obj, prop, value) {
    if (prop === 'age') {
      if (!Number.isInteger(value)) {
        throw new TypeError('The age is not an integer');
      }
      if (value > 200) {
        throw new RangeError('The age seems invalid');
      }
    }
    // 对于满足条件的 age 属性以及其他属性，直接保存
    obj[prop] = value;
  }
};

let person = new Proxy({}, validator);

person.age = 100;

person.age // 100
person.age = 'young' // 报错
person.age = 300 // 报错
```

上述代码中的Number.isInteger()方法用来判断给定的参数是否为整数。返回布尔值

上面代码中，由于设置了存值函数set，任何不符合要求的age属性赋值，都会抛出一个错误，这是数据验证的一种实现方法。利用set方法，还可以数据绑定，即每当对象发生变化时，会自动更新 DOM。

```js
const handler = {
  set: function(obj, prop, value, receiver) {
    obj[prop] = receiver;
  }
};
const proxy = new Proxy({}, handler);
const myObj = {};
Object.setPrototypeOf(myObj, proxy);

myObj.foo = 'bar';
myObj.foo === myObj // true
```

上面代码中，设置myObj.foo属性的值时，myObj并没有foo属性，因此引擎会到myObj的原型链去找foo属性。myObj的原型对象proxy是一个 Proxy 实例，设置它的foo属性会触发set方法。这时，第四个参数receiver就指向原始赋值行为所在的对象myObj。

注意，如果目标对象自身的某个属性，不可写且不可配置，那么set方法将不起作用。

```js
const obj = {};
Object.defineProperty(obj, 'foo', {
  value: 'bar',
  writable: false,
});

const handler = {
  set: function(obj, prop, value, receiver) {
    obj[prop] = 'baz';
  }
};

const proxy = new Proxy(obj, handler);
proxy.foo = 'baz';
proxy.foo // "bar"
```


Object.defineProperty(obj, prop, descriptor)
obj：要在其上定义属性的对象。
prop：要定义或修改的属性的名称。
descriptor：定义或修改的属性描述符（属性的描述对象）。

注意，严格模式下，set代理如果没有返回true，就会报错。

##### 3.apply()

apply方法拦截函数的调用、call和apply操作。可以接受三个参数

target：目标对象
thisArg：目标对象的上下文对象（this）
args：目标对象的参数数组。

```js
var target = function () { return 'I am the target'; };
var handler = {
  apply: function () {
    return 'I am the proxy';
  }
};
var p = new Proxy(target, handler);
console.log(p())//I am the proxy
```

上述代码，执行 p() 时被apply拦截操作后输出 I am the proxy 。若 handler 中为一个空对象，执行 p() 则直接指向target目标函数执行，输出 I am the target

4.has()
has 方法用来拦截HasProperty操作，即判断对象是否具有某个属性时，这个方法会生效。 典型的操作就是in运算符。

has 方法可以接受两个参数

target：目标对象
Key：需查询的属性名。
下面的例子使用has方法隐藏某些属性，不被in运算符发现。

```js
var handler = {
  has (target, key) {
    if (key[0] === '_') {
      return false;
    }
    return key in target;
  }
};
var target = { _prop: 'foo', prop: 'foo' };
var proxy = new Proxy(target, handler);
'_prop' in proxy // false
```



> in 运算符 （key in obj） ：监测 obj 中是否有指定的key(键名)，返回一个布尔值

上面代码中，如果原对象的属性名的第一个字符是下划线，proxy.has就会返回false，从而不会被in运算符发现。

如果原对象不可配置或者禁止扩展，这时has拦截会报错。

```js
var obj = { a: 10 };
Object.preventExtensions(obj);

var p = new Proxy(obj, {
  has: function(target, prop) {
    return false;
  }
});

'a' in p // TypeError is thrown
```



> Object.preventExtensions（obj）方法防止将新属性添加到 obj（即，防止将来对该 obj 进行扩展）。

注意：

has 方法拦截的是HasProperty操作，而不是HasOwnProperty操作，即 has 方法不判断一个属性是对象自身的属性，还是继承的属性。
另外，虽然for...in 循环也用到了in运算符，但是 has 拦截对for...in循环不生效。

##### 5.construct()

construct方法用于拦截new命令,接受两个参数。

```js
target：目标对象
args：构造函数的参数对象
newTarget：创造实例对象时，new命令作用的构造函数（下面例子的p）
var p = new Proxy(function () {}, {
  construct: function(target, args) {
    console.log('called: ' + args.join(', '));
    return { value: args[0] * 10 };
  }
});

(new p(1)).value
// "called: 1"
// 10
```


注意：construct方法返回的必须是一个对象，否则会报错。

##### 6.deleteProperty()

deleteProperty方法用于拦截 delete 操作，如果使用这个方法，当前属性就无法被delete 命令删除。
接收两个参数，返回一个 Boolean 类型的值

target：目标对象。
prop：待删除的属性名。

```js
var p = new Proxy({a:1}, {
  deleteProperty: function(target, prop) {
    console.log('called: ' + prop);
    return true;
  }
});

delete p.a; //called: a
console.log(p)//Proxy {a: 1}
```

上面代码中，deleteProperty方法拦截了delete操作符
注意：

目标对象自身的不可配置（configurable）的属性，不能被deleteProperty方法删除，否则报错。

##### 7.defineProperty()

用于拦截对对象的 Object.defineProperty() 操作。简单来说，就是向对象添加和修改属性时会触发拦截
下列参数将会被传递给 defineProperty 方法。 this 绑定在 handler 对象上。

target：目标对象。
property：待检索其描述的属性名。
descriptor：待定义或修改的属性的描述符。

```js
var handler = {
  defineProperty (target, key, descriptor) {
    return false;
  }
};
var target = {};
var proxy = new Proxy(target, handler);
proxy.foo = 'bar' // 不会生效
```

上面代码中，defineProperty 方法返回 false，导致添加新属性总是无效。
注意：

如果目标对象不可扩展（non-extensible），则defineProperty不能增加目标对象上不存在的属性，否则会报错。
默认情况下，对象是可扩展的，
使用Object.preventExtensions，Object.seal 或 Object.freeze 方法都可以标记一个对象为不可扩展（non-extensible）。

另外，如果目标对象的某个属性不可写（writable）或不可配置（configurable），则defineProperty方法不得改变这两个设置。

##### 8.getOwnPropertyDescriptor()

getOwnPropertyDescriptor方法拦截Object.getOwnPropertyDescriptor()，返回一个属性描述对象或者undefined。
有两个参数

target：目标对象。
prop：应检索其描述的属性名称。

```js
var handler = {
  getOwnPropertyDescriptor (target, key) {
    if (key[0] === '_') {
      return;
    }
    return Object.getOwnPropertyDescriptor(target, key);
  }
};
var target = { _foo: 'bar', baz: 'tar' };
var proxy = new Proxy(target, handler);
Object.getOwnPropertyDescriptor(proxy, 'wat')
// undefined
Object.getOwnPropertyDescriptor(proxy, '_foo')
// undefined
Object.getOwnPropertyDescriptor(proxy, 'baz')
// { value: 'tar', writable: true, enumerable: true, configurable: true }
```

上面代码中，handler.getOwnPropertyDescriptor方法对于第一个字符为下划线的属性名会返回undefined。

Object.getOwnPropertyDescriptor() 方法返回指定对象上一个自有属性对应的描述对象
obj：需要查找的目标对象
prop：目标对象内属性名称
若指定的属性不存在于对象，则返回 undefined。

##### 9.getPrototypeOf()

当 getPrototypeOf 方法被调用时，this 指向的是它所属的处理器对象。
只有一个参数

target ：被代理的目标对象
getPrototypeOf方法主要用来拦截获取对象原型。具体来说，拦截下面这些操作。

```js
Object.prototype.__proto__
Object.prototype.isPrototypeOf()
Object.getPrototypeOf()
Reflect.getPrototypeOf()
instanceof
var proto = {};
var p = new Proxy({}, {
  getPrototypeOf(target) {
    return proto;
  }
});
Object.getPrototypeOf(p) === proto // true
```

上面代码中，getPrototypeOf 方法拦截 Object.getPrototypeOf()，返回proto对象。

注意：

getPrototypeOf 方法的返回值必须是一个对象或者 null。
另外，如果目标对象不可扩展（non-extensible）， getPrototypeOf方法必须返回目标对象的原型对象。

##### 10.isExtensible()

isExtensible方法拦截Object.isExtensible操作。 只有一个参数

target：目标对象
注意：该方法只能返回布尔值，否则返回值会被自动转为布尔值。

这个方法有一个强限制，它的返回值必须与目标对象的isExtensible属性保持一致，否则就会抛出错误。

```js
Object.isExtensible(proxy) === Object.isExtensible(target)

var p = new Proxy({}, {
  isExtensible: function(target) {
    return false;
  }
});

Object.isExtensible(p)
// Uncaught TypeError: 'isExtensible' on proxy: trap result does not reflect extensibility of proxy target (which is 'true')
```

> Object.isExtensible() 方法判断一个对象是否是可扩展的（是否可以在它上面添加新的属性）。返回布尔值
> 参数
> obj：需要检测的对象

##### 11.ownKeys()

ownKeys方法用来拦截对象自身属性的读取操作。具体来说，拦截以下操作。

```
Object.getOwnPropertyNames()
Object.getOwnPropertySymbols()
Object.keys()
for...in循环
```

参数：target：目标对象

##### 12.preventExtensions()

preventExtensions方法拦截Object.preventExtensions()。该方法必须返回一个布尔值，否则会被自动转为布尔值。
这个方法有一个限制，只有目标对象不可扩展时（即Object.isExtensible(proxy)为false），proxy.preventExtensions才能返回true，否则会报错。

```js
var proxy = new Proxy({}, {
  preventExtensions: function(target) {
    return true;
  }
});

Object.preventExtensions(proxy)
// Uncaught TypeError: 'preventExtensions' on proxy: trap returned truish but the proxy target is extensible
```

为了防止出现这个问题，通常要在proxy.preventExtensions方法里面，调用一次Object.preventExtensions。

```js
var proxy = new Proxy({}, {
  preventExtensions: function(target) {
    console.log('called');
    Object.preventExtensions(target);
    return true;
  }
});

Object.preventExtensions(proxy)
// "called"
// Proxy {}
```

>  Object.preventExtensions( obj ) 方法让一个对象变的不可扩展，也就是永远不能再添加新的属性。

##### 13.setPrototypeOf()

setPrototypeOf方法主要用来拦截Object.setPrototypeOf方法。

```js
var handler = {
  setPrototypeOf (target, proto) {
    throw new Error('Changing the prototype is forbidden');
  }
};
var proto = {};
var target = function () {};
var proxy = new Proxy(target, handler);
Object.setPrototypeOf(proxy, proto);
// Error: Changing the prototype is forbidden
```

注意：

该方法只能返回布尔值，否则会被自动转为布尔值。
另外，如果目标对象不可扩展（non-extensible），setPrototypeOf方法不得改变目标对象的原型。
Object.setPrototypeOf( obj，prototype ) 方法设置一个指定的对象的原型 ( 即, 内部[[Prototype]]属性）到另一个对象或 null。两个参数
obj：要设置其原型的对象。.
prototype：该对象的新原型(一个对象 或 null).
Object.setPrototypeOf()是ECMAScript 6最新草案中的方法，相对于 Object.prototype.__proto__ ，它被认为是修改对象原型更合适的方法

### Reflect

[reflect的使用](https://blog.csdn.net/qq_45677671/article/details/122714476)

Reflect也是ES6新增的一个API，它是一个对象，字面的意思是反射。 n那么这个Reflect有什么用呢？ 它主要提供了很多操作JavaScript对象的方法，有点像Object中操作对象的方法； 
比如Reflect.getPrototypeOf(target)类似于 Object.getPrototypeOf()；  
比如Reflect.defineProperty(target, propertyKey, attributes)类似于Object.defineProperty() ；

设计目的
1.将Object对象的一些明显属于语言内部的方法（比如Object.defineProperty），放到Reflect对象上。
现阶段，某些方法同时在Object和Reflect对象上部署，未来的新方法将只部署在Reflect对象上。
也就是说，从Reflect对象上可以拿到语言内部的方法。
2.修改某些Object方法的返回结果，让其变得更合理。

```js
// 老写法
try {
  // 定义一个数据，在无法定义属性时，会抛出一个错误
  Object.defineProperty(target, property, attributes);
  // success
} catch (e) {
  // failure
}

// 新写法
if (Reflect.defineProperty(target, property, attributes)) {	// 而Reflect则会返回false
  // success
} else {
  // failure
}

```

3.让Object操作都变成函数行为。

```js
// 老写法
// 判断assign属性是否在Object 对象中
'assign' in Object // true

// 新写法
Reflect.has(Object, 'assign') // true

```

4.Reflect对象的方法与Proxy对象的方法一一对应，只要是Proxy对象的方法，就能在Reflect对象上找到对应的方法。
这就让Proxy对象可以方便地调用对应的Reflect方法，完成默认行为，作为修改行为的基础。
也就是说，不管Proxy怎么修改默认行为，你总可以在Reflect上获取默认行为。

```js
// Proxy方法拦截target对象的属性赋值行为。
Proxy(target, {
  set: function(target, name, value, receiver) {
    // 它采用Reflect.set方法将值赋值给对象的属性，确保完成原有的行为，然后再部署额外的功能。
    var success = Reflect.set(target, name, value, receiver);
    if (success) {
      console.log('property ' + name + ' on ' + target + ' set to ' + value);
    }
    return success;
  }
});

```

```js
// 每一个Proxy对象的拦截操作（get、delete、has）
// 内部都调用对应的Reflect方法，保证原生行为能够正常执行。
// 添加的工作，就是将每一个操作输出一行日志。
var loggedObj = new Proxy(obj, {
  get(target, name) {
    console.log('get', target, name);
    return Reflect.get(target, name);
  },
  deleteProperty(target, name) {
    console.log('delete' + name);
    return Reflect.deleteProperty(target, name);
  },
  has(target, name) {
    console.log('has' + name);
    return Reflect.has(target, name);
  }
});

```

