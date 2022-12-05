function getData() {
  let count = 0;
  return function () {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        count++;
        resolve(count);
      }, 1000);
    });
  };
}
let get = getData();
function* a() {
  let data1 = yield get();
  let data2 = yield get();
  let data3 = yield get();
}
// 手动实现思路 1.调用生成器方法 2.如果done为false则一直调用，使用promise.resolve()方法接受结果，兼容结果为异步产生 3.done为true则返回
// let promise1 = a().next().value;
// promise1
//   .then((r) => {
//     console.log(r);
//     return a().next(r).value;
//   })
//   .then((r) => {
//     console.log(r);
//   });
function generatorToAsync(generatorMethod) {
  return function () {
    let generator = generatorMethod();
    return new Promise((resolve, reject) => {
      function step(val) {
        let geneRes = generator.next(val);
        let { done, value } = geneRes;
        if (done) {
          resolve(value);
        } else {
          Promise.resolve(value).then(
            (v) => {
              console.log(v);
              step(v);
            },
            (e) => reject(e)
          );
        }
      }
      step();
    });
  };
}
let asyncMethod = generatorToAsync(a);
asyncMethod().then((v) => console.log(v));
