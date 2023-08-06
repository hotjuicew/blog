---
title: "2023723"
date: 2023-07-23T00:13:23+08:00
categories: ["面试"]
---

<!--more-->

{{< secret "111111" >}}

### 自我介绍

你好，我是wjy，本科是杭电的，第一个学位是会计学，但是在学会计的时候已经对计算机比较感兴趣，但是不能转专业了，出于兴趣原因，去读了计算机二学位。平常喜欢做一些开源的小项目，比如说自己写博客前端主题，用python写聊天机器人，技术栈是偏全栈，前端一般用Vue比较多，react也用过一点。后端自己写过go和python。基本情况就这样。

### 毕设

实现一个影视信息可视化站点，用于展示影视作品的数据和统计信息，提供给用户一个直观、易于理解的数据分析和浏览界面。

- Vue作为前端框架，api是用tmdb的现成api

-  对于频繁被访问的页面，如首页、热门排行榜页面，将页面所需的数据缓存到 Redis 中，以提高页面加载速度和用户体验。

- 影视作品的分类浏览，如电影、电视剧、综艺等。热门影视作品排行榜和数据统计。影视作品的详情页面，包括演员信息、评分、评论等。

- 数据可视化图表，如折线图展示影视作品的票房趋势、饼图展示不同类型作品的占比等。
  使用爬虫技术从豆瓣获取影视信息，并对数据进行清洗和处理，以满足项目的需求。
  并通过 axios 来实现数据的传递和交互。使用 ECharts 来展示影视信息的统计数据，如何通过图表来直观地呈现数据分析结果。
  [ECharts 简介](https://juejin.cn/post/7111653197164314637)

## 实习

旅游管理系统。

后端Java，

网页测试接口，网页端和客户端有测试接口。测试后端临时使用fastAPI搭建，仅用于测试目的

Vue负责全部页面渲染。

这个项目主要的技术栈是:
数据库:MySQL 存储景区、游客、订单等数据
前端网站:Vue.js 构建管理系统页面
我主要负责的是后端系统的开发,实现了以下功能:

景点管理:增删改查景点信息,维护开放时间等
订单管理:实现预定门票、套票等功能
用户管理:员工账号的管理
数据统计:提供业务报表、景点流量统计等数据接口
这些接口为其他终端提供了支持,也使我对 Python web 开发有了更深入的理解。

## 杭州公交爬虫

通过抓包杭州公交 App，获取请求 API 的认证密钥（抓包拿到token。用了borp的抓包工具，hitm的中间人解密模块就可以读到所有的请求细节）及接口信息。

没有用爬虫框架，用request请求api的返回信息，再用lxml解析数据。

中间数据导出为 JSON 格式使用 ORM 库 peewee 将数据存储进 SQLite 使用 Python Flask 的网络后台框架和高德 API 绘制网页 使用 Docker 容器部署在 Google Cloud 上，并通过 Cloudflare CDN 来架构网站

项目模块设计

1. db.py：主要定义以及提供 ORM 数据库信息存取等操作的工具模块。
2. model.py：主要定义 Route 与 Stop 两个类，负责处理路线与站点的正确性
   以及数据存储更新的相关操作模块。
3. draw_map.py：使用 Flask 以及高德地图的 API 绘制线路地图的模块。
4. route_spider.py：本项目爬虫主体，对杭州公交 API 接口的路线、站点信
   息进行爬取、处理，更新等一系列操作的模块。
5. api.py：对爬取的数据做处理整合后调用的 API 接口模块。
6. amap.py：调用高德地图生成公交路线的模块。
7. server.py：基于 Flask 的 Web 服务端，生成可视化公交线路网页。

所选用的 Python 库介绍

1. peewee：Python 下简单小型的 ORM 库，支持 SQLite、MySQL 等数据库。
2. folium：Python 下方便数据可视化的工具库。
3. lxml：Python 下方便处理 XML、HTML 语法树的工具库。
4. requests：Python 下的 HTTP 库，可以方便的发起 Web 网络请求等。
5. Flask：Python 下轻量的 Web 框架，方便快速搭建 Web 服务。
6. gunicorn：Python 下 WSGI 的 HTTP 服务器
   通过本次实验，我们学习了如何通过现有的杭州公交 app 抓包出其 API 接口，
   以及查阅相关的公交信息数据，来获取整个杭州市区的公交车线路与站点信息。
   在服务端部署方面，我们使用 Docker 容器部署在 VPS 上，并通过 CDN 来托
   管网站，增加网页的健壮性与一体性。在分组合作上使用 Git 版本管理工具，并
   将代码托管在 Github 上，方便代码的及时审查与修改。
   总而言之，本次项目让我们学习以及实践了如何使用 requests 获取信息，
   lxml 处理 HTML 的数据树，通过数据库储存信息，用 folium 与 Flask 绘制可视
   化的数据地图，配合高德地图官方的 API 绘制静态地图，项目有趣且收获颇丰。
7. 前端直接写html文件

## 基于知识图谱的图书搜索

我们利用知识图谱技术对图书数据进行处理，搭建图书数据的知识图谱，挖掘图书数据背后的知识表示模型，再将知识图谱构建到网页上，初步实现图书搜索和其结果的可视化。

### 2.1 研究内容

（1）**语义描述框架**：由于数据来源不一，因此构建知识图谱时需要统一的语义描述框架，本组使用 RDF 资源描述框架，作为知识图模型的基础，它将每一份知识分解为三元组形式。其中 R 代表任何具有 URI 标识符的可识别资源；D 标识属性，特征和资源之间的关系；F 标识模型，语言和这些描述的语法。它所具有非常优秀的可拓展性，使其作为图模型的边和顶点，将多个三元组结合起来表示。

（2）**数据源获取**：本小组通过爬虫得到图书数据，先分析得到图书本体和相关附加属性的数据结构特点，再对其领域内的实体，关系划分类型，逐一纳入 SPO 三元组框架中，提出图书知识库的模型结构，再对原数据进行预处理，对原始数据集中的有用数据进行提取，转化，变成上述的关系数据库存储架构，再为了弥补关系数据库储存知识可视化困难，不易更改节点等缺陷，引入图数据库 Neo4j，以属性图形式存储图书知识图谱。

（3）**图数据库：**图数据库中数据模型主要以节点和关系(边)来体现，也可以处理键值对。鉴于表数据库，有更优秀的性能。

（4）**特征提取框架：**知识图谱当中知识表示学习可以得到丰富的实体和关系中的语义特征信息，一般有四个角度，一是从表示空间入手，得到实体和关系的低维嵌入。二是从复杂向量空间，捕获到对称的和反对称的关系。三是从高斯分布，受高斯词嵌入启发，引入高斯分布来处理确定的和不确定的实体关系。四是从拓扑空间，通过另一个超平面的设置引入交叉嵌入。

（5）**前端实现：**知识图谱构建完成之后，本小组将会为它做个简单的前端界面进行一定的功能展示。

### 项目创新点

1.利用知识图谱来存储图书数据，图数据结构的搜索在一些方面优于表数据结构。

2.transE方法进行了一定更改，在创造负样本的时候，使用了平均尾节点数 hpt 和平均头结点数tph，tph 表示每一个头结对应的平均尾节点数 hpt 表示每一个尾节点对应的平均头结点数当tph > hpt 时 更倾向于替换头 反之则跟倾向于替换尾实体，而并非随机替换。

### 2.2 项目的难点

（1）**数据获取：**由于网络上缺少构建 RDF 三元组形式的图书数据，现存的大多数开放数据集稀少。

（2）**数据清洗** ：所得到的数据存在大量的粗糙数据和空缺的现象，因此在对其进行数据预处理的时候较为困难。

（3）**图数据库的存储**：缺少图数据库的存储工具和可视化工具。

（4）**知识表征：**由于图书数据，数据稀疏，数据规模较大，但语义特征较少的特点，再结合现实可实现情况和代码实现比较困难的现状，选取合适的方法进行知识表征也是比较困难的。

（5）语义搜索：语义搜索需要用到 nlp 领域的模型处理，但碍于小组成员能力有限和现有的 nlp 模型训练难度较大（例如 bert），所以不好处理。

### 2.3 提出的解决方案

（1）鉴于豆瓣的防爬虫较弱，本小组将以豆瓣作为主要爬虫数据源，用 playwright1.21 爬取，并且由于豆瓣的数据自身带有一定的领域划分，为半结构化数据，对之后的数据处理和知识图谱的建立有一定帮助。

（2）对于数据清洗，本小组主要用 python 读取完数据后，先去除无用的符号，再用正则表达式，筛选掉空缺信息，得到所需要的信息，放入图数据库中，等待下一步操作。

```python
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
```

（3）Neo4j 是一个高性能的 NoSQL 图形数据库。它将结构化数据存储在网络上而不是表格中。同时，它是一个嵌入式的、基于磁盘的、具备完全的事务特性的 Java 持久化引擎，是一个成熟的、具有推理功能的引擎。利用 Neo4j 来构建图书的知识图谱，能够直观地分析不同用户图书偏好的结构化数据网络。因此小组决定用 Neo4j 进行图数据的存储。我们将图书的类型、作者、出版社等进行了详致的分类，方便后续导入 Neo4j。在对实体与关系进行了定义之后，将表格导入 Neo4j，可对其输入命令，使关系与实体全部呈现。这种实体与关系的可视化表示，可随意进行拖拽处理，还可以对其进行定义实体的属性。例如实体：莫言，可对其定义属性：作者。

```python
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
       flag += 1
```

（4） 对知识表示模型的选取，本小组选择利用翻译模型 TransE 进行，将网络中的节点表示成低维、实值、稠密的向量形式，使得得到的向量形式可以在[向量空间](https://www.zhihu.com/search?q=向量空间&search_source=Entity&hybrid_search_source=Entity&hybrid_search_extra={)中具有表示以及推理的能力。在嵌入框架之中，因其对大规模数据极高的拓展性，翻译模型广受科学界大众欢迎。基于翻译的模型的基本思想是，将头尾和关系向量化，通过不断拟合三个向量，迭代训练，使其 h+r-t 的差值能够做到最小。

```py
1.	初始化：对关系和首位实体进行向量初始化，再用L2范数进行归一化，也就是除以自身的L2范数。

for relation in self.relation:
    # 初始化关系
    r_emb_temp = np.random.uniform(-6 / math.sqrt(self.embedding_dim),
                                   6 / math.sqrt(self.embedding_dim),
                                   self.embedding_dim)

    relation_dict[relation] = r_emb_temp / np.linalg.norm(r_emb_temp, ord=2)

for entity in self.entity:
    # 初始化实体
    e_emb_temp = np.random.uniform(-6 / math.sqrt(self.embedding_dim),
                                   6 / math.sqrt(self.embedding_dim),
                                   self.embedding_dim)

    entity_dict[entity] = e_emb_temp / np.linalg.norm(e_emb_temp, ord=2)
2.	取一个batch（设了400）的样本，先加载正样本（即正确的三元组对），将其存储在列表中，再替换掉头实体或尾实体构造负样本，将正样本和负样本打乱放到一起，完成正负样本提取。

def train(self, epochs):
    nbatches = 400
    batch_size = len(self.triple_list) // nbatches
    print("batch size: ", batch_size)
    for epoch in range(epochs):
        start = time.time()
        self.loss = 0
        num = 0
        for k in range(nbatches):
            Sbatch = random.sample(
                self.triple_list, batch_size)  # 取一个batch的三元组样本
            Tbatch = []  # 负样本
            num = num + 1
            # 每个triple选3个负样例
            # for i in range(3):
            for triple in Sbatch:  # 创造负样本
                corrupted_triple = self.Corrupt(triple)
                Tbatch.append((triple, corrupted_triple))  # 包含正样本和负样本的列表

   然后将正三元组和负三元组向量化之后，都进行距离计算，目的是为了把正负分开，求导之后算取loss，再用loss利用梯度下降更新正确三元组的向量，(h+r-t)head系数为正，减梯度，tail系数为负，加梯度。
def hinge_loss(self, dist_correct, dist_corrupt):  # 损失函数
return max(0, dist_correct - dist_corrupt + self.margin)

h_correct_update -= self.learning_rate * grad_pos        #迭代计算
                t_correct_update -= (-1) * self.learning_rate * grad_pos
                relation_update -= self.learning_rate * grad_pos

                if triple[0] == corrupted_triple[0]:
                    h_correct_update -= (-1) * self.learning_rate * grad_neg
                    t_corrupt_update -= self.learning_rate * grad_neg
                    relation_update -= (-1) * self.learning_rate * grad_neg
                elif triple[1] == corrupted_triple[1]:
                    h_corrupt_update -= (-1) * self.learning_rate * grad_neg
                    t_correct_update -= self.learning_rate * grad_neg
                    relation_update -= (-1) * self.learning_rate * grad_neg


```

## 基础

#### TCP/UDP/HTTP

TCP、UDP 和 HTTP 是网络通信中的三种常见协议,它们之间的主要区别为:

1. TCP 和 UDP 是两种传输层协议,位于网络协议栈中的第四层,用于定义数据的传输方式。而 HTTP 是一种应用层协议,位于网络协议栈的第七层,建立在 TCP 协议之上用于网页访问。
2. TCP 是面向连接的可靠传输协议,通过建立连接并握手来保证数据包按顺序可靠到达。UDP 是无连接的不可靠传输协议,只负责发送,不保证顺序和可靠性。
3. TCP 提供流控制、拥塞控制,对网络数据量进行调节。UDP 不提供流量控制,可能导致网络拥堵。
4. TCP 的连接需要三次握手建立,开销较大。UDP 可以直接发送数据包,效率较高。
5. TCP 用于对可靠性要求较高的通信,如文件传输;UDP 一般用于对实时性要求较高的通信,如视频流。
6. HTTP 建立在 TCP 上进行可靠数据传输,通常使用 80 端口;TCP 和 UDP 使用不同端口号。

总结:TCP 强调可靠传输,UDP 强调实时快速,HTTP 基于 TCP 进行网页传输。根据应用场景需求选择合适的协议。

#### redis

Redis（Remote Dictionary Server）是一个开源的高性能键值存储数据库，它支持多种数据结构，包括**字符串、哈希表、List、SET、有序集合和位图**。Redis的设计目标是为了提供快速、可靠的数据存储和检索，以及一些高级功能如发布/订阅、事务、持久化等。

应用场景：

1. **缓存**：Redis作为缓存层，可以大大提高应用程序的性能。它可以将经常访问的数据存储在内存中，减少了对数据库等后端存储的访问压力。
2. **会话存储**：将用户会话信息存储在Redis中，可以轻松地实现分布式环境下的会话管理。这样，即使一个应用服务器出现故障，用户的会话信息也不会丢失。
3. **排行榜/计数器**：使用有序集合（Sorted Set）来实现排行榜或计数器功能。例如，可以使用有序集合来存储用户的积分和排名。
4. **实时消息传递**：Redis的发布/订阅机制可以用于实现实时消息传递，使不同组件或服务之间能够实时通信。
5. **任务队列**：通过Redis的列表结构，可以实现任务队列。多个进程可以通过向列表中添加任务，以及从列表中弹出任务来实现任务的分发与执行。
6. **地理空间数据处理**：Redis的地理位置数据类型（GeoHash）可以用于存储和查询地理空间信息，比如位置坐标、距离计算等。
7. **分布式锁**：使用Redis可以实现分布式环境下的锁机制，以确保在多个节点上执行的操作不会发生冲突。
8. **实时统计**：Redis的计数器和存储功能可用于实时统计，如在线用户数、页面访问量等。

总之，Redis在很多场景下都表现出色，尤其是在需要**高性能、高并发、实时性**和数据存储灵活性的应用中。

**redis 为什么快？**除了他是内存型数据库外，还有什么原因？

#### 线程/进程/协程区别

线程、进程和协程都是实现程序并发执行的方法,它们之间有以下区别:

- 进程:操作系统分配资源和调度的基本单位,每个进程有独立的地址空间和系统资源,互相独立。进程间通信复杂,创建和销毁开销大。
- 线程:CPU调度和执行的基本单位,使用进程的资源,但有自己的调用栈和局部变量。线程间通信简单,创建销毁开销小,但多个线程竞争会导致同步问题。
- 协程:能暂停执行保留当前状态的函数,不需操作系统支持。协程共用单个线程,没有锁的问题,但会有数量限制。切换开销小。

主要区别:

- 进程相互独立,线程共享进程资源,协程共享线程资源。
- 进程和线程由操作系统调度,协程由程序自行调度。
- 进程间通信复杂,线程通信简单,协程直接共享数据。

#### 栈、堆

栈和堆是编程语言中两种重要的内存管理机制。

栈(Stack):

- 存储着函数调用时的临时变量,按照先入后出的方式访问数据。
- 变量分配速度快,但是容量有限,且无需手动释放内存。
- 主要保存基础数据类型,对象引用等。

堆(Heap):

- 存储复杂对象和数据,可以动态分配大块内存区域。
- 变量分配需要新的内存所以速度较慢,但是容量大,使用完后需要手动释放。
- 主要保存对象,也可以保存基础类型但需要显式分配内存。

#### 排序算法

1. 冒泡排序:重复交换相邻元素直到有序,时间复杂度 O(n^2)
2. 选择排序:每次从未排序的部分选取最小（大）的元素，放到已排序部分的末尾。时间复杂度 O(n^2)
3. 插入排序:将未排序数据插入到已排序序列合适位置,时间复杂度 O(n^2)
4. 快速排序:递归划分然后排序子序列,时间复杂度 O(nlogn)
5. 归并排序:递归划分数据,然后合并排序的子序列,时间复杂度 O(nlogn)
6. 堆排序(Heap Sort):将数组构建为最大（小）堆，然后不断地将堆顶元素弹出，重新调整堆。时间复杂度 O(nlogn)
7. 桶排序(Bucket Sort):将元素分布到不同的桶中，对每个桶内的元素进行排序，最后将桶中的元素依次合并。时间复杂度 O(n)

#### MySQL 优化、多表查询

**MySQL 优化：**

1. **适当的索引使用：** 使用适当的索引可以显著提高查询性能。确保每个表上的常用查询列都有索引，并了解何时使用单列索引、复合索引和全文索引。
2. **避免全表扫描：** 尽量避免在查询中使用没有索引的列，以免触发全表扫描。全表扫描会导致性能下降，特别是在大型表上。
3. **合理使用缓存：** MySQL提供查询缓存功能，可以存储查询的结果。但是，不适合所有情况，特别是对于经常变化的表。在某些情况下，关闭查询缓存可能更好。(**redis**)
4. **避免使用SELECT \*：** 尽量避免使用`SELECT *`查询，而是只选择所需的列。这可以减少不必要的数据传输，提高查询效率。

**多表查询：**

1. **使用JOIN：** 使用`JOIN`操作来连接多个表，以获取关联数据。根据您的需求，选择`INNER JOIN`、`LEFT JOIN`、`RIGHT JOIN`等连接类型。
2. **使用子查询：** 在某些情况下，使用子查询可以简化复杂的多表查询。但要注意，不宜过度使用，以免影响性能。
3. **合理使用索引：** 确保连接列上有索引，以提高多表查询的性能。复合索引可以帮助优化连接操作。
4. **分解复杂查询：** 如果一个查询包含多个关联和过滤，可以将其拆分成多个小的查询，然后再进行组合，以减少复杂度。
5. **使用视图：** 在某些情况下，使用视图可以简化多表查询，提高查询可读性。但要注意性能开销。(**使用视图，可以将复杂的查询逻辑封装起来)**
6. **合理使用缓存：** 对于频繁查询的多表查询，可以考虑使用缓存来存储结果，以减少数据库负载。

#### Linux中常用的命令

ls: 列出目录中的文件和子目录

cd: 切换当前工作目录

pwd: 显示当前所在路径

mkdir: 创建目录

rm: 删除文件

cp: 复制文件

mv: 移动或重命名文件

cat: 显示文件内容

less: 分页显示文件内容

head/tail: 显示文件头/尾内容

grep: 在文件中搜索字符串

find: 在文件系统中搜索文件

ps/top: 显示正在运行的进程

kill: 通过PID杀死进程

ping/ifconfig: 网络测试和配置命令

sudo: 以管理员身份执行命令

df/du: 查看磁盘空间使用情况

tar: 打包压缩文件

ssh: 通过SSH连接远程主机

apt: Debian/Ubuntu的软件包管理命令

#### 闭包

闭包是函数内部的函数

其关键特征是:

1. 是一种内嵌函数,在一个外围函数中定义了一个内部函数。
2. 内嵌函数可以**访问外围函数的变量**,即使在外围函数返回后。
3. 内部函数保持了外围函数调用后运行环境的引用,使其一直存活在内存中。

闭包的优点:

1. 可以在内嵌函数中保存外围函数的运行环境(上下文),获取外层函数的状态。
2. 提供了封装性,外界无法访问内部函数的实现细节。

闭包常被用于设计一些API或需要保存状态的函数。一个典型应用是实现计数器:

```py
def counter():
  n = 0
  def inc():
    nonlocal n
    n += 1
    return n
  return inc
  
c1 = counter()
print(c1()) # 1
print(c1()) # 2
```

**坏处**

容易导致**内存泄漏**

- 闭包会导致内嵌函数一直保存外部函数的环境引用,可能会长期占用内存。
- 如果使用不当,比如闭包函数被当做回调长期存在,会 block GC 回收外部函数的环境。

解决方法：将闭包函数保存到变量中,使用完后将变量删除或设置为None。

```py
def outer():
    def inner():
        pass
    return inner

closure = outer() 
# use closure 
closure = None # delete reference
```

####  csrf 解决方法

csrf是跨域请求伪造。攻击者自动携带cookie执行非法操作。

1.设置Cookie的SameSite属性为`Strict`（仅允许同站点请求）或`Lax`（允许一部分跨站点情况）。

2.使用验证码来确认用户的身份，以防止自动化攻击。

3.使用CORS来限制允许跨域请求的来源

#### 爬虫原理

1. 选取起始URL,将其放入待爬取队列中。
2. 从待爬取队列中取出一个URL,向网站服务器发送HTTP请求,获取页面内容。（lxml库）
3. 分析页面内容,提取有用信息,例如文本、图片等。
4. 提取页面中的链接,放入待爬取队列。
5. 对extracted links进行过滤,去除重复、非法等链接。
6. 对allowed links生成新请求,循环步骤2-5,直到队列为空或达到预定目标。
7. 将爬取结果存储在数据库或文件中。
8. 可以根据需要设计爬虫程序的并发、缓存、代理、用户模拟等机制。

#### python2 和 python3

你觉得 python2 的项目如果迁移到 python3，困难会在哪里？

Python 2和Python 3主要有以下几点区别:

1. 打印函数变更:Python 2 使用print语句,Python 3使用print()函数。
2. 整数除法变更:Python 2中是整数相除,Python 3中是浮点数相除。
3. Unicode字符串处理:Python 3全部是unicode,Python 2 需要unicode()函数。
4. range和map以及filter从返回列表变为返回迭代器。
5. 一些语法调整,比如raise异常,异常类型需要用成括号括起来等。
6. 去掉了一些不常用的语句和功能,比如Backtick等。

从Python 2迁移到Python 3的主要困难:

1. 语法和功能变更,需要修改代码使其兼容Python 3。
2. 字符串编码问题,需要处理好Unicode。
3. 兼容第三方库,一些库可能没有及时支持Python 3。
4. 整数除法变更,可能影响某些算法和功能逻辑。
5. 一些语句或者功能被移除,需要找到替代方案。
6. print变为函数可能影响一些代码逻辑。

#### 什么是Python

- Python是一种解释型语言。这就是说，与C语言和C的衍生语言不同，Python代码在运行之前不需要编译。其他解释型语言还包括js，PHP和Ruby。
- Python是动态类型语言，指的是你在声明变量时，不需要说明变量的类型。你可以直接编写类似`x=111`和`x="I'm a string"`这样的代码，程序不会报错。
- Python非常适合面向对象的编程（OOP），因为它支持通过组合（composition）与继承（inheritance）的方式定义类（class）。Python中没有访问说明符（access specifier，类似C++中的`public`和`private`），这么设计的依据是“大家都是成年人了”。
- 在Python语言中，函数是第一类对象（first-class objects）。这指的是它们可以被指定给变量，函数既能返回函数类型，也可以接受函数作为输入。类（class）也是第一类对象。
- Python代码编写快，但是运行速度比编译语言通常要慢。好在Python允许加入基于C语言编写的扩展，因此我们能够优化代码，消除瓶颈，这点通常是可以实现的。`numpy`就是一个很好地例子，它的运行速度真的非常快，因为很多算术运算其实并不是通过Python实现的。
- Python用途非常广泛——网络应用，自动化，科学建模，大数据应用，等等。它也常被用作“胶水语言”，帮助其他语言和组件改善运行状况。
- Python让困难的事情变得容易，因此程序员可以专注于算法和数据结构的设计，而不用处理底层的细节。

#### 装饰器

在Python中，装饰器（Decorator）是一种特殊的函数，用于修改其他函数的行为或功能。装饰器可以在不修改原始函数代码的情况下，为函数添加额外的功能、逻辑或操作。这种方式使代码更具可重用性和可维护性。

装饰器的语法如下：

```py
@decorator_function
def some_function():
    # 函数的代码
```

或者等价于：

```py
def some_function():
    # 函数的代码

decorator_function = decorator_function(some_function)
```

这里，`decorator_function` 是一个装饰器函数，它接受一个函数作为参数，并返回一个新的函数（通常是一个闭包），该新函数具有原始函数的功能以及装饰器添加的额外功能。

常见的使用情境包括：

1. **函数执行前后的操作**：装饰器可以用于记录日志、计时、权限检查等。
2. **修改函数参数或返回值**：可以在函数执行前后对参数或返回值进行修改。
3. **缓存**：可以使用装饰器在函数调用时缓存结果，以提高性能。
4. **验证**：可以用于验证输入参数是否符合预期。

Python装饰器的运行顺序遵循"**先进后出**"的顺序,这和编程语言中的堆栈(stack)结构是相似的。

假设有装饰器A, B, C:

```py
@A
@B
@C
def func():
  ...
```

其调用顺序为:

1. A执行并返回一个内嵌函数A(func)
2. B以A(func)为参数执行并返回B(A(func))
3. C以B(A(func))为参数执行并返回C(B(A(func)))
4. 最终调用C(B(A(func)))

而返回顺序则是相反的:

1. C函数最先返回
2. B函数第二个返回
3. A函数最后返回

#### 垃圾回收

- Python在内存中存储了每个对象的引用计数（reference count）。如果计数值变成0，那么相应的对象就会小时，分配给该对象的内存就会释放出来用作他用。
- 偶尔也会出现`引用循环`（reference cycle）。垃圾回收器会定时寻找这个循环，并将其回收。举个例子，假设有两个对象`o1`和`o2`，而且符合`o1.x == o2`和`o2.x == o1`这两个条件。如果`o1`和`o2`没有其他代码引用，那么它们就不应该继续存在。但它们的引用计数都是1。
- Python中使用了某些启发式算法（heuristics）来加速垃圾回收。例如，越晚创建的对象更有可能被回收。对象被创建之后，垃圾回收器会分配它们所属的代（generation）。每个对象都会被分配一个代，而被分配更年轻代的对象是优先被处理的。

Python代码是如何执行的？

首先，解释器读取Python代码并检查是否有语法或格式错误。

如果现错误，则暂停执行。如果没有发现错误，则解释器会将Python代码转换为等效形式或字节代码。

然后将字节码发送到Python虚拟机(PVM)，这里Python代码将被执行，如果发现任何错误，则暂停执行，否则结果将显示在输出窗口中。

#### 内置类型、内置数据结构

主要的Python**内置类型**有:

- 数值类型:int, float, complex
- 布尔类型:bool
- 序列类型:str, bytes, bytearray, list, tuple, range
- 映射类型:dict
- 集合类型:set, frozenset
- None:表示无值或缺失值

此外,Python还内置了以下常用的类:

- object:所有类的基类
- type:所有类型的类型
- tuple, list, dict等:序列与映射的内置实现
- function:Python函数
- module:Python模块
- exception:异常的基类

解释Python的**内置数据结构**？

Python中主要有四种类型的数据结构。 

列表：列表是从整数到字符串甚至另一个列表的异构数据项的集合。列表是可变的。列表完成了其他语言中大多数集合数据结构的工作。列表在[ ]方括号中定义。

例如：a = [1,2,3,4]

集合：集合是唯一元素的无序集合。集合运算如联合|，交集&和差异，可以应用于集合。{}用于表示一个集合。

例如：a = {1,2,3,4}

元组：Python元组的工作方式与Python列表完全相同，只是它们是不可变的。()用于定义元组。

例如：a =（1,2,3,4）

字典：字典是键值对的集合。它类似于其他语言中的hash map。在字典里，键是唯一且不可变的对象。

例如：a = {'number'：[1,2,3,4]}

#### //、％、\* \*运算符

解释`//`、`％`、`**`运算符？

`//`(Floor Division)-这是一个除法运算符，它返回除法的整数部分。

例如：5 2 = 2

`％`(模数)-返回除法的余数。

例如：5 `％ 2 = 1

`**`(幂)-它对运算符执行指数计算。a` **` b表示a的b次方。

例如：5 ** 2 = 25、5 ** 3 = 125

#### 单引号和双引号

Python中的单引号和双引号有什么区别？

1. 单引号和双引号定义的字符串效果完全一样,例如:'hello' 和 "hello" 在Python中是等价的。
2. 如果字符串内部需要出现引号,则需要使用不同的引号。例如:"I'm fine" 中使用双引号定义字符串,而里面有单引号。'He said "hello"' 中使用单引号定义字符串,而里面有双引号。
3. 转义字符\可以用于在字符串中表示换行、制表符等不可打印字符以及嵌入引号。例如:'Line1\nLine2' 会包含换行,''' 表示单引号。
4. 三个单引号'''或三个双引号"""可以定义多行字符串。

#### append，insert和extend

Python中append，insert和extend的区别?

append：在列表末尾添加新元素。

insert：向列表的指定索引位置插入一个元素。

extend：在列表末尾添加多个元素。参数是一个列表。

#### break、continue、pass

break、continue、pass是什么？

break：在满足条件时，它将导致程序退出循环。

continue：将返回到循环的开头，它使程序在当前循环迭代中的跳过所有剩余语句。

pass：使程序传递所有剩余语句而不执行。

#### remove，del和pop

Python中的remove，del和pop？

remove：将删除列表中的第一个匹配值，它以值作为参数。

del：使用索引删除元素，它不返回任何值。

pop：将删除列表中顶部的元素，并返回列表的顶部元素。

#### switch

使用match/case

```py
match choice:
  case 'A':
    ...
  case 'B': 
    ...
  case 'C':
    ...  
  case _:
    ...
```

#### range函数

range：range函数返回从起点到终点的一系列序列。

range(start, end, step)，第三个参数是用于定义范围内的步数。

```py
for i in range(5):
  print(i) # 打印0-4
```

#### == 和 is、in

- == :等值比较,用于判断两个对象的值/内容是否相等,例如:

```
pythonCopy code2 == 2 # True
'abc' == 'abc' # True
[1,2] == [1,2] # True,列表的值相等
```

- is :身份比较,用于判断两个对象是否为同一个对象,例如:

```py
a = [1,2]
b = [1,2]
a == b # True,值相等
a is b # False,不是同一个对象

x = y = 257 
x == y # True
x is y # True,都是257这个数值对象
```

is比较对象的内存地址,==比较对象的值。

in：检查某个元素是否存在于某个序列中

#### 更改列表的数据类型

在Python中可以通过循环遍历列表并使用type()函数进行转换来更改列表中所有元素的数据类型,常用的方式有:

1. 更改为字符串:

```py
lst = [1, 2, 3, 4] 

for i in range(len(lst)):
    lst[i] = str(lst[i])

print(lst) # ['1', '2', '3', '4']
```

1. 更改为整数:

```py
pythonCopy code
for i in range(len(lst)):
    lst[i] = int(lst[i]) 
    
print(lst) # [1, 2, 3, 4]
```

1. 更改为浮点数:

```py
lst = ['1.1', '2.2', '3.3']

for i in range(len(lst)):
    lst[i] = float(lst[i])

print(lst) # [1.1, 2.2, 3.3]
```

#### main

对于可执行的Python文件(.py安装为命令行工具),入口点如下:

1. 如果包含if **name** == '**main**': 的代码块,那么该代码块就是入口点
2. 如果没有上述代码块,那么入口点就是文件中的第一行代码

#### map()

```py
map(function, iterable, ...)
```

map()会将function函数依次作用在iterable每个元素上,并将结果组合成一个新的map对象返回。

```py
def square(x):
    return x**2

map(square, [1,2,3,4,5])  

# 返回: map对象:[1, 4, 9, 16, 25]
```

#### filter()

filter()会对iterable中的每个元素调用function函数,然后对返回值为True的元素进行保留,返回一个filter对象。

#### *args和**kwargs

使用*args和**kwargs可以让函数非常灵活,接收可变数量的参数。这在不确定调用参数时非常有用。是Python函数定义的特殊语法。

`*args`: 用于发送非键值对的可变数量的参数。在函数调用时可以发送任意个参数,这些参数会被`*args`收集并组装成一个元素。

`**kwargs`: 用于发送键值对格式的可变数量的参数。在函数调用时可以发送任意多个键值对,这些键值对会被`**kwargs`收集并组装成一个字典。

#### 反转字符串

```py
str = 'hello'

# 反向切片,步长为-1
str[::-1] # 'olleh'
```

#### 类和对象

- 类定义了对象的共同特征和行为，是一种抽象的描述。
- 对象是类的具体实例，拥有类定义的属性和方法，是在内存中实际存在的实体。

举个例子，考虑一个类 `Person`：

```python
class Person:
    def __init__(self, name, age):
        self.name = name
        self.age = age
        # 在Python类中的self代表类的实例,是一个关键字,指向当前对象的引用
    def greet(self):
        print(f"Hello, my name is {self.name} and I am {self.age} years old.")

p = Person('John', 20)
```

#### `__init__` 

`__init__` 是Python类中的一个特殊方法（也称为构造方法或初始化方法），用于在创建类的实例时进行初始化操作。当您通过类创建一个对象时，`__init__` 方法会自动被调用，允许您设置对象的初始状态和属性。

#### 生成器

生成器是一种特殊类型的迭代器，它允许您按需逐步生成数据，而不需要一次性生成所有数据并将其存储在内存中。生成器在处理大量数据或需要延迟计算的情况下非常有用，因为它可以节省内存并提高性能。

```py
def my_generator():
    yield 1
    yield 2
    yield 3

gen = my_generator()
for value in gen:
    print(value)
```

生成器在遍历时逐步计算和生成值，适用于处理大型数据集或无限序列等场景。由于它们不需要一次性加载全部数据到内存中，所以在内存效率方面表现出色。当您需要逐步获取数据并且不想一次性加载所有数据时，生成器是一个很好的选择。

#### 迭代器

什么是python迭代器？

Python迭代器(Iterator)是访问集合元素的一种方式。

迭代器对象从集合的第一个元素开始访问,直到所有的元素被访问完结束。

迭代器只能往前不会后退。

创建迭代器的两种方式:

1. 把一个集合对象转换为迭代器,使用iter()函数。

```py
list1 = [1,2,3]
it = iter(list1)
```

1. 直接创建迭代器对象,把迭代行为写在`__next__() `方法中。

```py
class MyIterator(object):
  def __init__(self, max):
    self.max = max
  
  def __next__(self):
    #customized iteration behavior
```

迭代器提供了next()方法获取下一个元素。

```py
print(next(it)) #prints 1 
print(next(it)) #prints 2
```

迭代器可以通过for循环进行迭代。

主要优点:

- 节省内存空间
- 序列化操作

#### 深拷贝和浅拷贝

深拷贝和浅拷贝是Python中对对象进行拷贝时的两种机制。

浅拷贝只拷贝指针，深拷贝需要使用新的内存空间

浅拷贝只 Clone 第一层对象,深拷贝会递归 Clone 对象的所有层次。

浅拷贝更高效,深拷贝更安全。需要根据实际需求选择合适的拷贝方法。

Python 中的切片、字典的 copy 方法是浅拷贝,而 copy 模块的 deepcopy 方法可以实现深拷贝。

#### 多线程

Python有一个多线程库threading（适用于I/O密集型的工作，比如进行网络请求），但是用多线程来加速代码的效果并不是那么的好，

Python有一个名为Global Interpreter Lock（GIL）的结构。GIL确保每次只能执行一个“线程”。一个线程获取GIL执行相关操作，然后将GIL传递到下一个线程。

虽然看起来程序被多线程并行执行，但它们实际上只是轮流使用相同的CPU核心。

所有这些GIL传递都增加了执行的开销。这意味着多线程并不能让程序运行的更快。


Python 中的多线程是通过 Global Interpreter Lock（GIL）来实现的，这会导致在某些情况下，Python 的多线程并不能充分利用多核处理器，因此有人认为 Python 中的多线程不是真正的多线程。

GIL 是一个线程级别的锁，它在 CPython 解释器中存在。它的作用是确保在同一时间只有一个线程可以执行 Python 代码。虽然这个设计有助于简化内存管理和**防止变量的并发修改和数据不一致性**。

在 Python 中要实现真正的并行计算，可以考虑以下几种方法，特别是对于需要充分利用多核 CPU 的情况：

1. **多进程：** Python 的 `multiprocessing` 模块允许您创建多个进程来并行执行任务。每个进程都有自己的 Python 解释器和独立的内存空间，因此避免了 GIL 的限制。多进程适用于 CPU 密集型任务。



### pandas

1. **什么是Pandas？** Pandas是一个开源的Python库，用于数据分析和数据操作。它提供了高效的数据结构和数据分析工具，使得在Python中处理和分析结构化数据变得更加容易。
2. **Pandas的主要数据结构是什么？** Pandas的两个主要数据结构是Series和DataFrame。
   - **Series：** 它是一个一维数组，类似于带有标签的NumPy数组，可以存储不同类型的数据。每个元素都有一个索引，使得访问数据更加方便。
   - **DataFrame：** 它是一个二维表格，类似于SQL表或Excel的电子表格。DataFrame可以包含多个Series，并且可以对它们进行标签化的行和列操作。
3. **如何读取和写入数据文件？** Pandas可以通过`read_csv()`、`read_excel()`等函数读取各种数据文件格式，并可以使用`to_csv()`、`to_excel()`等函数将数据写入不同格式的文件。
4. **如何选择DataFrame中的特定行和列？** 您可以使用DataFrame的索引、标签和位置等方式来选择特定的行和列。例如，使用`loc[]`和`iloc[]`方法，可以通过标签或位置进行选择。
5. **如何处理缺失值？** Pandas提供了处理缺失值的方法，如使用`dropna()`删除包含缺失值的行或列，使用`fillna()`填充缺失值，使用`interpolate()`进行插值等。
6. **如何进行数据过滤和筛选？** 您可以使用条件表达式来筛选DataFrame中的数据。例如，使用布尔索引来选择满足特定条件的行。
7. **如何进行数据聚合和分组操作？** 使用`groupby()`函数可以将数据按照某些标准进行分组，然后可以对每个组进行聚合操作，如求和、均值等。
8. **如何进行数据合并和连接？** 使用`concat()`、`merge()`等函数可以将多个DataFrame合并为一个，或者将不同DataFrame中的数据连接在一起。
9. **如何进行数据透视表操作？** 使用`pivot_table()`函数可以根据指定的列创建数据透视表，以汇总和展示数据。
10. **如何绘制数据可视化图表？** Pandas集成了Matplotlib库，可以使用`plot()`函数绘制各种图表，如折线图、柱状图、散点图等，以可视化数据。
11. **Pandas与Numpy的关系?**Pandas是基于NumPy构建的,其中的核心数据结构Series和DataFrame内部都是利用NumPy的ndarray表示的。所以Numpy是Pandas的重要组成部分,Pandas的很多计算也是调用了Numpy的函数,比如合并、重塑等操作。
12. **如何改变Series或DataFrame中的数据类型?**

可以使用astype()方法,传入需要转换到的类型,如:

```py
df = df.astype(float)
df['col'] = df['col'].astype(str)
```

13.**如何处理Pandas中的缺失数据?**

常用的方法有fillna()填充为空值和dropna()删除空值行,可以指定需要操作的列,以及填充的值等参数。

14.**如何合并Pandas的多个DataFrame?**

主要的是用concat()沿着一维连接,用merge()通过列连接,需要指定连接键,连接方式等参数。

15.**如何基于Pandas列创建新列?**

可以通过apply()方法以及lambda函数对DataFrame的列进行转换,从而得到新的列。

16.**如何对Pandas时间序列进行重采样?**

使用resample()方法,传入频率参数,如'5min'表示5分钟等,可以聚合为不同的时间范围。

### numpy

1. **什么是NumPy？** NumPy是Python中的一个核心库，用于支持多维数组和矩阵操作，以及数学函数库。它提供了高性能的数组对象和广播功能，使得在Python中进行科学计算更加快速和有效。

2. **如何将一个多维数组转化为一维数组?**

   可以使用ndarray的ravel()方法或flatten()方法将多维数组转化为一维。

3. **NumPy的主要数据结构是什么？** NumPy的主要数据结构是`ndarray`（N-dimensional array），它是一个多维数组对象，可以包含同种类型的元素。`ndarray`在数值计算中非常重要，因为它允许您在整个数组上进行向量化操作。

4. **如何创建一个NumPy数组？** 您可以使用`numpy.array()`函数来创建一个NumPy数组，通过传递一个Python列表或元组作为参数。

   ```
   pythonCopy codeimport numpy as np
   arr = np.array([1, 2, 3])
   ```

5. **如何进行数组索引和切片？** NumPy数组的索引从0开始，可以使用方括号和整数索引来访问数组元素。切片操作允许您获取数组的子集。

   ```
   pythonCopy codeelement = arr[0]  # 获取第一个元素
   sub_array = arr[1:3]  # 获取索引1和2的元素（不包括3）
   ```

6. **如何进行数组的基本操作，如加法、乘法等？** NumPy允许对数组进行元素级别的运算，这被称为广播。您可以使用`+`、`-`、`*`、`/`等操作符来执行元素级别的运算。

   ```
   pythonCopy code
   result = arr1 + arr2  # 数组对应位置元素相加
   ```

7. **如何进行数组的矩阵操作？** NumPy提供了多种用于矩阵操作的函数，如`dot()`用于矩阵乘法、`transpose()`用于转置矩阵等。

   ```
   pythonCopy codemat_mult = np.dot(matrix1, matrix2)  # 矩阵乘法
   mat_transposed = np.transpose(matrix)  # 矩阵转置
   ```

8. **如何进行数组的聚合操作？** NumPy提供了各种聚合函数，如`sum()`、`mean()`、`min()`、`max()`等，用于计算数组的总和、平均值、最小值、最大值等。

   ```
   pythonCopy codetotal = np.sum(arr)  # 数组元素总和
   avg = np.mean(arr)  # 数组元素平均值
   ```

9. **如何处理缺失值？** 在NumPy中，可以使用特殊的数值，如`np.nan`表示缺失值。您可以使用函数如`np.isnan()`来检测缺失值。

   ```
   pythonCopy code
   missing_values = np.isnan(arr)  # 返回布尔数组，表示元素是否为缺失值
   ```

10. **如何创建随机数数组？** 使用`numpy.random`模块可以创建各种随机数数组，如正态分布、均匀分布等。

    ```
    pythonCopy code
    random_array = np.random.rand(3, 3)  # 创建一个3x3的随机数数组
    ```

11. **如何进行数组的形状和维度变换？** 使用`reshape()`函数可以改变数组的形状，使用`np.newaxis`可以添加新的维度。

    ```
    pythonCopy codereshaped = arr.reshape(2, 2)  # 将一维数组改变为2x2的数组
    new_dimension = arr[:, np.newaxis]  # 在第二个维度上添加新的维度
    ```



{{< /secret >}}

