---
title: "WebStorm设置和配置总结"
date: 2022-07-19T15:48:10+08:00
categories: ["工具"]
tags: ["WebStorm"]
draft: true
---

## Appearance & Behavior
- **Theme** — 我下载了一个叫做One Dark Theme 的插件，选择了其中的One Dark Vivid Italic主题
- **Use custom font** — 启用并指定 WebStrom UI 自定义字体系列和大小。这个是除了编辑区以外的字体大小，本人视力不佳，使所以选择了Size为14

## Keymap
我把`重命名`添加了一个F6快捷键
## Editor
- **General**
  - Mouse Control — 鼠标控制
      - Change font size with Ctrl+Mouse Wheel — 使用Ctrl+鼠标滚轮更改字体大小。（**选中**，可以随时改变编辑区的字体大小）
      - Move code fragments with drag-and-drop — 在编辑器中拖放代码片段（**选中**，可以直接用鼠标托代码，不用记住快捷键了）
- **Font** 我设置了fontsize为16，这个之后可以随时用鼠标改
- **File and Code Templates** 在右面的界面里面，就可以选择你需要的文件，在里面修改成你需要的默认模板。以后你每次创建新的文件的时候，都会默认为你设置的代码。
  比如每次新建vue文件都会用到这个基本模板，所以我们可以在webStorm中保存为文件模板
  ```html
    <template>
        <div>
        </div>
    </template>
    <script>
        export default {
            data(){
                return{}
            },
            methods:{},
            computed:{},
            components:{}
        }
    </script>
    
    <style scoped>
    </style>
    ```
- **Live Templates** 代码片段快捷键设置。我们可以直接修改里面现有的代码快捷键里面的代码片断，我们也可以自己添加新的代码片段快捷键。在代码片段的设置中，有一些`$ARRAY$`这种的占位代码，当在输入代码片段的时候，会让你自己输入。详细看后文的动图演示。设置完之后，还要设定可以在哪些文件中使用，一般选择Everywhere，所有的文件都可使用这个代码快捷键
- **Emmet** 因为相比于Tab键，我更习惯Enter键，所以设置为Enter。这样子我们输入div就是按Enter而不是tab来展开了
- **Languages&Frameworks**  >node.js， 选中Coding assistance for Node.js.这样就把node.js代码提示打开了（前提是先要安装node）

### Plugins
- **File Path Autocomplete**
- **One Dark theme**
- **Rainbow Brackets**
- **Translation**
安装完成后，在编辑器中输入中文，右键即可翻译。为变量起名时可以用
-**.ignore**
我们在项目中不想让把某个文件上传到git，通常情况下我们需要自己往.gitignore文件中去添加要忽略的文件，在webstorm中有一款名为.ignore的插件，可以通过右键不想上传的文件即可实现将其添加到配置文件中。