/**
 * 将一系列函数，通过compose函数组合起来，像管道一样连接起来，比如函数结合[h, g, f]，
 * 通过compose最终达到这样的效果： f(g(h()))
 * */
function* f() {
  let a = yield 10
  console.log(a)
  let b = yield new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(20)
    }, 1000)
  })
  console.log(b)
  let c = yield new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(30)
    }, 1000)
  })
  console.log(c)
}
function generatorToAsync(fn) {
  return function () {
    let gene = fn()
    return new Promise((resolve, reject) => {
      function run(v) {
        let { done, value } = gene.next(v)
        if (!done) {
          if (value instanceof Promise) {
            value.then(
              (res) => run(res),
              (error) => reject(error)
            )
          } else {
            run(value)
          }
        } else {
          resolve(value)
        }
      }
      run()
    })
  }
}
function i() {
  return 1
}
function o(v) {
  console.log(48, v)
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(2)
    }, 1000)
  })
}
function p(v) {
  console.log(56, v)
}
let sync1 = (data) => {
  console.log('sync1')
  return data
}
let sync2 = (data) => {
  console.log('sync2')
  return data + 1
}
let sync3 = (data) => {
  console.log('sync3')
  return data + 2
}
let functionList = [sync1, sync2, sync3]
function compose(list, initialValue) {
  return function () {
    function f(v, fn) {
      return Promise.resolve(v).then((res) => fn(res))
    }
    let obj = initialValue
    list.forEach((item, index) => {
      obj = f(obj, item)
    })
    return obj
  }
}
let u = compose(functionList, 5)
u().then((res) => console.log(res))
