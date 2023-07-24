---
title: "2023723"
date: 2023-07-23T00:13:23+08:00
categories: ["面试"]
---





<!--more-->
{{< secret "111111" >}}

### 毕设

实现一个影视信息可视化站点，用于展示影视作品的数据和统计信息，提供给用户一个直观、易于理解的数据分析和浏览界面。

- Vue.js作为前端框架，使用FastAPI作为后端框架，数据库选择MySQL。

- 影视作品的分类浏览，如电影、电视剧、综艺等。热门影视作品排行榜和数据统计。影视作品的详情页面，包括演员信息、评分、评论等。

- 数据可视化图表，如折线图展示影视作品的票房趋势、饼图展示不同类型作品的占比等。
使用爬虫技术从豆瓣获取影视信息，并对数据进行清洗和处理，以满足项目的需求。
设计RESTful API，并通过axios来实现数据的传递和交互。使用ECharts来展示影视信息的统计数据，如何通过图表来直观地呈现数据分析结果。
[ECharts简介](https://juejin.cn/post/7111653197164314637)

## 实习
旅游管理系统。
这个项目主要的技术栈是:
后端系统:使用 Python 和 Flask 框架开发RESTful接口
数据库:MySQL 存储景区、游客、订单等数据
前端网站:Vue.js 构建管理系统页面
移动App: 使用 flutter 开发游客和员工的App
我主要负责的是后端系统的开发,实现了以下功能:

景点管理:增删改查景点信息,维护开放时间等
订单管理:实现预定门票、套票等功能
用户管理:员工账号的管理
数据统计:提供业务报表、景点流量统计等数据接口
这些接口为其他终端提供了支持,也使我对Python web开发有了更深入的理解。
## 杭州公交爬虫 
项目模块设计
1) db.py：主要定义以及提供 ORM 数据库信息存取等操作的工具模块。
2) model.py：主要定义 Route 与 Stop 两个类，负责处理路线与站点的正确性
以及数据存储更新的相关操作模块。
3) draw_map.py：使用 Flask 以及高德地图的 API 绘制线路地图的模块。
4) route_spider.py：本项目爬虫主体，对杭州公交 API 接口的路线、站点信
息进行爬取、处理，更新等一系列操作的模块。
5) api.py：对爬取的数据做处理整合后调用的 API 接口模块。
6) amap.py：调用高德地图生成公交路线的模块。
7) server.py：基于 Flask 的 Web 服务端，生成可视化公交线路网页。
4. 所选用的 Python 库介绍
1) peewee：Python 下简单小型的 ORM 库，支持 SQLite、MySQL 等数据库。
2) folium：Python 下方便数据可视化的工具库。
3) lxml：Python 下方便处理 XML、HTML 语法树的工具库。
4) requests：Python 下的 HTTP 库，可以方便的发起 Web 网络请求等。
5) Flask：Python 下轻量的 Web 框架，方便快速搭建 Web 服务。
6) gunicorn：Python 下 WSGI 的 HTTP 服务器
通过本次实验，我们学习了如何通过现有的杭州公交app抓包出其API接口，
以及查阅相关的公交信息数据，来获取整个杭州市区的公交车线路与站点信息。
其中，杭州公交的 API 接口有 v1 与 v2 两个版本，且由于 v2 接口本身并没
有相关的文档信息，需要通过获取的数据以及 app 处理本身的行为进行相关的分
析才能比较完善的处理获取到的数据。这里 v2 接口由于涉及到 token，是通过
逆向杭州公交 app 的 apk 文件来分析 token 生成方式的，但是后期发现两个接口
版本本身并没有太大区别。
在服务端部署方面，我们使用 Docker 容器部署在 VPS 上，并通过 CDN 来托
管网站，增加网页的健壮性与一体性。在分组合作上使用 Git 版本管理工具，并
将代码托管在 Github 上，方便代码的及时审查与修改。
总而言之，本次项目让我们学习以及实践了如何使用 requests 获取信息，
lxml 处理 HTML 的数据树，通过数据库储存信息，用 folium 与 Flask 绘制可视
化的数据地图，配合高德地图官方的 API 绘制静态地图，项目有趣且收获颇丰。
## 基于知识图谱的图书搜索

### 2.1研究内容

（1）**语义描述框架**：由于数据来源不一，因此构建知识图谱时需要统一的语义描述框架，本组使用RDF资源描述框架，作为知识图模型的基础，它将每一份知识分解为三元组形式。其中R代表任何具有URI标识符的可识别资源；D标识属性，特征和资源之间的关系；F标识模型，语言和这些描述的语法。它所具有非常优秀的可拓展性，使其作为图模型的边和顶点，将多个三元组结合起来表示。

（2）**数据源获取**：本小组通过爬虫得到图书数据，先分析得到图书本体和相关附加属性的数据结构特点，再对其领域内的实体，关系划分类型，逐一纳入SPO三元组框架中，提出图书知识库的模型结构，再对原数据进行预处理，对原始数据集中的有用数据进行提取，转化，变成上述的关系数据库存储架构，再为了弥补关系数据库储存知识可视化困难，不易更改节点等缺陷，引入图数据库Neo4j，以属性图形式存储图书知识图谱。

（3）**图数据库：**图数据库中数据模型主要以节点和关系(边)来体现，也可以处理键值对。鉴于表数据库，有更优秀的性能。

（4）**特征提取框架：**知识图谱当中知识表示学习可以得到丰富的实体和关系中的语义特征信息，一般有四个角度，一是从表示空间入手，得到实体和关系的低维嵌入。二是从复杂向量空间，捕获到对称的和反对称的关系。三是从高斯分布，受高斯词嵌入启发，引入高斯分布来处理确定的和不确定的实体关系。四是从拓扑空间，通过另一个超平面的设置引入交叉嵌入。

（5）**前端实现：**知识图谱构建完成之后，本小组将会为它做个简单的前端界面进行一定的功能展示。

### 2.2 项目的难点

（1）**数据获取：**由于网络上缺少构建RDF三元组形式的图书数据，现存的大多数开放数据集稀少。

（2）**数据清洗** ：所得到的数据存在大量的粗糙数据和空缺的现象，因此在对其进行数据预处理的时候较为困难。

（3）**图数据库的存储**：缺少图数据库的存储工具和可视化工具。

（4）**知识表征：**由于图书数据，数据稀疏，数据规模较大，但语义特征较少的特点，再结合现实可实现情况和代码实现比较困难的现状，选取合适的方法进行知识表征也是比较困难的。

（5）语义搜索：语义搜索需要用到nlp领域的模型处理，但碍于小组成员能力有限和现有的nlp模型训练难度较大（例如bert），所以不好处理。 

### 2.3 提出的解决方案

![img](file:///C:/Users/Jasmine/AppData/Local/Temp/msohtmlclip1/01/clip_image002.gif)（1）鉴于豆瓣的防爬虫较弱，本小组将以豆瓣作为主要爬虫数据源，用playwright1.21爬取，并且由于豆瓣的数据自身带有一定的领域划分，为半结构化数据，对之后的数据处理和知识图谱的建立有一定帮助。

​             图1 爬取到的初步数据

（2）对于数据清洗，本小组主要用python读取完数据后，先去除无用的符号，再用正则表达式，筛选掉空缺信息，得到所需要的信息，放入图数据库中，等待下一步操作。

import pandas as pd

import numpy as np

import re

data = []

with open("BX-Users.csv",encoding='utf-8-sig',errors="ignore") as f:

  for line in f.readlines():

​    line = line.strip("\n")

​    array = re.split('[,;]',line)

​    num = []

​    for x in array:

​      strinfo = re.compile('"')

​      x = strinfo.sub('',x)

​      num.append(x)

​    data.append(num)

（3）Neo4j 是一个高性能的NoSQL 图形数据库。它将结构化数据存储在网络上而不是表格中。同时，它是一个嵌入式的、基于磁盘的、具备完全的事务特性的Java持久化引擎，是一个成熟的、具有推理功能的引擎。利用Neo4j来构建图书的知识图谱，能够直观地分析不同用户图书偏好的结构化数据网络。因此小组决定用Neo4j进行图数据的存储。我们将图书的类型、作者、出版社等进行了详致的分类，方便后续导入Neo4j。在对实体与关系进行了定义之后，将表格导入Neo4j，可对其输入命令，使关系与实体全部呈现。这种实体与关系的可视化表示，可随意进行拖拽处理，还可以对其进行定义实体的属性。例如实体：莫言，可对其定义属性：作者。

import csv

import py2neo

from py2neo import Graph,Node,Relationship,NodeMatcher

 

g = Graph('http://localhost:7474',user='neo4j',password='123456')

g.delete_all()

with open('C:/Users/86151/Desktop/大创/代码/Books.csv','r',encoding='ISO-8859-1') as f:

  reader = csv.reader(f)

  k = []  #关系

  for item in reader:

​    if reader.line_num == 1:

​      for x in item[:-1]:

​        k.append(x)

​      continue

​    start_node = Node("Book",name = item[1])

​    end_node = Node("ISBN",name = item[0])

​    relation = Relationship(start_node,k[0],end_node)

​    g.merge(start_node,"Book",'name')

​    g.merge(end_node,"ISBN",'name')

​    g.merge(relation,"ISBN","name")

​    flag = 2

​    for y in item[2:-1]:

​      str_1 = k[flag]

​      end_node = Node(str_1,name = y)

​      relation = Relationship(start_node,str_1,end_node)

​      g.merge(end_node, str_1, "name")

​      g.merge(relation, str_1, "name")

![IMG_256](file:///C:/Users/Jasmine/AppData/Local/Temp/msohtmlclip1/01/clip_image004.jpg)
       flag += 1

 

图2.Java相关书籍的知识图谱

（4） 

|      |                                                              |
| ---- | ------------------------------------------------------------ |
|      | ![img](file:///C:/Users/Jasmine/AppData/Local/Temp/msohtmlclip1/01/clip_image006.gif) |


对知识表示模型的选取，本小组选择利用翻译模型TransE进行，将网络中的节点表示成低维、实值、稠密的向量形式，使得得到的向量形式可以在[向量空间](https://www.zhihu.com/search?q=向量空间&search_source=Entity&hybrid_search_source=Entity&hybrid_search_extra={)中具有表示以及推理的能力。在嵌入框架之中，因其对大规模数据极高的拓展性，翻译模型广受科学界大众欢迎。基于翻译的模型的基本思想是，将头尾和关系向量化，通过不断拟合三个向量，迭代训练，使其h+r-t的差值能够做到最小。



图3.transE基础思想

 

|      |                                                              |
| ---- | ------------------------------------------------------------ |
|      | ![img](file:///C:/Users/Jasmine/AppData/Local/Temp/msohtmlclip1/01/clip_image008.gif) |


loss函数则选用SVM的合页损失函数，目的是将正和负尽可能分开。



图4.loss函数-margin based ranking

 虽然transE与另外几个有一定差距，但考虑到模型实现难度，综合考虑，还是以transE为主。



图7 trans相关比较

具体工作流程如下：

\1.     初始化：对关系和首位实体进行向量初始化，再用L2范数进行归一化，也就是除以自身的L2范数。

 

for relation in self.relation:

  \# 初始化关系

  r_emb_temp = np.random.uniform(-6 / math.sqrt(self.embedding_dim),

​                  6 / math.sqrt(self.embedding_dim),

​                  self.embedding_dim)

 

  relation_dict[relation] = r_emb_temp / np.linalg.norm(r_emb_temp, ord=2)

 

for entity in self.entity:

  \# 初始化实体

  e_emb_temp = np.random.uniform(-6 / math.sqrt(self.embedding_dim),

​                  6 / math.sqrt(self.embedding_dim),

​                  self.embedding_dim)

 

  entity_dict[entity] = e_emb_temp / np.linalg.norm(e_emb_temp, ord=2)

\2.     取一个batch（设了400）的样本，先加载正样本（即正确的三元组对），将其存储在列表中，再替换掉头实体或尾实体构造负样本，将正样本和负样本打乱放到一起，完成正负样本提取。

 

def train(self, epochs):

  nbatches = 400

  batch_size = len(self.triple_list) // nbatches

  print("batch size: ", batch_size)

  for epoch in range(epochs):

​    start = time.time()

​    self.loss = 0

​    num = 0

​    for k in range(nbatches):

​      Sbatch = random.sample(

​        self.triple_list, batch_size)  # 取一个batch的三元组样本

​      Tbatch = []  # 负样本

​      num = num + 1

​      \# 每个triple选3个负样例

​      \# for i in range(3):

​      for triple in Sbatch:  # 创造负样本

​        corrupted_triple = self.Corrupt(triple)

​        Tbatch.append((triple, corrupted_triple))  # 包含正样本和负样本的列表

 

  然后将正三元组和负三元组向量化之后，都进行距离计算，目的是为了把正负分开，求导之后算取loss，再用loss利用梯度下降更新正确三元组的向量，(h+r-t)head系数为正，减梯度，tail系数为负，加梯度。

def hinge_loss(self, dist_correct, dist_corrupt):  # 损失函数

return max(0, dist_correct - dist_corrupt + self.margin)

 

h_correct_update -= self.learning_rate * grad_pos     #迭代计算

​        t_correct_update -= (-1) * self.learning_rate * grad_pos

​        relation_update -= self.learning_rate * grad_pos

 

​        if triple[0] == corrupted_triple[0]:

​          h_correct_update -= (-1) * self.learning_rate * grad_neg

​          t_corrupt_update -= self.learning_rate * grad_neg

​          relation_update -= (-1) * self.learning_rate * grad_neg

​        elif triple[1] == corrupted_triple[1]:

​          h_corrupt_update -= (-1) * self.learning_rate * grad_neg

​          t_correct_update -= self.learning_rate * grad_neg

​          relation_update -= (-1) * self.learning_rate * grad_neg



1、TCP/UDP/HTTP 协议区别？
2、深拷贝浅拷贝
3、简述一个前端请求的处理流程，在 uwsgi/nginx/django 之间的处理流程
4、redis 用过哪些数据结构？怎么保存的
5、celery 队列
6、modelfirst dbfirst 区别？
7、线程/进程/协程区别
8、tornado 框架
9、向量化–one-hot 编码/数据分箱
10、栈、堆
11、你知道的排序算法
12、MySQL 优化、多表查询
13、Linux 下找文件
14、闭包
15、Django 模型类继承
16、时间更新模型类
17、Settings 里面设置东西
18、ajax 请求的 csrf 解决方法
19、机器数据分析/建模有什么感悟？
20、爬虫原理
30、redis 为什么快？除了他是内存型数据库外，还有什么原因
31、python2 和 python3 的区别？
32、你觉得 python2 的项目如果迁移到 python3，困难会在哪里？
{{< /secret >}}
