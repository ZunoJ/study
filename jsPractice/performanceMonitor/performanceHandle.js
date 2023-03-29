export function getFCP(callback) {
  const entryHandler = list => {
    for (const entry of list.getEntries()) {
      if (entry.name === 'first-contentful-paint') {
        observer.disconnect()
        callback({
          name: 'FCP',
          value: entry.startTime,
          rating: entry.startTime > 2500 ? 'poor' : 'good'
        })
      }
    }
  }
  const observer = new PerformanceObserver(entryHandler)
  observer.observe({ type: 'paint', buffered: true })
}

export function getLCP(callback) {
  const entryHandler = list => {
    for (const entry of list.getEntries()) {
      observer.disconnect()
      callback({
        name: 'LCP',
        value: entry.startTime,
        rating: entry.startTime > 2500 ? 'poor' : 'good'
      })
    }
  }
  const observer = new PerformanceObserver(entryHandler)
  observer.observe({ type: 'largest-contentful-paint', buffered: true })
}

export function getFID(callback) {
  const entryHandler = entryList => {
    for (const entry of entryList.getEntries()) {
      observer.disconnect()
      const value = entry.processingStart - entry.startTime
      callback({
        name: 'FID',
        value,
        rating: value > 100 ? 'poor' : 'good'
      })
    }
  }
  const observer = new PerformanceObserver(entryHandler)
  observer.observe({ type: 'first-input', buffered: true })
}

export function getCLS(callback) {
  let clsValue = 0
  // let clsEntries = [];

  let sessionValue = 0
  let sessionEntries = []

  const entryHandler = entryList => {
    for (const entry of entryList.getEntries()) {
      // 只将不带有最近用户输入标志的布局偏移计算在内。
      if (!entry.hadRecentInput) {
        const firstSessionEntry = sessionEntries[0]
        const lastSessionEntry = sessionEntries[sessionEntries.length - 1]
        // 如果条目与上一条目的相隔时间小于 1 秒且
        // 与会话中第一个条目的相隔时间小于 5 秒，那么将条目
        // 包含在当前会话中。否则，开始一个新会话。
        if (
          sessionValue &&
          entry.startTime - lastSessionEntry.startTime < 1000 &&
          entry.startTime - firstSessionEntry.startTime < 5000
        ) {
          sessionValue += entry.value
          sessionEntries.push(entry)
        } else {
          sessionValue = entry.value
          sessionEntries = [entry]
        }

        // 如果当前会话值大于当前 CLS 值，
        // 那么更新 CLS 及其相关条目。
        if (sessionValue > clsValue) {
          clsValue = sessionValue
          // clsEntries = sessionEntries;
          observer.disconnect()

          callback({
            name: 'CLS',
            value: clsValue,
            rating: clsValue > 2500 ? 'poor' : 'good'
          })
        }
      }
    }
  }

  const observer = new PerformanceObserver(entryHandler)
  observer.observe({ type: 'layout-shift', buffered: true })
}

export function getTTFB(callback) {
  window.onload = function() {
    const { responseStart, navigationStart } = window.performance.timing
    const value = responseStart - navigationStart
    callback({
      name: 'TTFB',
      value,
      rating: value > 100 ? 'poor' : 'good'
    })
  }
}
export default function(handleEvent, callback) {
  // web-vitals 不兼容safari浏览器
  // if (isSafari()) {
  getFID(res => {
    callback.call(handleEvent, res)
  })
  getFCP(res => {
    callback.call(handleEvent, res)
  })
  getLCP(res => {
    callback.call(handleEvent, res)
  })
  getCLS(res => {
    callback.call(handleEvent, res)
  })
  getTTFB(res => {
    callback.call(handleEvent, res)
  })
  // } else {
  //   onLCP((res) => {
  //     callback(res)
  //   })
  //   onFID((res) => {
  //     callback(res)
  //   })
  //   onCLS((res) => {
  //     callback(res)
  //   })
  //   onFCP((res) => {
  //     callback(res)
  //   })
  //   onTTFB((res) => {
  //     callback(res)
  //   })
  // }
}
