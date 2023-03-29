function bubbleSort(arr) {
  for (let index = 0; index < arr.length; index++) {
    let flag = true
    for (let j = 0; j < arr.length - index; j++) {
      if (arr[j] > arr[j + 1]) {
        const temp = arr[j]
        arr[j] = arr[j + 1]
        arr[j + 1] = temp
        flag = false
      }
    }
    if (flag) return arr
  }
  return arr
}
console.log(bubbleSort([9, 5, 7, 3, 8]))
