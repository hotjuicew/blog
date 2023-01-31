function debounce(fun, delay) {
    let timer
    return function () {
        if (timer) clearTimeout(timer)
        let args = arguments
        timer = setTimeout(() => {
            fun.apply(this, args)
        }, delay)
    }
}

function sendSearchRequest() {
    console.log('点击')
}

const search = debounce(sendSearchRequest, 500)


function throttle(fun, time) {
    let start = 0
    return function () {
        let now = new Date()
        // 判断当前时间与起始时间之差是否大于设置的阈值
        if (now - start > time) {
            // 执行被节流的函数
            fun.apply(this, arguments)//把当前函数的上下文和arguments传入到被节流的函数中
            // 更新起始时间
            start = now
        }
    }
}

