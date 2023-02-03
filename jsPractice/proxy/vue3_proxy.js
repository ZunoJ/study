// 用来存储原始值和响应式proxy的映射
const proxyToRaw = new WeakMap()
// 用来存储响应式proxy和原始值的映射
const rawToProxy = new WeakMap()

const baseHandlers = {
  get(target, key, receiver) {
    const result = Reflect.get(target, key, receiver)
    // 收集依赖
    registerRunningReaction({ target, key, receiver, type: 'get' })
    return result
  },
  set(target, key, value, receiver) {
    // 拿到旧值
    const oldValue = target[key]
    // 设置新值
    const result = Reflect.set(target, key, value, receiver)

    queueReactionsForOperation({
      target,
      key,
      value,
      oldValue,
      receiver,
      type: 'set',
    })

    return result
  },
}

/** 依赖收集栈 */
const reactionStack = []

const connectionStore = new WeakMap()

function createReactive(raw) {
  const reactive = new Proxy(raw, baseHandlers)

  // 双向存储原始值和响应式proxy的映射
  rawToProxy.set(raw, reactive)
  proxyToRaw.set(reactive, raw)

  // 建立一个映射
  // 原始值 -> 存储这个原始值的各个key收集到的依赖函数的Map
  storeObservable(raw)

  // 返回响应式proxy
  return reactive
}

function storeObservable(value) {
  // 存储对象和它内部的key -> reaction的映射
  connectionStore.set(value, new Map())
}

/** 依赖收集 在get操作的时候要调用 */
function registerRunningReaction(operation) {
  const runningReaction = getRunningReaction()
  if (runningReaction) {
    let { target, key } = operation
    // 拿到原始对象 -> 观察者的map
    const reactionsForRaw = connectionStore.get(target)
    // 拿到key -> 观察者的set
    let reactionsForKey = reactionsForRaw.get(key)

    if (!reactionsForKey) {
      // 如果这个key之前没有收集过观察函数 就新建一个
      reactionsForKey = new Set()
      // set到整个value的存储里去
      reactionsForRaw.set(key, reactionsForKey)
    }

    if (!reactionsForKey.has(runningReaction)) {
      // 把这个key对应的观察函数收集起来
      reactionsForKey.add(runningReaction)
      // 把key收集的观察函数集合 加到cleaners队列中 便于后续取消观察
      if (!runningReaction.cleaners) {
        runningReaction.cleaners = []
      }
      runningReaction.cleaners.push(reactionsForKey)
    }
  }
}

/** 从栈的末尾取到正在运行的observe包裹的函数 */
function getRunningReaction() {
  const [runningReaction] = reactionStack.slice(-1)
  return runningReaction
}

/** 值更新时触发观察函数 */
function queueReactionsForOperation(operation) {
  getReactionsForOperation(operation).forEach((reaction) => reaction())
}

/**
 *  根据key,type和原始对象 拿到需要触发的所有观察函数
 */
function getReactionsForOperation({ target, key, type }) {
  // 拿到原始对象 -> 观察者的map
  const reactionsForTarget = connectionStore.get(target)
  const reactionsForKey = new Set()

  // 把所有需要触发的观察函数都收集到新的set里
  addReactionsForKey(reactionsForKey, reactionsForTarget, key)

  return reactionsForKey
}

function addReactionsForKey(reactionsForKey, reactionsForTarget, key) {
  const reactions = reactionsForTarget.get(key)
  reactions &&
    reactions.forEach((reaction) => {
      reactionsForKey.add(reaction)
    })
}

/**
 * 观察函数
 * 在传入的函数里去访问响应式的proxy 会收集传入的函数作为依赖
 * 下次访问的key发生变化的时候 就会重新运行这个函数
 */
function observe(fn) {
  // reaction是包装了原始函数只后的观察函数
  // 在runReactionWrap的上下文中执行原始函数 可以收集到依赖。
  const reaction = (...args) => {
    return runReactionWrap(reaction, fn, this, args)
  }

  // 先执行一遍reaction
  reaction()

  // 返回出去 让外部也可以手动调用
  return reaction
}

/** 把函数包裹为观察函数 */
function runReactionWrap(reaction, fn, context, args) {
  try {
    // 把当前的观察函数推入栈内 开始观察响应式proxy
    reactionStack.push(reaction)
    // 运行用户传入的函数 这个函数里访问proxy就会收集reaction函数作为依赖了
    return Reflect.apply(fn, context, args)
  } finally {
    // 运行完了永远要出栈
    reactionStack.pop()
  }
}

setTimeout(() => {
  const counter = createReactive({ num: 0 })

  // 会在控制台打印出0
  const counterReaction = observe(() => console.log(counter.num))

  // 会在控制台打印出1
  counter.num = 1
}, 1000)
