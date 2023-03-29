let nums = [1, 1, 22, 22, 3, 44, 44, 2222, 2222]

function singerNumber(nums) {
  let numMap = new Map()
  let res = null
  nums.forEach((num) => {
    if (numMap.has(num)) {
      let value = numMap.get(num)
      numMap.set(num, ++value)
    } else {
      numMap.set(num, 1)
    }
  })
  numMap.forEach((value, key) => {
    if (value === 1) {
      res = key
    }
  })
  return res
}

function byteSingerNumber(nums) {
  let res = 0
  for (let num of nums) {
    res ^= num
  }
  return res
}

console.log(byteSingerNumber(nums))
