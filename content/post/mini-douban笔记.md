---
title: "Vue基础笔记"
date: 2022-07-13T17:54:41+08:00
categories: ['Vue']
tags: []
draft: true
---

遇到的问题

### 1.img标签显示不了网络图片

#### 解决方法1：

在index.html中加入`<meta name="referrer" content="no-referrer">`

#### 解决方法2：

在图片路径外面包裹require。` require（'图片路径）`



2.在Vue中使用axios.all方法发送并发请求时遇到的错误axios.all is not function

原因：

all是静态方法，静态方法的调用只能通过类名点(**className.**)的方式调用，而我们导入到Vue项目中的是axios的实例。所以解决办法就是在你创建的实例中将静态方法赋值给我们的实例。具体代码如下：

```js
import axios from "axios";
axiosInstance.all=axios.all
```

3.后端返回的数据为下划线分割格式，但前端的规范为驼峰格式，实现一种数据格式转换的方法，将数据的key按如下形式转换，要求：

> a.炫耀处理多层[嵌套](https://so.csdn.net/so/search?q=嵌套&spm=1001.2101.3001.7020)的情况
> b.特定名词需要全部大写，特定名词包括：url, id

4.Uncaught (in promise) TypeError:  is not a function报错

很可能是异步方面的问题，仔细检查是否有直接调用一个promise（而没有await）的情况

5.Uncaught (in promise) TypeError: Cannot read properties of undefined报错

解决：使用`?.` 比如：`this.movieData?.results`

6.引入的pinia store中的数据不是响应式的

解决方法：还得用storeToRefs

eg

```js
import useListStore from "@/stores/listStore";
import {storeToRefs} from "pinia/dist/pinia";
const listStore=useListStore()
const { key } = storeToRefs(listStore);
```

7.组件不是响应式的

解决方案：考虑强制刷新，用:key

8.在使用 vue 开发前端的时候遇到一个场景：在首页进行一些数据搜索，点击搜索结果进入详情页面，浏览详情页后返回主页。但这时候之前的搜索记录和翻页就消失了，用户体验不好。所以需要在返回后恢复跳转前的页面参数状态。
