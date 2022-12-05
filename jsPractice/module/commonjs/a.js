// event.js
let EventEmitter = require('events').EventEmitter;
// 将实例赋给module.exports导出
module.exports = new EventEmitter();
// 延时发布事件
setTimeout(function () {
  module.exports.emit('ready');
}, 3000);
