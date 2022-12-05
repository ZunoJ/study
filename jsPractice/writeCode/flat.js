function myFlat(list) {
  if (!Array.isArray(list)) {
    throw new TypeError('expect Array')
  }
  let res = list.reduce(function (total, item) {
    if (Array.isArray(item)) {
      total = total.concat(myFlat(item))
    } else {
      total.push(item)
    }
    return total
  }, [])
  return res
}
console.log(myFlat([1, 2, 3, [4, [5, { a: 1 }]]]))
