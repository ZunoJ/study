import handleEvent from './handleEvent'
import getPreformance from './performanceHandle'
import customTrail from './customTrail'
function initErrorHandle() {
  window.addEventListener('error', e => {
    const data = {
      type: 'commonError',
      info: e
    }
    customTrail.addTrails(data)
    customTrail.sendTrails()
    handleEvent.addCallback(data)
  })
  window.addEventListener('unhandledrejection', e => {
    const data = {
      type: 'promiseError',
      info: e
    }
    customTrail.addTrails(data)
    handleEvent.addCallback(data)
  })
  window.addEventListener('click', e => {
    console.dir(e.target)
    customTrail.addTrails(e.target.tagName)
    customTrail.sendTrails()
  })
  proxyAjax(handleEvent, handleEvent.addCallback)
  proxyFetch(handleEvent, handleEvent.addCallback)
  proxyState(handleEvent, handleEvent.addCallback)
  getPreformance(handleEvent, handleEvent.addCallback)
}

function proxyAjax(handleEvent, callback) {
  const send = XMLHttpRequest.prototype.send
  XMLHttpRequest.prototype.send = function(...args) {
    const data = {
      method: args,
      url: args,
      time: Date.now(),
      type: 'xhrSend'
    }
    customTrail.addTrails(data)
    callback.call(handleEvent, data)
    return send.apply(this, args)
  }
}
function proxyFetch(handleEvent, callback) {
  const oldFetch = fetch
  fetch = function(...args) {
    const data = {
      method: args[1] || args[1].method,
      url: args[0],
      time: Date.now(),
      type: 'fetch'
    }
    customTrail.addTrails(data)
    callback.call(handleEvent, data)
    return oldFetch.apply(this, args)
  }
}
function proxyState(handleEvent, callback) {
  const oldHref = location.href
  const oldPushState = window.history.pushState
  const oldReplaceState = window.history.replaceState
  const oldOnPopstate = window.onpopstate || new Function()
  window.history.pushState = function(...args) {
    const data = {
      to: args[2],
      from: oldHref,
      time: Date.now(),
      type: 'pushState'
    }
    customTrail.addTrails(data)
    callback.call(handleEvent, data)
    oldPushState.apply(this, args)
  }
  window.history.replaceState = function(...args) {
    const data = {
      to: args[2],
      from: oldHref,
      time: Date.now(),
      type: 'replaceState'
    }
    customTrail.addTrails(data)
    callback.call(handleEvent, data)
    oldReplaceState.apply(this, args)
  }
  window.onpopstate = function(e) {
    const data = {
      to: location.href,
      from: oldHref,
      time: Date.now(),
      type: 'popState'
    }
    customTrail.addTrails(data)
    callback.call(handleEvent, data)
    oldOnPopstate(e)
  }
}

export default initErrorHandle
