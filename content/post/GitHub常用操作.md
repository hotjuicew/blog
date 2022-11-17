---
title: "GitHub常用操作"
date: 2022-09-11T17:04:47+08:00
categories: ["GitHub"]
tags: []
---

### 1.将本地仓库上传到GitHub

1. 新建一个github仓库，复制下链接

![image-20220911161401700](D:\workspace\hotjuice_website\static\images\blog\2022\image-20220911161401700.png)

2. 在tower中打开本地仓库，提交首次commit，再连接到远程仓库，

### 2.git回退到某个历史版本

[版本回退](https://www.liaoxuefeng.com/wiki/896043488029600/897013573512192)

[Git恢复之前版本的两种方法reset、revert（图文详解)](https://blog.csdn.net/yxlshk/article/details/79944535)

[Git恢复之前版本的三种方法reset、revert、rebase 及其他操作](https://codeantenna.com/a/CxastajmvB)

#### **方法一：git reset**

先git reset 再git push

**原理：** git reset的作用是修改HEAD的位置，即将HEAD指向的位置改变为之前存在的某个版本，如下图所示，假设我们要回退到版本一：
![这里写图片描述](https://imgconvert.csdnimg.cn/aHR0cDovL2ltZy5ibG9nLmNzZG4ubmV0LzIwMTgwNDE0MjEyMjIxMDMz)
**适用场景：** 如果想恢复到之前某个提交的版本，且那个版本之后提交的版本我们都不要了，就可以用这种方法。

#### 方法二：git revert

原理： git revert是用于“反做”某一个版本，以达到撤销该版本的修改的目的。比如，我们commit了三个版本（版本一、版本二、 版本三），突然发现版本二不行（如：有bug），想要撤销版本二，但又不想影响撤销版本三的提交，就可以用 git revert 命令来反做版本二，生成新的版本四，这个版本四里会保留版本三的东西，但撤销了版本二的东西。如下图所示：

**适用场景**： 如果我们想撤销之前的某一版本，但是又想保留该目标版本后面的版本，记录下这整个版本变动流程，就可以用这种方法。

### 3.[git commit之后，想撤销commit](https://www.cnblogs.com/lfxiao/p/9378763.html)

git reset --soft HEAD^*