// 核心思想使用with来实现，使用Proxy来阻止访问外层作用域中的变量
function withSandbox(code) {
  let sandbox = new Function('ctx', `with(ctx){${code}}`)
  return sandbox
}
var foo = 1
var ctx = {
  foo: 2,
}
var proxyCtx = new Proxy(ctx, {
  has: function (obj, prop) {
    if (['console'].includes(prop)) {
      return false
    }
    let isHas = Reflect.has(obj, prop)
    if (isHas) {
      return isHas
    } else {
      console.log(prop)
      throw new Error('你的思想很危险')
    }
  },
})

// withSandbox(`({}).__proto__.toString = () => {
//     return new (() => {}).constructor('console.log(globalThis)')()
// }`).call(proxyCtx, proxyCtx)
// var b = { a: 1 }
// b.toString()
withSandbox(`({}).__proto__.toString = () => {
    function a(){
        console.log(1)
    }
    console.log(a.__proto__.constructor)
}`).call(proxyCtx, proxyCtx)
var b = { a: 1 }
b.toString()
// withSandbox('new Function(`console.log(foo)`)()').call(proxyCtx, proxyCtx)
