---
title: "刷算法题时常用的js方法"
date: 2022-11-17T21:26:14+08:00
categories: ["面试"]
tags: ["面试"]
---

## 一、ACM格式javascript 输入输出
### 输入
使用 V8模式，主要使用 readline()读取每一行。
本质上输入的都是字符串，需要转化为数字。
同时也要注意不同的输入方式需要不同的处理。

#### 1 单行输入

##### 单行输入 一行输入一个int数字

用readline读取一行，然后转化为int。

```js
ParseInt(readline())
```

##### 单行输入 一行为一个一维数组

###### 输入为1 2 3的形式

.map(Number)实际就是遍历数组每一项，转化为数字。记住这种写法，最简便。

```js
let a=readline().split(' ').map(Number)
```

###### 输入为123的形式

与上面的区别是split的参数不是空格而是""。

```js
let a=readline().split('').map(Number) 
```

#### 2.多行输入

###### 固定行数的多行输入

```js
var line_1 = readline();
var line_2 = readline();
var result_1= line_1.split(' '); //获取第一行的内容，存为数组
var result_2= line_2.split(' '); //获取第二行的内容，存为数组
print(result_1,result_2);
```

###### 任意的多行输入

```js
while (line = readline()) {
    
}
```

######  第一行是接下来输入数据的行数的多行输入

```js
var n=parseInt(readline());
var ans=0
for(var i=0;i<n;i++){
  lines=readline().split(" ")
  for(var j=0;j<lines.length;j++){
    ans +=parseInt(lines[j])
  }
}
print(ans)
```

## 二、处理字符串的

#### 截取子串 substring()

**`substring()`** 方法返回一个字符串在开始索引到结束索引（不包括）之间的一个子集，或从开始索引直到字符串的末尾的一个子集。

```
str.substring(indexStart[, indexEnd])
```
#### 截取字符串 split()
`split()`方法使用指定的分隔符字符串将一个String对象分割成子字符串数组
```
str.split([separator[, limit]])
```
#### 字符串转数字 parseInt()

`parseInt(string, radix)` 解析一个字符串并返回指定基数的十进制整数，`radix` 是 2-36 之间的整数，表示被解析字符串的基数。

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

#### 返回元素位置/检查元素是否存在 indexOf()



## 三、处理数组的

#### 复制数组/合并数组 展开语法...

使用展开运算符...复制数组

```js
let thisArray = [true, true, undefined, false, null];
let thatArray = [...thisArray];
```
thatArray 等于 [true, true, undefined, false, null]。 thisArray 保持不变， thatArray 包含与 thisArray 相同的元素。
展开语法（spread）的另一个重要用途是合并数组，或者将某个数组的所有元素插入到另一个数组的任意位置。

```js
let thisArray = ['sage', 'rosemary', 'parsley', 'thyme'];
let thatArray = ['basil', 'cilantro', ...thisArray, 'coriander'];
```

#### 截取数组 slice()

```js
array.slice(start, end)//左闭右开
```
**`slice()`** 方法返回一个新的数组对象，这一对象是一个由 `begin` 和 `end` 决定的原数组的**浅拷贝**（包括 `begin`，不包括`end`）。原始数组不会被改变。

#### 删除数组元素 splice()

splice() 可以让我们从数组中的**任意位置连续**删除**任意数量**的元素。
返回值是包含**已删除元素**的数组。

```js
array.splice(index,howmany,item1,.....,itemX)
```

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

#### 返回元素位置/检查元素是否存在 indexOf()

```js
array.indexOf(item,[start])
```

indexOf() 方法可返回数组中某个指定的元素位置。

该方法将从头到尾地检索数组，看它是否含有对应的元素。开始检索的位置在数组 start 处或数组的开头（没有指定 start 参数时）。如果找到一个 item，则返回 item 的第一次出现的位置。开始位置的索引为 0。

如果在数组中没找到指定元素则返回 -1

### 前端算法面试高频

#### NC78反转链表

```js
/*function ListNode(x){
    this.val = x;
    this.next = null;
}*/
function ReverseList(pHead) {
  // write code here
  let left = null;
  let now = pHead;
  while (now) {
    //运用es6解构赋值，一一对应，不需要考虑赋值顺序，不需要定义额外next
    [now.next, left, now] = [left, now, now.next];
  }
  return left;
}
module.exports = {
  ReverseList: ReverseList,
};
```

#### NC140排序

##### 1.冒泡排序

它重复地走访过要排序的数列，一次比较两个元素，如果它们的顺序错误就把它们交换过来。每次

**时间复杂度：O(n2)**

```js
function MySort( arr ) {
    // write code here
    const len=arr.length 
    for(let i=0;i<len-1;i++){
        for(let i=0;i<len;i++){
            if(arr[i]>arr[i+1]){
                let tmp=arr[i]
                arr[i]=arr[i+1]
                arr[i+1]=tmp
            }
        }
    }
    return arr
}
```

##### 2.选择排序

