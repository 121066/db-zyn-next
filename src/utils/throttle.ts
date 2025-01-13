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