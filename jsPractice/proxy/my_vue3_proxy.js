function track(operation) {
  let runningEffect = getRunningEffect()
  if (runningEffect) {
    let { target, key } = operation
    let proxtMap = connectionStore.get(target)
    let effectSet = proxtMap.get(key)
    // 判断此key是否已有effect集合
    if (!effectSet) {
      effectSet = new Set()
      proxtMap.set(key, effectSet)
    }
    if (!effectSet.has(runningEffect)) {
      effectSet.add(runningEffect)
    }
  }
}
function getRunningEffect() {
  return effectStacks.slice(-1)[0]
}
function trigger(operation) {
  let { target, key } = operation
  let proxtMap = connectionStore.get(target)
  let effectSet = proxtMap.get(key)
  console.log(effectSet, 24)
  effectSet.forEach((effect) => {
    effect()
  })
}

let baseHandlers = {
  get(target, key, receiver) {
    track({ target, key, receiver })
    let res = Reflect.get(target, key, receiver)
    // 如果访问的是对象 则返回这个对象的响应式proxy
    if (isObject(res)) {
      return reactive(res)
    }
    return res
  },
  set(target, key, value, receiver) {
    let res = Reflect.set(target, key, value, receiver)
    trigger({ target, key })

    return res
  },
  ownkeys(target) {
    console.log('触发遍历')
    // return Reflect.ownKeys(target)
  },
}

let effectStacks = []
// 全局map，用来存储所有响应式对象
let connectionStore = new WeakMap()
let rawToProxy = new WeakMap()
function reactive(raw) {
  // 如果被代理过，直接返回
  if (connectionStore.has(raw)) {
    return rawToProxy.get(raw)
  }
  let proxyRaw = new Proxy(raw, baseHandlers)
  // 存储原始值和代理对象的映射
  rawToProxy.set(raw, proxyRaw)
  // 在globalMap中加入该响应式对象，值为该对象<key,effect[]:set>
  connectionStore.set(raw, new Map())

  return proxyRaw
}

// 副作用函数
function effect(fn) {
  let activeEffect = (...args) => {
    try {
      effectStacks.push(activeEffect)
      Reflect.apply(fn, this, args)
    } finally {
      effectStacks.pop()
    }
  }
  activeEffect()
  return activeEffect
}

function isObject(raw) {
  let flag = raw instanceof Object
  return flag
}

setTimeout(() => {
  //   const counter = reactive({ num: 0 })

  //   // 会在控制台打印出0
  //   const counterReaction = effect(() => {
  //     console.log(counter.num)
  //   })

  //   // 会在控制台打印出1
  //     counter.num = 1

  const counter = reactive({ data: { num: 0 } })
  //   const arrayData = reactive([1, 2, 3])
  // 会在控制台打印出0
  //   const counterReaction = effect(() => {
  //     console.log(counter.data.num)
  //   })
  console.log(counter)
  effect(() => console.log(Object.keys(counter)))
  //   counter.data.num = 5
}, 1000)
