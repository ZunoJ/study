var a = require('./b.js');
console.log(a);
// main.js
let event = require('./a');
// 加载模块并监听事件
event.on('ready', function () {
  console.log('监听到');
});
