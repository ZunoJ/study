function useMatationObserver(f) {
  let text = 0
  let observer = new MutationObserver(f)
  let node = document.createTextNode('')
  observer.observe(node, { characterData: true })
  return function () {
    node.textContent = text = ++text % 2
  }
}
class myPromise {
  constructor(excuctor) {
    this.state = 'pending' // 'pending' 'fulliled' 'rejected'
    this.value = ''
    this.reason = ''
    this.onFulliledCallbacks = []
    this.onRejectedCallbacks = []
    let fulliledCallbackFn = useMatationObserver(() => {
      this.onFulliledCallbacks.forEach((f) => {
        f()
      })
    })
    let rejectedCallbackFn = useMatationObserver(() => {
      this.onRejectedCallbacks.forEach((f) => {
        f()
      })
    })
    let resolve = (value) => {
      if (this.state === 'pending') {
        if (value instanceof myPromise) {
          value.then(
            (v) => {
              this.value = v
              this.state = 'fulliled'
              fulliledCallbackFn()
            },
            (e) => {
              this.value = e
              this.state = 'fulliled'
              fulliledCallbackFn()
            }
          )
        } else {
          this.value = value
          this.state = 'fulliled'
          fulliledCallbackFn()
        }
      }
    }
    let reject = (reason) => {
      if (this.state === 'pending') {
        this.reason = reason
        this.state = 'rejected'
        rejectedCallbackFn()
      }
    }
    try {
      excuctor(resolve, reject)
    } catch (error) {
      reject(error)
    }
  }
  then(onFulfilled, onRejected) {
    function resolvePromise(promise2, x, resolve, reject) {
      if (x === promise2) {
        throw new TypeError('chain circle error')
      }
      try {
        if (x instanceof myPromise) {
          x.then((v) => {
            resolvePromise(promise2, v, resolve, reject)
          })
        } else {
          resolve(x)
        }
      } catch (error) {
        reject(error)
      }
    }
    let promise2 = new myPromise((resolve, reject) => {
      onFulfilled =
        typeof onFulfilled === 'function' ? onFulfilled : (value) => value
      onRejected =
        typeof onRejected === 'function'
          ? onRejected
          : (error) => {
              throw error
            }
      this.onFulliledCallbacks.push(() => {
        try {
          let x = onFulfilled(this.value)
          resolvePromise(promise2, x, resolve, reject)
        } catch (error) {
          reject(error)
        }
      })

      this.onRejectedCallbacks.push(() => {
        try {
          let x = onRejected(this.reason)
          resolvePromise(promise2, x, resolve, reject)
        } catch (error) {
          reject(error)
        }
      })
    })
    return promise2
  }
  catch(onRejected) {
    this.then(undefined, onRejected)
  }
}
let a = new myPromise((resolve, reject) => {
  setTimeout(() => {
    reject(1)
  }, 1000)
})
  .then((res) => {
    console.log(8)
    return 2
  })
  .catch((e) => {
    console.log(e)
  })
