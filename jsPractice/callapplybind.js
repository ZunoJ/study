Function.prototype.myCall = function (context, ...args) {
  if (!context) {
    // 当传入了null或者undefined时，默认绑定全局对象
    context = global;
  }
  if (typeof this !== 'function') {
    // 防止赋给了非函数对象运行
    return;
  }
  let fn = Symbol('function'); // 设定一个唯一key值，避免与context已有属性冲突
  context[fn] = this; // 将当前函数挂在context的上
  let res = context[fn](...args); // 执行当前函数,this隐式绑定为context
  delete context[fn]; // 删除context新增加的属性
  return res;
};
Function.prototype.myApply = function (context, args) {
  if (!context) {
    context = global;
  }
  if (typeof this !== 'function') {
    return;
  }
  let fn = Symbol('function');
  context[fn] = this;
  let res = context[fn](...args);
  delete context[fn];
  return res;
};
// bind需要多考虑一种情况，当返回的函数作为构造函数时，需要将this绑定在当前调用对象上
Function.prototype.myBind = function (context, ...args) {
  if (!context) {
    context = global;
  }
  if (typeof this !== 'function') {
    return;
  }
  let fn = this;
  let f = Symbol('function');
  const result = function p() {
    // result如果当作构造函数使用，this指向的是new出来的对象
    if (this instanceof fn) {
      // 原型链中有fn，说明是new出来的对象
      this[f] = fn;
      let res = this[f](...args);
      delete this[f];
      return res;
    } else {
      context[f] = fn;
      let res = context[f](...args);
      delete context[f];
      return res;
    }
  };
  result.prototype = Object.create(fn.prototype);
  return result;
};
let obj = {
  l: 1,
};
global.l = 2;
function a() {
  console.log(this.l);
}
a();
a.myCall(obj);
