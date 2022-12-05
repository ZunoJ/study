// iframe + Proxt + with 利用iframe这个天然沙箱的window作为被代理对象来实现
class iframeSandbox {
  constructor(whiteList) {
    let sandboxIframe = document.createElement('iframe', { url: 'about:blank' })
    document.body.appendChild(sandboxIframe)
    let content = sandboxIframe.contentWindow
    return new Proxy(content, {
      has: function (obj, prop) {
        if (whiteList.includes(prop)) {
          return false
        }
        let isHas = Reflect.has(obj, prop)
        console.log(prop, isHas)
        if (isHas) {
          return true
        } else {
          throw new Error('别想出去')
        }
      },
    })
  }
}
function withFunction(code) {
  let res = new Function('ctx', `with(ctx){${code}}`)
  return res
}
const code_1 = `
console.log(Object === this.Object) // false
`
let proxyCtx = new iframeSandbox(['Object'])
withFunction(code_1).call(proxyCtx, proxyCtx)
