const debounce = (ms, fn) => {
  let timeoutId
  return (...args) => {
    window.clearTimeout(timeoutId)
    timeoutId = window.setTimeout(() => {
      fn(...args)
    }, ms)
  }
}

export default debounce
