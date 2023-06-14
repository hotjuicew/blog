---
title: "又开始找工作了"
date: 2022-03-31T17:36:11+08:00
categories: ['面试']
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

## 二、数组与字符串常见用法

#### 1.截取子串 substring()

**`substring()`** 方法返回一个字符串在开始索引到结束索引（不包括）之间的一个子集，或从开始索引直到字符串的末尾的一个子集。

```
str.substring(indexStart[, indexEnd])
```
#### 2.截取字符串 split()
`split()`方法使用指定的分隔符字符串将一个String对象分割成子字符串数组
```
str.split([separator[, limit]])
```
#### 3.concat()

**`concat()`** 方法用于合并两个或多个数组。此方法不会更改现有数组，而是返回一个新数组。

```js
const num1 = [1, 2, 3];
const num2 = [4, 5, 6];
const num3 = [7, 8, 9];

const numbers = num1.concat(num2, num3);

console.log(numbers);
// results in [1, 2, 3, 4, 5, 6, 7, 8, 9]
```

#### 4.交换数组元素位置

```js
[array[index1],array[index2]] = [array[index2],array[index1]];//利用解构赋值
```

#### 5.连接数组/字符串

**`concat()`** 方法用于合并两个或多个数组。此方法不会更改现有数组，而是返回一个新数组。

#### 6.字符串转数字 parseInt()

`parseInt(string, radix)` 解析一个字符串并返回指定基数的十进制整数，`radix` 是 2-36 之间的整数，表示被解析字符串的基数。

#### 7.字符串转数组

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

#### 8.获取数组的最大值

```js
let maxValue = Math.max(...arr); 
```

#### 9.将数组排序

sort()在不更改原始数组的前提下返回排序后的数组

```js
//如果数组中是数字
const numbers = [4, 2, 5, 1, 3];
numbers.sort((a, b) => a - b);// [1, 2, 3, 4, 5] 升序
numbers.sort((a, b) => b - a);// [5, 4, 3, 2, 1] 降序
```

#### 10.反转数组 reverse

**`reverse()`** 方法将数组中元素的位置颠倒，并返回该数组。数组的第一个元素会变成最后一个，数组的最后一个元素变成第一个。该方法会改变原数组。

#### 11.返回元素位置/检查元素是否存在 indexOf()

#### 12.复制数组/合并数组 展开语法...

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

#### 13.截取数组/字符 slice()

```js
array.slice(start, end)//左闭右开
String.slice(start, end)//左闭右开
```
**`slice()`** 方法返回一个新的数组对象，这一对象是一个由 `begin` 和 `end` 决定的原数组的**浅拷贝**（包括 `begin`，不包括`end`）。原始数组不会被改变。

#### 14.删除数组元素 splice()

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

#### 15.forEach()

**`Array.prototype.forEach()`** 方法对数组的每个元素执行一次给定的函数。

#### 16.创建二维数组

```js
const arr = Array.from(new Array(10), () => new Array(10).fill(0))
```

**`Array.from()`** 方法对一个类似数组或可迭代对象创建一个新的，浅拷贝的数组实例。

```js
console.log(Array.from('foo'));
// expected output: Array ["f", "o", "o"]

console.log(Array.from([1, 2, 3], x => x + x));
// expected output: Array [2, 4, 6]
```



#### Math.floor()

**`Math.floor()`** 函数总是返回小于等于一个给定数字的最大整数。

#### `>>`

x >> 1 是位运算中的右移运算，表示右移一位，等同于 x 除以 2 再取整，即 x >> 1 === Math.floor(x / 2)

### 三、Map,Set常见用法

#### 1.删掉Map头部的键值对

```js
const deleteKey = map.keys().next().value
map.delete(headKey)
```



### 前端算法面试高频

### 1.NC78反转链表 *三指针

![image-20221107233804640](C:\Users\Jasmine\Desktop\面试\img\image-20221107233804640.png)

```js
function ReverseList(pHead) {
    //left:保存当前节点的前节点
    //p:保存当前节点
    //right:保存当前节点的后序节点
    let left=null
    let p=pHead
    let right=null
    while (p){
        //1.断开之前 先用right指针把后序节点保存下来
        right=p.next
        //2.改变当前节点指针的指向
        p.next=left
        //3.然后,让left和p指针分别往后移动
        left=p
        p=right
    }
    return left
}
```

#### 2.NC140排序

![img](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2016/11/29/4abde1748817d7f35f2bf8b6a058aa40~tplv-t2oaga2asx-zoom-in-crop-mark:4536:0:0:0.image)

##### （1）.冒泡排序

它重复地走访过要排序的数列，一次比较两个元素，如果它们的顺序错误就把它们交换过来。每次

**时间复杂度：O(n2) 	空间复杂度：O(1)**

```js
function MySort( arr ) {
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

##### （2）.选择排序

首先在未排序序列中找到最小元素，存放到排序序列的起始位置，然后，再从剩余未排序元素中继续寻找最小元素，然后放到已排序序列的末尾。以此类推，直到所有元素均排序完毕。

```js
//关键：寻找最小数的索引
function MySort( arr ) {
    let minIndex,tmp
    for(let i=0;i<arr.length;i++){
        minIndex=i
        for(let j=i;j<arr.length;j++){
            if(arr[minIndex]>arr[j]){
                minIndex=j
            }
        }
        tmp=arr[i]
        arr[i]=arr[minIndex]
        arr[minIndex]=tmp
    }
    return arr
}
```

##### （3）.插入排序 *已排序序列中从后向前扫描

稳定

构建有序序列，对于未排序数据，在已排序序列中从后向前扫描，找到相应位置并插入。

```js
//定义一个指针，和它左边的指针。注意要i--
function MySort( arr ) {
    let left,tmp
    for(let i=1;i<arr.length;i++){
        for(left=i-1;left>=0;left--){
            if(arr[left]>arr[i])
                [arr[left],arr[i]]=[arr[i],arr[left]]
                i--
            }else break
        }
    }
    return arr
}
```

##### （4）.希尔排序

不稳定

先分一组（分组间隔为总人数的一半），再组内插入排序；再分组（分组间隔为原来的1/2），再组内插入排序；再分组再排序……；直到分组（分组间隔为1），再组内插入排序

> gap值为N/2, N/4, ...... **直到gap值为1**，这里的N为数组的长度

##### （5）.归并排序

稳定、分治思想.时间复杂度O(nlogn)

归并排序的算法思路是，将两个有序的数组合并为一个有序数组往往比直接处理一个无序数组容易。为此，归并排序要创建n个只有一个元素的列表，其中n为要排序的列表的长度，然后再将这些列表合并为单个有序列表。

![img](C:\Users\Jasmine\Desktop\面试\img\3.image)

```js
//两个有序列表合并为一个有序列表
//分别取出第一个元素进行比较，将较小元素放到一个新的结果数组中，同时从列表中删除该元素，执行这样的操作直到某个列表已没有任何元素。
function merge(left, right){
    const result = [];
    while(left.length > 0 && right.length > 0){
        if(left[0] < right[0]){
            result.push(left.shift());
        }else{
            result.push(right.shift());
        }
    }
    return result.concat(left, right);
}
//将数组分割为一个个只有一个元素的数组，然后再进行合并。这可以通过递归的方式来实现：
function mergeSort(arr){
    if(arr.length <=1) return arr;
    const middle = arr.length>>1;
    const left = arr.slice(0, middle);
    const right = arr.slice(middle);
    return merge(mergeSort(left), mergeSort(right));
}
```

##### （6）.快速排序

时间复杂度O(nlog n)  不稳定排序

- 在数据集之中，选择一个元素作为”基准”（pivot），可以随机选择。这里我们选择最后一位。
- 将小于基准的元素移到基准的左边，大于基准的元素移到基准的右边。这一步称为**分区**
- 利用递归对基准左边和右边不断重复上面两步，直到所有子集只剩下一个元素为止。

```js
function MySort(arr) {
    if(arr.length<=1)return arr
    let pivot=arr[arr.length-1]// 基准值
    let leftArr=[]// 小的放左边
    let rightArr=[]// 一样大的放中间
    let pivotArr=[]// 大的放右边
    for (const item of arr) {
        if(item<pivot) leftArr.push(item)
        else if(item>pivot)rightArr.push(item)
        else pivotArr.push(item)
    }
    return MySort(leftArr).concat(pivotArr).concat(rightArr)
}
```

##### （7）.堆排序

时间复杂度O(nlogn) 空间复杂度O(1)

**堆其实可以用一个数组表示，**

数组表示的二叉树中所有的节点都满足这三种关系：

- 位置为 i （下标从1开始）的节点，它的父节点位置为 `i/2`（向下取整）
- 它的左子节点 `2i`
- 它的右子节点 `2i+1`

**`**

**从后往前、自上而下式堆化建堆**:

这里以小顶堆为例

注意：从后往前并不是从序列的最后一个元素开始，而是从最后一个非叶子节点开始，这是因为，叶子节点没有子节点，不需要自上而下式堆化。

最后一个子节点的父节点为 `n/2` ，所以从 `n/2` 位置节点开始堆化：

![img](C:\Users\Jasmine\Desktop\面试\img\687474703a2f2f7265736f757263652e6d757969792e636e2f696d6167652f32303230303332333231333631372e676966)

![img](C:\Users\Jasmine\Desktop\面试\img\687474703a2f2f7265736f757263652e6d757969792e636e2f696d6167652f32303230303630333030323335362e706e67)

将原序列（n个）转化成一个大顶堆
设置堆的有效序列长度为 n
将堆顶元素（第一个有效序列）与最后一个子元素（最后一个有效序列）交换，并有效序列长度减1
堆化有效序列，使有效序列重新称为一个大顶堆
重复以上2步，直到有效序列的长度为 1，排序完成

```js
function heapSort(arr) {
    // 构建大顶堆
    buildHeap(arr, arr.length - 1)
    // 设置堆的初始有效序列长度为 arr.length - 1
    let n = arr.length - 1//数组的第一位为empty
    for (var i = arr.length - 1; i > 1; i--) {//一直将顶上三个元素进行堆化
        // 交换堆顶元素与最后一个有效子元素
        [arr[1], arr[i]] = [arr[i], arr[1]]
        // 有效序列长度减 1
        n--;
        // 堆化有效序列(有效序列长度为 currentn，抛除了最后一个元素)
        heapify(arr, n, 1);
    }
    return arr;
}

// 原地建堆
// arr: 原始序列
// n: 有效序列长度
function buildHeap(arr, n) {
    // 从最后一个非叶子节点开始，自上而下式堆化
    for (let i = Math.floor(n / 2); i >= 1; i--) {
        heapify(arr, n, i);
    }
}

//堆化
//i:节点的index
function heapify(arr, n, i) {
    var maxIndex = i;
    if (2 * i <= n && arr[i] < arr[i * 2]) {//2*i <= n ：如果左子节点存在
        maxIndex = i * 2;
    }
    if (2 * i + 1 <= n && arr[maxIndex] < arr[i * 2 + 1]) {
        maxIndex = i * 2 + 1;
    }
    if (maxIndex !== i) {
        [arr[i], arr[maxIndex]] = [arr[maxIndex], arr[i]]// 交换

    }
}

// 测试
var arr = [, 1, 33, 2, 8, 1, 7, 4, 6, 5]
console.log(heapSort(arr))
// [empty, 1, 2, 3, 4, 5, 6, 7, 8, 9]
```

##### （8）.计数排序

计数排序是一个非基于比较的排序算法,它的优势在于在对一定范围内的整数排序时，快于任何比较排序算法

![img](C:\Users\Jasmine\Desktop\面试\img\2.image)

计数排序的不足:可以看到辅助数组的长度和桶的数量由最大值和最小值决定，假如两者之差很大，而待排序数组又很小，那么就会导致辅助数组或桶大量浪费。

```js

function MySort(arr) {
   const max=Math.max(...arr)
   // 因为数组是从0开始的，我们要记录第n个元素需要创建长度为n+1的数组
   const arrK=new Array(max+1).fill(0)
   for(let item of arr){
       arrK[item]++
   }
   let res=[]
   for(let i=0;i<arrK.length;i++){
       while(arrK[i]){
           res.push(i)
           arrK[i]--
       }
   }
    return res
}
```

（9）.基数排序

![img](C:\Users\Jasmine\Desktop\面试\img\1.image)

![img](C:\Users\Jasmine\Desktop\面试\img\4.image)

##### （9）.桶排序

桶排序是计数排序的升级版，也采用了`分治思想`。

**思想**

- 将要排序的数据分到有限数量的几个有序的桶（每个桶代表了一定的区间范围）里。
- 每个桶里的数据再单独进行排序（一般用插入排序或者快速排序）。
- 桶内排完序之后，再把每个桶里的数据按照顺序依次取出，组成的序列就是有序的了。

为了使桶排序更加高效，我们需要做到这两点：

- 在额外空间充足的情况下，尽量增大桶的数量。
- 使用的映射函数能够将输入的 N 个数据均匀的分配到 K 个桶中。

```js
//在桶中被使用的排序
function bubbleSort( arr ) {
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


//桶排序
function bucketSort(arr) {
    if (arr.length === 0) {
        return arr;
    }
    let i, min , max, size = 10;//size:桶的容量

    // 设置最大最小值
    min=Math.min(...arr)
    max=Math.max(...arr)

    // 初始化桶
    let bucketCount = Math.floor((max - min) / size) + 1;
    let allBuckets = new Array(bucketCount);
    for (i = 0; i < allBuckets.length; i++) {
        allBuckets[i] = [];
    }

    //将数据放入桶中
    arr.forEach(function (item) {
        allBuckets[Math.floor((item - min) / size)].push(item);
    });

    let res=[]

    allBuckets.forEach(function(bucket) {
        bubbleSort(bucket);
        bucket.forEach(function (element) {
            res.push(element)
        });
    });

    return res;
}

console.log(bucketSort([4,3,2,8,3,8,5,99,66,54,25,13,74,13,64,78,42,5]))
```

### 3.NC93 设计LRU缓存结构  *利用Map

这题使用Map就行

> 设计LRU(最近最少使用)缓存结构，该结构在构造时确定大小，假设大小为 capacity ，操作次数是 n ，并有如下功能:
> \1. Solution(int capacity) 以正整数作为容量 capacity 初始化 LRU 缓存
> \2. get(key)：如果关键字 key 存在于缓存中，则返回key对应的value值，否则返回 -1 。
> \3. set(key, value)：将记录(key, value)插入该结构，如果关键字 key 已经存在，则变更其数据值 value，如果不存在，则向缓存中插入该组 key-value ，如果key-value的数量超过capacity，弹出最久未使用的key-value
>
> 提示:
> 1.某个key的set或get操作一旦发生，则认为这个key的记录成了最常使用的，然后都会刷新缓存。
> 2.当缓存的大小超过capacity时，移除最不经常使用的记录。
> 3.返回的value都以字符串形式表达，如果是set，则会输出"null"来表示(不需要用户返回，系统会自动输出)，方便观察
> 4.函数set和get必须以O(1)的方式运行

```js
/**
 * @param {number} capacity
 */
var Solution = function(capacity) {
    // write code here
    this.map=new Map()
    this.capacity=capacity
};

/** 
 * @param {number} key
 * @return {number}
 */
Solution.prototype.get = function(key) {
    // write code here
    let value=this.map.get(key)
    if(value!==undefined){
        this.map.delete(key)
        this.map.set(key,value)//将此键值对放到map尾部
        return value
    }
    else return -1

};

/** 
 * @param {number} key 
 * @param {number} value
 * @return {void}
 */
Solution.prototype.set = function(key, value) {
    // write code here
    this.map.set(key, value)
    if(this.map.size>this.capacity){
        let deleteKey=this.map.keys().next().value////删掉map头部的键值对
        this.map.delete(deleteKey)
    }
};

module.exports = {
    Solution : Solution
};

/**
 * Your Solution object will be instantiated and called as such:
 * var solution = new Solution(capacity)
 * var output = solution.get(key)
 * solution.set(key,value)
 */
```

### 4.NC45 实现二叉树先序，中序和后序遍历

法一:递归

```js
/*
 * function TreeNode(x) {
 *   this.val = x;
 *   this.left = null;
 *   this.right = null;
 * }
 */

/**
 *
 * @param root TreeNode类 the root of binary tree
 * @return int整型二维数组
 */


function threeOrders(root) {
    // write code here
    let res = [[], [], []]
    preOrder(root)
    midOrder(root)
    postOrder(root)
    return res

    function preOrder(root) {
        if (!root) return
        res[0].push(root.val)
        preOrder(root.left)
        preOrder(root.right)
    }

    function midOrder(root) {
        if (!root) return
        midOrder(root.left)
        res[1].push(root.val)
        midOrder(root.right)
    }

    function postOrder(root) {
        if (!root) return
        postOrder(root.left)
        postOrder(root.right)
        res[2].push(root.val)
    }
}

module.exports = {
    threeOrders: threeOrders
};
```

法二:迭代

先序遍历:通过栈,我们可以将父节点压入栈，对栈执行出栈操作，每次将出栈的节点的右孩子先压入栈，其次压入左孩子。这样就可以做到先遍历父节点，在遍历左孩子部分，后遍历右孩子部分。
![img](C:\Users\Jasmine\Desktop\面试\img\172f88.awebp)

中序遍历:中序遍历左子树是优先遍历，所以父节点要先于子树的节点优先压入栈中，每当我们压入节点时，都要把节点的左子树的所有左节点压入栈中。

后序遍历:后序遍历是父节点需要最后被遍历。但其实可以跟前序遍历的实现方式上差不多，只不过在插入数组中，我们总是在头部插入，这样先被插入的节点值一定是相对于左右孩子后面的。

```js
const bt = {
    val: 1,
    left: {
        val: 2,
        left: {
            val: 4,
            left: null,
            right: null,
        },
        right: {
            val: 5,
            left: null,
            right: null,
        },
    },
    right: {
        val: 3,
        left: {
            val: 6,
            left: null,
            right: null,
        },
        right: {
            val: 7,
            left: null,
            right: null,
        },
    },
};


function threeOrders(root) {
    // write code here
    let res = [[], [], []]
    preOrder(root)
    midOrder(root)
    postOrder(root)
    return res

    function preOrder(root) {
        if (!root) return
        let stack = [root]
        while (stack.length) {
            const cur = stack.pop()
            res[0].push(cur.val)
            if (cur.right) stack.push(cur.right)
            if (cur.left) stack.push(cur.left)
        }
    }

    function midOrder(root) {
        if (!root) return
        let stack = []
        let cur = root
        while (stack.length || cur) {
            while (cur) {
                stack.push(cur)//当前元素入栈
                cur = cur.left//找它的左孩子
            }
            const pop=stack.pop()//该元素没有左孩子，那么我们就应该打印该元素
            res[1].push(pop.val)
            cur=pop.right//遍历该元素的右孩子，因为左边和中间（父结点）已经遍历过了
        }
    }
//和先序遍历做法一样，不过这里是头插
    function postOrder(root) {
        let stack = [root];
        let cur
        while(stack.length){
            cur = stack.pop(); //取出中间元素
            res[2].unshift(cur.val);
            if (cur.left)stack.push(cur.left);
            if (cur.right)stack.push(cur.right);
        }

    }
}



console.log(threeOrders(bt))
```



### 5.NC119 最小的K个数

```js
function GetLeastNumbers_Solution(input, k)
{
    // write code here
    return input.sort((a, b) => a - b).slice(0,k)
}
module.exports = {
    GetLeastNumbers_Solution : GetLeastNumbers_Solution
};
```

### 6.NC15 求二叉树的层序遍历 *利用队列

BFS

要用一个队列

先放 root 进 que，只要 que 不为空，就遍历 que 里面的节点，cnt 就是遍历开始前取的 que 的长度，代表上一层的节点的数量。然后一边从头取出前面的（即上一层的），在尾部放入被取出节点的子节点

然后记得特殊情况的处理

还有每层的 level 存下来，遍历完一次后就要放入 ans

```js
/**
 *
 * @param root TreeNode类
 * @return int整型二维数组
 */
function levelOrder(root) {
    if (!root) return []
    // write code here
    let res = []
    let q = [root]
    while (q.length) {//当队列中有节点
        let subRes = []
        let nowLen = q.length
        for (let i = 0; i < nowLen; i++) {//循环当前层的节点
            //出列
            let out = q.shift()
            subRes.push(out.val)
            //往队列中加入下一层的节点
            if (out.left) q.push(out.left)
            if (out.right) q.push(out.right)
        }
        res.push(subRes)
    }
    return res
}

module.exports = {
    levelOrder: levelOrder
};

```

### 7.NC88 寻找第K大 

要求使用快速排序

```js
/**
 * 
 * @param a int整型一维数组 
 * @param n int整型 
 * @param K int整型 
 * @return int整型
 */
function findKth( a ,  n ,  K ) {
    // write code here
    //题目要求使用快速排序
    let arr=quickSort(a)
    return arr[K-1]

}

function quickSort(arr){
    if(arr.length<=1)return arr
    let leftArr=[]
    let midArr=[]
    let rightArr=[]
    let pivot=arr[arr.length-1]
    for (const item of arr) {
        if(item>pivot) leftArr.push(item)
        else if(item<pivot)rightArr.push(item)
        else midArr.push(item)
    }
    return quickSort(leftArr).concat(midArr).concat(quickSort(rightArr))
}
```

### 8.NC61 两数之和 *利用Map

给出一个整型数组 numbers 和一个目标值 target，请在数组中找出两个加起来等于目标值的数的下标，返回的下标按升序排列。

（注：**返回**的数组下标从1开始算起，保证target一定可以由数组里面2个数字相加得到）

```js
//一次循环,使用Map记录.值放在key的位置,下标放在value的位置
function twoSum( numbers ,  target ) {
    // write code here
    let map=new Map()
    for(let i=0;i<numbers.length;i++){
        if(map.has(target-numbers[i]))return [i+1,map.get(target-numbers[i])+1].sort((a,b)=>a-b)//题目要求下标从1开始，所以+1
        else map.set(numbers[i],i)
    }
}
```

### 9.NC33 合并两个排序的链表 *利用指针

输入两个递增的链表，单个链表的长度为n，合并这两个链表并使新链表中的节点仍然是递增排序的。
要求：空间复杂度 O(1)，时间复杂度 O(n)

解:利用一个指针

```js
function Merge(pHead1, pHead2) {
    // write code here
    let resHead=new ListNode(null)
    let p=resHead

    while (pHead1&&pHead2){
        if (pHead1.val<pHead2.val){
            p.next=pHead1
            pHead1=pHead1.next
            p=p.next
        }
        else {
            p.next=pHead2
            pHead2=pHead2.next
            p=p.next
        }
    }
    if(!pHead1){
        p.next=pHead2
    }
    if(!pHead2){
        p.next=pHead1
    }
    return resHead.next
}
```

### 10.NC76 用两个栈实现队列

```js
//不懂这题难在哪
let stack=[]
function push(node)
{
    // write code here
    stack.push(node)
}
function pop()
{
    // write code here
    if(stack.length) return stack.shift()
}
```

### 11.NC68 跳台阶 *动态规划 递归

解题思路：

> 此类求 多少种可能性 的题目一般都有 递推性质 ，即 f(n)f(n)f(n) 和 f(n−1)f(n-1)f(n−1)…f(1)f(1)f(1) 之间是有联系的。

设跳上 nnn 级台阶有 f(n)f(n)f(n) 种跳法。在所有跳法中，青蛙的最后一步只有两种情况： 跳上 111 级或 222 级台阶。
当为 111 级台阶： 剩 n−1n-1n−1 个台阶，此情况共有 f(n−1)f(n-1)f(n−1) 种跳法；
当为 222 级台阶： 剩 n−2n-2n−2 个台阶，此情况共有 f(n−2)f(n-2)f(n−2) 种跳法。

> 动态规划：
> 原理： 以斐波那契数列性质 f(n+1)=f(n)+f(n−1)f(n + 1) = f(n) + f(n - 1)f(n+1)=f(n)+f(n−1) 为转移方程。

```js
function jumpFloor(number) {
    // write code here
    if (number === 1 || number === 0) return 1
    return jumpFloor(number - 1) + jumpFloor(number - 2)
}
```

### 12.NC19 连续子数组的最大和 *动态规划

动态规划，走到每一步知道当前最大值

![image-20221108120046639](C:\Users\Jasmine\Desktop\面试\img\image-20221108120046639.png)

```js
function FindGreatestSumOfSubArray(array)
{
    // write code here
    //初始化
    let perSum=0
    let max=array[0]
    
    for(let item of array){
        if(perSum<=0)perSum=item
        else perSum+=item
        max=max>perSum?max:perSum
    }
    return max
}
```

### 13.NC41 最长无重复子数组 *双指针(滑动窗口)+Map

```js
function maxLength( arr ) {
    // write code here
    let map=new Map()//key:字符 value:在数组中最后出现的位置
    let l=0
    let r=0
    let max=1
    for(;r<arr.length;r++){
        if(!map.has(arr[r]))
            map.set(arr[r],r)
        else {
            l=map.get(arr[r])+1>l?map.get(arr[r])+1:l//保证l不回退 33213331
            map.set(arr[r],r)
        }
        max=max>r-l+1?max:r-l+1
    }
    return max

}
```

### 14.NC4 判断链表中是否有环 *利用map

```js
function hasCycle( head ) {
    // write code here
    let map=new Map()
    while(head){
        if(map.has(head))return true
        map.set(head,1)
        head=head.next
    }
    return false
}
```

### 15.NC22 合并两个有序的数组 *插入排序

要求:请你 合并 `nums2` 到 `nums1` 中，使合并后的数组同样按 非递减顺序 排列。

注意：最终，合并后数组不应由函数返回，而是存储在数组 `nums1` 中。

```js
function merge(A, m, B, n) {
    // write code here
    for (q = 0; q < n; q++) {//对数组B中的元素执行插入操作
        A[m + q] = B[q]
        for (let p = m + q - 1; p >= 0; p--) {
            if (A[p] > A[p + 1]) {
                [A[p], A[p + 1]] = [A[p + 1], A[p]]
            } else break
        }
    }
    return A
}
```

### 16.NC3 链表中环的入口结点

做法和14几乎一模一样

#### 17.NC52 有效括号序列 *Map,栈

```js
function isValid( s ) {
    // write code here
    let arr=[...s]
    let map=new Map([['(',')'],['[',']'],['{','}']])
    let stack=[]
    for(let item of arr){
        if(map.has(item))stack.push(item)
        else{
            let pop=stack.pop()
            if(map.get(pop)===item){}
            else return false
        }
    }
    if(stack.length===0)return true
    else return false

}
```

### 18.NC53 删除链表的倒数第n个节点 *先翻转再删除

```js
function removeNthFromEnd( head ,  n ) {
    // write code here
    let reversed=reverse(head)
    let removed=removeNth(reversed,n)
    return reverse(removed)
}
function removeNth( head ,  n ) {
    if(n===1)return head.next
    else{
        let pre=head
        for(let i=0;i<n-2;i++){
            pre=pre.next
        }
        pre.next=pre.next.next
        return head
    }
}
function reverse(head){
    let pre=null
    let cur=head
    let tmp
    while(cur){
        tmp=cur.next
        cur.next=pre
        pre=cur
        cur=tmp
    }
    return pre
}
```

### 19.NC1 大数加法 *指针

两个字符串从后向前遍历，模拟人工加法，然后每次插入到一个新的字符串的头部，注意保存进位即可

```js
function solve( s ,  t ) {
    // write code here
    //前面补零，补成长串前面加一个0
    let maxLen=Math.max(s.length,t.length)
    t=t.padStart(maxLen+1,'0')
    s=s.padStart(maxLen+1,'0')
    let up=0
    let res=''
    for (let i=maxLen;i>=0;i--){
        let sum=(parseInt(s[i])+parseInt(t[i])+up)%10
        up=Math.floor((parseInt(s[i])+parseInt(t[i])+up)/10)
        res=sum+res
    }
    if (res[0]==='0')return res.substring(1)
   else return res
}
```

### 20.NC14 按之字形顺序打印二叉树

把层序遍历改编下就行

```js
function Print(pRoot)
{
    // write code here
    if(!pRoot)return []
    let q=[pRoot]
    let res=[]
    let target=1//辨别是否需要逆序
    while (q.length){
        let subLen=q.length
        let subRes=[]
        for(let i=subLen;i>0;i--){//循环subLen次
            let node=q.shift()
            subRes.push(node.val)
            if(node.left)q.push(node.left)
            if(node.right)q.push(node.right)
        }
        if(target%2===0)subRes.reverse()
        res.push(subRes)
        target++
    }
    return res

}
```

### 20.LC1143.最长公共子序列 *动态规划 二维数组

![image-20221109154044727](C:\Users\Jasmine\Desktop\面试\img\image-20221109154044727.png)

两字符串相同:` dp[i][j] = dp[i-1][j-1] + 1`; 不同: `dp[i][j] = Math.max(dp[i-1][j],dp[i][j-1]);`

```js
var longestCommonSubsequence = function(text1, text2) {
    let dp = Array.from(new Array(text1.length+1),()=>new Array(text2.length+1).fill(0));//创建二维数组（最好的方法）
    for(let i = 1; i <=text1.length; i++) {
        for(let j = 1; j <=text2.length; j++) {
            if(text1[i-1] === text2[j-1]) {
                dp[i][j] = dp[i-1][j-1] + 1;
            } else {
                dp[i][j] = Math.max(dp[i-1][j],dp[i][j-1]);
            }
        }
    }
    return dp[text1.length][text2.length]

};
```



### 21.NC127 最长公共子串

![image-20221110182919778](C:\Users\Jasmine\Desktop\面试\img\image-20221110182919778.png)和上一题类似，区别是 两字符串相同:` dp[i][j] = dp[i-1][j-1] + 1`; 不同: `dp[i][j] = 0;`

```js
function LCS( str1 ,  str2 ) {
    // write code here
    //记录最大长度及尾坐标
    let max=0
    let index=0
    let dp=Array.from(new Array(str1.length+1),()=>new Array(str2.length+1).fill(0))
    for (let i =1;i<=str1.length;i++){
        for (let j=1;j<=str2.length;j++){
            if (str1[i-1]===str2[j-1])dp[i][j]=dp[i-1][j-1]+1
            else dp[i][j]=0
            if (max<dp[i][j]){
                max=dp[i][j]
                index=i
            }
        }
    }
    if (max===0)return -1
    else return str1.slice(index-max,index)
}
```

### 22.NC66 两个链表的第一个公共结点

![image-20221110190612930](C:\Users\Jasmine\Desktop\面试\img\image-20221110190612930.png)

按图示走法，如果他们有公共节点，他们最终一定会在第一个公共节点相遇；如果没有公共节点，他们同时指向null

```js
var getIntersectionNode = function (headA, headB) {
    let a = headA
    let b = headB
    while (a !== b) {
        if (a) a = a.next
        else a = headB
        if (b) b = b.next
        else b = headA
    }
    return a
}
```

### 23.NC40 链表相加(二) *栈 头插法

<img src="C:\Users\Jasmine\Desktop\面试\img\C2DB572B01B0FDC03C097BE7ABA45114" alt="img" style="zoom:50%;" />

```js
function addInList(head1, head2) {
   let list1=[]
    let list2=[]
    while (head1){
       list1.push(head1.val)
        head1=head1.next
    }
    while (head2){
        list2.push(head2.val)
        head2=head2.next
    }
    let up=0
    let sum=0
    let res=new ListNode()
    while (list1.length||list2.length){
        if (list1.length&&list2.length){
            let pop1=list1.pop()
            let pop2=list2.pop()
            sum=(up+pop1+pop2)%10
            up=Math.floor((up+pop1+pop2)/10)
        }
        else if(!list1.length){//list1空了
            let pop2=list2.pop()
            sum=(up+pop2)%10
            up=Math.floor((up+pop2)/10)
        }
        else {
            let pop1=list1.pop()
            sum=(up+pop1)%10
            up=Math.floor((up+pop1)/10)
        }

        //头插法
        let node=new ListNode(sum)
        node.next=res.next
        res.next=node
    }
    if (up===1) {
        let node=new ListNode(up)
        node.next=res.next
        res.next=node
    }
    return res.next
}
```

### 24 NC102 在二叉树中找到两个节点的最近公共祖先 *递归左右子树

首先要明白一点：如果从一个节点，从它左子树找能找到一个节点，从右子树找能找到一个节点，那么它就是最近公共祖先

```js
function lowestCommonAncestor(root, o1, o2) {
    if (root == null) return root
    if (o1 === root || o2 === root) return root//递归出口
    //两个遍历会从根节点开始，分别遍历到空，或者 遇到o1或o2为止
    let findLeft = lowestCommonAncestor(root.left, o1, o2)
    let findRight = lowestCommonAncestor(root.right, o1, o2)

    if (!findLeft) return findRight
    if (!findRight) return findLeft
    return root//如果左右两边各存在一个节点，那么说明它就是最近公共祖先

}
```

![image-20221111223922886](C:\Users\Jasmine\Desktop\面试\img\image-20221111223922886.png)

### 25 NC103 反转字符串

```js
function solve(str) {
    let res=''
    while(str.length){
        res=str[0]+res
        str=str.slice(1)
        console.log(str)
    }
    return res
}
```

### 26 NC38 螺旋矩阵 *维护边界

```js
var spiralOrder = function (matrix) {
    if(matrix.length===0)return []
    let m = matrix.length
    let n = matrix[0].length
    let res=[]
    //维护边界 在边界上进行操作
    let top=0,bottom=m-1,left=0,right=n-1
    while (1){
        for (let i=left;i<=right;i++){
            res.push(matrix[top][i])
        }
        top++//上边界下移
        if (top>bottom)break
        for (let i=top;i<=bottom;i++){
            res.push(matrix[i][right])
        }
        right--//右边界左移
        if (left>right)break
        for (let i=right;i>=left;i--){
            res.push(matrix[bottom][i])
        }
        bottom--//下边界上移
        if (top>bottom)break
        for (let i=bottom;i>=top;i--){
            res.push(matrix[i][left])
        }
        left++//左边界右移
        if (left>right)break

    }
    return res
};
```

### 27 NC17 最长回文子串 *中心扩散

怎么求回文？ 我们的思路就是，从中间开始，向两边同时遍历，当左右元素一样的时候，代表满足回文条件。 一直循环这个过程去判断，直到左右不相等，截取这一段就好了。

从哪个字符开始向两边找？ 答案是从头开始遍历，我们把每一个字符串都当做是中间字符串，向两边寻找

![image.png](C:\Users\Jasmine\Desktop\面试\img\1667470017-zfiBoW-image.png)

```js
function getLongestPalindrome(A) {
    if (A.length <= 1) return A.length
    let max=1
    for (let i = 0; i < A.length; i++) {
        helper(i, i)
        helper(i, i + 1)
    }
    return max

    function helper(left, right) {
        while (A[left] === A[right]&&A[left]!==undefined) {
            left--
            right++
        }
        return max=max>right-left-1?max:right-left-1
    }
}
```

### 28 NC54 三数之和 *双指针 重点是去重

法一：哈希法 确定了a和b，那就可以想两数之和一样，在map中寻找`-(a+b)`，减少一层循环，时间复杂度`O(n^2)`，空间复杂度`O(n)`

***重点是去重 **其实这道题目使用哈希法并不十分合适，因为在去重的操作中有很多细节需要注意，在面试中很难直接写出没有bug的代码。

法二：双指针

先对数组排序，对外层循环，然后再用左右指针向中间收敛

```js
function threeSum( num ) {
    let res=[]
   num=num.sort((a,b)=>a-b)
    for (let i=0;i<num.length;i++){//第一个数字
        if (num[i] === num[i -1]) {//第一个数字的去重
            continue;
        }
        if (num>0)break//第一个数如果大于0，一定不可能
        let left=i+1,right=num.length-1
        while (left<right){
            if (num[i]+num[left]+num[right]===0){
                res.push([num[i],num[left],num[right]])
                left++
                right--
                while(left < right && num[left] === num[left-1])left++//跳过相等的数字  去重
                while(left < right && num[right] === num[right+1])right--//跳过相等的数字  去重
            }
            else if(num[i]+num[left]+num[right]>0)right--
            else left++
            
        }
    }
    return res
}

console.log(threeSum(
    [-1,0,1,2,-1,-4,-2,-3,3,0,4]))

```

### 29 NC12 重建二叉树

![image-20221114153924953](C:\Users\Jasmine\Desktop\面试\img\image-20221114153924953.png)