class myPromise {
  constructor(executor) {
    this.state = 'pending'; // 三个状态 pending fulfilled rejected
    this.value = ''; // 成功返回值
    this.reason = ''; // 失败原因
    this.onFulfilledCallbacks = []; // 异步成功函数列表
    this.onRejectedCallbacks = []; // 异步失败函数列表
    let resolve = (value) => {
      if (this.state === 'pending') {
        // 规范：状态改变后，不允许再次改变
        this.state = 'fulfilled';
        this.value = value;
        this.onFulfilledCallbacks.forEach((f) => f());
      }
    };
    let reject = (reason) => {
      if (this.state === 'pending') {
        this.state = 'rejected';
        this.reason = reason;
        this.onRejectedCallbacks.forEach((f) => f());
      }
    };
    try {
      executor(resolve, reject);
    } catch (error) {
      reject(error);
    }
  }
  then(onFulfilled, onRejected) {
    // onFulfilled如果不是函数，就忽略onFulfilled，直接返回value
    onFulfilled =
      typeof onFulfilled === 'function' ? onFulfilled : (value) => value;
    // onRejected如果不是函数，就忽略onRejected，直接扔出错误
    onRejected =
      typeof onRejected === 'function'
        ? onRejected
        : (err) => {
            throw err;
          };
    // 规范：拥有一个then方法,接受两个参数，成功方法和失败方法
    function reslovePromise(promise2, x, reslove, reject) {
      // 该函数的作用就是链式调用中取到应该传递给下一个then函数的参数
      if (promise2 === x) {
        return reject(new TypeError(''));
      }
      let called = false; // 防止调用多次 规范状态改变后不能再次更改
      if (x !== null && (typeof x === 'object' || typeof x === 'function')) {
        try {
          then = x.then;
          if (typeof then === 'function') {
            // 如果then是函数，就默认是promise了
            then.call(
              x,
              (value) => {
                if (called) return;
                called = true;
                reslovePromise(promise2, value, reslove, reject);
              },
              (reason) => {
                if (called) return;
                called = true;
                reject(reason);
              }
            );
          } else {
            // 普通对象或者函数
            if (called) return;
            called = true;
            reslove(x);
          }
        } catch (error) {
          if (called) return;
          called = true;
          reject(error);
        }
      } else {
        // 普通类型
        reslove(x);
      }
    }
    let promise2 = new myPromise((reslove, reject) => {
      if (this.state === 'fulfilled') {
        setTimeout(() => {
          try {
            let x = onFulfilled(this.value);
            reslovePromise(promise2, x, reslove, reject); // 执行传递给下一个then方法的参数
          } catch (error) {
            reject(error);
          }
        }, 0);
      }
      if (this.state === 'rejected') {
        setTimeout(() => {
          try {
            let x = onRejected(this.reason);
            reslovePromise(promise2, x, reslove, reject); // 执行传递给下一个then方法的参数
          } catch (error) {
            reject(error);
          }
        }, 0);
      }
      if (this.state === 'pending') {
        // 异步情况下解决方案
        this.onFulfilledCallbacks.push(() => {
          setTimeout(() => {
            try {
              let x = onFulfilled(this.value);
              reslovePromise(promise2, x, reslove, reject); // 执行传递给下一个then方法的参数
            } catch (error) {
              reject(error);
            }
          }, 0);
        });
        this.onRejectedCallbacks.push(() => {
          setTimeout(() => {
            try {
              let x = onRejected(this.reason);
              reslovePromise(promise2, x, reslove, reject); // 执行传递给下一个then方法的参数
            } catch (error) {
              reject(error);
            }
          }, 0);
        });
      }
    });
    return promise2;
  }
}
