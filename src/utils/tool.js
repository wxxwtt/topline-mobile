// 防抖函数
export const _debounce = function (callback, time) {
  var timer = null
  return function (...arg) {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      callback && callback(arg)
    }, time)
  }
}
