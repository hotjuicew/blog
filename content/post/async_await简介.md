---
title: "Async/await简介"
date: 2022-08-02T18:23:03+08:00
categories: ["JavaScript"]
tags: []
draft: true
---

使用async/await可以更舒适地处理 Promise

## Async functions

async 是异步的意思，在函数前面加一个`async`，就把这个函数变成了异步函数。
函数前面的“async ”一词意味着：函数总是返回一个 Promise。

```js
async function f() {
    return 1;
  }
  
  f().then(console.log); // 1
```
和下列代码效果相同。
```js
async function f() {
    return Promise.resolve(1);
  }
  
  f().then(console.log); // 1
```

因此，`async`确保函数返回一个Promise



函数前的`async`关键字有两个作用：

1. 使它总是返回一个承诺。
2. 允许`await`在其中使用。

## Await

`await`只在`async`函数内部起作用

```javascript
// works only inside async functions
let value = await promise;
```

关键字`await`使 JavaScript 等待，直到该承诺完成并返回其结果。

这是一个Promise在 1 秒内解决的示例

```javascript
async function f() {

  let promise = new Promise((resolve, reject) => {
    setTimeout(() => resolve("done!"), 1000)
  });

  let result = await promise; // wait until the promise resolves (*)

  alert(result); // "done!"
}

f();
```

