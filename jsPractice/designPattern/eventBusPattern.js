function eventBus() {
  this.obj = {}
}
eventBus.prototype.on = function (type, fn) {
  this.obj[type] = this.obj[type] || []
  this.obj[type].push(fn)
}
eventBus.prototype.emit = function (type, ...args) {
  if (this.obj[type]) {
    this.obj[type].forEach((fn) => {
      fn.call(this, ...args)
    })
  }
}
eventBus.prototype.off = function (type, fn) {
  if (this.obj[type]) {
    this.obj[type] = this.obj[type].filter((item) => item !== fn)
  }
}
eventBus.prototype.once = function (type, fn) {
  function f(...args) {
    this.off(type, f)
    fn(...args)
  }
  this.on(type, f)
}
let eventObj = new eventBus()
eventObj.once('sss', function () {
  console.log(4444)
})
setTimeout(() => {
  eventObj.emit('sss')
  eventObj.emit('sss')
}, 1000)
