class myPromise {
  constructor(fn) {
    // resolve时的回调函数列表
    this.resolveTask = [];
    // reject时的回调函数列表
    this.rejectTask = [];
    // state记录当前状态,共有pending、fulfilled、rejected 3种状态
    this.state = "pending";
    this.data = ""; // 成功数据
    this.error = ""; // 失败原因
    let resolve = (value) => {
      // state状态只能改变一次，resolve和reject只会触发一种
      if (this.state !== "pending") return;
      this.state = "fulfilled";
      if (value instanceof myPromise) {
        value.then((v) => {
          this.data = v; // 此段代码是保证构造函数resolve方法直接传入promise
          // 模拟异步，保证resolveTask事件先注册成功，要考虑在Promise里面写同步代码的情况
          setTimeout(() => {
            this.resolveTask.forEach((cb) => cb(value));
          });
        });
      } else {
        this.data = value;
        // 模拟异步，保证resolveTask事件先注册成功，要考虑在Promise里面写同步代码的情况
        setTimeout(() => {
          this.resolveTask.forEach((cb) => cb(value));
        });
      }
    };
    let reject = (err) => {
      if (this.state !== "pending") return;
      this.state = "rejected";
      this.error = err;
      // 保证rejectTask事件注册成功
      setTimeout(() => {
        this.rejectTask.forEach((cb) => cb(err));
      });
    };

    // 关键代码，执行fn函数
    try {
      fn(resolve, reject);
    } catch (error) {
      reject(error);
    }
  }

  then(resolveCallback, rejectCallback) {
    // 解决链式调用的情况，继续返回Promise
    let promise2 = new myPromise((resolve, reject) => {
      function resolvePromise(promise2, res, resolve, reject) {
        if (promise2 === res) {
          reject(new TypeError("chain circle error"));
        }
        try {
          if (res instanceof myPromise) {
            res.then(
              (v) => {
                resolvePromise(promise2, v, resolve, reject);
              },
              (e) => {
                reject(e);
              }
            );
          } else {
            resolve(res);
          }
        } catch (error) {
          reject(error);
        }
      }
      // 将then传入的回调函数，注册到resolveTask中
      this.resolveTask.push(() => {
        // 重点：判断resolveCallback事件的返回值
        // 假如用户注册的resolveCallback事件又返回一个Promise，将resolve和reject传进去，这样就实现控制了链式调用的顺序
        const res = resolveCallback(this.data);
        resolvePromise(promise2, res, resolve, reject);
      });

      this.rejectTask.push(() => {
        // 同理：判断rejectCallback事件的返回值
        // 假如返回值为普通值，reject传递出去
        const res = rejectCallback(this.error);
        resolvePromise(promise2, res, resolve, reject);
      });
    });
    return promise2;
  }
}

let a = new myPromise((reslove, reject) => {
//   let b = new myPromise((res, rej) => {
//     setTimeout(() => {
//       res(1);
//     }, 1000);
//   });
  reslove(1);
})
  .then((v) => {
    console.log(96, v);
    let c = new myPromise((res, rej) => {
      setTimeout(() => {
        let d = new myPromise((res, rej) => {
          setTimeout(() => {
            res(10);
          }, 1000);
        });
        res(d);
      }, 1000);
    });
    return c;
  })
  .then((v) => {
    console.log(109, v);
  });
