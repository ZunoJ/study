function insertSort(arr) {
  let res = [arr[0]]
  for (let index = 1; index < arr.length; index++) {
    for (let j = res.length - 1; j >= 0; j--) {
      if (arr[index] > res[j]) {
        if (arr[index] === 7) {
          console.log(j)
        }
        res.splice(j + 1, 0, arr[index])
        if (arr[index] === 7) {
          console.log(res)
        }
        break
      }
      if (j === 0) {
        res.unshift(arr[index])
      }
    }
  }
  return res
}

function simpleSort(arr) {
  for (let i = 1; i < arr.length; i++) {
    for (let j = i; j >= 0; j--) {
      if (arr[j] < arr[j - 1]) {
        let temp = arr[j]
        arr[j] = arr[j - 1]
        arr[j - 1] = temp
      }
    }
  }
  return arr
}

function simpleInsertSort(arr) {
  for (let i = 1; i < arr.length; i++) {
    for (let j = i; j >= 0; j--) {
      let temp = arr[i]
      if (temp > arr[j]) {
        arr.splice(i, 1)
        arr.splice(j + 1, 0, temp)
        break
      }
      if (j === 0) {
        arr.splice(i, 1)
        arr.unshift(temp)
      }
    }
  }
  return arr
}
console.log(simpleInsertSort([5, 9, 7, 3, 8, 9]))
