// 尾递归阶乘
function factorial(n, res = 1) {
  if (n === 1) {
    return res
  }
  return factorial(n - 1, n * res)
}
console.log(factorial(5))
// 普通数组求和
function sumArray(sums) {
  if (sums.length === 1) {
    return sums[0]
  }
  return sums.pop() + sumArray(sums)
}
// 尾递归数组求和
function tailArray(sums, sum = 0) {
  if (sums.length === 1) {
    return sums[0] + sum
  }
  return tailArray(sums, sums.pop() + sum)
}
console.log(tailArray([1, 2, 3, 4, 5]))
