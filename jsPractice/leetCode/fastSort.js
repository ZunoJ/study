function fastSort(arr, left, right) {
  if (right <= left) {
    return arr
  }
  let pivotIndex = left
  let pivot = arr[left]
  while (left < right) {
    while (right > left && arr[right] >= pivot) {
      right--
    }
    while (right > left && arr[left] <= pivot) {
      left++
    }
    let temp = arr[right]
    arr[right] = arr[left]
    arr[left] = temp
  }
  let temp = arr[pivotIndex]
  arr[pivotIndex] = arr[right]
  arr[right] = temp
  fastSort(arr, pivotIndex, right - 1)
  fastSort(arr, right + 1, arr.length - 1)
  return arr
}
// console.log(fastSort([8, 6, 3, 8, 3, 8, 9], 0, 5))

function insertSort(array) {
  for (let i = 1; i < array.length; i++) {
    let key = array[i]
    for (let j = i - 1; j >= 0; j--) {
      if (key <= array[j]) {
        array[j + 1] = array[j]
        if (j === 0) {
          array[j] = key
        }
      } else {
        array[j + 1] = key
        break
      }
    }
  }
  return array
}
// console.log(insertSort([3, 6, 8, 5, 3, 8, 9]))

function bubbleSort(array) {
  for (let index = 0; index < array.length; index++) {
    let flag = true
    for (let j = 0; j < array.length - index; j++) {
      if (array[j + 1] < array[j]) {
        let temp = array[j]
        array[j] = array[j + 1]
        array[j + 1] = temp
        flag = false
      }
    }
    if (flag) {
      return array
    }
  }
  return array
}
console.log(bubbleSort([3, 6, 8, 5, 3, 8, 9]))
