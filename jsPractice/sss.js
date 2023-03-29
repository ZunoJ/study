var a = [-2, 5, 7, 0, 0, 0]
var b = [-3, -1, 4]
function sss(a, b, m, n) {
  let len1 = m - 1
  let len2 = n - 1
  let len = a.length - 1
  while (len1 >= 0 || len2 >= 0) {
    if (a[len1] >= b[len2] && len1 >= 0) {
      a[len] = a[len1]
      len1--
    } else if (len2 >= 0) {
      a[len] = b[len2]
      len2--
    }
    len--
  }
  return a
}
// console.log(sss(a, b, 3, 3))

function randomSelect(a, b) {
  let totalRate = b.reduce((total, item) => {
    total += item
    return total
  }, 0)
  let random = Math.random() * totalRate
  let rate = 0
  for (let index = 0; index < a.length; index++) {
    rate += b[index]
    if (random <= rate) {
      return a[index]
    }
  }
}
// console.log(randomSelect([1, 2, 3], [0.2, 0.3, 0.5]))

function twoNumberSum(arr, target) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[i] + arr[j] === target) {
        return [i, j]
      }
    }
  }
}
function mapTwoNumberSum(arr, target) {
  let arrMap = new Map()
  for (let i = 0; i < arr.length; i++) {
    let k = target - arr[i]
    if (arrMap.has(k)) {
      return [arrMap.get(k), i]
    } else {
      arrMap.set(arr[i], i)
    }
  }
}
// console.log(mapTwoNumberSum([2, 7, 11, 15], 13))

function myFlat(arr, depth = 1) {
  let res = []
  arr.forEach((i) => {
    if (Array.isArray(i) && depth) {
      res = res.concat(myFlat(i, depth--))
    } else {
      res.push(i)
    }
  })
  return res
}
// console.log(
//   myFlat(
//     [[1, 2, 2], [3, 4, 5, 5], [6, 7, 8, 9, [11, 12, [12, 13, [14]]]], 10],
//     2
//   )
// )
function unique(arr) {
  return arr.filter((element, index, array) => {
    return array.indexOf(element) === index
  })
}
// var arr = [1, 2, 2, 3]
// console.log(unique(arr))

function arrMixed(arr1, arr2) {
  let length = arr1.length > arr2.length ? arr1.length - 1 : arr2.length - 1
  let set = new Set()
  let is1 = arr1[length] ? true : false
  let res = []
  for (let i = 0; i <= length; i++) {
    if (arr1[i] === arr2[i]) {
      res.push(arr1[i])
    } else if (is1 && set.has(arr1[i])) {
      res.push(arr1[i])
    } else if (!is1 && set.has(arr2[i])) {
      res.push(arr2[i])
    }
    is1 ? set.add(arr2[i]) : set.add(arr1[i])
  }
  return [...new Set(res)]
}
// console.log(
//   multiArrMixed([
//     [4, 9, 5],
//     [9, 4, 9, 8, 4]
//   ])
// )

function multiArrMixed(nums) {
  let res = nums[0]
  for (let i = 1; i < nums.length; i++) {
    const item = nums[i]
    let tmp = []
    for (let j = 0; j < item.length; j++) {
      if (res.indexOf(item[j]) >= 0) {
        tmp.push(item[j])
      }
    }
    res = tmp
  }
  res.sort()
  return [...new Set(res)]
}

function compose(fns) {
  return fns.reduce((prev, fn) => {
    return Promise.resolve(prev).then((v) => {
      return fn(v)
    })
  }, null)
}
let a1 = function (a) {
  console.log(a || '1')
  return 3
}
let b1 = function (a) {
  console.log(a)
  return 1
}
let c1 = function (a) {
  console.log(a)
  return 2
}
compose([a1, b1, c1]).then((v) => console.log(v))
