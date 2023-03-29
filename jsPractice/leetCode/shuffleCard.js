function shuffleCard(arr) {
  arr.sort((a, b) => {
    return Math.random() - 0.5
  })
  return arr
}
function myShuffleCard(arr) {
  let res = [],
    random
  while (arr.length) {
    random = Math.floor(Math.random() * arr.length)
    res.push(arr[random])
    arr.splice(random, 1)
  }
  return res
}
console.log(myShuffleCard([1, 2, 3, 4, 5, 6, 7, 8, 9]))
