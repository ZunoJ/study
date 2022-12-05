function random(arr1, arr2) {
  var sum = 0,
    factor = 0,
    random = Math.random()

  for (var i = arr2.length - 1; i >= 0; i--) {
    sum += arr2[i] // 统计概率总和
  }
  random *= sum // 生成概率随机数
  console.log(random)
  for (var i = arr2.length - 1; i >= 0; i--) {
    factor += arr2[i]
    console.log(factor)
    if (random <= factor) {
      return arr1[i]
    }
  }
  return null
}
console.log(random([1, 2, 3, 4], [0.1, 0.3, 0.5, 0.1]))
