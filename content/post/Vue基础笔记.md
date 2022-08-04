---
title: "Vue基础笔记"
date: 2022-07-13T17:54:41+08:00
categories: [Vue]
tags: []
---

# vue 学习笔记

### 1 声明式编程和命令式编程的区别

- 声明式编程

  - 声明式编程关注的是 “what to do”，由框架(机器)完成 “how”的过程

  - 我们会在 createApp 传入的对象中声明需要的内容，模板 template、数据 data、方法 methods;这样的编写代码的过程，我们称之为是**声明式编程**

  - 目前 Vue、React、Angular、小程序的编程模式，我们称之为**声明式编程**

    ```
    用vue实现计数器就是声明式编程
    ```

- 命令式编程

  - 命令式编程关注的是 “how to do”自己完成整个 how 的过程

  - 我们每完成一个操作，都需要通过 JavaScript 编写一条代码，来给浏览器一个指令; 这样的编写代码的过程，我们称之为**命令式编程**

  - 在早期的原生 JavaScript 和 jQuery 开发的过程中，我们都是通过这种命令式的方式在编写代码的

    ```
    原生实现计数器就是命令式编程
    ```

### 2 什么是 Options API

- options api 的 data 详解

  - data 必须是一个函数, 函数会返回一个对象( 在 Vue3.x 的时候)
  - data 返回的对象, 会被 Vue 进行劫持(放到响应式系统中), 所以 data 的数据发生改变时, 界面会重新渲染

- options api 的 methods 详解

  - methods 属性是一个对象 -> 定义很多方法--->这些方法可以绑定到模板上

  - 在该方法中，我们可以使用**this 关键字**来直接访问到**data 中返回的对象的属性**

  - 里面函数不能是箭头函数:

    - 如果是箭头函数,因为箭头函数不绑定 this,所以它会在上层作用域中查找 this, 查找到 this-->window

## 基础语法

### 1 v-pre

跳过此元素及其所有子元素的编译

### 2 v-memo

需要指定记忆数组 eg.`v-memo="[name, age]`
如果数组中的每个值都与上次渲染相同，则将跳过整个子树的更新(其他值都不更新了)。
正确指定记忆数组很重要，否则我们可能会跳过确实应该应用的更新。v-memo 具有空依赖数组 (` v-memo="[]"`) 在功能上等同于 v-once.
例如：

```html
<div v-memo="[valueA, valueB]">...</div>
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

#### 3.1 v-bind 绑定基本属性

```html
<!-- 1.绑定img的src属性 -->
<img v-bind:src="showImgUrl" alt="" />
<!-- 语法糖: v-bind -> : -->
<img :src="showImgUrl" alt="" />

<!-- 2.绑定a的href属性 -->
<a :href="href">百度一下</a>
```

#### 3.2 v-bind 绑定 class 属性

```html
<body>
  <div id="app">
    <!-- 1.基本绑定class -->
    <h2 :class="classes">Hello World</h2>

    <!-- 2.动态class可以写对象语法 -->
    <button :class=" isActive ? 'active': '' " @click="btnClick">
      我是按钮
    </button>

    <!-- 2.1.对象语法的基本使用(掌握) -->
    <button :class="{ active: isActive }" @click="btnClick">我是按钮</button>

    <!-- 2.2.对象语法的多个键值对 -->
    <button
      :class="{ active: isActive, why: true, kobe: false }"
      @click="btnClick"
    >
      我是按钮
    </button>

    <!-- 2.3.动态绑定的class是可以和普通的class同时的使用 -->
    <button
      class="a b"
      :class="{ active: isActive, why: true, kobe: false }"
      @click="btnClick"
    >
      我是按钮
    </button>

    <!-- 2.4.动态绑定的class是可以和普通的class同时的使用 -->
    <button class="a b" :class="getDynamicClasses()" @click="btnClick">
      我是按钮
    </button>

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
      data: function () {
        return {
          classes: "a b c",
          isActive: false,
          className: "why",
        };
      },

      methods: {
        btnClick: function () {
          this.isActive = !this.isActive;
        },

        getDynamicClasses: function () {
          return { active: this.isActive, why: true, kobe: false };
        },
      },
    });

    // 2.挂载app
    app.mount("#app");
  </script>
</body>
```

我们分开来看
3.2.1 [对象语法](https://v3.cn.vuejs.org/guide/class-and-style.html#%E5%AF%B9%E8%B1%A1%E8%AF%AD%E6%B3%95) 把一个对象传给 :class，以动态地切换 class
3.2.2 [数组语法](https://v3.cn.vuejs.org/guide/class-and-style.html#%E6%95%B0%E7%BB%84%E8%AF%AD%E6%B3%95) 把一个数组传给 :class，以应用一个 class 列表

#### 3.3 v-bind 绑定内联样式

```html
<body>
  <div id="app">
    <!-- 1.普通的html写法 -->
    <h2 style="color: red; font-size: 30px;">哈哈哈哈</h2>

    <!-- 2.style中的某些值, 来自data中 -->
    <!-- 2.1.动态绑定style, 在后面跟上 对象类型 (重要)-->
    <h2 :style="{ color: fontColor, fontSize: fontSize + 'px' }">
      哈哈哈哈
    </h2>
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
      data: function () {
        return {
          fontColor: "blue",
          fontSize: 30,
          objStyle: {
            fontSize: "50px",
            color: "green",
          },
        };
      },
    });

    // 2.挂载app
    app.mount("#app");
  </script>
</body>
```

3.3.1 [对象语法](https://v3.cn.vuejs.org/guide/class-and-style.html#%E5%AF%B9%E8%B1%A1%E8%AF%AD%E6%B3%95-2) :style 的对象语法十分直观——看着非常像 CSS，但其实是一个 JavaScript 对象。CSS property 名可以用驼峰式 (camelCase) 或短横线分隔 (kebab-case，记得用引号括起来) 来命名
3.3.2 [数组语法](https://v3.cn.vuejs.org/guide/class-and-style.html#%E6%95%B0%E7%BB%84%E8%AF%AD%E6%B3%95-2) :style 的数组语法可以将多个样式对象应用到同一个元素上
3.3.3 [多重值](https://v3.cn.vuejs.org/guide/class-and-style.html#%E5%A4%9A%E9%87%8D%E5%80%BC)可以为 style 绑定中的 property 提供一个包含多个值的数组，常用于提供多个带前缀的值

#### 3.4 v-bind 绑定属性名 & v-bind 直接绑定对象

```html
<body>
  <div id="app">
    <!-- v-bind绑定属性名:将属性名设为aaaa   -->
    <h2 :[name]="'aaaa'">Hello World</h2>
    <!-- v-bind直接绑定对象:将属性名和name的值绑定，此处为class-->
    <h2 :[name]="name">Hello World</h2>
  </div>

  <script src="./lib/vue.js"></script>
  <script>
    // 1.创建app
    const app = Vue.createApp({
      // data: option api
      data: function () {
        return {
          name: "class",
        };
      },
    });

    // 2.挂载app
    app.mount("#app");
  </script>
</body>
```

### 4 事件绑定 v-on

v-on 绑定事件监听器。

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

Vue 事件绑定如何传递参数？如何传递 event 参数？

- 情况一：如果该方法不需要额外参数，那么方法后的()可以不添加。

  - 如果方法本身中有一个参数，那么会默认将原生事件 event 参数传递进去

- 情况二：如果需要同时传入某个参数，同时需要 event 时，可以通过**$event**传入事件。

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

#### 4.3 绑定事件的修饰符

- stop - 调用 event.stopPropagation()。
- prevent - 调用 event.preventDefault()。
- capture - 添加事件侦听器时使用 capture 模式。
- self - 只当事件是从侦听器绑定的元素本身触发时才触发回调。
- {keyAlias} - 仅当事件是从特定键触发时才触发回调。
- once - 只触发一次回调。
- left - 只当点击鼠标左键时触发。
- right - 只当点击鼠标右键时触发。
- middle - 只当点击鼠标中键时触发。
- passive - { passive: true } 模式添加侦听器

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
      <img
        src="https://game.gtimg.cn/images/yxzj/web201706/images/comm/floatwindow/wzry_qrcode.jpg"
        alt=""
      />
    </template>
  </div>

  <script src="../lib/vue.js"></script>
  <script>
    // 1.创建app
    const app = Vue.createApp({
      // data: option api
      data() {
        return {
          isShowCode: true,
        };
      },

      methods: {
        toggle() {
          this.isShowCode = !this.isShowCode;
        },
      },
    });
    // 2.挂载app
    app.mount("#app");
  </script>
</body>
```

### 6 template 元素

template 元素可以当作不可见的包裹元素，并且在 v-if 上使用，最终不会被渲染出来

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
    <img
      src="https://game.gtimg.cn/images/yxzj/web201706/images/comm/floatwindow/wzry_qrcode.jpg"
      alt=""
    />
  </div>

  <div v-if="isShowCode">
    <img
      src="https://game.gtimg.cn/images/yxzj/web201706/images/comm/floatwindow/wzry_qrcode.jpg"
      alt=""
    />
  </div>
</div>
```

v-if 和 v-show 有什么区别？

- 在用法上的区别：
  - v-show 是不支持 template；
  - v-show 不可以和 v-else 一起使用；
- 本质的区别
  - v-show 元素无论是否需要显示到浏览器上，它的 DOM 实际都是有存在的，只是通过 CSS 的 display 属性来进行切换；
  - v-if 当条件为 false 时，其对应的原生压根不会被渲染到 DOM 中

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
            {
              id: 110,
              name: "Macbook",
              price: 9.9,
              desc: "9.9秒杀, 快来抢购!",
            },
            { id: 111, name: "iPhone", price: 8.8, desc: "9.9秒杀, 快来抢购!" },
            {
              id: 112,
              name: "小米电脑",
              price: 9.9,
              desc: "9.9秒杀, 快来抢购!",
            },
          ],
        };
      },
    });

    // 2.挂载app
    app.mount("#app");
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
          info: { name: "why", age: 18, height: 1.88 },
        };
      },
    });

    // 2.挂载app
    app.mount("#app");
  </script>
</body>
```

补充 1：

```html
<!-- 如果div没有实际的意义, 那么可以使用template替换 -->
<div v-for="(value, key, index) in infos">
  <span>{{value}}</span>
  <strong>{{key}}</strong>
  <i>{{index}}</i>
</div>
```

补充 2：修改数组的练习

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
          names: ["abc", "cba", "nba", "aaa", "ccc"],
        };
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
          const newNames = this.names.map((item) => item + "why");
          this.names = newNames;
        },
      },
    });

    // 2.挂载app
    app.mount("#app");
  </script>
</body>
```

#### 8.3 v-for 中 key 属性

**只要写 v-for,都要绑定 key**
为了给 Vue 一个提示，以便它能跟踪每个节点的身份，从而重用和重新排序现有元素，你需要为每项提供一个唯一的 key attribute：

```html
<div v-for="item in items" :key="item.id">
  <!-- 内容 -->
</div>
```

建议尽可能在使用 v-for 时提供 key attribute，除非遍历输出的 DOM 内容非常简单，或者是刻意依赖默认行为以获取性能上的提升。

**v-for 中的 key 有什么作用？什么是虚拟 DOM？**

- 有 key 的操作:

  - 根据 key 找到之前的 VNode 进行复用;
  - 没有 VNode 可以复用, 再创建新的 VNode

- 没有 key 的操作:

  - diff 算法, 后续 VNode 复用性就不强

- VNode

  ```
  1.VNode的全称是Virtual Node，也就是虚拟节点
  2.VNode的本质是一个JavaScript的对象
  3.template元素 ->解析成 VNode--->转换为真实DOM元素
  ```

- 虚拟 DOM

  - template 元素--->一个个 VNode 虚拟节点--->VNode Tree -->虚拟 DOM--->真实 DOM

  - 作用
    - 方便进行 diff 算法
    - 方便进行跨平台

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
          message: "my name is why",
        };
      },
      computed: {
        // 1.计算属性默认对应的是一个函数
        fullname() {
          return this.firstName + " " + this.lastName;
        },

        scoreLevel() {
          return this.score >= 60 ? "及格" : "不及格";
        },

        reverseMessage() {
          return this.message.split(" ").reverse().join(" ");
        },
      },
    });

    // 2.挂载app
    app.mount("#app");
  </script>
</body>
```

**什么是计算属性？和 method 有什么区别？**

- 计算属性

  - 可以通过 this 访问数据
  - 对于任何包含响应式数据的赋值逻辑,你应该使用计算属性

- 和 method 的区别

  - computed 底层会缓存, 性能更高
  - 计算属性会基于它们的依赖关系进行缓存;
  - 在数据不发生变化时，计算属性是不需要重新计算的
  - 但是如果依赖的数据发生变化，在使用时，计算属性依然会重新进行计算

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
          info: { name: "why", age: 18 },
        };
      },
      methods: {
        changeMessage() {
          this.message = "你好啊, 李银河!";
          this.info = { name: "kobe" };
        },
      },
      watch: {
        // 1.默认有两个参数: newValue/oldValue
        message(newValue, oldValue) {
          console.log("message数据发生了变化:", newValue, oldValue);
        },
        info(newValue, oldValue) {
          // 2.如果是对象类型, 那么拿到的是代理对象
          // console.log("info数据发生了变化:", newValue, oldValue)
          // console.log(newValue.name, oldValue.name)

          // 3.获取原生对象
          console.log(Vue.toRaw(newValue));
        },
      },
    });

    // 2.挂载app
    app.mount("#app");
  </script>
</body>
```

#### 10.1 watch 的侦听选项

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

### 11 购物车案例

```html
<body>
  <div id="app">
    <template v-if="books.length">
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
          <tr v-for="(item, index) in books">
            <td>{{index+1}}</td>
            <td>{{item.name}}</td>
            <td>{{item.date}}</td>
            <td>{{item.price}}</td>
            <td>
              <button :disabled="item.count <= 0" @click="decrement(index)">
                -
              </button>
              {{item.count}}
              <button @click="increment(index)">+</button>
            </td>
            <td>
              <button @click="removeItem(index)">移除</button>
            </td>
          </tr>
        </tbody>
      </table>
      <h2>总价格: {{totalPrice}}</h2>
    </template>
    <template v-else>
      <h2>购物车为空, 请添加商品~</h2>
    </template>
  </div>

  <script src="../lib/vue.js"></script>
  <script src="./data.js"></script>
  <script src="index.js"></script>
</body>
```

```js
const app = Vue.createApp({
  data: function () {
    return {
      books,
    };
  },
  computed: {
    totalPrice() {
      return this.books.reduce((preValue, item) => {
        return preValue + item.count * item.price;
      }, 0);
    },
  },
  methods: {
    removeItem(index) {
      this.books.splice(index, 1);
    },
    increment(index) {
      this.books[index].count++;
    },
    decrement(index) {
      this.books[index].count--;
    },
  },
});

app.mount("#app");
```

### 12 列表的选中

```html
  <div id="app">
    <ul>
      <!-- <h2 :class="{title: false}"></h2> -->

      <!-- 对active的class进行动态绑定 -->
      <!-- 需求一: 将索引值为1的li添加上active -->
      <!-- 需求二：用一个变量（属性）记录当前点击的位置 -->
      <li :class="{active: index === currentIndex}"
          @click="liClick(index)"
          v-for="(item, index) in movies">
        {{item}}
      </li>
    </ul>
  </div>

  <script src="../lib/vue.js"></script>
  <script>
    // 1.创建app
    const app = Vue.createApp({
      // data: option api
      data() {
        return {
          movies: ["星际穿越", "阿凡达", "大话西游", "黑客帝国"],
          currentIndex: -1
        }
      },
      methods: {
        liClick(index) {
          console.log("liClick:", index)
          this.currentIndex = index
        }
      }
    })

    // 2.挂载app
    app.mount("#app")
  </script>
</body>
```

### 13 Vue 的双向绑定 v-model

v-model 作用于`<input>`,`<select>`,`<textarea>`,`components`等，使她们和 data 中的数据相绑定

**什么是双向绑定？v-model 的本质是什么**
双向绑定:

- 即当数据发生变化的时候，视图也就发生变化，当视图发生变化的时候，数据也会跟着同步变化
- v-model 是语法糖，它负责监听用户的输入事件来更新数据

v-model 的原理

- v-bind 绑定 value 属性的值
- v-on 绑定 input 事件监听到函数,函数会获取最新的值赋值到绑定的属性中

#### 13.1 v-model 绑定 input

```html
<label for="account">
  账号:<input id="account" type="text" v-model="account" />
</label>
<label for="password">
  密码:<input id="password" type="password" v-model="password" />
</label>
```

```js
data() {
        return {
          message: "Hello Model",
          account: "",
          password: ""
        }
      },
```

#### 13.2 v-model 绑定 textarea

```html
<textarea cols="30" rows="10" v-model="content"></textarea>
```

```js
 data() {
        return {
          content: ""
        }
      },
```

#### 13.3 v-model 绑定 checkbox

```html
<!-- 1.checkbox单选框: 绑定到属性中的值是一个Boolean -->
<label for="agree">
  <input id="agree" type="checkbox" v-model="isAgree" /> 同意协议
</label>
<h2>单选框: {{isAgree}}</h2>
<hr />

<!-- 2.checkbox多选框: 绑定到属性中的值是一个Array -->
<!-- 注意: 多选框当中, 必须明确的绑定一个value值 -->
<div class="hobbies">
  <h2>请选择你的爱好:</h2>
  <label for="sing">
    <input id="sing" type="checkbox" v-model="hobbies" value="sing" /> 唱
  </label>
  <label for="jump">
    <input id="jump" type="checkbox" v-model="hobbies" value="jump" /> 跳
  </label>
  <label for="rap">
    <input id="rap" type="checkbox" v-model="hobbies" value="rap" /> rap
  </label>
  <label for="basketball">
    <input
      id="basketball"
      type="checkbox"
      v-model="hobbies"
      value="basketball"
    />
    篮球
  </label>
  <h2>爱好: {{hobbies}}</h2>
</div>
```

```js
data() {
        return {
          isAgree: false,
          hobbies: []
        }
      },
```

#### 13.4 v-model 绑定 radio

```html
<div class="gender">
  <label for="male">
    <input id="male" type="radio" v-model="gender" value="male" /> 男
  </label>
  <label for="female">
    <input id="female" type="radio" v-model="gender" value="female" /> 女
  </label>
  <h2>性别: {{gender}}</h2>
</div>
```

```js
data() {
        return {
          gender: "female"
        }
      },
```

#### 13.5 v-model 绑定 radiov-model 绑定 select

```html
<!-- select的单选 -->
<select v-model="fruit">
  <option value="apple">苹果</option>
  <option value="orange">橘子</option>
  <option value="banana">香蕉</option>
</select>
<h2>单选: {{fruit}}</h2>
<hr />

<!-- select的多选 -->
<select multiple size="3" v-model="fruits">
  <option value="apple">苹果</option>
  <option value="orange">橘子</option>
  <option value="banana">香蕉</option>
</select>
<h2>多选: {{fruits}}</h2>
```

```js
data() {
        return {
          fruit: "orange",
          fruits: []
        }
```

#### 13.6 model 的值绑定

```html
<!-- 1.select的值绑定 -->
<select multiple size="3" v-model="fruits">
  <option v-for="item in allFruits" :key="item.value" :value="item.value">
    {{item.text}}
  </option>
</select>
<h2>多选: {{fruits}}</h2>

<hr />

<!-- 2.checkbox的值绑定 -->
<div class="hobbies">
  <h2>请选择你的爱好:</h2>
  <template v-for="item in allHobbies" :key="item.value">
    <label :for="item.value">
      <input
        :id="item.value"
        type="checkbox"
        v-model="hobbies"
        :value="item.value"
      />
      {{item.text}}
    </label>
  </template>
  <h2>爱好: {{hobbies}}</h2>
</div>
```

#### 13.7 v-model 的修饰符

```html
<!-- 1.lazy: 绑定change事件  -->
    <input type="text" v-model.lazy="message">
    <h2>message: {{message}}</h2>

    <hr>

    <!-- 2.number: 自动将内容转换成数字 -->
    <input type="text" v-model.number="counter">
    <h2>counter:{{counter}}-{{typeof counter}}</h2>

    <input type="number" v-model="counter2">
    <h2>counter2:{{counter2}}-{{typeof counter2}}</h2>

    <hr>

    <!-- 3.trim: 去除收尾的空格 -->
    <input type="text" v-model.trim="content">
    <h2>content: {{content}}</h2>

    <hr>

    <!-- 4.使用多个修饰符 -->
    <input type="text" v-model.lazy.trim="content">
    <h2>content: {{content}}</h2>
  </div>
```

## 组件化开发

- 组件命名用-连接比较多
- 实际开发中很少注册全局组件，99%都是局部组件

### 1.组件化开发

**什么是组件化开发？有什么作用？**

- 组件化开发

  - 我们将一个完整的页面分成很多个组件；

  - 每个组件都用于实现页面的一个功能块；
  - 而每一个组件又可以进行细分；
  - 而组件本身又可以在多个地方进行复用

- 作用
  - 可复用
  - 方便整个页面的管理和维护

**Vue 中注册全局组件和局部组件有什么区别？**

- 全局组件：在任何其他的组件中都可以使用的组件；

- 局部组件：只有在注册的组件中才能使用的组件

**什么是 Vue CLI，如何使用它创建 Vue 项目？**

- Vue CLI
  - Vue 的脚手架,可以通过它选择项目的配置,并且创建出我们的项目
  - Vue CLI 已经内置了 webpack 相关的配置，我们不需要从零来配置

![vue项目生成的两种方式](/images/blog/2022/1.jpg)

#### 1.1 Vue CLI 的安装和使用

```bash
# 安装
npm install @vue/cli -g

# 升级
npm update @vue/cli -g

# 使用
vue create 项目的名称
```

**Vue 项目目录结构中各个文件的作用**

```
node_modules:  安装的所有依赖包

public： public目录存放的是一些公用文件
   ---favicon.ico  图标
   ---index.html   打包webpack时所需要的的HTML 模板

src  存放vue项目的源代码
   --assets: 资源文件,比如存放css,图片等资源
   --components: 组件文件夹
   --APP.vue   根组件
   --main.js  项目的入口文件

.browserslistrc    设置目标浏览器,进行浏览器适配

.gitignore     git的忽略文件

babel.config.js    babel的配置

jsconfig.json   给vscode进行读取,vscode在读取到其中的内容时,给我们代码更加友好的提示

package-lock.json    项目包的锁定文件,npm install 可以通过package-lock文件来检测lock中包的版本是否和package.json中一致 ---一致,会优先查找缓存,不一致,就会重新构建依赖关系

package.json  npm配置文件,记录这你项目的名称,版本号,项目描述,也记录项目所依赖的其他库的信息和依赖库的版本号

README.md    项目说明(描述)

vue.config.js   vue 的配置文件
```

#### 1.2组件的嵌套使用

组件内部举例

```html
<template>
  <div class="app-header">
    <h1 class="title">我是大标题</h1>
    <h2 class="subtitle">我是小标题</h2>
  </div>
</template>

<script>
  export default {};
</script>

<!-- 加上scoped是限定作用域的意思，不会作用到全局了 -->
<style scoped></style>
```

App.vue 举例

```html
<template>
  <div class="app">
    <h2 class="title">我是App.vue中的h2元素</h2>

    <!-- AppHeader -->
    <AppHeader></AppHeader>
  </div>
</template>

<script>
  import AppHeader from "./components/AppHeader";

  export default {
    name: "App",
    components: {
      AppHeader,
    },
  };
</script>

<style scoped>
  .title {
    color: red;
  }
</style>
```

### 2 Vue 的 runtime 和 runtime+comiple 的版本区别

- runtime 版本意味着 没有对模板的编译 需要自己写对应的 render 函数(返回 h 函数)或者 setup 返回一个函数 函数的返回值是 h 函数
  - 没有将模板转成 vnode 节点这一过程
- runtime+comiple 版本 是可以将 template 模板通过 compile 转换成对应的 vnode 节点

### 3 组件通信

父子组件之间如何进行通信呢？

- 父组件传递给子组件：通过 props 属性（需要在子组件中注册）；
- 子组件传递给父组件：通过$emit 触发事件（在子组件 methods 中）；

#### 3.1 父传子

父组件数据传入子组件

- ```js
  <child :title="hello " :message="child" :list="[1,2,3]"/>
  ```

子组件接收父组件传入的值

- ```js
    export default {
        // 需要注意的是 传入的数据需要在子组件中进行注册
        // 如果不注册 则被当作 attr 的参数 可以通过$attr.的方式在template进行访问 或者会自动进行同类型的合并
        props: ["title", "message", "list"] // 数组写法
        props: {
            title: {
                type: String,
                default: "wmm"
            },
        	message: {
              	type: String,
            	default: "111"
            },
             // 对象类型的数据的默认值为一个函数
             list: {
                 type: Array,
                 default: ()=>([1,2,3])
             },
    }
    }
  ```
  请看以下案例
  `父组件App.vue`

```html
<template>
  <!-- 1.展示why的个人信息 -->
  <!-- 如果当前的属性是一个非prop的attribute, 那么该属性会默认添加到子组件的根元素上 -->
  <show-info
    name="why"
    :age="18"
    :height="1.88"
    address="广州市"
    abc="cba"
    class="active"
  />

  <!-- 2.展示kobe的个人信息 -->
  <show-info name="kobe" :age="30" :height="1.87" />

  <!-- 3.展示默认的个人信息 -->
  <!--  Prop的大小写命名(camelCase vs kebab-case)-->
  <!--  HTML中的attribute名是大小写不敏感的，所以浏览器会把所有大写字符解释为小写字符;-->
  <!--  这意味着当你使用DOM中的模板时，camelCase (驼峰命名法)的prop名需要使用其等价的kebab-case (短横线分隔命名)命名;-->
  <show-info :age="100" show-message="哈哈哈哈" />
</template>

<script>
  import ShowInfo from "./ShowInfo.vue";

  export default {
    components: {
      ShowInfo,
    },
  };
</script>

<style scoped></style>
```

`子组件ShowInfo.vue`

```html
<template>
  <div class="infos">
    <h2 :class="$attrs.class">姓名: {{ name }}</h2>
    <h2>年龄: {{ age }}</h2>
    <h2>身高: {{ height }}</h2>

    <h2>Message: {{ showMessage }}</h2>
  </div>

  <div class="others" v-bind="$attrs"></div>
</template>

<script>
  export default {
    // inheritAttrs: false,

    // 作用: 接收父组件传递过来的属性
    // 1.props数组语法
    // 弊端: 1> 不能对类型进行验证 2.没有默认值的
    // props: ["name", "age", "height"]

    // 2.props对象语法(必须掌握)
    props: {
      name: {
        type: String,
        default: "我是默认name",
      },
      age: {
        type: Number,
        required: true,
        default: 0,
      },
      height: {
        type: Number,
        default: 2,
      },
      // 重要的原则: 对象类型写默认值时, 需要编写default的函数, 函数返回默认值
      friend: {
        type: Object,
        default() {
          return { name: "james" };
        },
      },
      hobbies: {
        type: Array,
        default: () => ["篮球", "rap", "唱跳"],
      },
      // Prop的大小写命名(camelCase vs kebab-case)
      // HTML中的attribute名是大小写不敏感的，所以浏览器会把所有大写字符解释为小写字符;
      // 这意味着当你使用DOM中的模板时，camelCase (驼峰命名法)的prop名需要使用其等价的kebab-case (短横线分隔命名)命名;
      showMessage: {
        type: String,
        default: "我是showMessage",
      },
    },
  };
</script>

<style scoped></style>
```

#### 3.1.1 非 Prop 的 Attribute

什么是非 Prop 的 Attribute 呢？

- 当我们传递给一个组件某个属性，但是该属性并没有定义对应的 props 或者 emits 时，就称之为 非 Prop 的 Attribute；
- 常见的包括 class、style、id 属性等；
- 当组件有单个根节点时，非 Prop 的 Attribute 将自动添加到根节点的 Attribute 中：
  ![img](/images/blog/2022/2.png)

#### 3.1.2 禁用 Attribute 继承

如果我们不希望组件的根元素继承 attribute，可以在组件中设置 inheritAttrs: false

- 禁用 attribute 继承的常见情况是需要将 attribute 应用于根元素之外的其他元素；
- 我们可以通过 $attrs 来访问所有的 非 props 的 attribute；

```html
<div>
  我是NotPropAttribute组件
  <h2 :class="$attr.class"></h2>
</div>
```

#### 3.2 子传父

什么情况下子组件需要传递内容到父组件呢？

- 当子组件有一些事件发生的时候，比如在组件中发生了点击，父组件需要切换内容；
- 子组件有一些内容想要传递给父组件的时候；

我们如何完成上面的操作呢？
![img](/images/blog/2022/3.jpg)

1. 我们需要在子组件监听触发的事件，并写一个方法，在方法中用 this.$emit 的方式自定义事件的名称和参数；
2. 在父组件中监听的事件名称，并且绑定到对应的方法中；

`App.vue`

```html
<template>
  <div class="app">
    <h2>当前计数: {{ counter }}</h2>

    <!-- 1.自定义add-counter, 并且监听内部的add事件 -->
    <add-counter @add="addBtnClick"></add-counter>

    <!-- 2.自定义sub-counter, 并且监听内部的sub事件 -->
    <sub-counter @sub="subBtnClick"></sub-counter>
  </div>
</template>

<script>
  import AddCounter from "./AddCounter.vue";
  import SubCounter from "./SubCounter.vue";

  export default {
    components: {
      AddCounter,
      SubCounter,
    },
    data() {
      return {
        counter: 0,
      };
    },
    methods: {
      addBtnClick(count) {
        this.counter += count;
      },
      subBtnClick(count) {
        this.counter -= count;
      },
    },
  };
</script>

<style scoped></style>
```

`AddCounter.vue`

```html
<template>
  <div class="add">
    <button @click="btnClick(1)">+1</button>
    <button @click="btnClick(5)">+5</button>
    <button @click="btnClick(10)">+10</button>
  </div>
</template>

<script>
  export default {
    // 1.emits数组语法
    emits: ["add"],
    // 2.emmits对象语法
    // emits: {
    //   add: function(count) {
    //     if (count <= 10) {
    //       return true
    //     }
    //     return false
    //   }
    // },
    methods: {
      btnClick(count) {
        console.log("btnClick:", count);
        // 让子组件发出去一个自定义事件
        // 第一个参数自定义的事件名称
        // 第二个参数是传递的参数
        this.$emit("add", 100);
      },
    },
  };
</script>

<style scoped></style>
```

### 4 插槽 Slot

插槽就是写组件的时候不给她写死，留一些插槽供使用者灵活添加
![img](/images/blog/2022/4.jpg)

#### 4.1 基本使用

`App.vue`

```html
<template>
  <div class="app">
    <!-- 1.内容是button -->
    <show-message title="哈哈哈">
      <button>我是按钮元素</button>
    </show-message>

    <!-- 2.内容是超链接 -->
    <show-message>
      <a href="#">百度一下</a>
    </show-message>

    <!-- 3.内容是一张图片 -->
    <show-message>
      <img src="@/img/kobe02.png" alt="" />
    </show-message>

    <!-- 4.内容没有传递 -->
    <show-message></show-message>
  </div>
</template>

<script>
  import ShowMessage from "./ShowMessage.vue";

  export default {
    components: {
      ShowMessage,
    },
  };
</script>
```

`ShowMessage.vue`

```html
<template>
  <h2>{{ title }}</h2>
  <div class="content">
    <slot>
      <!-- 什么都没有传的时候就会使用默认值 -->
      <p>我是默认内容, 哈哈哈</p>
    </slot>
  </div>
</template>

<script>
  export default {
    props: {
      title: {
        type: String,
        default: "我是title默认值",
      },
    },
  };
</script>
```

#### 4.2 具名插槽

名插槽顾名思义就是给插槽起一个名字，<slot> 元素有一个特殊的 attribute：name
一个不带 name 的 slot，会带有隐含的名字 default
`App.vue`

```html
<template>
  <nav-bar>
    <!-- #是v-slot:的简写，后面跟上要插的插槽的名字 -->
    <template #left>
      <button>{{ leftText }}</button>
    </template>

    <template #center>
      <span>内容</span>
    </template>

    <template v-slot:right>
      <a href="#">登录</a>
    </template>
  </nav-bar>
</template>
```

`NavBar.vue`

```html
<template>
  <div class="nav-bar">
    <div class="left">
      <!-- 给每个插槽取名字 -->
      <slot name="left">left</slot>
    </div>
    <div class="center">
      <slot name="center">center</slot>
    </div>
    <div class="right">
      <slot name="right">right</slot>
    </div>
  </div>

  <div class="other">
    <slot name="default"></slot>
  </div>
</template>
```

#### 4.3 作用域插槽

将子组件中的数据传递给父组件的插槽来使用

**在 Vue 中有渲染作用域的概念**：

- 父级模板里的所有内容都是在父级作用域中编译的；
- 子模板里的所有内容都是在子作用域中编译的；

  - 如何理解这句话呢？我们来看一个案例：
  - ![img](/images/blog/2022/7.png)

  - 在我们的案例中 ChildCpn 自然是可以让问自己作用域中的 title 内容的；
  - 但是在 App 中，是访问不了 ChildCpn 中的内容的，因为它们是跨作用域的访问；

下面是一个作用域插槽的例子
![img](/images/blog/2022/5.jpg)
![img](/images/blog/2022/6.png)

### 5 非父子组件的通信

两种方式：

- 全局事件总线
- Provide/Inject

#### 5.1 全局事件总线

Vue3 官方有推荐一些库，例如 mitt 或 tiny-emitter；
主要讲解一下 hy-event-store 的使用 1.我们需要先安装这个库：

```shell
npm install hy-event-bus
```

2.我们可以封装一个工具 eventbus.js：

```js
import { HYEventBus } from "hy-event-store";
const eventBus = new HYEventBus();
export default eventBus;
```

3.在项目中可以使用它们：
我们在一个组件中监听、传递事件；

```html
<template>
  <div class="banner">
    <button @click="bannerBtnClick">banner按钮</button>
  </div>
</template>

<script>
  import eventBus from "./utils/event-bus";

  export default {
    methods: {
      bannerBtnClick() {
        console.log("bannerBtnClick");
        eventBus.emit("whyEvent", "why", 18, 1.88);
      },
    },
  };
</script>

<style scoped></style>
```

我们在另一个组件中接收事件；

```js
created() {
      // fetch()

      // 事件监听
      eventBus.on("whyEvent", (name, age, height) => {
        console.log("whyEvent事件在app中监听", name, age, height)
        this.message = `name:${name}, age:${age}, height:${height}`
      })
    }
```

#### 5.2 Provide/Inject(在开发中用得非常少)

无论层级结构有多深，父组件都可以作为其所有子组件的依赖
提供者；

- 父组件有一个 provide 选项来提供数据；（provide 一般都是写成函数的）
- 子组件有一个 inject 选项来开始使用这些数据；
  ![img](https://v3.cn.vuejs.org/images/components_provide.png)

### 6.生命周期

- 什么是生命周期？
  每个组件都可能会经历从创建、挂载、更新、卸载等一系列的过程
  ![img](/images/blog/2022/生命周期的历程.png)
- 们如何可以知道目前组件正在哪一个过程呢？
  Vue 给我们提供了组件的**生命周期函数**
  生命周期函数是一些钩子函数（回调函数），在某个时间会被 Vue 源码内部进行回调；
  **通过对生命周期函数的回调，我们可以知道目前组件正在经历什么阶段；**
  **可以通过生命周期函数，在某个阶段给你一个做某些处理的机会**

  ```html
  <template>
    <h2>message: {{message}}-{{counter}}</h2>
    <button @click="message = 'Hello World'">修改message</button>
    <button @click="counter++">+1</button>
    <div>
      <button @click="isShowHome = !isShowHome">显示Home</button>
      <home v-if="isShowHome"></home>
    </div>
  </template>
  <script>
    import Home from "./Home.vue";
    export default {
      components: {
        Home,
      },
      data() {
        return {
          message: "Hello App",
          counter: 0,
          isShowHome: true,
        };
      },
      // 1.组件被创建之前
      beforeCreate() {
        console.log("beforeCreate");
      },
      // 2.组件被创建完成
      created() {
        console.log("created");
        console.log("1.发送网络请求, 请求数据");
        console.log("2.监听eventbus事件");
        console.log("3.监听watch数据");
      },
      // 3.组件template准备被挂载
      beforeMount() {
        console.log("beforeMount");
      },
      // 4.组件template被挂载: 虚拟DOM -> 真实DOM
      mounted() {
        console.log("mounted");
        console.log("1.获取DOM");
        console.log("2.使用DOM");
      },
      // 5.数据发生改变
      // 5.1. 准备更新DOM
      beforeUpdate() {
        console.log("beforeUpdate");
      },
      // 5.2. 更新DOM
      updated() {
        console.log("updated");
      },
  
      // 6.卸载VNode -> DOM元素
      // 6.1.卸载之前
      beforeUnmount() {
        console.log("beforeUnmount");
      },
      // 6.2.DOM元素被卸载完成
      unmounted() {
        console.log("unmounted");
      },
    };
  </script>
  <style scoped></style>
  ```
### 7 通过ref获取元素或组件
在Vue开发中我们是不推荐进行原生DOM操作的；这个时候，我们可以给元素或者组件绑定一个ref的attribute属性；
`App.vue`
```html
<template>
  <div class="app">
    <h2 ref="title" class="title" :style="{ color: titleColor }">{{ message }}</h2>
    <button ref="btn" @click="changeTitle">修改title</button>

    <banner ref="banner"/>
  </div>
</template>

<script>
  import Banner from "./Banner.vue"

  export default {
    components: {
      Banner
    },  
    data() {
      return {
        message: "Hello World",
        titleColor: "red"
      }
    },
    methods: {
      changeTitle() {
        // 1.不要主动的去获取DOM, 并且修改DOM内容
        // this.message = "你好啊, 李银河!"
        // this.titleColor = "blue"

        // 2.获取h2/button元素
        console.log(this.$refs.title)
        console.log(this.$refs.btn)

        // 3.获取banner组件: 组件实例
        console.log(this.$refs.banner)
        
        // 3.1.在父组件中可以主动的调用子组件的对象方法
        this.$refs.banner.bannerClick()

        // 3.2.获取banner组件实例, 获取banner中的元素
        console.log(this.$refs.banner.$el)

        // 3.3.如果banner template是多个根, 拿到的是第一个node节点
        // 注意: 开发中不推荐一个组件的template中有多个根元素
        // console.log(this.$refs.banner.$el.nextElementSibling)

        // 4.组件实例还有两个属性(了解):
        console.log(this.$parent) // 获取父组件
        console.log(this.$root) // 获取根组件 
      }
    }
  }
</script>

<style scoped>
</style>
```
`Banner.vue`
```html
<template>
  <div class="banner">
    <h2>Banner</h2>
  </div>
</template>

<script>
  export default {
    created() {
      
    },
    methods: {
      bannerClick() {
        console.log("bannerClick")
      }
    }
  }
</script>

<style scoped>
</style>

```
### 8 动态组件的使用
比如我们现在想要实现了一个功能：
- 点击一个tab-bar，切换不同的组件显示；
  

这个案例我们可以通过两种不同的实现思路来实现：
- 方式一：通过v-if来判断，显示不同的组件；
- 方式二：动态组件 component 的方式；
```html
<template>
  <div class="app">
    <div class="tabs">
      <template v-for="(item, index) in tabs" :key="item">
        <button :class="{ active: currentTab === item }" 
                @click="itemClick(item)">
          {{ item }}
        </button>
      </template>
    </div>
    <div class="view">
      <!-- 1.第一种做法: v-if进行判断逻辑, 决定要显示哪一个组件 -->
      <!-- <template v-if="currentIndex === 0">
        <home></home>
      </template>
      <template v-else-if="currentIndex === 1">
        <about></about>
      </template>
      <template v-else-if="currentIndex === 2">
        <category></category>
      </template> -->

      <!-- 2.第二种做法: 动态组件 component -->
      <!-- is中的组件需要来自两个地方: 1.全局注册的组件 2.局部注册的组件（components对象中注册过的组件） -->
      <!-- <component :is="tabs[currentIndex]"></component> -->
      <component name="why" 
                 :age="18"
                 @homeClick="homeClick"
                 :is="currentTab">
      </component>
    </div>
  </div>
</template>

<script>
  import Home from './views/Home.vue'
  import About from './views/About.vue'
  import Category from './views/Category.vue'

  export default {
    components: {
      Home,
      About,
      Category
    },
    data() {
      return {
        tabs: ["home", "about", "category"],
        // currentIndex: 0
        currentTab: "home"
      }
    },
    methods: {
      itemClick(tab) {
        this.currentTab = tab
      },
      homeClick(payload) {
        console.log("homeClick:", payload)
      }
    }
  }
</script>

<style scoped>
  .active {
    color: red;
  }
</style>
```
### 9 keep-alive
在上一个案例中，默认情况下，我们在切换组件后，about组件会被销毁掉，再次回来时会重新创建组件；
但是，在开发中某些情况我们希望继续保持组件的状态，而不是销毁掉，这个时候我们只需在外层包裹一个keep-alive组件即可

keep-alive有一些属性：
- include - string | RegExp | Array。只有名称匹配的组件会被缓存；
- exclude - string | RegExp | Array。任何名称匹配的组件都不会被缓存；
- max - number | string。最多可以缓存多少组件实例，一旦达到这个数
字，那么缓存组件中最近没有被访问的实例会被销毁；
include 和 exclude prop 允许组件有条件地缓存：
- 二者都可以用逗号分隔字符串、正则表达式或一个数组来表示；
- 匹配首先检查组件自身的 name 选项；
  ```html
  <template>
    <div class="app">
      <div class="tabs">
        <template v-for="(item, index) in tabs" :key="item">
          <button :class="{ active: currentTab === item }" 
                  @click="itemClick(item)">
            {{ item }}
          </button>
        </template>
      </div>
      <div class="view">
        <!-- include: 组件的名称来自于组件定义时name选项  -->
        <keep-alive include="home,about">
          <component :is="currentTab"></component>
        </keep-alive>
      </div>
    </div>
  </template>
  
  <script>
    import Home from './views/Home.vue'
    import About from './views/About.vue'
    import Category from './views/Category.vue'
  
    export default {
      components: {
        Home,
        About,
        Category
      },
      data() {
        return {
          tabs: ["home", "about", "category"],
          // currentIndex: 0
          currentTab: "home"
        }
      },
      methods: {
        itemClick(tab) {
          this.currentTab = tab
        },
        homeClick(payload) {
          console.log("homeClick:", payload)
        }
      }
    }
  </script>
  
  <style scoped>
    .active {
      color: red;
    }
  </style>
  ```

对于缓存的组件来说，再次进入时，我们是不会执行created或者mounted等生命周期函数的：
 但是有时候我们确实希望监听到何时重新进入到了组件，何时离开了组件；
 这个时候我们可以使用activated 和 deactivated 这两个生命周期钩子函数来监听；

### 10 Webpack的代码分包
#### 10.1 默认的打包过程：
  默认情况下，在构建整个组件树的过程中，因为组件和组件之间是通过模块化直接依赖的，那么webpack在打包时就会将组件模块打包到一起（比如一个app.js文件中）；
  这个时候随着项目的不断庞大，app.js文件的内容过大，会造成首屏的渲染速度变慢；
![img](/images/blog/2022/打包文件夹分析和部署渲染过程.png)
#### 10.2 打包时，代码的分包：
  所以，对于一些不需要立即使用的组件，我们可以单独对它们进行拆分，拆分成一些小的代码块chunk.js；
  这些chunk.js会在需要时从服务器加载下来，并且运行代码，显示对应的内容；
##### 10.3.1 分包打包导入文件
import函数来导入 是一种异步导入，可以让webpack对导入文件进行分包处理

```js
// import { sum } from './utils/math'
import("./utils/math").then(res => {
  res.sum(20, 30)
})
```
##### 10.3.2 分包打包一个组件
如果我们的项目过大了，对于某些组件我们希望通过异步的方式来进行加载（目的是可以对其进行分包处理），那么Vue中给我们提供了一个函数：defineAsyncComponent。
defineAsyncComponent接受两种类型的参数：

  ```js
    import { defineAsyncComponent } from 'vue'

    // import Category from './views/Category.vue'
    const AsyncCategory = defineAsyncComponent(() => import("./views/Category.vue"))
  ```
ps.实际开发中异步组件用的不多，一般是用路由懒加载的方法

### 11 组件的v-model
前面我们在input中可以使用v-model来完成双向绑定.这个时候往往会非常方便，因为v-model默认帮助我们完成了两件事；v-bind:value的数据绑定和@input的事件监听；
除此之外，vue也支持在组件上使用v-model；


```html
<my-input v-model="message"></my-input>
//上下两行作用一致
<my-input :modelValue="message" @update:modelValue="message = $event"></my-input>
```
为了我们的MyInput组件可以正常的工作，这个组件内的 `<input> `必须：
- 将其 value attribute 绑定到一个名叫 modelValue 的 prop 上；
- 在其 input 事件被触发时，将新的值通过自定义的 update:modelValue 事件抛出
```html
<template>
  <div>
    //默认名称就得是modelValue
    <input :value="modelValue" @input="inputChange">
  </div>
</template>

<script>
  export default {
    props: {
      modelValue: {
        type: Number,
        default: 0
      }
    },
    emits: ["update:modelValue"],
    methods: {
      changeCounter(event) {
        this.$emit("update:modelValue", event.target.value)
      } 
    }
  }
</script>
```
如果不想要modelValue，想要自定义名称也是可以的
```html
<my-input v-model:counter="message"></my-input>
//上下两行作用一致
```
```html
<template>
  <div>
    <input :value="counter" @input="inputChange">
  </div>
</template>

<script>
  export default {
    props: {
      counter: {
        type: Number,
        default: 0
      }
    },
    emits: ["update:counter"],
    methods: {
      changeCounter(event) {
        this.$emit("update:counter", event.target.value)
      } 
    }
  }
</script>
```
#### 12 Mixin的基本使用（vue3不常用，建议用composition API 的方式）
![mixin](/images/mixin.png)
如果Mixin对象中的选项和组件对象中的选项发生了冲突，那么Vue会如何操作呢？
- 情况一：如果是data函数的返回值对象
返回值对象默认情况下会进行合并；如果data返回值对象的属性发生了冲突，那么会保留组件自身的数据；
- 情况二：如何生命周期钩子函数
生命周期的钩子函数会被合并到数组中，都会被调用；
- 情况三：值为对象的选项，例如 methods、components 和 directives，将被合并为同一个对象。比如都有methods选项，并且都定义了方法，那么它们都会生效；但是如果对象的key相同，那么会取组件对象的键值对；

## Composition API
能将同一个逻辑关注点相关的代码收集在一起

**什么是Composition API？和之前的options API有什么区别？（面试）**

* Composition API:   组件根据逻辑功能来组织的，一个功能所定义的所有 API 会放在一起（更加的高内聚，低耦合）

* Options API: 在对应的属性中编写对应的功能模块,  比如data定义数据、methods中定义方法、computed中定义计算属性、watch中监听属性改变，也包括生命周期钩子
  * 弊端:  当我们实现某一个功能时，这个功能对应的代码逻辑会被拆分到各个属性中,当组件变得复杂，导致对应属性的列表也会增长，这可能会导致组件难以阅读和理解
* 两者区别

```
1)在逻辑组织和逻辑复用方面，Composition API是优于Options API
2) 因为Composition API几乎是函数，会有更好的类型推断。
3) Composition API对 tree-shaking 友好，代码也更容易压缩
4) Composition API中见不到this的使用，减少了this指向不明的情况
```



### 1.setup函数(setup中不能用this)
#### 1.1参数
它主要有两个参数：
第一个参数：props
第二个参数：context

- props非常好理解，它其实就是父组件传递过来的属性会被放到props对象中，我们在setup中如果需要使用，那么就可以直接
通过props参数获取：
对于定义props的类型，我们还是和之前的规则是一样的，在props选项中定义；
并且在template中依然是可以正常去使用props中的属性，比如message；
如果我们在setup函数中想要使用props，那么不可以通过 this 去获取（后面我会讲到为什么）；
因为props有直接作为参数传递到setup函数中，所以我们可以直接通过参数来使用即可；
- 另外一个参数是context，我们也称之为是一个SetupContext，它里面包含三个属性：
attrs：所有的非prop的attribute；
slots：父组件传递过来的插槽（这个在以渲染函数返回时会有作用，后面会讲到）；
emit：当我们组件内部需要发出事件时会用到emit（因为我们不能访问this，所以不可以通过 this.$emit发出事件）；
`App.vue`
```vue
<template>
  <div class="app">
    <!-- template中ref对象自动解包 -->
    <h2>当前计数: {{ counter }}</h2>
    <button @click="increment">+1</button>
    <button @click="decrement">-1</button>
  </div>
</template>

<script>
import { ref } from 'vue'
import useCounter from './hooks/useCounter'

export default {
  setup() {
    // 1.定义counter的内容
    // 默认定义的数据都不是响应式数据
    // let counter = ref(100)
    // const increment = () => {
    //   counter.value++
    //   console.log(counter.value)
    // }
    // const decrement = () => {
    //   counter.value--
    // }
    // const { counter, increment, decrement } = useCounter()

    return {
      ...useCounter()
    }
  }
}
</script>

<style>
</style>
```
`useCounter.js`
```js
import { ref } from 'vue'

export default function useCounter() {
  let counter = ref(100)
  const increment = () => {
    counter.value++
    console.log(counter.value)
  }
  const decrement = () => {
    counter.value--
  }

  return { counter, increment, decrement }
}
```

### 2 Reactive和Ref（一般使用Ref）

为在setup中定义的数据提供响应式的特性

`App.vue`

```vue
<template>
  <div>
    <h2>message: {{ message }}</h2>
    <button @click="changeMessage">修改message</button>
    <hr>
    <h2>账号: {{ account.username }}</h2>
    <h2>密码: {{ account.password }}</h2>
    <button @click="changeAccount">修改账号</button>
    <hr>
    <!-- 默认情况下在template中使用ref时, vue会自动对其进行解包(取出其中value) -->
    <h2>当前计数: {{ counter }}</h2>
    <button @click="increment">+1</button>
    <button @click="counter++">+1</button>

    <hr>
    <!-- 使用的时候不需要写.value -->
    <h2>当前计数: {{ info.counter }}</h2>
    <!-- 修改的时候需要写.value -->
    <button @click="info.counter.value++">+1</button>
  </div>
</template>

<script>
  import { reactive, ref } from 'vue'

  export default {
    setup() {
      // 1.定义普通的数据: 可以正常的被使用
      // 缺点: 数据不是响应式的
      let message = "Hello World"
      function changeMessage() {
        message = "你好啊,李银河!"
        console.log(message)
      }

      // 2.定义响应式数据
      // 2.1.reactive函数: 定义复杂类型的数据，不能传入普通类型 （开发中用得不算多）
      const account = reactive({
        username: "coderwhy",
        password: "123456"
      })
      function changeAccount() {
        account.username = "kobe"
      }

      // 2.2.ref函数: 定义简单类型的数据(也可以定义复杂类型的数据)
      // counter定义响应式数据
      const counter = ref(0)
      function increment() {
        counter.value++
      }

      // 3.ref是浅层解包
      const info = {
        counter
      }

      return {//对数据和方法进行返回，template中就能够进行绑定了
        message,
        changeMessage,
        account,
        changeAccount,
        counter,
        increment,
        info
      }
    }
  }
</script>

<style scoped>
</style>


```

`App2.vue`

```vue
<template>
  <div>
    <form>
      账号: <input type="text" v-model="account.username">
      密码: <input type="password" v-model="account.password">
    </form>
    
    <form>
      账号: <input type="text" v-model="username">
      密码: <input type="password" v-model="password">
    </form>

    <hr>

    <show-info :name="name" :age="age"></show-info>
  </div>
</template>

<script>
  import { onMounted, reactive, ref } from 'vue'
  import ShowInfo from './ShowInfo.vue'

  export default {
    components: {
      ShowInfo
    },
    data() {
      return {
        message: "Hello World"
      }
    },
    setup() {
      // 定义响应式数据: reactive/ref
      // 强调: ref也可以定义复杂的数据
      const info = ref({})
      console.log(info.value)

      // 1.reactive的应用场景
      // 1.1.条件一: reactive应用于本地的数据
      // 1.2.条件二: 多个数据之间是有关系/联系(聚合的数据, 组织在一起会有特定的作用)
      const account = reactive({
        username: "coderwhy",
        password: "1234567"
      })

      const username = ref("coderwhy")
      const password = ref("123456")

      // 2.ref的应用场景: 其他的场景基本都用ref(computed)
      // 2.1.定义本地的一些简单数据
      const message = ref("Hello World")
      const counter = ref(0)
      const name = ref("why")
      const age = ref(18)

      // 2.定义从网络中获取的数据也是使用ref
      // const musics = reactive([])
      const musics = ref([])
      onMounted(() => {
        const serverMusics = ["海阔天空", "小苹果", "野狼"]
        musics.value = serverMusics
      })


      return {
        account,
        username,
        password,
        name,
        age
      }
    }
  }
</script>

<style scoped>
</style>

```

### 3 任何组件都应该像纯函数一样，不应该修改传入的props

单向数据流的概念：子组件拿到数据后只能使用，不能修改。如果确实要修改，那么应该将事件传递出去，由父组件来修改数据
`ShowInfo.vue`

```vue
<template>
  <div>
    <h2>ShowInfo: {{ info }}</h2>
    <!-- 代码没有错误, 但是违背规范(单项数据流) -->
    <button @click="info.name = 'kobe'">ShowInfo按钮</button>
    <!-- 正确的做法: 符合单项数据流-->
    <button @click="showInfobtnClick">ShowInfo按钮</button>
    <hr>
    <!-- 使用readonly的数据 -->
    <h2>ShowInfo: {{ roInfo }}</h2>
    <!-- 代码就会无效(报警告) -->
    <!-- <button @click="roInfo.name = 'james'">ShowInfo按钮</button> -->
    <!-- 正确的做法 -->
    <button @click="roInfoBtnClick">roInfo按钮</button>
  </div>
</template>

<script>
  export default {
    props: {
      // reactive数据
      info: {
        type: Object,
        default: () => ({})
      },
      // readonly数据
      roInfo: {
        type: Object,
        default: () => ({})
      }
    },
    emits: ["changeInfoName", "changeRoInfoName"],
    setup(props, context) {
      function showInfobtnClick() {
        context.emit("changeInfoName", "kobe")
      }

      function roInfoBtnClick() {
        context.emit("changeRoInfoName", "james")
      }

      return {
        showInfobtnClick,
        roInfoBtnClick
      }
    }
  }
</script>

<style scoped>
</style>


```

`App.vue`

```vue
<template>
  <h2>App: {{ info }}</h2>
  <show-info :info="info" 
             :roInfo="roInfo" 
             @changeInfoName="changeInfoName"
             @changeRoInfoName="changeRoInfoName">
  </show-info>
</template>

<script>
  import { reactive, readonly } from 'vue'
  import ShowInfo from './ShowInfo.vue'

  export default {
    components: {
      ShowInfo
    },
    setup() {
      // 本地定义多个数据, 都需要传递给子组件
      // name/age/height
      const info = reactive({
        name: "why",
        age: 18,
        height: 1.88
      })

      function changeInfoName(payload) {
        info.name = payload
      }

      // 使用readOnly包裹info
      const roInfo = readonly(info)
      function changeRoInfoName(payload) {
        info.name = payload
      }

      return {
        info,
        changeInfoName,
        roInfo,
        changeRoInfoName
      }
    }
  }
</script>

<style scoped>
</style>


```

### 4 readonly()

Vue3为我们提供了readonly的方法； readonly会返回原始对象的只读代理（也就是它依然是一个Proxy，这是一个proxy的set方法被劫持，并且不能对其进行修 改）；

由于上一个要点，如果你担心别人会把你传进组件的数据直接改掉，可以用readonly对数据进行包裹之后再传进去。

### 5 其他函数
- isProxy
  检查对象是否是由 reactive 或 readonly创建的 proxy。
- isReactive
  检查对象是否是由 reactive创建的响应式代理：
  如果该代理是 readonly 建的，但包裹了由 reactive 创建的另一个代理，它也会返回 true；
- isReadonly
  检查对象是否是由 readonly 创建的只读代理。
- toRaw
  返回 reactive 或 readonly 代理的原始对象（不建议保留对原始对象的持久引用。请谨慎使用）。
- shallowReactive
  创建一个响应式代理，它跟踪其自身 property 的响应性，但不执行嵌套对象的深层响应式转换 (深层还是原生对象)。
- shallowReadonly
  创建一个 proxy，使其自身的 property 为只读，但不执行嵌套对象的深度只读转换（深层还是可读、可写的）。
- unref
 如果我们想要获取一个ref引用中的value，那么也可以通过unref方法：
   - 如果参数是一个 ref，则返回内部值，否则返回参数本身；
   - 这是 val = isRef(val) ? val.value : val 的语法糖函数；
- isRef
  
   判断值是否是一个ref对象。
- shallowRef
  
   创建一个浅层的ref对象；
- triggerRef
手动触发和 shallowRef 相关联的副作用：

### 6 toRefs()
如果我们使用ES6的解构语法，对reactive返回的对象进行解构获取值，那么之后无论是修改结构后的变量，还是修改reactive,返回的state对象，数据都不再是响应式的：
那么有没有办法让我们解构出来的属性是响应式的呢？

- Vue为我们提供了一个toRefs的函数，可以将reactive返回的对象中的属性都转成ref；
- 那么我们再次进行结构出来的 name 和 age 本身都是 ref的；
- 这种做法相当于已经在state.name和ref.value之间建立了 链接，任何一个修改都会引起另外一个变化；

```js
<script>
  import { reactive, toRefs, toRef } from 'vue'
  
  export default {
    setup() {

        const info = reactive({
          name: "why",
          age: 18,
          height: 1.88
        })

        // reactive被解构后会变成普通的值, 失去响应式
        // 当我们这样做的时候，会返回两个ref对象，它们是响应式的
        const { name, age } = toRefs(info)
        // 如果我们只希望转换一个reactive对象中的属性为ref, 那么可以使用toRef的方法
        const height = toRef(info, "height")

        return {
          name,
          age,
          height
        }

    }
  }

</script>
```

### 7 setup里面不可以使用this

在setup被调用之前，data，methods,computed等都没有被解析 ，this未指向当前的组件实例

### 8 setup中computed方法
computed返回的是一个ref对象
如何使用computed呢？
- 方式一：接收一个getter函数，并为 getter 函数返回的值，返回一个不变的 ref 对象；
- 方式二：接收一个具有 get 和 set 的对象，返回一个可变的（可读写）ref 对象；


```js
const fullname = computed(() => {
        return names.firstName + " " + names.lastName
      })
```
```js
const fullname = computed({
        set: function(newValue) {
          const tempNames = newValue.split(" ")
          names.firstName = tempNames[0]
          names.lastName = tempNames[1]
        },
        get: function() {
          return names.firstName + " " + names.lastName
        }
      })
```

### 9 Setup中ref引入元素

![img](/images/blog/2022/8.png)
在使用vue2的时候，我们需要获取dom元素，或者获取组件的相关方法属性，一般都是通过this.$refs[domName]的方式，但是在vue3的setup中是没有this的,那么如何获取$refs呢？

**借助 ref() 函数**
首先在setup中定义一个ref的变量，然后将该变量挂载到DOM上。

```vue
<script setup>
import {ref,onMounted} from 'vue'
let divRef = ref(null);//refs
onMounted(() => {
	console.log(divRef.value)
})
</script>
<template>
  <div class="home">
	<div ref="divRef">元素</div>
  </div>
</template>
```

ref将setup函数声明的变量变为响应式，包含且仅有一个value属性。

需要注意的是，调用divRef.value是需要在dom渲染后才能获取到，一般在回调的onMounted的方法中访问，在别的地方可以通过nextTick来实现访问，下面简单介绍下nextTick。

nextTick下调用$refs
nextTick将回调推迟到下一个DOM更新周期之后执行。在更改了一些数据以等待DOM更新后立即使用它。

```vue
<script setup>
import { ref, nextTick } from 'vue'
let divRef = ref(null);//refs
const init = async ()=> {
	await nextTick()
	console.log(divRef.value)
}
</script>
```

### 10 setup中的生命周期钩子

你可以通过在生命周期钩子前面加上 “on” 来访问组件的生命周期钩子。

下表包含如何在 setup ()内部调用生命周期钩子：

| 选项式 API        | Hook inside `setup` |
| ----------------- | ------------------- |
| `beforeCreate`    | Not needed*         |
| `created`         | Not needed*         |
| `beforeMount`     | `onBeforeMount`     |
| `mounted`         | `onMounted`         |
| `beforeUpdate`    | `onBeforeUpdate`    |
| `updated`         | `onUpdated`         |
| `beforeUnmount`   | `onBeforeUnmount`   |
| `unmounted`       | `onUnmounted`       |
| `errorCaptured`   | `onErrorCaptured`   |
| `renderTracked`   | `onRenderTracked`   |
| `renderTriggered` | `onRenderTriggered` |
| `activated`       | `onActivated`       |
| `deactivated`     | `onDeactivated`     |

*因为 `setup` 是围绕 `beforeCreate` 和 `created` 生命周期钩子运行的，所以不需要显式地定义它们。换句话说，在这些钩子中编写的任何代码都应该直接在 `setup` 函数中编写。



### 11 [setup中Provide函数和Inject函数（了解即可）](https://v3.cn.vuejs.org/guide/composition-api-provide-inject.html)

### 12 侦听数据的变化
在前面的Options API中，我们可以通过watch选项来侦听data或者props的数据变化，当数据变化时执行某一些操作。
在Composition API中，我们可以使用watchEffect和watch来完成响应式数据的侦听；

#### watch

watch需要侦听特定的数据源，并且执行其回调函数。默认情况下它是惰性的，只有当被侦听的源发生变化时才会执行回调；

```js
const name = ref("kobe")
  watch(name,(newValue, oldValue)=>{
    console.log(newValue, oldValue)
  })
  const changeName = () => {
    name.value='james'
  }
```

侦听器还可以使用数组同时侦听多个源：

```js
  const name = ref("kobe")
  const age=ref(18)
  const changeName = () => {
    name.value='james'
  }
  watch([name,age],(newValue, oldValue)=>{
    console.log(newValue, oldValue)
  })
```

如果我们希望侦听一个深层的侦听，那么依然需要设置 deep 为true. 也可以传入 immediate 立即执行；

```js
const info = reactive({
    name:"why",
    age:18,
    friend:{
      name:"kobe"
    }
  })
  watch(info, (newValue, oldValue) => {
    console.log(newValue, oldValue)
  }, {
    immediate: true,
    deep:true
  })
```

#### watchEffect
当侦听到某些响应式数据变化时，我们希望执行某些操作，这个时候可以使用 watchEffect。
 我们来看一个案例：
 首先，watchEffect传入的函数会被立即执行一次，并且在执行的过程中会收集依赖；
其次，只有收集的依赖发生变化时，watchEffect传入的函数才会再次执行；
如果在发生某些情况下，我们希望停止侦听，这个时候我们可以获取watchEffect的返回值函数，调用该函数即可。

```js
<script setup>
  import { watchEffect, watch, ref } from 'vue'
      const counter = ref(0)
      const name = ref("why")

      // watch(counter, (newValue, oldValue) => {})

      // 1.watchEffect传入的函数默认会直接被执行
      // 2.在执行的过程中, 会自动的收集依赖(依赖哪些响应式的数据)
      const stopWatch = watchEffect(() => {
        console.log("-------", counter.value, name.value)

        // 判断counter.value > 10
        if (counter.value >= 10) {
          stopWatch()
        }
      })
</script>
```

### 13 封装两个hooks

`useCounter.js`

```js
import { ref, onMounted } from 'vue'

export default function useCounter() {
  const counter = ref(0)
  function increment() {
    counter.value++
  }
  function decrement() {
    counter.value--
  }
  onMounted(() => {
    setTimeout(() => {
      counter.value = 989
    }, 1000);
  })

  return {
    counter,
    increment,
    decrement
  }
}
```

`useTitle.js`修改title

```js
import { ref, watch } from "vue";

export default function useTitle(titleValue) {
  // document.title = title

  // 定义ref的引入数据
  const title = ref(titleValue)

  // 监听title的改变
  watch(title, (newValue) => {
    document.title = newValue
  }, {
    immediate: true
  })

  // 返回ref值
  return title
}
```

`useScrollPosition.vue`监听界面滚动位置

```js
import { reactive } from 'vue'

export default function useScrollPosition() {
  // 1.使用reative记录位置
  const scrollPosition = reactive({
    x: 0,
    y: 0
  })

  // 2.监听滚动
  document.addEventListener("scroll", () => {
    scrollPosition.x = window.scrollX
    scrollPosition.y = window.scrollY
  })


  return {
    scrollPosition
  }
}
```

### 14 setup语法糖

`App.vue`

```vue
<script setup>
  // 1.所有编写在顶层中的代码, 都是默认暴露给template可以使用
  import { ref, onMounted } from 'vue'
  import ShowInfo from './ShowInfo.vue'  //组件只需导入即可，不需注册了

  // 2.定义响应式数据
  const message = ref("Hello World")
  console.log(message.value)

  // 3.定义绑定的函数
  function changeMessage() {
    message.value = "你好啊, 李银河!"
  }

  function infoBtnClick(payload) {
    console.log("监听到showInfo内部的点击:", payload)
  }

  // 4.获取组件实例
  const showInfoRef = ref()
  onMounted(() => {
    showInfoRef.value.foo()
  })
//不用写return了
</script>

```

`showInfo.vue`

```vue
<template>
  <div>ShowInfo: {{ name }}-{{ age }}</div>
  <button @click="showInfoBtnClick">showInfoButton</button>
</template>

<script setup>

// 定义props
const props = defineProps({
  name: {
    type: String,
    default: "默认值"
  },
  age: {
    type: Number,
    default: 0
  }
})

// 绑定函数, 并且发出事件
const emits = defineEmits(["infoBtnClick"])
function showInfoBtnClick() {
  emits("infoBtnClick", "showInfo内部发生了点击")
}

// 定义foo的函数
function foo() {
  console.log("foo function")
}
defineExpose({
  foo
})

</script>

<style scoped>
</style>


```




- 顶层的绑定会被暴露给模板
  当使用` <script setup>` 的时候，任何在 `<script setup> `声明的顶层的绑定 (包括变量，函数声明，以及 import 引入的内容) 
  都能在模板中直接使用：
- 导入的组件直接使用
  组件只需导入即可，不需注册了
- defineProps() 和 defineEmits()
  用来代替原来的props（定义在子组件中让别人传进来） 和 emits 选项
- defineExpose()
  父组件调用子组件实例的某个方法，要在子组件中通过defineExpose()把需要暴露的东西放进去



### 15 组件名一定要大驼峰

## Vue-Router前端路由

### 前端路由

https://juejin.cn/post/6844903890278694919

最开始的网页是多页面的，直到 Ajax 的出现，才慢慢有了 SPA。
SPA 的出现大大提高了 WEB 应用的交互体验。在与用户的交互过程中，不再需要重新刷新页面，获取数据也是通过 Ajax 异步获取，页面显示变的更加流畅。

但由于 SPA 中用户的交互是通过 JS 改变 HTML 内容来实现的，页面本身的 url 并没有变化，这导致了两个问题：
1. SPA 无法记住用户的操作记录，无论是刷新、前进还是后退，都无法展示用户真实的期望内容。
2. SPA 中虽然由于业务的不同会有多种页面展示形式，但只有一个 url，对 SEO 不友好，不方便搜索引擎进行收录。
    前端路由就是为了解决上述问题而出现的。
    ![img](/images/blog/2022/前端路由阶段.png)什么是前端路由，什么是后端路由，以及它们有什么异同？

**后端路由**：当在地址栏切换不同的ur时，都会向服务器发送一个请求，服务器响应这个请求，并在服务端拼接好html文件返回给页面来展示。 优点：减轻了前端的压力，html都由后端拼接； 缺点：依赖于网络，网速慢，用户体验很差，项目比较庞大时，服务器端压力较大，不能在地址栏输入指定的url访问相应的模块，前后端不分离。前端路由的由来

**前端路由是指**：
不同的url地址对应到不同的内容或页面这个任务是由前端来完成的，就是前端路由，前端路由是不会刷新页面的，随着SPA单页应用的普及，以及前后端分离，现在的项目基本上都是前端路由。 优点：前后端的彻底分离，不刷新页面，用户体验较好，页面持久性较好，比如音乐网站，当你播放了一个歌曲后，切换了页面，播放不会中断。这都是spa的好处

简单的说，就是在保证只有一个 HTML 页面，且与用户交互时不刷新和跳转页面的同时，为 SPA 中的每个视图展示形式匹配一个特殊的 url。在刷新、前进、后退和SEO时均通过这个特殊的 url 来实现。
为实现这一目标，我们需要做到以下二点：
1. 改变 url 且不让浏览器像服务器发送请求。
2. 可以监听到 url 的变化
接下来要介绍的 hash 模式和 history 模式，就是实现了上面的功能

#### hash 模式

这里的 hash 就是指 url 后的 # 号以及后面的字符，本质上是改变window.location的href属性。比如说 "[www.baidu.com/#hashhash](https://link.juejin.cn?target=http%3A%2F%2Fwww.baidu.com%2F%23hashhash)" ，其中 "#hashhash" 就是我们期望的 hash 值。

由于 hash 值的变化不会导致浏览器像服务器发送请求，而且 hash 的改变会触发 hashchange 事件，浏览器的前进后退也能对其进行控制，所以在 H5 的 history 模式出现之前，基本都是使用 hash 模式来实现前端路由。

#### history 模式

在 HTML5 之前，浏览器就已经有了 history 对象。但在早期的 history 中只能用于多页面的跳转：

```scss
history.go(-1);       // 后退一页
history.go(2);        // 前进两页
history.forward();     // 前进一页
history.back();      // 后退一页
复制代码
```

在 HTML5 的规范中，history 新增了以下几个 API：

```scss
history.pushState();         // 添加新的状态到历史状态栈
history.replaceState();      // 用新的状态代替当前状态
history.state                // 返回当前状态对象
复制代码
```

来自MDN的解释：

> HTML5引入了 history.pushState() 和 history.replaceState() 方法，它们分别可以添加和修改历史记录条目。这些方法通常与window.onpopstate 配合使用。

history.pushState() 和 history.replaceState() 均接收三个参数（state, title, url）

参数说明如下：

1. state：合法的 Javascript 对象，可以用在 popstate 事件中
2. title：现在大多浏览器忽略这个参数，可以直接用 null 代替
3. url：任意有效的 URL，用于更新浏览器的地址栏

history.pushState() 和 history.replaceState() 的区别在于：

- history.pushState() 在保留现有历史记录的同时，将 url 加入到历史记录中。
- history.replaceState() 会将历史记录中的当前页面历史替换为 url。

由于 history.pushState() 和 history.replaceState() 可以改变 url 同时，不会刷新页面，所以在 HTML5 中的 histroy 具备了实现前端路由的能力。

回想我们之前完成的 hash 模式，当 hash 变化时，可以通过 hashchange 进行监听。 而 history 的改变并不会触发任何事件，所以我们无法直接监听 history 的改变而做出相应的改变。

所以，我们需要换个思路，我们可以罗列出所有可能触发 history 改变的情况，并且将这些方式一一进行拦截，变相地监听 history 的改变。

对于单页应用的 history 模式而言，url 的改变只能由下面四种方式引起：

1. 点击浏览器的前进或后退按钮
2. 点击 a 标签
3. 在 JS 代码中触发 history.pushState 函数
4. 在 JS 代码中触发 history.replaceState 函数

### Vue Router

Vue Router 是 Vue.js 的官方路由：

- 它与 Vue.js 核心深度集成，让用 Vue.js 构建单页应用（SPA）变得非常容易；
- 目前Vue路由最新的版本是4.x版本，我们上课会基于最新的版本讲解；

vue-router是基于路由和组件的
- 路由用于设定访问路径, 将路径和组件映射起来；
- 在vue-router的单页面应用中, 页面的路径的改变就是组件的切换；
 安装Vue Router：
  npm install vue-router

#### 1.使用vue-router的步骤:
- 第一步：创建路由需要映射的组件（打算显示的页面）；
- 第二步：通过createRouter创建路由对象，并且传入routes和history模式；
  - 配置路由映射: 组件和路径映射关系的routes数组；
  - 创建基于hash或者history的模式；
- 第三步：使用app注册路由对象（use方法）；
- 第四步：路由使用: 通过`<router-link>`和`<router-view>`；
![img](/images/blog/2022/路由的基本使用流程.png)


举个例子：

vue项目src目录下文件树如下

└─src
    │  App.vue
    │  main.js
    │
    ├─router
    │      index.js
    │
    └─Views
            About.vue
            Home.vue
            HomeRanking.vue
            HomeRecommend.vue
            NotFound.vue
            User.vue

`index.js`

```js
import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'

// import Home from '../Views/Home.vue'
// import About from '../Views/About.vue'

// 路由的懒加载
// 里面/* */注释会被webpack读取到
// const Home = () => import(/* webpackChunkName: 'home' */"../Views/Home.vue")
// const About = () => import(/* webpackChunkName: 'about' */"../Views/About.vue")

// 创建一个路由: 映射关系
const router = createRouter({
  // 指定采用的模式: hash
  history: createWebHashHistory(),
  // history: createWebHistory(),
  // 映射关系
  routes: [
    { 
      //redirect是重定向, 也就是我们将根路径重定向到/home的路径下.可以让路径默认跳到到首页, 并且<router-view>渲染首页组件
      path: "/", 
      redirect: "/home" 
    },
    { 
      name: "home",
      path: "/home", 
      component: () => import(/* webpackChunkName: 'home' */"../Views/Home.vue")//路由的懒加载和下面放在一起
      meta: {
        name: "why",
        age: 18
      },
      children: [
        {
          path: "/home",
          redirect: "/home/recommend"
        },
        {
          path: "recommend", // /home/recommend
          component: () => import("../Views/HomeRecommend.vue")
        },
        {
          path: "ranking", // /home/ranking
          component: () => import("../Views/HomeRanking.vue")
        },
      ]
    },
    { 
      name: "about",
      path: "/about", 
      component: () => import(/* webpackChunkName: 'home' */"../Views/Home.vue") 
    },
    {
      //动态路由
      path: "/user/:id",
      component: () => import("../Views/User.vue")
    },
    {
      // abc/cba/nba
      path: "/:pathMatch(.*)*",
      component: () => import("../Views/NotFound.vue")
    }
  ]
})

export default router

```

`main.js`

```js
import { createApp } from 'vue'
import router from './router'
import App from './App.vue'

const app = createApp(App)
app.use(router)
app.mount('#app')

```

`App.vue`

```vue
<template>
  <div class="app">
    <h2>App Content</h2>
    <div class="nav">
      //设置replace 属性的话，每次切换的路径不会记录到历史记录里了
      <router-link to="/home" replace>首页</router-link>
      //设置active-class属性：在激活的a元素上应用一个class，默认是router-link-active，也可以改
      <router-link to="/about" replace active-class="active">关于</router-link>

      <router-link to="/user/123">用户123</router-link>
      <router-link to="/user/321">用户321</router-link>

      <!-- 其他元素跳转 -->
      <span @click="homeSpanClick">首页</span>
      <button @click="aboutBtnClick">关于</button>
    </div>
      <!-- 占位组件 -->
    <router-view></router-view>
  </div>
</template>

<script setup>
  import { useRouter } from 'vue-router'

  const router = useRouter()

  // 监听元素的点击
  function homeSpanClick() {
    // 跳转到首页
    // router.push("/home")
    router.push({
      // name: "home"
      path: "/home"
    })
  }
  function aboutBtnClick() {
    // 跳转到关于
    router.push({
      path: "/about",
      query: {
        name: "why",
        age: 18
      }
    })
  }

</script>

<style>

  .router-link-active {
    color: red;
    font-size: 20px;
  }

  .active {
    color: red;
    font-size: 20px;
  }

</style>

```

`home.vue`

```vue
<template>
  <div class="home">
    <h2>Home</h2>

    <div class="home-nav">
      <router-link to="/home/recommend">推荐</router-link>
      <router-link to="/home/ranking">排行</router-link>
    </div>

    <!-- 占位组件 -->
    <router-view></router-view>
  </div>
</template>

<script setup>

</script>

<style scoped>
</style>

```

#### 2.路由懒加载
- 当打包构建应用时，JavaScript 包会变得非常大，影响页面加载：
  - 如果我们能把不同路由对应的组件分割成不同的代码块，然后当路由被访问的时候才加载对应组件，这样就会更加高效；
  - 也可以提高首屏的渲染效率；
- 其实这里还是我们前面讲到过的webpack的分包知识，而Vue Router默认就支持动态来导入组件：
  - 这是因为component可以传入一个组件，也可以接收一个函数，该函数 需要放回一个Promise；
  - 而import函数就是返回一个Promise；

路由的其他属性：

- name属性：路由记录独一无二的名称；
- meta属性：自定义的数据

#### 3.动态路由
很多时候我们需要将给定匹配模式的路由映射到同一个组件,它的路径就不能写死
例如，我们可能有一个 User 组件，它应该对所有用户进行渲染，但是用户的ID是不同的；
在Vue Router中，我们可以在路径中使用一个动态字段来实现，我们称之为 路径参数；

```js
  {
      path: "/user/:id",
      component: () => import("../Views/User.vue")
    },
```
在router-link中进行如下跳转：
```vue
  <router-link to="/user/123">用户123</router-link>
```
```vue
  <router-link to="/user/321">用户321</router-link>
```
**那么在User中如何获取到对应的值呢?**
在template中，直接通过 $route.params获取值；
- 在created中，通过 this.$route.params获取值；
- 在setup中，我们要使用 vue-router库给我们提供的一个hook useRoute；该Hook会返回一个Route对象，对象中保存着当前路由相关的值；
```vue
<template>
  <div class="user">
    <!-- 1.在模板中获取到id -->
    <h2>User: {{ $route.params.id }}</h2>
  </div>
</template>

<script setup>
  import { useRoute, onBeforeRouteUpdate } from 'vue-router'
  //2.在脚本中获取id
  const route = useRoute()
  console.log(route.params.id)

  // 获取route跳转id（见下文 导航守卫）
  onBeforeRouteUpdate((to, from) => {
    console.log("from:", from.params.id)
    console.log("to:", to.params.id)
  })

</script>

<style scoped>
</style>
```

#### 4.导航守卫

导航守卫又称路由守卫，实时监控路由跳转时的过程，在路由跳转的各个过程执行相应的操作，类似于生命周期函数，在开发过程中经常被使用，比如用户点击一个页面，如果未登录就调到登录页面，已登录就让用户正常进入。
全局路由一共分为三类：全局守卫，路由独享的守卫，组件内的守卫。

##### 4.1全局守卫

```
全局守卫有三种：
    1.router.beforeEach（全局前置守卫）
    2.router.beforeResolve（全局解析守卫）
    3.router.afterEach（全局后置守卫）
```



###### 4.1.1router.beforeEach（全局前置守卫）

以一个简单的例子来解释router.beforeEach
假设我们现在做一个这样的需求，用户在未登录的时候进入任意页面，我们就让用户跳转到登录页面，在已登录的时候让用户正常跳
转到点击的页面。

准备好三个组件：`home.vue`,`login.vue`,`about.vue`

home.vue的内容：

```vue
<template>
  <div class="hello">
    <button @click="$router.push('/about')">去关于页面</button>
  </div>
</template>
<script>
  export default {
    name: 'home',
    data() {
      return {}
    }
  }
</script>
<style scoped>
</style>
```

login.vue的内容：

```vue
<template>
    <div>登录页面</div>
</template>
<script>
    export default {
        name: "about"
    }
</script>
<style scoped>
</style>
```

about.vue的内容：
```VUE
<template>
    <div>关于页面</div>
</template>
<script>
    export default {
        name: "about"
    }
</script>
<style scoped>
</style>
```

router配置文件内容：

```JS
import Vue from 'vue'
import Router from 'vue-router'
import home from '@/components/home'
import login from '@/components/login'
import about from '@/components/about'

Vue.use(Router)
const ISLOGIN = true   //登录状态模拟
const router = new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: home,
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/about',
      name: 'about',
      component: about
    }
  ]
})

router.beforeEach((to, from, next) => {   //全局全局前置守卫
  //to : 将要进入的目标路由对象
  //from : 即将离开的目标路由对象
  //执行跳转的下一步钩子
  console.log(to)
  console.log(from)
  if(to.name != 'login'){ //如果不是登录页面
    if(ISLOGIN)next()   //已登录就执行跳转
    else next({name:'login'})   //否则跳转到登录页面
  }else{ //如果是登录页面
    if(ISLOGIN)next({name:'/'}) //已登录就跳转到首页
    else  next()  //否则正常进入登录页面
  }
})
export default router
```

我们可以看到，每次路由跳转，router.beforeEach都会执行，并且接受三个参数，to记录着将要进入的目标路由对象的详细，from记录着即将离开的目标路由对象的信息，next()表示执行下一步，router.beforeEach就是全局路由跳转时触发执行的函数。

###### 4.1.2.router.beforeResolve(全局解析守卫)

和全局前置守卫类似，区别是在跳转被确认之前，同时在所有组件内守卫和异步路由组件都被解析之后，解析守卫才调用。

###### 4.1.3.router.afterEach(全局后置钩子)

只接受to和from,不会接受 next 函数也不会改变导航本身

##### 4.2、路由独享守卫

独享守卫只有一种:beforeEnter。
该守卫接收的参数与全局守卫是一样的，但是该守卫只在其他路由跳转至配置有beforeEnter路由表信息时才生效。
router配置文件内容：

```JS
{
   path: '/about',
   name: 'about',
   component: about,
   beforeEnter:(to,from,next)=>{
      console.log(to);
      console.log(from);
      next()
   }
```

##### 4.3、组件内守卫

组件内守卫一共有三个：

```
 	beforeRouteEnter，
    beforeRouteUpdate，
    beforeRouteLeave
```

三者分别对应：进入该路由时执行，该路由中参数改变时执行，离开该路由时执行。

```VUE
<template>
  <div>关于页面</div>
</template>
<script>
  export default {
    name: "about",
    beforeRouteEnter(to, from, next) {
      //进入该路由时执行
    },
    beforeRouteUpdate(to, from, next) {
      //该路由参数更新时执行
    },
    beforeRouteLeave(to, from, next) {
      //离开该路由时执行
    }
  }
</script>
<style scoped>
</style>
```


完整的导航解析流程

1. 导航被触发。
2. 在失活的组件里调用 `beforeRouteLeave` 守卫。
3. 调用全局的 `beforeEach` 守卫。
4. 在重用的组件里调用 `beforeRouteUpdate` 守卫(2.2+)。
5. 在路由配置里调用 `beforeEnter`。
6. 解析异步路由组件。
7. 在被激活的组件里调用 `beforeRouteEnter`。
8. 调用全局的 `beforeResolve` 守卫(2.5+)。
9. 导航被确认。
10. 调用全局的 `afterEach` 钩子。
11. 触发 DOM 更新。
12. 调用 `beforeRouteEnter` 守卫中传给 `next` 的回调函数，创建好的组件实例会作为回调函数的参数传入。

#### 5.NotFound

对于那些没有匹配到的路由，我们通常会匹配到固定的某个页面
这个时候我们可编写一个动态路由用于匹配所有的页面
我们可以通过 $route.params.pathMatch获取到传入的参数

```js
    {
      //  /后面匹配任何东西
      path: "/:pathMatch(.*)*",
      component: () => import("../Views/NotFound.vue")
    }
```

在/:pathMatch(.*)后面又加了一个  *，加 * 和不加 * 的区别在于解析的时候，是否解析 /：
![img](/images/blog/2022/匹配规则.png)


`NotFound.vue`

```vue
<template>
  <div class="not-found">
    <h2>NotFound: 您当前的路径{{ $route.params.pathMatch }}不正确, 请输入正确的路径!</h2>
  </div>
</template>

<script setup>
</script>

<style scoped>

  .not-found {
    color: red;
  }

</style>
```

#### 6.路由的嵌套
什么是路由的嵌套呢？
	目前我们匹配的Home、About、User等都属于第一层路由，我们在它们之间可以来回进行切换；
但是呢，我们Home页面本身，也可能会在多个组件之间来回切换：
	比如Home中包括Product、Message，它们可以在Home内部来回切换；
	这个时候我们就需要使用嵌套路由，在Home中也使用 router-view 来占位之后需要渲染的组件

```js
routes: [
    { 
      path: "/", 
      redirect: "/home" 
    },
    { 
      name: "home",
      path: "/home", 
      component: () => import("../Views/Home.vue"),
      meta: {
        name: "why",
        age: 18
      },
        //增加children数组来配置home页面下的子组件路由切换
      children: [
        {
          path: "/home",
          redirect: "/home/recommend"
        },
        {
          path: "recommend", // /home/recommend
          component: () => import("../Views/HomeRecommend.vue")
        },
        {
          path: "ranking", // /home/ranking
          component: () => import("../Views/HomeRanking.vue")
        },
      ]
    },
    { 
      name: "about",
      path: "/about", 
      component: () => import("../Views/About.vue") 
    },
    {
      path: "/user/:id",
      component: () => import("../Views/User.vue")
    },
    {
      //  /后面匹配任何东西
      path: "/:pathMatch(.*)*",
      component: () => import("../Views/NotFound.vue")
    }
  ]
```

#### 7.代码来完成页面的跳转

不通过routes中映射关系的配置和`<router-link>`进行跳转，而使用代码来完成页面的跳转。比如通过点击一个button元素
`App.vue`中

```vue
  <!-- 其他元素跳转 -->
      <span @click="homeSpanClick">首页</span>
      <button @click="aboutBtnClick">关于</button>
```

```vue
<script setup>
  import { useRouter } from 'vue-router'

  const router = useRouter()

  // 监听元素的点击
  function homeSpanClick() {
    // 跳转到首页
    router.push("/home")
  }
  function aboutBtnClick() {
    // 跳转到关于
    // 这种写法可以在query中传参数
    router.push({//push和replace的区别：一个是保留历史记录，一个不保留
      path: "/about",
      query: {
        name: "why",
        age: 18
      }
    })
  }

</script>
```

`About.vue`中可以收到传过来的参数

```vue
 <h2>About: {{ $route.query }}</h2>
```

`About.vue`中还可以加一个返回按钮，

```vue
 <button @click="backBtnClick">返回</button>
```

```vue
<script setup>
  import { useRouter } from 'vue-router'

  const router = useRouter()

  function backBtnClick() {
    // router.back()   //返回
    // router.forward()   //向前一步

    // go(delta)    //向前或向后n步
    // go(1) -> forward()
    // go(-1) -> back()
    router.go(-1)
  }

</script>
```

#### 8.动态添加路由
某些情况下我们可能需要动态的来添加路由：比如根据用户不同的权限，注册不同的路由。
这个时候我们可以使用一个方法 addRoute；

├─router
│      index.js

```js
......

// 1.动态管理路由
let isAdmin = true //在公司实际操作中应该是去动态获取的数据
if (isAdmin) {
  // 一级路由
  router.addRoute({
    path: "/admin",
    component: () => import("../Views/Admin.vue")
  })

  // 在home中添加vip子页面
  router.addRoute("home", {
    path: "vip",
    component: () => import("../Views/HomeVip.vue")
  })
}

// 获取router中所有的映射路由对象
console.log(router.getRoutes())


// 2.路由导航守卫
// 进行任何的路由跳转之前, 传入的beforeEach中的函数都会被回调
// 需求: 进入到订单(order)页面时, 判断用户是否登录(isLogin -> localStorage保存token)
// 情况一: 用户没有登录, 那么跳转到登录页面, 进行登录的操作
// 情况二: 用户已经登录, 那么直接进入到订单页面
router.beforeEach((to, from) => {
  // 1.进入到任何别的页面时, 都跳转到login页面
  // if (to.path !== "/login") {
  //   return "/login"
  // }

  // 2.进入到订单页面时, 判断用户是否登录
  const token = localStorage.getItem("token")
  if (to.path === "/order" && !token) {
    return "/login"
  }
})


export default router

```
删除路由有以下三种方式：
方式一：添加一个name相同的路由；
方式二：通过removeRoute方法，传入路由的名称；
方式三：通过addRoute方法的返回值回调；
路由的其他方法补充：
router.hasRoute()：检查路由是否存在。
router.getRoutes()：获取一个包含所有路由记录的数组。

#### 9.导航守卫 补充
vue-router 提供的导航守卫主要用来通过跳转或取消的方式守卫导航。
全局的前置守卫beforeEach是在导航触发时会被回调的：
- 它有两个参数：
  - to：即将进入的路由Route对象；
  - from：即将离开的路由Route对象；
- 它有返回值：
  - false：取消当前导航；
  - 不返回或者undefined：进行默认导航；
  - 返回一个路由地址：可以是一个string类型的路径；也可以是一个对象，对象中包含path、query、params等信息；

 **比如我们完成一个功能，只有登录后才能看到其他页面：**

src
    │  App.vue
    │  main.js
    │
    ├─router
    │      index.js
    │
    └─Views
            About.vue
            Admin.vue
            Home.vue
            HomeRanking.vue
            HomeRecommend.vue
            HomeVip.vue
            Login.vue
            NotFound.vue
            Order.vue
            User.vue
`index.js`中添加代码

```js
    {
      path: "/login",
      component: () => import("../Views/Login.vue")
    },
```

```js
// 2.路由导航守卫
// 进行任何的路由跳转之前, 传入的beforeEach中的函数都会被回调
// 需求: 进入到订单(order)页面时, 判断用户是否登录(isLogin -> localStorage保存token)
// 情况一: 用户没有登录, 那么跳转到登录页面, 进行登录的操作
// 情况二: 用户已经登录, 那么直接进入到订单页面
router.beforeEach((to, from) => {
  // 1.进入到任何别的页面时, 都跳转到login页面
  // if (to.path !== "/login") {
  //  //跳转到login页面  
  //   return "/login"
  // }

  // 2.进入到订单页面时, 判断用户是否登录
  const token = localStorage.getItem("token")
  if (to.path === "/order" && !token) {
    return "/login"
  }
})


export default router
```

`Login.vue`

```vue
<template>
  <div class="login">
    <h2>登录页面</h2>
    <button @click="loginClick">登录</button>
  </div>
</template>

<script setup>

  import { useRouter } from 'vue-router'

  const router = useRouter()

  function loginClick() {
    // 向服务器发送请求, 服务器会返回token
    localStorage.setItem("token", "coderwhy")

    // 跳转到order页面
    router.push("/order")
  }

</script>

<style scoped>
</style>

```

`Home.vue`

```vue
    <button @click="logoutClick">退出登录</button>
```

```vue
<script setup>

  function logoutClick() {
    localStorage.removeItem("token")   //退出登录只需remove token
  }

</script>
```

## Vuex状态管理

### 1.认识应用状态管理

**什么是状态管理**
在开发中，我们会的应用程序需要处理各种各样的数据，这些数据需要保存在我们应用程序中的某一个位置，对于这些数据的管理我们就 称之为是 状态管理。

**在前面我们是如何管理自己的状态呢**？
	在Vue开发中，我们使用组件化的开发方式；
- 而在组件中我们定义**data**或者在setup中返回使用的数据，这些数
  据我们称之为**state**；
- 在**模块template**中我们可以使用这些数据，模块最终会被渲染成
  DOM，我们称之为**View**；
- 在模块中我们会产生一些**行为事件**，处理这些行为事件时，有可能
  会修改state，这些行为事件我们称之为**actions**；

复杂的状态管理

JavaScript需要管理的状态越来越多，越来越复杂；这些状态包括服务器返回的数据、缓存数据、用户操作产生的数据等等；也包括一些UI的状态，比如某些元素是否被选中，是否显示加载动效，当前分页。
我们将组件的内部状态抽离出来，以一个全局单例的方式来管理
在这种模式下，我们的组件树构成了一个巨大的 “试图View”；不管在树的哪个位置，任何组件都能获取状态或者触发行为；通过定义和隔离状态管理中的各个概念，并通过强制性的规则来维护视图和状态间的独立性，我们的代码边会变得更加结构化和易于维护、跟踪；
![img](/images/blog/2022/组件中复杂状态的管理方式.png)

### 2.核心概念State

#### 2.1 Vuex的基本使用

安装vuex

```
npm install vuex
```

创建store文件夹   

```
src-store-index.js
```

`index.js`

```js
import { createStore } from 'vuex'
import { CHANGE_INFO } from './mutation_types'

const store = createStore({
  state: () => ({
    counter: 100,
  })  
})

export default store
```

在组件中使用

```vue
<template>
  <div class="app">
    <h2>Home当前计数: {{ $store.state.counter }}</h2>
    <h2>Computed当前计数: {{ storeCounter }}</h2>
    <h2>Setup当前计数: {{ counter }}</h2>
    <button @click="increment">+1</button>
  </div>
</template>

<script>
//options api中使用store
  export default {
    computed: {
      storeCounter() {
        return this.$store.state.counter
      }
    }
  }
</script>

<script setup>
  import { toRefs } from 'vue'
  import { useStore } from 'vuex'
//在setup中使用store
  const store = useStore()
  const { counter } = toRefs(store.state)  //加上toRefs，counter才会变成响应式的，不然就会丢失响应式
  
  function increment() {
    // store.state.counter++
    store.commit("increment")
  }
</script>

<style scoped>
</style>
```

**Vuex和单纯的全局对象有什么区别呢？**
第一：Vuex的状态存储是响应式的
	当Vue组件从store中读取状态的时候，若store中的状态发生变化，那么相应的组件也会被更新；
第二：你不能直接改变store中的状态（能够修改成功但vuex不建议这样做）
	改变store中的状态的唯一途径就显示提交 (commit) mutation；
	这样使得我们可以方便的跟踪每一个状态的变化，从而让我们能够通过一些工具帮助我们更好的管理应用的状态；

#### 2.2 mapState

```vue
<template>
  <div class="app">
    <button @click="incrementLevel">修改level</button>
    <!-- 1.在模板中直接使用多个状态 -->
    <h2>name: {{ $store.state.name }}</h2>
    <h2>level: {{ $store.state.level }}</h2>
    <h2>avatar: {{ $store.state.avatarURL }}</h2>

    <!-- 2.计算属性(映射状态: 数组语法) -->
    <!-- <h2>name: {{ name() }}</h2>
    <h2>level: {{ level() }}</h2> -->

    <!-- 3.计算属性(映射状态: 对象语法) -->
    <!-- <h2>name: {{ sName }}</h2>
    <h2>level: {{ sLevel }}</h2> -->
    
    <!-- 4.setup计算属性(映射状态: 对象语法) -->
    <h2>name: {{ name }}</h2>
    <h2>level: {{ level }}</h2>
  </div>
</template>

<script>
  import { mapState } from 'vuex'

  export default {
    computed: {
      fullname() {
        return "xxx"
      },
      // name() {
      //   return this.$store.state.name
      // },
      ...mapState(["name", "level", "avatarURL"]),  //返回的是一个个函数
      ...mapState({
        sName: state => state.name,
        sLevel: state => state.level
      })
    }
  }
</script>

<script setup>
  // import { computed, toRefs } from 'vue'
  import { mapState, useStore } from 'vuex'
  // import useState from "../hooks/useState"

  // 1.一步步完成
  // const { name, level } = mapState(["name", "level"])
  // const store = useStore()
  // const cName = computed(name.bind({ $store: store }))
  // const cLevel = computed(level.bind({ $store: store }))

  // 2.使用自己封装的函数useState
  // const { name, level } = useState(["name", "level"])

  // 3.(推荐)直接对store.state进行解构,不用mapState了
  const store = useStore()
  const { name, level } = toRefs(store.state)

  function incrementLevel() {
    store.state.level++
  }

</script>

<style scoped>
</style>


```

### 3.核心概念Getters

#### 3.1 getters基本使用

某些属性我们可能需要经过变化后来使用，这个时候可以使用getters

```vue
<template>
  <div class="app">
    <!-- <button @click="incrementLevel">修改level</button> -->
    <h2>doubleCounter: {{ $store.getters.doubleCounter }}</h2>
    <h2>friendsTotalAge: {{ $store.getters.totalAge }}</h2>
    <h2>message: {{ $store.getters.message }}</h2>

    <!-- 根据id获取某一个朋友的信息 -->
    <h2>id-111的朋友信息: {{ $store.getters.getFriendById(111) }}</h2>
    <h2>id-112的朋友信息: {{ $store.getters.getFriendById(112) }}</h2>
  </div>
</template>

<script>
  export default {
    computed: {
    }
  }
</script>

<script setup>

</script>

<style scoped>
</style>


```

```js
import { createStore } from 'vuex'
import { CHANGE_INFO } from './mutation_types'

const store = createStore({
  state: () => ({
    counter: 100,
    name: "coderwhy",
    level: 100,
    avatarURL: "http://xxxxxx",
    friends: [
      { id: 111, name: "why", age: 20 },
      { id: 112, name: "kobe", age: 30 },
      { id: 113, name: "james", age: 25 }
    ]
  }),
  getters: {
    // 1.基本使用
    doubleCounter(state) {
      return state.counter * 2
    },
    totalAge(state) {
      return state.friends.reduce((preValue, item) => {
        return preValue + item.age
      }, 0)
    },
    // 2.在该getters属性中, 获取其他的getters
    message(state, getters) {
      return `name:${state.name} level:${state.level} friendTotalAge:${getters.totalAge}`
    },
    // 3.getters是可以返回一个函数的, 调用这个函数可以传入参数(了解)
    getFriendById(state) {
      return function(id) {
        const friend = state.friends.find(item => item.id === id)
        return friend
      }
    }
  },
  mutations: {
    increment(state) {
      state.counter++
    },
    changeName(state, payload) {
      state.name = payload
    },
    incrementLevel(state) {
      state.level++
    },
    [CHANGE_INFO](state, newInfo) {
      state.level = newInfo.level
      state.name = newInfo.name

      // 重要的原则: 不要在mutation方法中执行异步操作
      // fetch("xxxx").then(res => {
      //   res.json().then(res => {
      //     state.name = res.name
      //   })
      // })
    }
  }
})

export default store

```

#### 3.2 mapGetters

```vue
<template>
  <div class="app">
    <button @click="changeAge">修改name</button>

    <h2>doubleCounter: {{ doubleCounter }}</h2>
    <h2>friendsTotalAge: {{ totalAge }}</h2>
    <h2>message: {{ message }}</h2>

    <!-- 根据id获取某一个朋友的信息 -->
    <h2>id-111的朋友信息: {{ getFriendById(111) }}</h2>
    <h2>id-112的朋友信息: {{ getFriendById(112) }}</h2>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    computed: {
      ...mapGetters(["doubleCounter", "totalAge"]),
      ...mapGetters(["getFriendById"])
    }
  }
</script>

<script setup>

  import { computed, toRefs } from 'vue';
  import { mapGetters, useStore } from 'vuex'

  const store = useStore()

  // 1.使用mapGetters
  // const { message: messageFn } = mapGetters(["message"])
  // const message = computed(messageFn.bind({ $store: store }))

  // （推荐）2.直接解构, 并且包裹成ref，不使用mapGetters
  // const { message } = toRefs(store.getters)

  // 3.针对某一个getters属性使用computed
  const message = computed(() => store.getters.message)

  function changeAge() {
    store.state.name = "kobe"
  }

</script>

<style scoped>
</style>

```

###  4.核心概念Mutations

修改state的唯一方法是提交 mutation

#### 4.1 基本使用

```js
mutations: {
    increment(state) {
      state.counter++
    },
    changeName(state, payload) {//除了state外，还可接收其他的参数
      state.name = payload
    },
    incrementLevel(state) {
      state.level++
    }
      // 重要的原则: 不要在mutation方法中执行异步操作
      // fetch("xxxx").then(res => {
      //   res.json().then(res => {
      //     state.name = res.name
      //   })
      // })
    //这是因为devtool工具会记录mutation的日记；
    //每一条mutation被记录，devtools都需要捕捉到前一状态和后一状态的快照；
    //但是在mutation中执行异步操作，就无法追踪到数据的变化；
    }
  }
```

```vue
<script>

  import { CHANGE_INFO } from "@/store/mutation_types"

  export default {
    computed: {
    },
    methods: {
      changeName() {
        // this.$store.state.name = "李银河"
        this.$store.commit("changeName", "王小波")
      },
      incrementLevel() {
        this.$store.commit("incrementLevel")
      },
      changeInfo() {
        this.$store.commit(CHANGE_INFO, {
          name: "王二",
          level: 200
        })
      }
    }
  }
</script>
```

#### 4.2 mapMutations

```vue
<template>
  <div class="app">
    <button @click="changeName('王小波')">修改name</button>
    <button @click="incrementLevel">递增level</button>
    <button @click="changeInfo({ name: '王二', level: 200 })">修改info</button>
    <h2>Store Name: {{ $store.state.name }}</h2>
    <h2>Store Level: {{ $store.state.level }}</h2>
  </div>
</template>

<script>
  import { mapMutations } from 'vuex'
  import { CHANGE_INFO } from "@/store/mutation_types"

  export default {
    computed: {
    },
    methods: {
      btnClick() {
        console.log("btnClick")
      },
      // ...mapMutations(["changeName", "incrementLevel", CHANGE_INFO])
    }
  }
</script>

<script setup>

  import { mapMutations, useStore } from 'vuex'
  import { CHANGE_INFO } from "@/store/mutation_types"

  const store = useStore()

  // 1.手动的映射和绑定
  const mutations = mapMutations(["changeName", "incrementLevel", CHANGE_INFO])
  const newMutations = {}
  Object.keys(mutations).forEach(key => {
    newMutations[key] = mutations[key].bind({ $store: store })
  })
  const { changeName, incrementLevel, changeInfo } = newMutations

</script>

<style scoped>
</style>

```

### 5.核心概念Actions

#### 5.1基本使用
实操中基本都是通过网络请求获取数据，网络请求相关的代码放在actions里面

**Action类似于mutation，不同在于：**

- Action提交的是mutation，而不是直接变更状态；
- Action可以包含任意异步操作；

**这里有一个非常重要的参数context：**
context是一个和store实例均有相同方法和属性的context对象；所以我们可以从其中获取到commit方法来提交一个mutation，或者通过 context.state 和 context.getters 来获取 state 和getters；

如何使用action呢？进行action的分发： 分发使用的是 store 上的dispatch函数；

```vue
<template>
  <div class="home">
    <h2>当前计数: {{ $store.state.counter }}</h2>
    <button @click="counterBtnClick">发起action修改counter</button>
    <h2>name: {{ $store.state.name }}</h2>
    <button @click="nameBtnClick">发起action修改name</button>
  </div>
</template>

<script>

  export default {
    methods: {
      counterBtnClick() {
        this.$store.dispatch("incrementAction")
      },
      nameBtnClick() {
        this.$store.dispatch("changeNameAction", "aaa")
      }
    }
  }
</script>

<script setup>

</script>

<style scoped>
</style>


```

```js
actions: {
    incrementAction(context) {
      // console.log(context.commit) // 用于提交mutation
      // console.log(context.getters) // getters
      // console.log(context.state) // state
      context.commit("increment")
    },
    changeNameAction(context, payload) {
      context.commit("changeName", payload)
    },
    // fetchHomeMultidataAction(context) {
    //   // 1.返回Promise, 给Promise设置then
    //   // fetch("http://123.207.32.32:8000/home/multidata").then(res => {
    //   //   res.json().then(data => {
    //   //     console.log(data)
    //   //   })
    //   // })
      
    //   // 2.Promise链式调用
    //   // fetch("http://123.207.32.32:8000/home/multidata").then(res => {
    //   //   return res.json()
    //   // }).then(data => {
    //   //   console.log(data)
    //   // })
    //   return new Promise(async (resolve, reject) => {
    //     // 3.await/async
    //     const res = await fetch("http://123.207.32.32:8000/home/multidata")
    //     const data = await res.json()
        
    //     // 修改state数据
    //     context.commit("changeBanners", data.data.banner.list)
    //     context.commit("changeRecommends", data.data.recommend.list)

    //     resolve("aaaaa")
    //   })
    // }
  },
```

#### 5.2 actions的异步操作

```vue
<template>
  <div class="home">
    <h2>Home Page</h2>
    <ul>
      <template v-for="item in $store.state.banners" :key="item.acm">
        <li>{{ item.title }}</li>
      </template>
    </ul>
  </div>
</template>

<script>
</script>

<script setup>

  import { useStore } from 'vuex'

  // 告诉Vuex发起网络请求
  const store = useStore()
  store.dispatch("fetchHomeMultidataAction").then(res => {
    console.log("home中的then被回调:", res)
  })

</script>


<style scoped>
</style>
```

```js
    async fetchHomeMultidataAction(context) {
        const res = await fetch("http://123.207.32.32:8000/home/multidata")
        const data = await res.json()        
      })
    }
```

### 6.module的基本使用

由于使用单一状态树，应用的所有状态会集中到一个比较大的对象，当应用变得非常复杂时，store 对象就有可能变得相当臃
肿；
为了解决以上问题，Vuex 允许我们将 store 分割成模块（module）；
每个模块拥有自己的 state、mutation、action、getter、甚至是嵌套子模块
![img](/images/blog/2022/module.png)

```vue
<template>
  <div class="home">
    <h2>Home Page</h2>
    <!-- 1.使用state时, 是需要state.moduleName.xxx -->
    <h2>Counter模块的counter: {{ $store.state.counter.count }}</h2>
    <!-- 2.使用getters时, 是直接getters.xxx -->
    <h2>Counter模块的doubleCounter: {{ $store.getters.doubleCount }}</h2>

    <button @click="incrementCount">count模块+1</button>
  </div>
</template>

<script>
</script>

<script setup>

  import { useStore } from 'vuex'

  // 告诉Vuex发起网络请求
  const store = useStore()
  // 派发事件时, 默认也是不需要跟模块名称
  // 提交mutation时, 默认也是不需要跟模块名称
  function incrementCount() {
    store.dispatch("incrementCountAction")
  }

</script>


<style scoped>
</style>

```

## Pinia

**什么是Pinia？和Vuex有什么区别？**

- pinia是一个用于对状态进行管理的库，跨组件跨页面对状态进行共享
  - 与vuex和redux在作用上并无区别
- 区别
  - pinia没有mutations选项，因为mutations的出现解决的问题是让devtools进行状态追踪
    - 但是随着技术的发展，pinia已经解决的这个没有mutation依然可以跟踪状态的问题
  - 我们可以在任意组件中拿到store然后直接修改state中的任意值
  - 不再需要modules这样的嵌套结构，取而代之的是可以创建一个个store
    - 想要用时直接拿到store：const homeStore = useHome()，然后直接使用即可
    - 想要拿到别的store，也是直接拿：const aboutStore = useAbout()，然后用就行
    - 你可以在一个组件中拿任意数量的store
    - 除此之外你还可以在某个store中拿另外的store，然后使用store中的任何东西
    - 比如你想在某个store的某个getter函数中使用其他store的某个getter函数，在当前getter函数中可以这么写：
      - const aboutStore = useAbout();
      - aboutStore.某个about中getter函数
  - 使用上的区别
    - 我们在vuex中使用某个state时，需要$store.state.xxx
      - 在pinia中直接拿到store之后store.xxx即可
    - 我们在vuex中使用某个getter函数时，需要$store.getters.xxx
      - 在pinia中拿到store后，store.xxx即可
    - 在vuex中进行异步请求需要派发action函数
      - 在pinia中拿到store后，直接调用action函数即可
    - 在getter函数中，第一个参数是state，可以通过这个参数拿state
      - 除了这个还可以通过this拿到当前的整个store，使用里面state、getter函数或者action函数
    - 在action函数中，没有固定的参数，如果有参数，也是在调用action函数时传递过来的参数
      - 只能通过this拿到当前的store，再拿state进行赋值

**Pinia中有哪些核心概念，如何使用这些核心概念？**

- state
  - state是一个选项，这个选项的值需要是一个函数，函数返回一个对象，对象中存储数据
  - 在组件中拿到当前的store直接使用即可，store.xxx
- getters
  - getters也是一个选项，这个选项的值是一个对象，对象中存储着一个个函数，每个函数可以有一个参数state，通过state可以获取到当前store的state
  - 除此之外每个函数还可以拿到一个this，这个this就是当前的整个store实例
  - 通过这个this，可以想用谁就用谁
  - 在组件中使用也是拿到store直接store.xxx即可
- actions
  - 在actions中，主要存放一个个函数，每个函数最主要的工作发送异步请求，获取到数据后直接修改state
  - 每个action函数并不像getter函数一样，第一个参数是state，它可以没有参数
  - 需要通过this拿到state然后再修改state中的值
  - 在组件中拿到store后直接调用即可，store.xxx()
    - 如果你在此时传递参数，那么就可以在action中拿到参数
- 没有模块的概念
  - 在vuex中会有modules的概念
  - 但是在pinia中没有，想要有相同的概念，只需要多创建结构store即可
  - store与store之前没有什么必然的联系
  - 如果你想在某个store中使用另一个store中的内容，只需要拿到那个store使用里面的内容即可，灵活

### 1.安装使用pinia

1.1安装

```
yarn add pinia
//or
npm install pinia
```

1.2创建一个pinia并且将其传递给应用程序
`src-stores-index.js`

```js
import { createPinia } from 'pinia'

const pinia = createPinia()

export default pinia
```

1.3 mian.js中引入

```js
import { createApp } from 'vue'
import App from './App.vue'
import pinia from './stores'

createApp(App).use(pinia).mount('#app')
```

1.4定义store
在pinia中可以定义多个store
例如，在`src-stores-counter.js`中定义关于counter的store

```js
// 定义关于counter的store
import { defineStore } from 'pinia'
//defineStore返回的是一个函数
const useCounter = defineStore("counter", {
  state: () => ({
   
  }),
  getters: {
   
  },
  actions: {
   )

export default useCounter

```

1.5在组件中拿到useCounter

```js
  import useCounter from '@/stores/counter';

  const counterStore = useCounter()
```

```vue
<template>
  <div class="home">
    <h2>Home View</h2>
    <h2>count: {{ counterStore.count }}</h2>
    <h2>count: {{ count }}</h2>
    <button @click="incrementCount">count+1</button>
  </div>
</template>

<script setup>
  //这两个作用其实是一样的
  import { toRefs } from 'vue'
  import { storeToRefs } from 'pinia'
  
  import useCounter from '@/stores/counter';

  const counterStore = useCounter()

  // const { count } = toRefs(counterStore)
  const { count } = storeToRefs(counterStore)


  function incrementCount() {
    counterStore.count++
  }

</script>

<style scoped>
</style>
```

### 2.Store

- Store有三个核心概念：state、getters、actions；
- 一旦 store 被实例化，你就可以直接在 store 上访问 state、getters 和 actions 中定义的任何属性；
- 注意Store获取到后不能被解构，不然会失去响应式：为了从 Store 中提取属性同时保持其响应式，需要使用storeToRefs()。

    ```js
    const { count } = storeToRefs(counterStore)
    ```

### 3.State
3.1读取和写入 state：
默认情况下，您可以通过 store 实例访问状态来直接读取和写入状态；

```js
const userStore = useUser()

userStore.name = "kobe"
userStore.age = 20
```

3.2重置 State：
可以通过调用 store 上的 $reset() 方法将状态 重置 到其初始值(它内部是有缓存最初状态的)；

```js
const userStore = useUser()
userStore.$reset()
```

3.3更改多个State：
除了直接用 store.counter++ 修改 store，你还可以调用 $patch 方法；
它允许应用多个更改；

```js
    userStore.$patch({
      name: "james",
      age: 35
    })
```

3.4替换State：
可以通过将其 $state 属性设置为新对象来替换 Store 的整个状态

```js
    userStore.$state = {
      name: "curry",
      level: 200
    }
```

eg

```vue
<template>
  <div class="home">
    <h2>Home View</h2>
    <h2>name: {{ name }}</h2>
    <h2>age: {{ age }}</h2>
    <h2>level: {{ level }}</h2>
    <button @click="changeState">修改state</button>
    <button @click="resetState">重置state</button>
  </div>
</template>

<script setup>
  import useUser from '@/stores/user'
  import { storeToRefs } from 'pinia';

  const userStore = useUser()
  const { name, age, level } = storeToRefs(userStore)

  function changeState() {
    // 1.一个个修改状态
    // userStore.name = "kobe"
    // userStore.age = 20
    // userStore.level = 200

    // 2.一次性修改多个状态
    // userStore.$patch({
    //   name: "james",
    //   age: 35
    // })

    // 3.替换state为新的对象
    const oldState = userStore.$state
    userStore.$state = {
      name: "curry",
      level: 200
    }
    console.log(oldState === userStore.$state)
  }

  function resetState() {
    userStore.$reset()
  }

</script>

<style scoped>
</style>


```



### 4.Getters

Getters相当于Store的计算属性

4.1定义Getters
 getters中可以定义接受一个state作为参数的函数；

```js
 getters: {
    doubleCounter:(state)=>state.counter*2,
    doublePlusOne:(state)=>state.counter*2+1,
    fullname:(state)=>state.firstname+state.lastname
 }
```

4.2 定义Getters，用到当前store的Getters：
我们可以通过this来访问到当前store实例的所有其他访问其他Getters

```js
doublePlusOne: function () {
      return this.doubleCounter + 1;
    },
```

4.3 定义Getters，用到其他store的Getters

```js
message: function(state) {
  const userStore = useUser()  //先拿到
  return this.fullname + ':' + userStore.nickname
}
```

4.4 Getters也可以返回一个函数，这样就可以接受参数

4.5 访问Getters

```vue
<script setup>
  import useCounter from '@/stores/counter';


  const counterStore = useCounter()
  console.log(counterStore.doubleCounter);
  console.log(counterStore.fullname);
</script>
```

eg


`counter.js`

```js
// 定义关于counter的store
import { defineStore } from 'pinia'
import useUser from './user'

const useCounter = defineStore("counter", {
  state: () => ({
    count: 99,
    friends: [
      { id: 111, name: "why" },
      { id: 112, name: "kobe" },
      { id: 113, name: "james" },
    ]
  }),
  getters: {
    // 1.基本使用
    doubleCount(state) {
      return state.count * 2
    },
    // 2.一个getter引入另外一个getter
    doubleCountAddOne() {
      // this是store实例
      return this.doubleCount + 1
    },
    // 3.getters也支持返回一个函数
    getFriendById(state) {
      return function(id) {
        for (let i = 0; i < state.friends.length; i++) {
          const friend = state.friends[i]
          if (friend.id === id) {
            return friend
          }
        }
      }
    },
    // 4.getters中用到别的store中的数据
    showMessage(state) {
      // 1.获取user信息
      const userStore = useUser()

      // 2.获取自己的信息

      // 3.拼接信息
      return `name:${userStore.name}-count:${state.count}`
    }
  },
  actions: {
    increment() {
      this.count++
    },
    incrementNum(num) {
      this.count += num
    }
  }
})

export default useCounter

```

```vue
<template>
  <div class="home">
    <h2>Home View</h2>
    <h2>doubleCount: {{ counterStore.doubleCount }}</h2>
    <h2>doubleCountAddOne: {{ counterStore.doubleCountAddOne }}</h2>
    <h2>friend-111: {{ counterStore.getFriendById(111) }}</h2>
    <h2>friend-112: {{ counterStore.getFriendById(112) }}</h2>
    <h2>showMessage: {{ counterStore.showMessage }}</h2>
    <button @click="changeState">修改state</button>
    <button @click="resetState">重置state</button>
  </div>
</template>

<script setup>
  import useCounter from '@/stores/counter';

  const counterStore = useCounter()

</script>

<style scoped>
</style>
```

### 5.Actions
Actions 相当于组件中的 methods。并且Actions中是支持异步操作的，我们可以编写异步函数，在函数中使用await
![img](/images/blog/2022/action.png)

eg
`home.js`

```js
import { defineStore } from 'pinia'

const useHome = defineStore("home", {
  state: () => ({
    banners: [],
    recommends: []
  }),
  actions: {
    async fetchHomeMultidata() {
      const res = await fetch("http://123.207.32.32:8000/home/multidata")
      const data = await res.json()

      this.banners = data.data.banner.list
      this.recommends = data.data.recommend.list
      
      // return new Promise(async (resolve, reject) => {
      //   const res = await fetch("http://123.207.32.32:8000/home/multidata")
      //   const data = await res.json()

      //   this.banners = data.data.banner.list
      //   this.recommends = data.data.recommend.list

      //   resolve("bbb")
      // })
    }
  }
})

export default useHome

```

## Axios

https://blog.csdn.net/qq_39765048/article/details/117688019

### 1.前提补充 [AJAX](https://blog.csdn.net/Oriental_/article/details/104863762)

AJAX 的两个主要功能允许您执行以下操作：

- 在不重新加载页面的情况下向服务器发出请求
- 接收和处理来自服务器的数据

### 2.axios请求方式
支持多种请求方式:
- axios(config)
- axios.request(config)
- axios.get(url[, config])
- axios.delete(url[, config])
- axios.head(url[, config])
- axios.post(url[, data[, config]])
- axios.put(url[, data[, config]])
- axios.patch(url[, data[, config]])
有时候, 我们可能需求同时发送两个请求
- 使用axios.all, 可以放入多个请求的数组.axios.all([]) 返回的结果是一个数组，使用 axios.spread 可将数组 [res1,res2] 展开为 res1, res2

常见的配置选项
- 请求地址
  url: '/user',
- 请求类型
  method: 'get',
- 请根路径
  baseURL: 'http://www.mt.com/api',
- 请求前的数据处理
  transformRequest:[function(data){}],
- 请求后的数据处理
  transformResponse: [function(data){}],
- 自定义的请求头
  headers:{'x-Requested-With':'XMLHttpRequest'},
- URL查询对象
  params:{ id: 12 },
- 查询对象序列化函数
  paramsSerializer: function(params){ }
- request body
  data: { key: 'aa'},
- 超时设置
  timeout: 1000,

```js
// 1.发送request请求
// axios.request({
//   url: "http://123.207.32.32:8000/home/multidata",
//   method: "get"
// }).then(res => {
//   console.log("res:", res.data)
// })

// 2.发送get请求
// axios.get(`http://123.207.32.32:9001/lyric?id=500665346`).then(res => {
//   console.log("res:", res.data.lrc)
// })
// axios.get("http://123.207.32.32:9001/lyric", {
//   params: {
//     id: 500665346
//   }
// }).then(res => {
//   console.log("res:", res.data.lrc)
// })


// 3.发送post请求
// axios.post("http://123.207.32.32:1888/02_param/postjson", {
//   name: "coderwhy",
//   password: 123456
// }).then(res => {
//   console.log("res", res.data)
// })

axios.post("http://123.207.32.32:1888/02_param/postjson", {
  data: {
    name: "coderwhy",
    password: 123456
  }
}).then(res => {
  console.log("res", res.data)
})


```

```js
// 1.baseURL
const baseURL = "http://123.207.32.32:8000"

// 给axios实例配置公共的基础配置
axios.defaults.baseURL = baseURL
axios.defaults.timeout = 10000
axios.defaults.headers = {}

// 1.1.get: /home/multidata
axios.get("/home/multidata").then(res => {
  console.log("res:", res.data)
})

// 1.2.get: /home/data

// 2.axios发送多个请求
// Promise.all
axios.all([
  axios.get("/home/multidata"),
  axios.get("http://123.207.32.32:9001/lyric?id=500665346")
]).then(res => {
  console.log("res:", res)
})

```



### 3.axios的创建实例

为什么要创建axios的实例呢?
当我们从axios模块中导入对象时, 使用的实例是默认的实例；当给该实例设置一些默认配置时, 这些配置就被固定下来了.但是后续开发中, 某些配置可能会不太一样；比如某些请求需要使用特定的baseURL或者timeout等.这个时候, 我们就可以创建新的实例, 并且传入属于该实例的配置信息.

```js
import axios from 'axios'

// axios默认库提供给我们的实例对象
axios.get("http://123.207.32.32:9001/lyric?id=500665346")

// 创建其他的实例发送网络请求
const instance1 = axios.create({
  baseURL: "http://123.207.32.32:9001",
  timeout: 6000,
  headers: {}
})

instance1.get("/lyric", {
  params: {
    id: 500665346
  }
}).then(res => {
  console.log("res:", res.data)
})

const instance2 = axios.create({
  baseURL: "http://123.207.32.32:8000",
  timeout: 10000,
  headers: {}
})
```

### 4.请求和响应拦截器

拦截器：在请求或响应被处理前拦截它们，并实现自己想要的内容

```js

// 对实例配置拦截器
axios.interceptors.request.use((config) => {
  console.log("请求成功的拦截")
  // 1.开始loading的动画
  // 2.对原来的配置进行一些修改
  // 2.1. header
  // 2.2. 认证登录: token/cookie
  // 2.3. 请求参数进行某些转化

  return config
}, (err) => {
  console.log("请求失败的拦截")
  return err
})

axios.interceptors.response.use((res) => {
  console.log("响应成功的拦截")

  // 1.结束loading的动画

  // 2.对数据进行转化, 再返回数据
  return res.data
}, (err) => {
  console.log("响应失败的拦截:", err)
  return err
})

axios.get("http://123.207.32.32:9001/lyric?id=500665346").then(res => {
  console.log("res:", res)
}).catch(err => {
  console.log("err:", err)
})
```

5.axios的封装优势

![vue项目生成的两种方式](/images/blog/2022/axios的封装优势.png)
