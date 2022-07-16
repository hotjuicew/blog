---
title: "Vue基础笔记"
date: 2022-07-13T17:54:41+08:00
categories: [Vue]
tags: []
---
# vue学习笔记

### 1 声明式编程和命令式编程的区别
* 声明式编程

  * 声明式编程关注的是 “what to do”，由框架(机器)完成 “how”的过程

  * 我们会在createApp传入的对象中声明需要的内容，模板template、数据data、方法methods;这样的编写代码的过程，我们称之为是**声明式编程**

  * 目前Vue、React、Angular、小程序的编程模式，我们称之为**声明式编程**

    ```
    用vue实现计数器就是声明式编程
    ```
    

* 命令式编程

  * 命令式编程关注的是 “how to do”自己完成整个how的过程

  * 我们每完成一个操作，都需要通过JavaScript编写一条代码，来给浏览器一个指令; 这样的编写代码的过程，我们称之为**命令式编程**

  * 在早期的原生JavaScript和jQuery开发的过程中，我们都是通过这种命令式的方式在编写代码的

    ```
    原生实现计数器就是命令式编程
    ```
### 2 什么是Options API
* options api的data详解

  * data必须是一个函数, 函数会返回一个对象( 在Vue3.x的时候)
  * data返回的对象, 会被Vue进行劫持(放到响应式系统中), 所以data的数据发生改变时, 界面会重新渲染

* options api的methods详解

  * methods属性是一个对象 -> 定义很多方法--->这些方法可以绑定到模板上

  * 在该方法中，我们可以使用**this关键字**来直接访问到**data中返回的对象的属性**

  * 里面函数不能是箭头函数:

    * 如果是箭头函数,因为箭头函数不绑定this,所以它会在上层作用域中查找this, 查找到this-->window

## 基础语法
### 1 v-pre
跳过此元素及其所有子元素的编译
### 2 v-memo
需要指定记忆数组eg.`v-memo="[name, age]`
如果数组中的每个值都与上次渲染相同，则将跳过整个子树的更新(其他值都不更新了)。
正确指定记忆数组很重要，否则我们可能会跳过确实应该应用的更新。v-memo具有空依赖数组 (` v-memo="[]"`) 在功能上等同于v-once.
例如：
```html
<div v-memo="[valueA, valueB]">
  ...
</div>
```
When the component re-renders, if both valueA and valueB remain the same, all updates for this `<div>` and its children will be skipped. In fact, even the Virtual DOM VNode creation will also be skipped since the memoized copy of the sub-tree can be reused.
### 3 v-bind
将一个或多个属性或组件属性动态绑定到表达式。
eg 官网示例
```html
<!-- bind an attribute -->
<img v-bind:src="imageSrc" />

<!-- dynamic attribute name -->
<button v-bind:[key]="value"></button>

<!-- shorthand -->
<img :src="imageSrc" />

<!-- shorthand dynamic attribute name -->
<button :[key]="value"></button>

<!-- with inline string concatenation -->
<img :src="'/path/to/images/' + fileName" />

<!-- class binding -->
<div :class="{ red: isRed }"></div>
<div :class="[classA, classB]"></div>
<div :class="[classA, { classB: isB, classC: isC }]"></div>

<!-- style binding -->
<div :style="{ fontSize: size + 'px' }"></div>
<div :style="[styleObjectA, styleObjectB]"></div>

<!-- binding an object of attributes -->
<div v-bind="{ id: someProp, 'other-attr': otherProp }"></div>

<!-- prop binding. "prop" must be declared in the child component. -->
<MyComponent :prop="someThing" />

<!-- pass down parent props in common with a child component -->
<MyComponent v-bind="$props" />

<!-- XLink -->
<svg><a :xlink:special="foo"></a></svg>
```
#### 3.1 v-bind绑定基本属性
```html
    <!-- 1.绑定img的src属性 -->
    <img v-bind:src="showImgUrl" alt="">
    <!-- 语法糖: v-bind -> : -->
    <img :src="showImgUrl" alt="">

    <!-- 2.绑定a的href属性 -->
    <a :href="href">百度一下</a>
```
#### 3.2 v-bind绑定class属性
```html
<body>

  <div id="app">
    <!-- 1.基本绑定class -->
    <h2 :class="classes">Hello World</h2>

    <!-- 2.动态class可以写对象语法 -->
    <button :class=" isActive ? 'active': '' " @click="btnClick">我是按钮</button>

    <!-- 2.1.对象语法的基本使用(掌握) -->
    <button :class="{ active: isActive }" @click="btnClick">我是按钮</button>

    <!-- 2.2.对象语法的多个键值对 -->
    <button :class="{ active: isActive, why: true, kobe: false }" @click="btnClick">我是按钮</button>
    
    <!-- 2.3.动态绑定的class是可以和普通的class同时的使用 -->
    <button class="a b" :class="{ active: isActive, why: true, kobe: false }" @click="btnClick">我是按钮</button>
    
    <!-- 2.4.动态绑定的class是可以和普通的class同时的使用 -->
    <button class="a b" :class="getDynamicClasses()" @click="btnClick">我是按钮</button>

    <!-- 3.动态class可以写数组语法(了解) -->
    <h2 :class="['a', 'b']">Hello Array</h2>
    <h2 :class="['a', className]">Hello Array</h2>
    <h2 :class="['a', className, isActive? 'active': '']">Hello Array</h2>
    <h2 :class="['a', className, { active: isActive }]">Hello Array</h2>
  </div>
  
  <script src="./lib/vue.js"></script>
  <script>
    // 1.创建app
    const app = Vue.createApp({
      // data: option api
      data: function() {
        return {
          classes: "a b c",
          isActive: false,
          className: "why"
        }
      },

      methods: {
        btnClick: function() {
          this.isActive = !this.isActive
        },

        getDynamicClasses: function() {
          return { active: this.isActive, why: true, kobe: false }
        }
      }
    })

    // 2.挂载app
    app.mount("#app")
  </script>
</body>
```
我们分开来看
3.2.1 [对象语法](https://v3.cn.vuejs.org/guide/class-and-style.html#%E5%AF%B9%E8%B1%A1%E8%AF%AD%E6%B3%95) 把一个对象传给 :class，以动态地切换 class
3.2.2 [数组语法](https://v3.cn.vuejs.org/guide/class-and-style.html#%E6%95%B0%E7%BB%84%E8%AF%AD%E6%B3%95) 把一个数组传给 :class，以应用一个 class 列表

#### 3.3 v-bind绑定内联样式
```html
<body>

  <div id="app">
    <!-- 1.普通的html写法 -->
    <h2 style="color: red; font-size: 30px;">哈哈哈哈</h2>

    <!-- 2.style中的某些值, 来自data中 -->
    <!-- 2.1.动态绑定style, 在后面跟上 对象类型 (重要)-->
    <h2 v-bind:style="{ color: fontColor, fontSize: fontSize + 'px' }">哈哈哈哈</h2>
    <!-- 2.2.动态的绑定属性, 这个属性是一个对象 -->
    <h2 :style="objStyle">呵呵呵呵</h2>

    <!-- 3.style的数组语法 -->
    <h2 :style="[objStyle, { backgroundColor: 'purple' }]">嘿嘿嘿嘿</h2>
  </div>
  
  <script src="./lib/vue.js"></script>
  <script>
    // 1.创建app
    const app = Vue.createApp({
      // data: option api
      data: function() {
        return {
          fontColor: "blue",
          fontSize: 30,
          objStyle: {
            fontSize: '50px',
            color: "green"
          }
        }
      },
    })

    // 2.挂载app
    app.mount("#app")

  </script>
</body>
```
3.3.1 [对象语法](https://v3.cn.vuejs.org/guide/class-and-style.html#%E5%AF%B9%E8%B1%A1%E8%AF%AD%E6%B3%95-2) :style 的对象语法十分直观——看着非常像 CSS，但其实是一个 JavaScript 对象。CSS property 名可以用驼峰式 (camelCase) 或短横线分隔 (kebab-case，记得用引号括起来) 来命名
3.3.2 [数组语法](https://v3.cn.vuejs.org/guide/class-and-style.html#%E6%95%B0%E7%BB%84%E8%AF%AD%E6%B3%95-2) :style 的数组语法可以将多个样式对象应用到同一个元素上
3.3.3 [多重值](https://v3.cn.vuejs.org/guide/class-and-style.html#%E5%A4%9A%E9%87%8D%E5%80%BC)可以为 style 绑定中的 property 提供一个包含多个值的数组，常用于提供多个带前缀的值

#### 3.4 v-bind绑定属性名 & v-bind直接绑定对象
```html
<body>

<div id="app">
    <!-- v-bind绑定属性名:将属性名设为aaaa   -->
    <h2 :[name]="'aaaa'">Hello World</h2>
    <!-- v-bind直接绑定对象:将属性名和name的值绑定，此处为class-->
    <h2 :[name]="name"> Hello World</h2>
</div>

<script src="./lib/vue.js"></script>
<script>
    // 1.创建app
    const app = Vue.createApp({
        // data: option api
        data: function () {
            return {
                name: "class"
            }
        },
    })

    // 2.挂载app
    app.mount("#app")
</script>
</body>
```
### 4 事件绑定v-on
v-on绑定事件监听器。
#### 4.1 事件-绑定事件基本使用
```html
<div id="app">
    <!-- 1.基本的写法 -->
    <div class="box" v-on:click="divClick"></div>

    <!-- 2.语法糖写法(重点掌握) -->
    <div class="box" @click="divClick"></div>

    <!-- 4.绑定其他方法(掌握) -->
    <div class="box" @mousemove="divMousemove"></div>

    <!-- 5.元素绑定多个事件(掌握) -->
    <div class="box" @click="divClick" @mousemove="divMousemove"></div>
    <!-- <div class="box" v-on="{ click: divClick, mousemove: divMousemove }"></div> -->
    <!-- <div class="box" @="{ click: divClick, mousemove: divMousemove }"></div> -->
  </div>
```
#### 4.2 绑定事件参数传递
Vue事件绑定如何传递参数？如何传递event参数？

* 情况一：如果该方法不需要额外参数，那么方法后的()可以不添加。 

  * 如果方法本身中有一个参数，那么会默认将原生事件event参数传递进去 

*  情况二：如果需要同时传入某个参数，同时需要event时，可以通过**$event**传入事件。

  

```HTML 
     <!-- 1.默认传递event对象 -->
      <button @click="btnClick">按钮1</button>
      <!-- 2.只传递自己的参数 -->
      <button @click="btnClick2('hello',1111)">按钮2</button>
      <!-- data里的变量 -->
      <button @click="btnClick3(info,name)">按钮2</button>
      <!-- 3.传递自己的参数和event对象 -->
      <!-- 在模板中想要明确的获取event对象: $event -->
      <button @click="btnClick4('哈哈哈哈',$event)">按钮3</button>
```
#### 4.3绑定事件的修饰符
* stop - 调用 event.stopPropagation()。
* prevent - 调用 event.preventDefault()。
* capture - 添加事件侦听器时使用 capture 模式。
* self - 只当事件是从侦听器绑定的元素本身触发时才触发回调。
* {keyAlias} - 仅当事件是从特定键触发时才触发回调。
* once - 只触发一次回调。
* left - 只当点击鼠标左键时触发。
* right - 只当点击鼠标右键时触发。
* middle - 只当点击鼠标中键时触发。
* passive - { passive: true } 模式添加侦听器
```html
  <div id="app">
    <div class="box" @click="divClick">
      <button @click.stop="btnClick">按钮</button>
    </div>
  </div>
```

### 5 v-if 条件渲染
```html
<!-- v-if="条件" -->
    <div class="info" v-if="Object.keys(info).length">
      <!--补充：Object.keys() 方法会返回一个由一个给定对象的自身可枚举属性组成的数组-->
      <h2>个人信息</h2>
      <ul>
        <li>姓名: {{info.name}}</li>
        <li>年龄: {{info.age}}</li>
      </ul>
    </div>

    <!-- v-else -->
    <div v-else>
      <h2>没有输入个人信息</h2>
      <p>请输入个人信息后, 再进行展示~</p>
    </div>
```
```html
<div id="app">
    <h1 v-if="score > 90">优秀</h1>
    <h2 v-else-if="score > 80">良好</h2>
    <h3 v-else-if="score >= 60">及格</h3>
    <h4 v-else>不及格</h4>
  </div>
  ```
案例：显示二维码
```html
<body>

  <div id="app">
    <div>
      <button @click="toggle">切换</button>
    </div>
    
    <template v-if="isShowCode">
      <img src="https://game.gtimg.cn/images/yxzj/web201706/images/comm/floatwindow/wzry_qrcode.jpg" alt="">
    </template>
  </div>
  
  <script src="../lib/vue.js"></script>
  <script>
    // 1.创建app
    const app = Vue.createApp({
      // data: option api
      data() {
        return {
          isShowCode: true
        }
      },

      methods: {
        toggle() {
          this.isShowCode = !this.isShowCode
        }
      }
    })
    // 2.挂载app
    app.mount("#app")
  </script>
</body>
```
### 6 template元素
template元素可以当作不可见的包裹元素，并且在v-if上使用，最终不会被渲染出来
```html
<!-- v-if="条件" -->
    <template v-if="Object.keys(info).length">
      <h2>个人信息</h2>
      <ul>
        <li>姓名: {{info.name}}</li>
        <li>年龄: {{info.age}}</li>
      </ul>
    </template>

    <!-- v-else -->
    <template v-else>
      <h2>没有输入个人信息</h2>
      <p>请输入个人信息后, 再进行展示~</p>
    </template>
```
### 7 v-show
```html

  <div id="app">
    <div>
      <button @click="toggle">切换</button>
    </div>
    
    <div v-show="isShowCode">
      <img src="https://game.gtimg.cn/images/yxzj/web201706/images/comm/floatwindow/wzry_qrcode.jpg" alt="">
    </div>

    <div v-if="isShowCode">
      <img src="https://game.gtimg.cn/images/yxzj/web201706/images/comm/floatwindow/wzry_qrcode.jpg" alt="">
    </div>
  </div>
```
v-if和v-show有什么区别？

  * 在用法上的区别： 
    * v-show是不支持template； 
    * v-show不可以和v-else一起使用；
  * 本质的区别
    * v-show元素无论是否需要显示到浏览器上，它的DOM实际都是有存在的，只是通过CSS的display属性来进行切换； 
    * v-if当条件为false时，其对应的原生压根不会被渲染到DOM中
### 8 v-for 列表渲染

#### 8.1[遍历数组](https://v3.cn.vuejs.org/guide/list.html#%E7%94%A8-v-for-%E6%8A%8A%E4%B8%80%E4%B8%AA%E6%95%B0%E7%BB%84%E6%98%A0%E5%B0%84%E4%B8%BA%E4%B8%80%E7%BB%84%E5%85%83%E7%B4%A0)
```html
<body>

  <div id="app">
    <!-- 1.电影列表进行渲染 -->
    <h2>电影列表</h2>
    <ul>
      <li v-for="movie in movies">{{ movie }}</li>
    </ul>

    <!-- 2.电影列表同时有索引 -->
    <ul>
      <li v-for="(movie, index) in movies">{{index + 1}} - {{ movie }}</li>
    </ul>

    <!-- 3.遍历数组复杂数据 -->
    <h2>商品列表</h2>
    <div class="item" v-for="item in products">
      <h3 class="title">商品: {{item.name}}</h3>
      <span>价格: {{item.price}}</span>
      <p>秒杀: {{item.desc}}</p>
    </div>
  </div>
  
  <script src="../lib/vue.js"></script>
  <script>
    // 1.创建app
    const app = Vue.createApp({
      // data: option api
      data() {
        return {
          // 1.movies
          movies: ["星际穿越", "少年派", "大话西游", "哆啦A梦"],

          // 2.数组: 存放的是对象
          products: [
            { id: 110, name: "Macbook", price: 9.9, desc: "9.9秒杀, 快来抢购!" },
            { id: 111, name: "iPhone", price: 8.8, desc: "9.9秒杀, 快来抢购!" },
            { id: 112, name: "小米电脑", price: 9.9, desc: "9.9秒杀, 快来抢购!" },
          ]
        }
      },
    })

    // 2.挂载app
    app.mount("#app")
  </script>
</body>
```
#### 8.2 [遍历对象](https://v3.cn.vuejs.org/guide/list.html#%E5%9C%A8-v-for-%E9%87%8C%E4%BD%BF%E7%94%A8%E5%AF%B9%E8%B1%A1)
```html
<body>

  <div id="app">
    <!-- 1.遍历数组 -->

    <!-- 2.遍历对象 -->
    <ul>
      <li v-for="(value, key, index) in info">{{value}}-{{key}}-{{index}}</li>
    </ul>

    <!-- 3.遍历字符串(iterable) -->
    <ul>
      <li v-for="item in message">{{item}}</li>
    </ul>

    <!-- 4.遍历数字 -->
    <ul>
      <li v-for="item in 100">{{item}}</li>
    </ul>
  </div>
  
  <script src="../lib/vue.js"></script>
  <script>
    // 1.创建app
    const app = Vue.createApp({
      // data: option api
      data() {
        return {
          message: "Hello Vue",
          movies: [],
          info: { name: "why", age: 18, height: 1.88 }
        }
      },
    })

    // 2.挂载app
    app.mount("#app")
  </script>
</body>
```
补充1：
```html
<!-- 如果div没有实际的意义, 那么可以使用template替换 -->
    <div v-for="(value, key, index) in infos">
      <span>{{value}}</span>
      <strong>{{key}}</strong>
      <i>{{index}}</i>
    </div>
```
补充2：修改数组的练习
```html
<body>

  <div id="app">
    <ul>
      <li v-for="item in names">{{ item }}</li>
    </ul>
    <button @click="changeArray">修改数组</button>
  </div>
  
  <script src="../lib/vue.js"></script>
  <script>
    // 1.创建app
    const app = Vue.createApp({
      // data: option api
      data() {
        return {
          names: ["abc", "cba", "nba", "aaa", "ccc"]
        }
      },
      methods: {
        changeArray() {
          // 1.直接将数组修改为一个新的数组
          // this.names = ["why", "kobe"]

          // 2.通过一些数组的方法, 修改数组中的元素
          // this.names.push("why")
          // this.names.pop()
          // this.names.splice(2, 1, "why")
          // this.names.sort()
          // this.names.reverse()

          // 3.不修改原数组的方法是不能侦听(watch)
          const newNames = this.names.map(item => item + "why")
          this.names = newNames
        }
      }
    })

    // 2.挂载app
    app.mount("#app")
  </script>
</body>
```
#### 8.3 v-for中key属性
**只要写v-for,都要绑定key**
为了给 Vue 一个提示，以便它能跟踪每个节点的身份，从而重用和重新排序现有元素，你需要为每项提供一个唯一的 key attribute：
```html
<div v-for="item in items" :key="item.id">
  <!-- 内容 -->
</div>
```
建议尽可能在使用 v-for 时提供 key attribute，除非遍历输出的 DOM 内容非常简单，或者是刻意依赖默认行为以获取性能上的提升。

 **v-for中的key有什么作用？什么是虚拟DOM？**
* 有key的操作:

  * 根据key找到之前的VNode进行复用;
  * 没有VNode可以复用, 再创建新的VNode

* 没有key的操作:

  * diff算法, 后续VNode复用性就不强

* VNode

  ```
  1.VNode的全称是Virtual Node，也就是虚拟节点
  2.VNode的本质是一个JavaScript的对象
  3.template元素 ->解析成 VNode--->转换为真实DOM元素
  ```

* 虚拟DOM

  * template元素--->一个个VNode虚拟节点--->VNode Tree -->虚拟DOM--->真实DOM

  * 作用
    * 方便进行diff算法
    * 方便进行跨平台


### 9 computed 计算属性
对于任何包含响应式数据的复杂逻辑，你都应该使用计算属性。

```html
<body>

  <div id="app">
    <!-- 1.拼接名字 -->
    <h2>{{ fullname }}</h2>
    <h2>{{ fullname }}</h2>
    <h2>{{ fullname }}</h2>

    <!-- 2.显示分数等级 -->
    <h2>{{ scoreLevel }}</h2>

    <!-- 3.反转单词显示文本 -->
    <h2>{{ reverseMessage }}</h2>
  </div>
  
  <script src="../lib/vue.js"></script>
  <script>
    // 1.创建app
    const app = Vue.createApp({
      // data: option api
      data() {
        return {
          // 1.姓名
          firstName: "kobe",
          lastName: "bryant",

          // 2.分数: 及格/不及格
          score: 80,

          // 3.一串文本: 对文本中的单词进行反转显示
          message: "my name is why"
        }
      },
      computed: {
        // 1.计算属性默认对应的是一个函数
        fullname() {
          return this.firstName + " " + this.lastName
        },

        scoreLevel() {
          return this.score >= 60 ? "及格": "不及格"
        },

        reverseMessage() {
          return this.message.split(" ").reverse().join(" ")
        }
      }
    })

    // 2.挂载app
    app.mount("#app")
  </script>
</body>
```
**什么是计算属性？和method有什么区别？**

* 计算属性

  * 可以通过this访问数据
  * 对于任何包含响应式数据的赋值逻辑,你应该使用计算属性

* 和method的区别

  * computed底层会缓存, 性能更高
  * 计算属性会基于它们的依赖关系进行缓存;
  * 在数据不发生变化时，计算属性是不需要重新计算的
  * 但是如果依赖的数据发生变化，在使用时，计算属性依然会重新进行计算
### 10 watch
watch 需要侦听特定的数据源，并在单独的回调函数中执行副作用。默认情况下，它也是惰性的——即回调仅在侦听源发生变化时被调用。
```html
<body>

  <div id="app">
    <h2>{{message}}</h2>
    <button @click="changeMessage">修改message</button>
  </div>
  
  <script src="../lib/vue.js"></script>
  <script>
    // Proxy -> Reflect
    // 1.创建app
    const app = Vue.createApp({
      // data: option api
      data() {
        return {
          message: "Hello Vue",
          info: { name: "why", age: 18 }
        }
      },
      methods: {
        changeMessage() {
          this.message = "你好啊, 李银河!"
          this.info = { name: "kobe" }
        }
      },
      watch: {
        // 1.默认有两个参数: newValue/oldValue
        message(newValue, oldValue) {
          console.log("message数据发生了变化:", newValue, oldValue)
        },
        info(newValue, oldValue) {
          // 2.如果是对象类型, 那么拿到的是代理对象
          // console.log("info数据发生了变化:", newValue, oldValue)
          // console.log(newValue.name, oldValue.name)

          // 3.获取原生对象
          console.log(Vue.toRaw(newValue))
        }
      }
    })

    // 2.挂载app
    app.mount("#app")
  </script>
</body>
```
#### 10.1 watch的侦听选项
```js
watch: {
        // 默认watch监听不会进行深度监听（如果只改变其中某个属性值，不会被监听到）
        // info(newValue, oldValue) {
        //   console.log("侦听到info改变:", newValue, oldValue)
        // }

        // 进行深度监听
        info: {
          handler(newValue, oldValue) {
            console.log("侦听到info改变:", newValue, oldValue)
            console.log(newValue === oldValue)
          },
          // 监听器选项:
          // info进行深度监听
          deep: true,
          // 第一次渲染直接执行一次监听器
          immediate: true
        },
        "info.name": function(newValue, oldValue) {
          console.log("name发生改变:", newValue, oldValue)
        }
      }
```




1组件命名用-连接比较多
2实际开发中很少注册全局组件，99%都是局部组件