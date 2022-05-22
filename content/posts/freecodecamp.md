---
title: "Legacy Responsive Web Design 笔记"
date: 2022-05-23T23:09:58+08:00
categories: [前端]
tags: [前端三件套]
---

偶然发现FreeCodeCamp这个网站，想着很多基础知识都生疏了（或者说本来就不咋熟练），想做一遍题目，熟悉一下。这里记录一些之前没见过 或者忘得差不多的一些小点

### 基础CSS 

1.[attr=value] 属性选择器
	例如，下面的代码会改变所有 type 为 radio 的元素的外边距。

```css
[type='radio'] {
  margin: 20px 0px 20px 0px;
}
```
2.理解绝对单位与相对单位
	绝对单位：MDN文档认为px为绝对单位。
	相对单位：是相对于其他东西的，可能是父元素字体的大小，或者视口的大小。列一些常见的相对单位。
	em	父级的字体大小，在印刷属性的情况下 font-size，和元素本身的字体大小，在其他属性的情况下，如width.

|    |      几倍于           |
| ---- | ------------------- |
|   ex   |       元素字体的 x 高度。   |
| rem| 	根元素的字体大小。| 
| lh| 	元素的行高。| 
| vw| 	视口宽度的 1%。| 
| vh| 	视口高度的 1%。| 
| vmin	| 视口较小尺寸的 1%。| 
| vmax| 	视口较大尺寸的 1%。| 

3.CSS样式的优先级
	Important>行内样式>id选择>class选择
	eg.
	给粉红文本元素的颜色声明添加关键词 !important，以确保 h1 元素为粉红色。
	如下所示：
```css
color: red !important;
```
4.创建一个自定义的 CSS 变量

只需要在变量名前添加两个连字符号，并为其赋值即可，例子如下：

```css
--penguin-skin: gray;
```

创建变量后，CSS 属性可以通过调用变量名来使用它对应的值。

```css
background: var(--penguin-skin);
```
补充：
使用变量来作为 CSS 属性值的时候，可以设置一个备用值来防止由于某些原因导致变量不生效的情况。让浏览器在找不到你的变量时可以显示一种颜色。
下面是操作方式：

```css
background: var(--penguin-skin, black);
```
5.:root
:root 这个 CSS 伪类匹配文档树的根元素。对于 HTML 来说，:root 表示 <html> 元素，除了优先级更高之外，与 html 选择器相同。
eg.
在声明全局 CSS 变量时 :root 会很有用：

```css
:root {
  --main-color: hotpink;
  --pane-padding: 5px 42px;
}
```
### 应用视觉设计
1.
使用 u 标签给文本添加下划线;
使用 em 标签来强调文本;
用 s 标签来给文字添加删除线;
用 hr 标签来创建一条宽度撑满父元素的水平线;((((可以考虑用到我的模板里，嘻嘻))))
opacity 属性用来设置元素的透明度；
text-transform 属性给文本添加大写效果；
2.top, right, bottom, left指的是当前元素相对于top, right, bottom, left向对面移动多远
3.
position：relative 相对定位
position：absolute 绝对定位。 会将元素从当前的文档流里面移除，周围的元素会忽略它。绝对定位比较特殊的一点是元素的定位参照于最近的 positioned 祖先元素。 如果它的父元素没有添加定位规则（默认是 position: relative;），浏览器会继续寻找直到默认的 body 标签。
position: fixed.  fixed 和 absolute 的最明显的区别在于，前者定位的元素不会随着屏幕滚动而移动。

