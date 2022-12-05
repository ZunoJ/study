function deepCopy(obj, hash = new WeakMap()) {
  if (typeof obj !== 'object' || obj === null) {
    // 处理null和基础类型
    return obj
  }
  if (hash.get(obj)) {
    return hash.get(obj)
  }
  let res = Array.isArray(obj) ? [] : {}
  hash.set(obj, res)
  for (const key in obj) {
    if (Object.hasOwnProperty.call(obj, key)) {
      if (typeof obj[key] === 'object') {
        res[key] = deepCopy(obj[key], hash)
      } else {
        res[key] = obj[key]
      }
    }
  }
  return res
}
function deepCopyEs5(obj, hash = []) {
  if (typeof obj !== 'object' || obj === null) {
    // 处理null和基础类型
    return obj
  }
  if (hash.find((i) => i.source === obj)) {
    return hash.find((i) => i.source === obj).target
  }
  let res = Array.isArray(obj) ? [] : {}
  hash.push({
    source: obj,
    target: res,
  })
  for (const key in obj) {
    if (Object.hasOwnProperty.call(obj, key)) {
      if (typeof obj[key] === 'object') {
        res[key] = deepCopyEs5(obj[key], hash)
      } else {
        res[key] = obj[key]
      }
    }
  }
  return res
}
let a = { l: 1, s: { a: 1 } }
a.c = a
let c = ['a', 'b', 'c']
console.log(deepCopyEs5(a))
