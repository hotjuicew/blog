---
title: "JS中的this指向——与调用有关"
date: 2022-07-20T17:04:47+08:00
categories: ["Javascript"]
tags: []
---
![img](https://www.freecodecamp.org/news/content/images/size/w1000/2021/06/12.png)
### this指向什么呢？
**首先要知道以下4点**
 1.函数在调用时，JavaScript会默认给this绑定一个值；
 2.this的绑定和定义的位置（编写的位置）没有关系；
 3.this的绑定和**调用方式以及调用的位置**有关系；
 4.this是在运行时被绑定的

this在全局作用于下指向window
但是，开发中很少直接在全局作用于下去使用this，通常都是在函数中使用,
**this关键字是指它所绑定的对象**
但是你怎么知道函数绑定到哪个对象呢？您如何找出this所指的内容？

为此，我们需要详细了解函数是如何绑定到对象的。

### 一、绑定规则
#### 1.默认绑定
如果包含this 引用的函数是独立函数，则该函数绑定到全局对象。（严格模式下this是undefined）
```js
// 1.案例一:
function foo() {
  console.log(this)
}
//window（严格模式下是undefined）
```
```js
// 2.案例二:
function foo1() {
  console.log(this)
}

function foo2() {
  console.log(this)
  foo1()
}

function foo3() {
  console.log(this)
  foo2()
}

foo3()
//window
```
```js
var obj = {
    name: "why",
    foo: function() {
      console.log(this)
    }
  }
  
  var bar = obj.foo
  bar() // window  因为这里bar已经是独立函数了

  console.log(obj.foo());//undefined   因为这里foo还是类内部的函数
```
另外，类内部的函数，this指向undefined

```js
var person = {
    fullName: function () {
      var calcFullName = function () {
        return this.firstName + ' ' + this.lastName
      }
      return calcFullName();
    }
  }
  person.firstName = 'Amitai';
  person.lastName = 'Barnea';
  console.log(person.fullName()); // Undefined!!!
```

同样地

```js
var person = {
  fullName: function (cb) {
    $.get('api/getStatus')
    .then(function(data) {
      this.status = data;
    })
  }
}
```

It will not work

#### 2.隐式绑定(谁调用，this就指向谁)

如果是通过对象调用，则this指向该对象。也就是 object.fn() 则this指向该object

简而言之，当你使用点表示法调用函数时，this会隐式绑定到调用函数的对象。
```js
function foo() {
  console.log(this)
}

独立函数调用
foo()  //window

// 1.案例一:
var obj = {
  name: "why",
  foo: foo
}

obj.foo() // obj对象

// 3.案例二:
var obj1 = {
  name: "obj1",
  foo: function() {
    console.log(this)
  }
}

var obj2 = {
  name: "obj2",
  bar: obj1.foo
}
obj2.bar()
//是obj2调用的，所以this指向obj2
```
#### 3.显示绑定

那么我们如何在函数上显式设置“this”呢？call、apply 和 bind 方法为我们做这件事。

call 方法接受“this”将引用的对象以及函数中定义的任何其他参数。apply 方法在定义函数时接受将引用的对象“this”和包含参数引用的数组。

```js
function foo() {
  console.log(this);
}
foo() //window
foo.call(window)//window
foo.call(123)//[Number: 123]
foo.call({name:'why'})//{ name: 'why' }```
```

**call和apply有什么区别?**
第一个参数是相同的，后面的参数，apply为数组，call为参数列表
```js
function sum(num1, num2, num3) {
  console.log(num1 + num2 + num3, this)
}

sum.call("call", 20, 30, 40)//90 [String: 'call']
sum.apply("apply", [20, 30, 40])//90 [String: 'apply']
```

bind 方法与 call 和 apply 的不同之处在于，bind 方法将一个对象附加到这个函数上，因此每次调用该函数时，它都会引用绑定的对象。
```js
var obj={
name:'why'
}
var bar=foo.bind(obj)
bar() //{ name: 'why' }
```
#### 4.构造函数调用绑定
我们通过一个new关键字调用一个函数时(构造器), 这个时候this是在调用这个构造器时创建出来的对象，this = 创建出来的对象，这个绑定过程就是new 绑定。

当使用new 前面的关键字调用函数时，也称为构造函数调用，会发生以下情况：
- 创建一个全新的对象；
- 这个新对象会被执行prototype连接；
- 这个**新对象会绑定到函数调用的this上**（this的绑定在这个步骤完成）；
- 如果函数没有返回其他对象，表达式会返回这个新对象；

```js
function giveAge(age) { 
  this.age = age; 
} 

const bar = new giveAge(22); 
console.log(bar.age); // 22
```

### 二、this规则之外
是总有一些语法，超出了我们的规则之外。
#### 1.如果在显示绑定中，我们传入一个null或者undefined，那么这个显示绑定会被忽略，使用默认规则
 apply/call/bind: 当传入null/undefined时, 自动将this绑定成全局对象
```js
function foo() {
  console.log(this);
}
var obj = {
  name: "why",
};
foo.call(obj);//{ name: 'why' }
foo.call(null);//window
foo.call(undefined);//window

var bar = foo.bind(null);
bar();//window
```
#### 2.创建一个函数的间接引用，这种情况使用默认绑定规则
```js
// 争论: 代码规范 
function foo() {
  console.log(this);
}
var obj1 = {
  name: "obj1",
  foo: foo,
};
var obj2 = {
  name: "obj2",
};
obj1.foo();//obj1对象
 
(obj2.foo = obj1.foo)(); //windows
```
### 三、箭头函数
箭头函数不使用this的四种标准规则（也就是不绑定this）。箭头函数并不绑定this对象，那么this引用就会从上层作用于中找到对应的this,所以**箭头函数根据外层作用域来决定this**

```js
var obj = {
  data: [],
  getData: function() {
    // 发送网络请求, 将结果放到上面data属性中
    // 在箭头函数之前的解决方案
    // var _this = this
    // setTimeout(function() {
    //   var result = ["abc", "cba", "nba"]
    //   _this.data = result
    // }, 2000);
    // 箭头函数之后
    setTimeout(() => {
      var result = ["abc", "cba", "nba"]
      this.data = result
    }, 2000);
  }
}

obj.getData()
```
为什么在setTimeout的回调函数中可以直接使用this呢？
因为箭头函数并不绑定this对象，那么this引用就会从上层作用域中找到对应的this

补充：在类里面的方法默认就是在严格模式下的