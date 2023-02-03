let uid = 0
let queue = []
let has = {}
let pending = false
class Watcher {
  constructor(fn) {
    this.effect = fn
    this.id = uid++
  }
  run() {
    this.effect()
  }
}
function addWatcher(watcher) {
  let id = watcher.id
  if (!has[id]) {
    queue.push(watcher)
  }
}
function freshWatcher() {
  if (!pending) {
    pending = true
    queue.forEach((watcher) => {
      watcher.effect()
    })
    pending = false
    has = {}
    queue = []
    uid = 0
  }
}
let watcher1 = new Watcher(() => console.log(1))
let watcher2 = new Watcher(() => console.log(2))
let watcher3 = new Watcher(() => console.log(3))
addWatcher(watcher1)
addWatcher(watcher2)
addWatcher(watcher3)
freshWatcher()
addWatcher(watcher1)
addWatcher(watcher2)
addWatcher(watcher3)
freshWatcher()
addWatcher(watcher1)
addWatcher(watcher2)
addWatcher(watcher3)
freshWatcher()
