let pending = false
let callbacks = []

function freshCallbacks() {
  callbacks.forEach((fn) => fn())
}
let trigger
if (Promise) {
  trigger = () => {
    Promise.resolve().then(() => {
      freshCallbacks()
      callbacks = []
      pending = false
    })
  }
} else if (MutationObserver) {
  let node = document.createTextNode('')
  let observe = new MutationObserver(() => {
    freshCallbacks()
    callbacks = []
    pending = false
  })
  observe.observe(node, { characterData: true })
  let value = 0
  trigger = function () {
    node.textContent = value = value++ % 2
  }
} else if (setImmediate) {
  trigger = setImmediate(() => {
    freshCallbacks()
    callbacks = []
    pending = false
  })
} else {
  trigger = setTimeout(() => {
    freshCallbacks()
    callbacks = []
    pending = false
  })
}

function nextTick(cb) {
  callbacks.push(cb)
  if (!pending) {
    pending = true
    trigger()
  }
}

let fn1 = () => console.log(1)
let fn2 = () => console.log(2)
let fn3 = () => console.log(3)
let fn4 = () => console.log(4)
nextTick(fn1)
nextTick(fn2)
nextTick(fn3)
nextTick(fn4)
