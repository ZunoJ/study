async function add(a, b) {
  await new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve()
    }, 1000)
  })
  return a + b
}
var b = 1
export { add }
export default b
