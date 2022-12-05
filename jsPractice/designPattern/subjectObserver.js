class subject {
  constructor() {
    this.observerList = [] // 观察者们
  }
  addObserver(observer) {
    this.observerList.push(observer)
  }
  notify() {
    this.observerList.forEach((item) => item.update())
  }
}
class observer {
  constructor(name) {
    this.name = name
  }
  update() {
    console.log('我是观察者' + this.name)
  }
}
let sub = new subject()
let observer1 = new observer('路人甲')
let observer2 = new observer('宋兵乙')
sub.addObserver(observer1) // 订阅
sub.addObserver(observer2) // 订阅
sub.notify() // 发布
