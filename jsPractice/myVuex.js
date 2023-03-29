function install(vue) {
  vue.mixin({
    beforeCreate() {
      var options = this.$options
      if (options && options.store) {
        this.$store = options.store
      }
    }
  })
}
class Store {
  constructor(config) {
    this.vm = new Vue({
      data: {
        state: config.state
      }
    })
    let getters = config.getters || {}
    this.getters = {}
    Object.keys(getters).forEach((key) => {
      let self = this
      Object.defineProperty(this.getters, key, {
        get() {
          return getters[key](self.vm.state)
        }
      })
    })
    let mutations = config.mutations || {}
    this.mutations = {}
    Object.keys(mutations).forEach((key) => {
      this.mutations[key] = (payload) => {
        mutations[key](this.state, payload)
      }
    })
    let actions = config.actions || {}
    this.actions = {}
    Object.keys(actions).forEach((key) => {
      this.actions[key] = (payload) => {
        actions[key](this, payload)
      }
    })
  }
  get state() {
    return this.vm.state
  }
  commit(key, payload) {
    this.mutations[key](payload)
  }
  dispatch(key, payload) {
    this.actions[key](payload)
  }
}
var Vuex = {
  Store,
  install
}
