this.onmessage = (e) => {
  console.log(e)
  let start = performance.now()
  for (let index = 0; index < 10000000000; index++) {}
  let end = performance.now()
  console.log(end - start)
  this.postMessage('ssaasg')
}
