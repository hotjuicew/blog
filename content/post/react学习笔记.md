---
title: "React学习笔记"
date: 2022-08-31T21:48:01+08:00
categories: [react]
tags: []
---

## 0

关于严格模式的几个点：

1.Babel在将我们代码进行转换的时候，默认会将代码转换成严格模式
2.内部函数默认就是严格模式，所以不需要使用`use strict`指定运行模式

### 1.对this的回顾

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

这里存在一个问题：内部函数(calcFullName)的this指向undefined

#### 解决方案

这里有三个解决方案，使得内部函数根据外层作用域来决定其this，随着 JavaScript 越来越成熟，解决方案也得到了改进。

1.ES3：var that = this来解决this的指向问题

```js
var person = {
  fullName: function () {
    var that  = this;//把外部函数（fullname函数）的this储存到that中
    var calcFullName = function () {
      return that.firstName + ' ' + that.lastName
    }
    return calcFullName();
  }
}

person.firstName = 'Amitai';
person.lastName = 'Barnea';
console.log(person.fullName()); // 'Amitai Barnea'
```



2.ES5：ES5使用 bind 方法引入了一个更优雅的解决方案bind() 。Function.prototype.bind(obj)将一个对象作为参数，功能是将这个函数和对象相绑定。实际上是将这个函数的this替换成了obj

![bind](D:\workspace\hotjuice_website\static\images\blog\2022\bind.png)

还可以在第一个参数之后添加额外的参数，`bind`并将这些值传递给原始函数。你稍后传递给绑定函数的任何附加参数都将在绑定参数之后传入

```js
// Example showing binding some parameters
var sum = function(a, b) {
  return a + b;
};

var add5 = sum.bind(null, 5);
console.log(add5(10));//15
```

那么function=function.bind(this)就是直接把function的上下文（也就是this）显式绑定到function上

```js
var person = {
  fullName: function () {
    var calcFullName = function () {
      return this.firstName + ' ' + this.lastName
    }
    calcFullName = calcFullName.bind(this);
    return calcFullName();
  }
}

person.firstName = 'Amitai';
person.lastName = 'Barnea';
console.log(person.fullName()); // 'Amitai Barnea'
```

3.ES6：用箭头函数修复了这个语言缺陷，更优雅。直接就规定了：箭头函数根据外层作用域来决定其this

```js
var person = {
  fullName: function () {
    var calcFullName =  () => {
      return this.firstName + ' ' + this.lastName
    }
    return calcFullName();
  }
}

person.firstName = 'Amitai';
person.lastName = 'Barnea';
console.log(person.fullName()); // 'Amitai Barnea'
```

#### 上述问题在React中的影响

在React中，我们使用的组件是从React派生的类。很多时候，我们从组件的控制器中调用函数，这些函数需要从组件的props or state中获取数据，方法是使用 this. props 或 this. state。因为这是一个内部函数，所以**this**不可用，我们可以用两种方法来解决:

##### 1.在函数的构造函数中使用 bind

```react
import React, {Component} from 'react';


class MyComponent extends Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
  }
  onSubmit() {
    this.props.submit(this.state)
  }
  render() {
    return (
      <form onSubmit={this.onSubmit}>
        ...
      </form>
    );
  }
}
export default MyComponent;
```

##### 2.使用箭头函数 （*更好的选择）

```js
import React, {Component} from 'react';


class MyComponent extends Component {
  onSubmit = () => {
    this.props.submit(this.state)
  }
  render() {
    return (
      <form onSubmit={this.onSubmit}>
        ...
      </form>
    );
  }
}


export default MyComponent;
```

### 2.电影列表和计数器的案例

```react
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
  
  <div id="root"></div>

  <script src="../lib/react.js"></script>
    //react-dom.js的引用一定要放在react.js后面
  <script src="../lib/react-dom.js"></script>
  <script src="../lib/babel.js"></script>

  <script type="text/babel">
    // 1.创建root
    const root = ReactDOM.createRoot(document.querySelector("#root"))

    // 封装App组件
    class App extends React.Component {
      constructor() {
        super()

        this.state = {
          movies: ["星际穿越", "流浪地球", "独行月球", "大话西游", "火星救援"]
        }
      }


      render() {
        // 1.对movies进行for循环
        // const liEls = []
        // for (let i = 0; i < this.state.movies.length; i++) {
        //   const movie = this.state.movies[i]
        //   const liEl = <li>{movie}</li>
        //   liEls.push(liEl)
        // }

        // 2.movies数组 => liEls数组
        // const liEls = this.state.movies.map(movie => <li>{movie}</li>)

        return (
          <div>
            <h2>电影列表</h2>
            <ul>
              {this.state.movies.map(movie => <li>{movie}</li>)}//<li>{movie}</li>不能用中括号括起来，否则会出错
            </ul>
          </div>
        )
      }
    }


    // 2.渲染组件
    root.render(<App/>)
  </script>

</body>
</html>
```

```react
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>计数器</title>
</head>
<body>
  
  <div id="root"></div>

  <script src="../lib/react.js"></script>
  <script src="../lib/react-dom.js"></script>
  <script src="../lib/babel.js"></script>

  <script type="text/babel">
    const root = ReactDOM.createRoot(document.querySelector("#root"))

    class App extends React.Component {
      constructor() {
        super()
        this.state = {
          message: "Hello World",
          counter: 100
        }

        this.increment = this.increment.bind(this)
        this.decrement = this.decrement.bind(this)
      }

      render() {
        const { counter } = this.state

        return (
          <div>
            <h2>当前计数: {counter}</h2>
            <button onClick={this.increment}>+1</button>
            <button onClick={this.decrement}>-1</button>
          </div>
        )
      }

      // 组件的方法
          //或者写成箭头函数的形式
      increment() {
        this.setState({
          counter: this.state.counter + 1
        })
      }

      decrement() {
        this.setState({
          counter: this.state.counter - 1
        })
      }
    }

    root.render(<App/>)
  </script>

</body>
</html>
```

## 一、JSX基本语法

**JSX是什么？** JSX是一种JavaScript的语法扩展（eXtension），也在很多地方称之为JavaScript XML，因为看起就是一段XML语法； 它用于描述我们的UI界面，并且其完成可以和JavaScript融合在一起使用，把html写到js里面； 它不同于Vue中的模块语法，你不需要专门学习模块语法中的一些指令（比如v-for、v-if、v-else、v-bind）；

**为什么React选择了JSX？**React认为渲染逻辑本质上与其他UI逻辑存在内在耦合

### 1. JSX的书写规范

![image-20220903203244703](D:\workspace\hotjuice_website\static\images\blog\2022\jsxyufa.png)

### 2.JSX的使用

#### 2.1 jsx的注释

```
{ /* JSX的注释写法 */ }
```

#### 2.2 JSX嵌入内容
JSX嵌入变量作为子元素
- 情况一：当变量是Number、String、Array类型时，可以直接显示
- 情况二：当变量是null、undefined、Boolean类型时，内容为空.如果希望可以显示null、undefined、Boolean，那么需要转成字符串；转换的方式有很多，比如toString方法、和空字符串拼接，String(变量)等方式；
- 情况三：Object对象类型不能作为子元素（not valid as a React child）

JSX嵌入表达式
- 运算表达式
- 三元运算符
- 执行一个函数


```react
 render() {
        // 1.插入标识符
        const { message, names, counter } = this.state
        const { aaa, bbb, ccc } = this.state
        const { friend } = this.state

        // 2.对内容进行运算后显示(插入表示)
        const { firstName, lastName } = this.state
        const fullName = firstName + " " + lastName
        const { age } = this.state
        const ageText = age >= 18 ? "成年人": "未成年人"
        const liEls = this.state.movies.map(movie => <li>{movie}</li>)

        // 3.返回jsx的内容
        return (
          <div>
            {/* 1.Number/String/Array直接显示出来 */}
            <h2>{counter}</h2>
            <h2>{message}</h2>
            <h2>{names}</h2>

            {/* 2.undefined/null/Boolean */}
            <h2>{String(aaa)}</h2>
            <h2>{bbb + ""}</h2>
            <h2>{ccc.toString()}</h2>

            {/* 3.Object类型不能作为子元素进行显示*/}
            <h2>{friend.name}</h2>
            <h2>{Object.keys(friend)[0]}</h2>

            {/* 4.可以插入对应的表达式*/}
            <h2>{10 + 20}</h2>
            <h2>{firstName + " " + lastName}</h2>
            <h2>{fullName}</h2>

            {/* 5.可以插入三元运算符*/}
            <h2>{ageText}</h2>
            <h2>{age >= 18 ? "成年人": "未成年人"}</h2>

            {/* 6.可以调用方法获取结果*/}
            <ul>{liEls}</ul>
            <ul>{this.state.movies.map(movie => <li>{movie}</li>)}</ul>
            <ul>{this.getMovieEls()}</ul>
          </div>
        )
      }
```
#### 2.3 jsx绑定属性

- 比如元素都会有title属性
-  比如img元素会有src属性
- 比如a元素会有href属性
- 比如元素可能需要绑定class
-  比如原生使用内联样式style

```react
    class App extends React.Component {
      constructor() {
        super()
        this.state = {
          title: "哈哈哈",
          imgURL: "https://ts1.cn.mm.bing.net/th/id/R-C.95bc299c3f1f0e69b9eb1d0772b14a98?rik=W5QLhXiERW4nLQ&riu=http%3a%2f%2f20178405.s21i.faiusr.com%2f2%2fABUIABACGAAgoeLO-wUo4I3o2gEw8Qs4uAg.jpg&ehk=N7Bxe9nqM08w4evC2kK6yyC%2bxIWTjdd6HgXsQYPbMj0%3d&risl=&pid=ImgRaw&r=0",
          href: "https://www.baidu.com",

          isActive: true,
          objStyle: {color: "red", fontSize: "30px"}
        }
      }

      render() {
        const { title, imgURL, href, isActive, objStyle } = this.state

        // 需求: isActive: true -> active
        // 1.class绑定的写法一: 字符串的拼接
        const className = `abc cba ${isActive ? 'active': ''}`
        // 2.class绑定的写法二: 将所有的class放到数组中
        const classList = ["abc", "cba"]
        if (isActive) classList.push("active")
        // 3.class绑定的写法三: 第三方库classnames -> npm install classnames

        return (
          <div>
            { /* 1.基本属性绑定 */ }
            <h2 title={title}>我是h2元素</h2>
            {/*<img src={imgURL} alt=""/>*/}
            <a href={href}>百度一下</a>

            
            { /* 2.绑定class属性: 最好使用className */ }
            <h2 className={className}>哈哈哈哈</h2>
            <h2 className={classList.join(" ")}>哈哈哈哈</h2>

            
            { /* 3.绑定style属性: 绑定对象类型 */ }
            <h2 style={{color: "red", fontSize: "30px"}}>呵呵呵呵</h2>
            <h2 style={objStyle}>呵呵呵呵</h2>
          </div>
        )
      }
    }
```

#### 2.4React事件绑定

React中的事件监听，这里和原生js主要有两点不同

- React 事件的命名采用小驼峰式（camelCase），而不是纯小写；
- 我们需要通过{}传入一个事件处理函数，这个函数会在事件发生时被执行；

##### 2.4.1 this的绑定问题
如何解决this的问题呢？
- 方案一：bind给btnClick显示绑定this
- 方案二：使用 ES6 class fields 语法
- 方案三：事件监听时传入箭头函数（个人推荐）

```react
 <script type="text/babel">
    // const obj = {
    //   name: "obj",
    //   foo: function() {
    //     console.log("foo:", this)
    //   }
    // }

    // // obj.foo()

    // const config = {
    //   onClick: obj.foo.bind(obj)
    // }

    // const click = config.onClick
    // click()

    /*
      this的四种绑定规则:
        1.默认绑定 独立执行 foo()
        2.隐式绑定 被一个对象执行 obj.foo() -> obj
        3.显式绑定: call/apply/bind foo.call("aaa") -> String("aaa")
        4.new绑定: new Foo() -> 创建一个新对象, 并且赋值给this
    */

    // 1.定义App根组件
    class App extends React.Component {
      // class fields
      name = "App"

      constructor() {
        super()
        this.state = {
          message: "Hello World",
          counter: 100
        }

        this.btn1Click = this.btn1Click.bind(this)
      }

      btn1Click() {
        console.log("btn1Click", this);
        this.setState({ counter: this.state.counter + 1 })
      }

      btn2Click = () => {
        console.log("btn2Click", this)
        this.setState({ counter: 1000 })
      }

      btn3Click() {
        console.log("btn3Click", this);
        this.setState({ counter: 9999 })
      }

      render() {
        const { message } = this.state

        return (
          <div>
            {/* 1.this绑定方式一: bind绑定 */}
            <button onClick={this.btn1Click}>按钮1</button>

            
            {/* 2.this绑定方式二: ES6 class fields  将 btn2Click赋值为一个箭头函数*/}
            <button onClick={this.btn2Click}>按钮2</button>


            {/* 3.this绑定方式三: 直接传入一个箭头函数(重要) */}
            <button onClick={() => console.log("btn3Click")}>按钮3</button>

            <button onClick={() => this.btn3Click()}>按钮3</button>


            <h2>当前计数: {this.state.counter}</h2>
          </div>
        )
      }
    }

    // 2.创建root并且渲染App组件
    const root = ReactDOM.createRoot(document.querySelector("#root"))
    root.render(<App/>)
  </script>
```

##### 2.4.2 事件参数传递

在执行事件函数时，有可能我们需要获取一些参数信息：比如event对象、其他参数
情况一：获取event对象
很多时候我们需要拿到event对象来做一些事情（比如阻止默认行为）
那么默认情况下，event对象有被直接传入，函数就可以获取到event对象；
情况二：获取更多参数
有更多参数时，我们最好的方式就是传入一个箭头函数，主动执行的事件函数，并且传入相关的其他参数；

```react
class App extends React.Component {
      constructor() {
        super()
        this.state = {
          message: "Hello World"
        }
      }

      btnClick(event, name, age) {
        console.log("btnClick:", event, this)
        console.log("name, age:", name, age)
      }

      render() {
        const { message } = this.state

        return (
          <div>
            {/* 1.event参数的传递 */}
            <button onClick={this.btnClick.bind(this)}>按钮1</button>
            <button onClick={(event) => this.btnClick(event)}>按钮2</button>

            
            {/* 2.额外的参数传递 */}
            <button onClick={this.btnClick.bind(this, "kobe", 30)}>按钮3(不推荐)</button>//传递的顺序是 "kobe", 30，event

            <button onClick={(event) => this.btnClick(event, "why", 18)}>按钮4</button>
          </div>
        )
      }
    }

    // 2.创建root并且渲染App组件
    const root = ReactDOM.createRoot(document.querySelector("#root"))
    root.render(<App/>)
  </script>
```

##### 2.4.3 案例：点击选中

```react
<script type="text/babel">
    // 1.定义App根组件
    class App extends React.Component {
      constructor() {
        super()
        this.state = {
          movies: ["星际穿越", "盗梦空间", "大话西游", "流浪地球"],
          currentIndex: 0
        }
      }

      itemClick(index) {
        this.setState({ currentIndex: index })
      }

      render() {
        const { movies, currentIndex } = this.state

        return (
          <div>
            <ul>
              { 
                movies.map((item, index) => {
                  return (
                    <li
                      className={ currentIndex === index ? 'active': '' }
                      key={item}
                      onClick={() => this.itemClick(index)}
                    >
                      {item}
                    </li>
                  )
                }) 
              }
            </ul>
          </div>
        )
      }
    }

    // 2.创建root并且渲染App组件
    const root = ReactDOM.createRoot(document.querySelector("#root"))
    root.render(<App/>)
  </script>

```

```react
//重构之后
<script type="text/babel">
    // 1.定义App根组件
    class App extends React.Component {
      constructor() {
        super()
        this.state = {
          movies: ["星际穿越", "盗梦空间", "大话西游", "流浪地球"],
          currentIndex: 0
        }
      }

      itemClick(index) {
        this.setState({ currentIndex: index })
      }

      render() {
        const { movies, currentIndex } = this.state

        const itemHandle = (item, index) => {
          return (
            <li
              className={ currentIndex === index ? 'active': '' }
              key={item}
              onClick={() => this.itemClick(index)}
            >
              {item}
            </li>
          )
        }

        return (
          <div>
            <ul>{movies.map(itemHandle)}</ul>
          </div>
        )
      }
    }

    // 2.创建root并且渲染App组件
    const root = ReactDOM.createRoot(document.querySelector("#root"))
    root.render(<App/>)
  </script>
```

#### 2.5 React条件渲染

某些情况下，界面的内容会根据不同的情况显示不同的内容，或者决定是否渲染某部分内容：
- 在vue中，我们会通过指令来控制：比如v-if、v-show；
- 在React中，所有的条件判断都和普通的JavaScript代码一致；

常见的条件渲染的方式有哪些呢？
- 方式一：条件判断语句
	适合逻辑较多的情况
- 方式二：三元运算符
    适合逻辑比较简单
- 方式三：与运算符&&
    适合如果条件成立，渲染某一个组件；如果条件不成立，什么内容也不渲染；
- v-show的效果
	主要是控制display属性是否为none

```react
<script type="text/babel">
    // 1.定义App根组件
    class App extends React.Component {
      constructor() {
        super()
        this.state = {
          message: "Hello World",

          isReady: false,

          friend: undefined
        }
      }

      render() {
        const { isReady, friend } = this.state

        // 1.条件判断方式一: 使用if进行条件判断
        let showElement = null
        if (isReady) {
          showElement = <h2>准备开始比赛吧</h2>
        } else {
          showElement = <h1>请提前做好准备!</h1>
        }

        return (
          <div>
            {/* 1.方式一: 根据条件给变量赋值不同的内容 */}
            <div>{showElement}</div>

            {/* 2.方式二: 三元运算符 */}
            <div>{ isReady ? <button>开始战斗!</button>: <h3>赶紧准备</h3> }</div>

            {/* 3.方式三: &&逻辑与运算 */}
            {/* 场景: 当某一个值, 有可能为undefined时, 使用&&进行条件判断 */}
            <div>{ friend && <div>{friend.name + " " + friend.desc}</div> }</div>
          </div>
        )
      }
    }

    // 2.创建root并且渲染App组件
    const root = ReactDOM.createRoot(document.querySelector("#root"))
    root.render(<App/>)
  </script>
```

案例

```react
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title></title>
</head>
<body>
  
  <div id="root"></div>

  <script src="../lib/react.js"></script>
  <script src="../lib/react-dom.js"></script>
  <script src="../lib/babel.js"></script>

  <script type="text/babel">
    // 1.定义App根组件
    class App extends React.Component {
      constructor() {
        super()
        this.state = {
          message: "Hello World",
          isShow: true
        }
      }

      changeShow() {
        this.setState({ isShow: !this.state.isShow })
      }

      render() {
        const { message, isShow } = this.state

        // let showElement = null
        // if (isShow) {
        //   showElement = <h2>{message}</h2>
        // }

        return (
          <div>
            <button onClick={() => this.changeShow()}>切换</button>
            { isShow && <h2>{message}</h2> }

            {/* v-show的效果 */}
            <h2 style={{display: isShow ? 'block': 'none'}}>哈哈哈哈</h2>
          </div>
        )
      }
    }

    // 2.创建root并且渲染App组件
    new App()
    const root = ReactDOM.createRoot(document.querySelector("#root"))
    root.render(<App/>)
  </script>

</body>
</html>
```

#### 2.6 React列表渲染

真实开发中我们会从服务器请求到大量的数据，数据会以列表的形式存储：
-  比如歌曲、歌手、排行榜列表的数据；
- 比如商品、购物车、评论列表的数据；
- 比如好友消息、动态、联系人列表的数据；

在React中并没有像Vue模块语法中的v-for指令，而且需要我们通过JavaScript代码的方式组织数据，转成JSX：
- 很多从Vue转型到React的同学非常不习惯，认为Vue的方式更加的简洁明了；
- 但是React中的JSX正是因为和JavaScript无缝的衔接，让它可以更加的灵活；
- 另外我经常会提到React是真正可以提高我们编写代码能力的一种方式；

如何展示列表呢？
- 在React中，展示列表最多的方式就是使用数组的map高阶函数；

很多时候我们在展示一个数组中的数据之前，需要先对它进行一些处理：
- 比如过滤掉一些内容：filter函数
- 比如截取数组中的一部分内容：slice函数

```react
<script type="text/babel">
    // 1.定义App根组件
    class App extends React.Component {
      constructor() {
        super()
        this.state = {
          students: [
            { id: 111, name: "why", score: 199 },
            { id: 112, name: "kobe", score: 98 },
            { id: 113, name: "james", score: 199 },
            { id: 114, name: "curry", score: 188 },
          ]
        }
      }

      render() {
        const { students } = this.state

        // 分数大于100的学生进行展示
        const filterStudents = students.filter(item => {
          return item.score > 100
        })

        // 分数大于100, 只展示两个人的信息
        // slice(start, end): [start, end)
        const sliceStudents = filterStudents.slice(0, 2)

        return (
          <div>
            <h2>学生列表数据</h2>
            <div className="list">
              {
                students.filter(item => item.score > 100).slice(0, 2).map(item => {
                  return (
                    <div className="item" key={item.id}>
                      <h2>学号: {item.id}</h2>
                      <h3>姓名: {item.name}</h3>
                      <h1>分数: {item.score}</h1>
                    </div>
                  )
                })
              }
            </div>
          </div>
        )
      }
    }

    // 2.创建root并且渲染App组件
    const root = ReactDOM.createRoot(document.querySelector("#root"))
    root.render(<App/>)
  </script>
```

#### 2.7 JSX的本质和原理

实际上，jsx 仅仅只是 React.createElement(component, props, ...children) 函数的语法糖。所有的jsx最终都会被转换成React.createElement的函数调用。
createElement需要传递三个参数：
参数一：type

当前ReactElement的类型；
	如果是标签元素，那么就使用字符串表示 “div”；
    如果是组件元素，那么就直接使用组件的名称；
参数二：config

所有jsx中的属性都在config中以对象的属性和值的形式存储；比如传入className作为元素的class；

参数三：children

存放在标签中的内容，以children数组的方式进行存储；
当然，如果是多个元素呢？React内部有对它们进行处理



```react
//需要使用babel进行转换
<script type="text/babel">
    // 1.定义App根组件
    class App extends React.Component {
      constructor() {
        super()
        this.state = {
          message: "Hello World"
        }
      }

      render() {
        const { message } = this.state

        return (
          <div>
            <div className="header">Header</div>
            <div className="Content">
              <div>{message}</div>
              <ul>
                <li>列表数据1</li>
                <li>列表数据2</li>
                <li>列表数据3</li>
                <li>列表数据4</li>
                <li>列表数据5</li>
              </ul>
            </div>
            <div className="footer">Footer</div>
          </div>
        )
      }
    }

    // 2.创建root并且渲染App组件
    const root = ReactDOM.createRoot(document.querySelector("#root"))
    root.render(<App/>)
  </script>
```

```react
 //原生react
 <script>
    // 1.定义App根组件
    class App extends React.Component {
      constructor() {
        super()
        this.state = {
          message: "Hello World"
        }
      }

      render() {
        const { message } = this.state

        const element = React.createElement(
          "div",
          null,
  /*#__PURE__*/ React.createElement(
            "div",
            {
              className: "header"
            },
            "Header"
          ),
  /*#__PURE__*/ React.createElement(
            "div",
            {
              className: "Content"
            },
    /*#__PURE__*/ React.createElement("div", null, "Banner"),
    /*#__PURE__*/ React.createElement(
              "ul",
              null,
      /*#__PURE__*/ React.createElement(
                "li",
                null,
                "\u5217\u8868\u6570\u636E1"
              ),
      /*#__PURE__*/ React.createElement(
                "li",
                null,
                "\u5217\u8868\u6570\u636E2"
              ),
      /*#__PURE__*/ React.createElement(
                "li",
                null,
                "\u5217\u8868\u6570\u636E3"
              ),
      /*#__PURE__*/ React.createElement(
                "li",
                null,
                "\u5217\u8868\u6570\u636E4"
              ),
      /*#__PURE__*/ React.createElement("li", null, "\u5217\u8868\u6570\u636E5")
            )
          ),
  /*#__PURE__*/ React.createElement(
            "div",
            {
              className: "footer"
            },
            "Footer"
          )
        );
        
        console.log(element)

        return element
      }
    }

    // 2.创建root并且渲染App组件
    const root = ReactDOM.createRoot(document.querySelector("#root"))
    root.render(React.createElement(App, null))
  </script>
```

#### 购物车案例

├─购物车阶段案例
│      data.js
│      format.js
│      index.html

```js
// data.js
const books = [
  {
    id: 1,
    name: '《算法导论》',
    date: '2006-9',
    price: 85.00,
    count: 1
  },
  {
    id: 2,
    name: '《UNIX编程艺术》',
    date: '2006-2',
    price: 59.00,
    count: 1
  },
  {
    id: 3,
    name: '《编程珠玑》',
    date: '2008-10',
    price: 39.00,
    count: 1
  },
  {
    id: 4,
    name: '《代码大全》',
    date: '2006-3',
    price: 128.00,
    count: 1
  },
]
```

```js
//format.js
function formatPrice(price) {
  return "¥" + Number(price).toFixed(2)
}
```

```react
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>购物车案例</title>
  <style>
    table {
      border-collapse: collapse;
      text-align: center;
    }

    thead {
      background-color: #f2f2f2;
    }

    td, th {
      padding: 10px 16px;
      border: 1px solid #aaa;
    }
  </style>
</head>
<body>
  
  <div id="root"></div>

  <script src="../lib/react.js"></script>
  <script src="../lib/react-dom.js"></script>
  <script src="../lib/babel.js"></script>

  <script src="./data.js"></script>
  <script src="./format.js"></script>

  <script type="text/babel">
    // 1.定义App根组件
    class App extends React.Component {
      constructor() {
        super()
        this.state = {
          books: books
        }
      }

      getTotalPrice() {
        const totalPrice = this.state.books.reduce((preValue, item) => {
          return preValue + item.count * item.price
        }, 0)
        return totalPrice
      }

      changeCount(index, count) {
        const newBooks = [...this.state.books]
        newBooks[index].count += count
        this.setState({ books: newBooks })
      }

      removeItem(index) {
        const newBooks = [...this.state.books]
        newBooks.splice(index, 1)
        this.setState({ books: newBooks })
      }

      renderBookList() {
        const { books } = this.state

        return <div>
          <table>
            <thead>
              <tr>
                <th>序号</th>
                <th>书籍名称</th>
                <th>出版日期</th>
                <th>价格</th>
                <th>购买数量</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody>
              {
                books.map((item, index) => {
                  return (
                    <tr key={item.id}>
                      <td>{index + 1}</td>
                      <td>{item.name}</td>
                      <td>{item.date}</td>
                      <td>{formatPrice(item.price)}</td>
                      <td>
                        <button 
                          disabled={item.count <= 1}
                          onClick={() => this.changeCount(index, -1)}
                        >
                          -
                        </button>
                        {item.count}
                        <button onClick={() => this.changeCount(index, 1)}>+</button>
                      </td>
                      <td><button onClick={() => this.removeItem(index)}>删除</button></td>
                    </tr>
                  )
                })
              }
            </tbody>
          </table>
          <h2>总价格: {formatPrice(this.getTotalPrice())}</h2>
        </div>
      }

      renderBookEmpty() {
        return <div><h2>购物车为空, 请添加书籍~</h2></div>
      }

      render() {
        const { books } = this.state
        return books.length ? this.renderBookList(): this.renderBookEmpty()
      }
    }

    // 2.创建root并且渲染App组件
    const root = ReactDOM.createRoot(document.querySelector("#root"))
    root.render(<App/>)
  </script>

</body>
</html>
```

