function myReduce(fn, initialValue) {
  if (!Array.isArray(this)) {
    throw new TypeError('expect Array')
  }
  if (initialValue === undefined) {
    initialValue = this[0]
  }
  for (let index = 0; index < this.length; index++) {
    const item = this[index]
    initialValue = fn(initialValue, item, index, this)
  }
  return initialValue
}
console.log(
  myReduce.call(
    [1, 2, 3],
    function (total, cur) {
      total += cur
      return total
    },
    0
  )
)
