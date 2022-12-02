function deepCopy(obj, cache = new WeakMap()) {
  if (obj === null || !(typeof obj === 'object')) {
    return obj
  }
  if (cache.has(obj)) {
    return cache.get(obj)
  }
  let result = Array.isArray(obj) ? [] : {}
  cache.set(obj, result)
  for (const key in obj) {
    if (Object.hasOwnProperty.call(obj, key)) {
      if (typeof obj[key] === 'object') {
        result[key] = deepCopy(obj[key], cache)
      } else {
        result[key] = obj[key]
      }
    }
  }
  return result
}
var a = {
  k: 2,
  p: {
    u: 1,
  },
}
a.c = a
console.log(deepCopy(a))
