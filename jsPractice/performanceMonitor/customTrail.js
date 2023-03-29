class CustomTrail {
  constructor() {
    if (CustomTrail.instace) {
      return CustomTrail.instace
    }
    this.max = 20
    this.customTrails = []
    CustomTrail.instace = this
    return this
  }

  addTrails(data) {
    if (this.customTrails.length > this.max) {
      this.customTrails.shift()
    }
    this.customTrails.push(data)
  }

  sendTrails() {
    if (!CustomTrail.sending) {
      CustomTrail.sending = true
      setTimeout(() => {
        console.log(this.customTrails)
        this.customTrails = []
        CustomTrail.sending = false
      }, 0)
    }
  }
}

CustomTrail.sending = false
export default new CustomTrail()
