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
    <h2 v-bind:style="{ color: fontColor, fontSize: fontSize + 'px' }">
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
      <!-- is中的组件需要来自两个地方: 1.全局注册的组件 2.局部注册的组件 -->
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