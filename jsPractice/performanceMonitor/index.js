import handleEvent from './handleEvent'
import initErrorHandle from './initErrorHandle'
import eventType from './constants/eventType'
function install(Vue, options) {
  Vue.config.errorHandle = (vm, err, info) => {
    handleEvent.addCallback({
      type: 'vueError',
      err,
      info,
      tag: vm
    })
  }
  initErrorHandle()
}

export default { install, eventType }
