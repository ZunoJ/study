function a(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(id)
      resolve(++id)
    }, 1000)
  })
}
let channels = [a, a, a]
function runChannels(channels) {
  function run(fn, v) {
    return Promise.resolve(v).then((res) => {
      return fn(res)
    })
  }
  let initval = 0
  channels.forEach((fn) => {
    initval = run(fn, initval)
  })
  return initval
}
runChannels(channels).then((i) => console.log(i))
