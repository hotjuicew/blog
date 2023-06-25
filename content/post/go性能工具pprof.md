---
title: "Go性能工具pprof"
date: 2023-02-14T22:39:42+08:00
categories: ["Go"]
---

在 golang 程序中，有哪些内容需要调试优化？
一般常规内容：

- cpu：程序对 cpu 的使用情况 - 使用时长，占比等
- 内存：程序对 cpu 的使用情况 - 使用时长，占比，内存泄露等。如果在往里分，程序堆、栈使用情况
- I/O：IO 的使用情况 - 哪个程序 IO 占用时间比较长

golang 程序中：

- goroutine：go 的协程使用情况，调用链的情况
- goroutine leak：goroutine 泄露检查
- go dead lock：死锁的检测分析
- data race detector：数据竞争分析，其实也与死锁分析有关
  上面是在 golang 程序中，性能调优的一些内容。

有什么方法工具调试优化 golang 程序？
比如 linux 中 cpu 性能调试，工具有 top，dstat，perf 等。

那么在 golang 中，有哪些分析方法？

golang 性能调试优化方法：

Benchmark：基准测试，对特定代码的运行时间和内存信息等进行测试
Profiling：程序分析，程序的运行画像，在程序执行期间，通过采样收集的数据对程序进行分析
Trace：跟踪，在程序执行期间，通过采集发生的事件数据对程序进行分析
profiling 和 trace 有啥区别？
profiling 分析没有时间线，trace 分析有时间线。

在 golang 中，应用方法的工具呢？

Go 语言自带的 pprof 库就可以分析程序的运行情况，并且提供可视化的功能。它包含两个相关的库：
`runtime/pprof`
对于只跑一次的程序，例如每天只跑一次的离线预处理程序，调用 pprof 包提供的函数，手动开启性能数据采集。
`net/http/pprof`
对于在线服务，对于一个 HTTP Server，访问 pprof 提供的 HTTP 接口，获得性能数据。当然，实际上这里底层也是调用的 runtime/pprof 提供的函数，封装成接口对外提供网络访问。
因为自己用 gin 比较多，所以使用 [github.com/gin-contrib/pprof](github.com/gin-contrib/pprof)，其实内部也就是上面两个库。使用非常简单。

```go
var debugHttp *http.Server

func runPPROF() {
    g := gin.New()
    g.Use(gin.Recovery())
    g.Use(gin.Logger())

    pprof.Register(g)

    // 使用9000端口开启http服务
    debugHttp = &http.Server{
        Addr:    ":9000",
        Handler: g,
    }
    debugHttp.ListenAndServe()
}
```

开启之后可以 web 访问[http://127.0.0.1:9000/debug/pprof/](http://127.0.0.1:9000/debug/pprof/)可以查看实时数据，
![img](https://segmentfault.com/img/remote/1460000042574164)
当然也可以查看某个时间段的性能情况：

```
// 监听60s性能情况，默认进入命令行
go tool pprof http://127.0.0.1:9000/debug/pprof/profile\?seconds\=60
```

![img](https://segmentfault.com/img/remote/1460000042574165)

```bash
// 本地启动http服务查看，需要装graphviz插件
go tool pprof -http=:8080  ~/pprof/pprof.go.samples.cpu.032.pb.gz
```

![img](https://segmentfault.com/img/remote/1460000042574166)
可以切换看占用最高的，还有火焰图等等，相当好用，一般性能瓶颈就在占用比较多的。

PS: 有时候线上可能没有开启，也可以使用 perf 去 debug 查看占用资源比较多的。

```bash
// 19323 端口号
perf record -p 19323
perf report
```
