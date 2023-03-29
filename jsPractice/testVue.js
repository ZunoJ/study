let Vue = require('./vue/dist/vue')
var vm = new Vue({
  data: {
    items: ['a', 'b', 'c'],
    a: 1,
  },
  watch: {
    a() {
      console.log(12)
    },
    items() {
      console.log(9)
    },
  },
  template: '<div>You clicked me {{ items }} times.</div>',
})
vm.items[1] = 'x' // 不是响应性的
vm.items.length = 2 // 不是响应性的
vm.a = 2
console.log()
