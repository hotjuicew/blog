


---
title: "Love U 💕"
date: 2022-02-13T00:00:00+08:00
categories: [生活]
tags: [生活]
draft: false
---

{{< rawhtml >}}
<div class="content">
    <p>从你说“我愿意”那一刻开始</p>
    <h2>我们已经在一起了</h2>
    <div class="timer">
        <b id="d"></b> 天 <b id="h"></b> 小时 <b id="m"></b> 分钟 <b id="s"></b> 秒
    </div>
</div>

<script>
    function timer() {
        var start = new Date('2022-01-13T13:49:00');
        var t = new Date() - start;
        var h = ~~(t / 1000 / 60 / 60 % 24);
        if (h < 10) {
            h = "0" + h;
        }
        var m = ~~(t / 1000 / 60 % 60);
        if (m < 10) {
            m = "0" + m;
        }

        var s = ~~(t / 1000 % 60);
        if (s < 10) {
            s = "0" + s;
        }
        console.log(t, start)
        document.getElementById('d').innerHTML = ~~(t / 1000 / 60 / 60 / 24);
        document.getElementById('h').innerHTML = h;
        document.getElementById('m').innerHTML = m;
        document.getElementById('s').innerHTML = s;
    }
    timer();
    setInterval(timer, 1000);
</script>
{{< /rawhtml >}}