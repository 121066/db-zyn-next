export const dbThrottle = (fn, dely) => {
    let timer = null
    return function (...args) {
        const t = Date.now()
        if (timer === null || t - timer >= dely) {
            fn.apply(this, args)
            timer = t
        }
    }
}
// 防抖
export const dbdebounce = (fn, delay) => {
    let timer = null
    return function (...args) {
        if (timer) clearTimeout(timer)
        timer = setTimeout(() => {
            fn.apply(this, args)
        }, delay)
    }
}