class MonitorEvent {
  constructor(params = {}) {
    if (MonitorEvent.instace) {
      return MonitorEvent.instace
    }
    this.eventTypes = params
    MonitorEvent.instace = this
    return this
  }

  addEvents(type, event) {
    if (!type) {
      type = 'defaultEvent'
    }
    if (event instanceof Function) {
      this.eventTypes[type].push(event)
    }
  }

  run(data) {
    if (!data) {
      return
    }
    const eventTypes =
      this.eventTypes[data.type] || this.eventTypes.defaultEvent
    eventTypes.forEach(fn => {
      fn(data)
    })
  }
}
const monitorEventInstace = new MonitorEvent({
  defaultEvent: [
    data => {
      console.log('default', data)
    }
  ],
  commonError: [
    data => {
      console.log('error', data)
    }
  ]
})
export default monitorEventInstace
