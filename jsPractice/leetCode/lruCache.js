class LruCache {
  constructor(size) {
    this.size = size
    this.data = new Map()
  }
  put(key, value) {
    if (this.data.has(key)) {
      this.data.delete(key)
      this.data.set(key, value)
      return
    }
    if (this.data.size >= this.size) {
      let firstKey = this.data.keys().next().value
      this.data.delete(firstKey)
    }
    this.data.set(key, value)
  }
  get(key) {
    if (this.data.has(key)) {
      let data = this.data.get(key)
      this.data.delete(key)
      this.data.set(key, data)
      return data
    }
  }
}
