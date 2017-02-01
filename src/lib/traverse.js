export default function traverse (o, func, key) {
  for (let i in o) {
    const newKey = typeof key === 'undefined' ? [i] : [...key, i]
    if (Object.prototype.toString.call(o[i]) === '[object Object]') {
      traverse(o[i], func, newKey)
    } else {
      o[i] = func(newKey, o[i])
    }
  }
}
