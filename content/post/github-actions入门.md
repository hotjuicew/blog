---
title: "Github Actions入门"
date: 2022-06-25T22:20:26+08:00
categories: [CI/CD]
---

[GitHub Actions](https://github.com/features/actions) 是 GitHub 的[持续集成服务](http://www.ruanyifeng.com/blog/2015/09/continuous-integration.html)

## GitHub Actions 简介

GitHub Actions 帮助您自动完成软件开发周期内的任务。 GitHub Actions 是事件驱动的，意味着您可以在指定事件发生后运行一系列命令。 例如，每次有人为仓库创建拉取请求时，您都可以自动运行命令来执行软件测试脚本。

此示意图说明如何使用 GitHub Actions 自动运行软件测试脚本。事件会自动触发其中包*作业*的*工作流程*。 然后，作业使用*步骤*来控制*操作*运行的顺序。 这些操作是自动化软件测试的命令。

![工作流程概述](https://cdn.jsdelivr.net/gh/MrSeaWave/figure-bed-profile@main/uPic/2021/5nDZ3g_overview-actions-simple.png)

很多操作在不同项目里面是类似的，完全可以共享。GitHub 注意到了这一点，想出了一个很妙的点子，允许开发者把每个操作写成独立的脚本文件，存放到代码仓库，使得其他开发者可以引用。

如果你需要某个 action，不必自己写复杂的脚本，直接引用他人写好的 action 即可，整个持续集成过程，就变成了一个 actions 的组合。这就是 GitHub Actions 最特别的地方！

GitHub 做了一个[官方市场](https://github.com/marketplace?type=actions)，可以搜索到他人提交的 actions。另外，还有一个 [awesome actions](https://github.com/sdras/awesome-actions) 的仓库，也可以找到不少 action。

![image-20210106104143587](https://cdn.jsdelivr.net/gh/MrSeaWave/figure-bed-profile@main/uPic/2021/P2poIc_image-20210106104143587.png)

上面说了，每个 action 就是一个独立脚本，因此可以做成代码仓库，使用`userName/repoName`的语法引用 action。比如，`actions/setup-node`就表示`github.com/actions/setup-node`这个[仓库](https://github.com/actions/setup-node)，它代表一个 action，作用是安装 Node.js。事实上，GitHub 官方的 actions 都放在 [github.com/actions](https://github.com/actions) 里面。

既然 actions 是代码仓库，当然就有版本的概念，用户可以引用某个具体版本的 action。下面都是合法的 action 引用，用的就是 Git 的指针概念，详见[官方文档](https://help.github.com/cn/articles/about-actions#versioning-your-action)。

```text actions
actions/setup-node@74bc508 # 指向一个 commit
actions/setup-node@v1.0    # 指向一个标签
actions/setup-node@master  # 指向一个分支
```

## 基础概念

GitHub Actions 有一些自己的术语。

1. **workflow** （工作流程）：持续集成一次运行的过程，就是一个 workflow。
2. **job** （任务）：一个 workflow 由一个或多个 jobs 构成，含义是一次持续集成的运行，可以完成多个任务。
3. **step**（步骤）：每个 job 由多个 step 构成，一步步完成。
4. **action** （动作）：每个 step 可以依次执行一个或多个命令（action）。

## 虚拟环境

GitHub 托管的运行器是由安装了 GitHub Actions 运行器应用程序的 GitHub 托管的虚拟机。 GitHub 提供使用 Linux、Windows 和 macOS 操作系统的运行器。

GitHub Ac­tions 为每个任务 (job) 都提供了一个虚拟机来执行，每台虚拟机都有相同的硬件资源：

- 2 核 CPU
- 7 GB RAM 内存
- 14 GB SSD 硬盘空间

| 虚拟环境             | YAML 工作流程标签                  |
| :------------------- | :--------------------------------- |
| Windows Server 2019  | `windows-latest` 或 `windows-2019` |
| Ubuntu 20.04         | `ubuntu-20.04`                     |
| Ubuntu 18.04         | `ubuntu-latest` 或 `ubuntu-18.04`  |
| Ubuntu 16.04         | `ubuntu-16.04`                     |
| macOS Big Sur 11.0   | `macos-11.0`                       |
| macOS Catalina 10.15 | `macos-latest` 或 `macos-10.15`    |

> **注：**Ubuntu 20.04 虚拟环境目前仅作为预览提供。 `ubuntu-latest` YAML 工作流程标签仍使用 Ubuntu 18.04 虚拟环境。

使用限制：

- 每个 workflow 的运行时限为 72 小时
- 每小时可以调用 1000 次 GitHub API 。
- 每个 job 最多可以执行 6 个小时。
- 免费版的用户最大支持 20 个 job 并发执行，macOS 最大只支持 5 个。
- 私有仓库 Linux 运行器每月累计使用时间为 2000 分钟，超过后$ 0.008/分钟，公共仓库则无限制。

> **注：** 虽然名称叫持续集成，但当所有任务终止和完成时，虚拟环境内的数据会随之清空，并不会持续。即每个新任务都是一个全新的虚拟环境。

## Workflow

GitHub Actions 的配置文件叫做 workflow 文件，存放在代码仓库的`.github/workflows`目录。

workflow 文件采用 [YAML](https://www.codeproject.com/Articles/1214409/Learn-YAML-in-five-minutes) 格式，文件名可以任意取，但是后缀名统一为`.yml` or `.yaml`，比如`foo.yml` or `foo.yaml`。一个库可以有多个 workflow 文件。GitHub 只要发现`.github/workflows`目录里面有`.yml` or `.yaml`文件，就会自动运行该文件。

workflow 文件的配置字段非常多，详见[官方文档](https://docs.github.com/cn/free-pro-team@latest/actions/reference/workflow-syntax-for-github-actions)。下面是一些基本字段：

1. **`name`**

   工作流程的名称。 GitHub 在仓库的操作页面上显示工作流程的名称。 如果省略 `name`，GitHub 将其设置为相对于仓库根目录的工作流程文件路径。

   ```yaml name
   name: GitHub Actions Demo
   ```

2. **`on`**

   **必要** 触发 workflow 的 GitHub 事件的名称。 你可以提供单一事件 `string`、事件的 `array`、事件 `types` 的 `array` 或事件配置 `map`，以安排工作流程的运行，或将工作流程的执行限于特定文件、标记或分支更改。 有关可用事件的列表，请参阅“[触发工作流程的事件](https://docs.github.com/cn/free-pro-team@latest/actions/reference/events-that-trigger-workflows)”

   **使用单一事件**

   ```yaml Example using a single event
     on: push
   ```

   上面代码指定，`push`事件触发 workflow。

   **使用事件列表的示例**

   ```yaml Example using a list of events
   on: [push, pull_request]
   ```

   上面代码指定，`push`事件或`pull_request`事件都可以触发 workflow。

   完整的事件列表，请查看[官方文档](https://docs.github.com/cn/free-pro-team@latest/actions/reference/events-that-trigger-workflows)。除了代码库事件，GitHub Actions 也支持外部事件触发，或者定时运行。

3. **`on.<push|pull_request>.<tags|branches>`**

   指定触发事件时，可以限定分支或标签。

   ```yaml
   on:
     push:
       branches:
         - master
   ```

   上面代码指定，只有`master`分支发生`push`事件时，才会触发 workflow。

4. **`jobs`**

   `workflow`运行包括一项或多项`jobs`。 `jobs`默认是并行运行。 要按顺序运行作业，您可以使用 `<job_id>needs` 关键词在其他`job`上定义依赖项。

   每个作业在 `runs-on` 指定的运行器环境中运行。

5. **`jobs.<job_id>.name`**

   workflow 文件的主体是`jobs`字段，表示要执行的一项或多项任务。

   `jobs`字段里面，需要写出每一项任务的`job_id`，具体名称自定义。`job_id`里面的`name`字段是任务的说明。

   ```yaml
   jobs:
     my_first_job:
       name: My first job
     my_second_job:
       name: My second job
   ```

   上面代码的`jobs`字段包含两项任务，`job_id`分别是`my_first_job`和`my_second_job`。

6. **`jobs.<job_id>.needs`**

   `needs`字段指定当前任务的依赖关系，即运行顺序。

   ```yaml
   jobs:
     job1:
     job2:
       needs: job1
     job3:
       needs: [job1, job2]
   ```

   上面代码中，`job1`必须先于`job2`完成，而`job3`等待`job1`和`job2`的完成才能运行。因此，这个 workflow 的运行顺序依次为：`job1`、`job2`、`job3`。

7. **`jobs.<job_id>.runs-on`**

   `runs-on`字段指定运行所需要的虚拟机环境。它是必填字段。目前可用的虚拟机如下。

   ```
   - ubuntu-latest，ubuntu-18.04或ubuntu-16.04
   - windows-latest，windows-2019或windows-2016
   - macOS-latest或macOS-10.14
   ```

   下面代码指定虚拟机环境为`ubuntu-18.04`。

   ```yaml
   runs-on: ubuntu-18.04
   ```

8. **`jobs.<job_id>.steps`**

   `steps`字段指定每个 Job 的运行步骤，可以包含一个或多个步骤。每个步骤都可以指定以下三个字段。

   ```
   - jobs.<job_id>.steps.name：步骤名称。
   - jobs.<job_id>.steps.run：该步骤运行的命令或者 action。
   - jobs.<job_id>.steps.env：该步骤所需的环境变量。
   ```

   下面是一个完整的 workflow 文件的范例。

   ```yaml workflow
   name: Greeting from Mona
   on: push

   jobs:
     my-job:
       name: My Job
       runs-on: ubuntu-latest
       steps:
         - name: Print a greeting
           env:
             MY_VAR: Hi there! My name is
             FIRST_NAME: Mona
             MIDDLE_NAME: The
             LAST_NAME: Octocat
           run: |
             echo $MY_VAR $FIRST_NAME $MIDDLE_NAME $LAST_NAME.
   ```

   上面代码中，`steps`字段只包括一个步骤。该步骤先注入四个环境变量，然后执行一条 Bash 命令。

9. **`jobs.<job_id>.steps[*].uses`**

   选择要作为`job`中`step`的一部分运行的操作。 操作是一种可重复使用的代码单位。 你可以使用工作流程所在仓库中、公共仓库中或[发布 Docker 容器映像](https://hub.docker.com/)中定义的操作。

   ```yaml 示例
   steps:
     # Reference a specific commit
     - uses: actions/setup-node@74bc508
     # Reference the major version of a release
     - uses: actions/setup-node@v1
     # Reference a minor version of a release
     - uses: actions/setup-node@v1.2
     # Reference a branch
     - uses: actions/setup-node@main
   ```

   更多`uses`使用示例参考[官网](https://docs.github.com/cn/free-pro-team@latest/actions/reference/workflow-syntax-for-github-actions#jobsjob_idstepsuses)

## 示例

### 一个简单的 workflow 文件示例

```yaml workflow example
name: Hello World
on:
  push:
    branches:
      - main
jobs:
  my_first_job:
    name: My first job
    runs-on: ubuntu-latest
    steps:
      - name: checkout
        uses: actions/checkout@main

      - name: Run a single-line script
        run: echo "Hello World!"

  my_second_job:
    name: My second job
    runs-on: macos-latest
    steps:
      - name: Run a multi-line script
        env:
          MY_VAR: Hello World!
          MY_NAME: P3TERX
        run: |
          echo $MY_VAR
          echo My name is $MY_NAME
```

上面这个 workflow 文件的要点如下。

> 1. 整个流程在`main`分支发生`push`事件时触发。
> 2. 有两个个`job`，一个运行在虚拟机环境`ubuntu-latest`。一个运行在`macos-latest`
>    1. My First Job
>       1. 第一步是获取源码，使用的 action 是`actions/checkout`。
>       2. 第二步是运行一个简单的脚本：`echo "Hello World!"`
>    2. My Second Job
>       1. 设定环境变量 `MY_VAR` 和`MY_NAME`
>       2. 运行脚本打印环境变量

保存上面的文件后，将整个仓库推送到 GitHub。

GitHub 发现了 workflow 文件以后，就会自动运行。你可以在网站上实时查看[运行日志](https://github.com/XmlySea/github-test-actions/runs/1654817598?check_suite_focus=true)，日志默认保存 30 天。

示例文件运行截图：

![image-20210106144952343](https://cdn.jsdelivr.net/gh/MrSeaWave/figure-bed-profile@main/uPic/2021/DcBIUp_image-20210106144952343.png)

### react 项目发布到 Github Pages

[示例项目](https://github.com/XmlySea/github-test-actions/tree/react-branch)需要将构建成果发到 GitHub 仓库，因此需要 GitHub 密钥。按照[官方文档](https://docs.github.com/cn/free-pro-team@latest/github/authenticating-to-github/creating-a-personal-access-token)，生成一个密钥。然后，将这个密钥储存到当前仓库的`Settings/Secrets`里面。

![image-20210106151812999](https://cdn.jsdelivr.net/gh/MrSeaWave/figure-bed-profile@main/uPic/2021/BcVUax_image-20210106151812999.png)

在这个仓库的`.github/workflows`目录，生成一个 workflow 文件，名字可以随便取，这个示例是`react-cli.yml`。

我们选用一个别人已经写好的 `action`：[JamesIves/github-pages-deploy-action](https://github.com/marketplace/actions/deploy-to-github-pages)，它提供了 workflow 的范例文件，直接拷贝过来就行了（查看[源码](https://github.com/XmlySea/github-test-actions/blob/react-branch/.github/workflows/react-cli.yml)）

```yaml react-cli
name: github-test-actions上的React项目部署到github pages
on:
  push:
    branches:
      - react-branch

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout 🛎️
        uses: actions/checkout@v2
        with:
          persist-credentials: false
      - name: Install and Build 🔧
        run: |
          npm install
          npm run build
      - name: Deploy 🚀
        uses: JamesIves/github-pages-deploy-action@3.7.1
        with:
          ACCESS_TOKEN: ${{ secrets.REACT_WORKFLOW_TOKEN }}
          BRANCH: gh-pages # The branch the action should deploy to.
          FOLDER: build # The folder the action should deploy.
```

> 1.  整个流程在`react-branch`分支发生`push`事件时触发。
> 2.  只有一个`job`，运行在虚拟机环境`ubuntu-latest`。
> 3.  第一步是获取源码，使用的 action 是`actions/checkout`。
> 4.  第二步是安装与构建。
> 5.  第三步是部署，使用的 action 是`JamesIves/github-pages-deploy-action`，使用三个变量，分别为 GitHub 密钥、发布分支、构建成果所在目录。其中，只有 GitHub 密钥是变量，需要写在双括号里面，其他三个都可以直接写在文件里。

保存上面的文件后，将整个仓库推送到 GitHub。

等到 workflow 运行结束，访问 [GitHub Page](https://xmlysea.github.io/github-test-actions/)，会看到网页已经部署到指定网址上了。

![image-20210106155312753](https://cdn.jsdelivr.net/gh/MrSeaWave/figure-bed-profile@main/uPic/2021/0zzgyG_image-20210106155312753.png)

![image-20210106162912947](https://cdn.jsdelivr.net/gh/MrSeaWave/figure-bed-profile@main/uPic/2021/xKc2YU_image-20210106162912947.png)
