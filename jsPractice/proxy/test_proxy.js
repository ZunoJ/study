let a = { h: 1 }

let obj = {}

let aProxy = new Proxy(a, {
  get: (target, key, receiver) => {
    console.log(receiver === aProxy)
    console.log(receiver === obj)
    return Reflect.get(target, key)
  },
})
console.log(aProxy.h)
Object.setPrototypeOf(obj, aProxy)
console.log(obj.h)
