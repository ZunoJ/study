import monitorEvent from './constants/eventType'
class HandleEvents {
  constructor() {
    this.callbacks = []
    this.runing = false
  }

  addCallback(callback) {
    this.callbacks.push(callback)
    if (!this.runing) {
      this.notifiy()
    }
  }

  notifiy() {
    this.runing = true
    requestIdleCallback(() => {
      this.callbacks.forEach(data => {
        monitorEvent.run(data)
      })
      this.callbacks = []
      this.runing = false
    })
  }
}
const handleEvents = new HandleEvents()

export default handleEvents
