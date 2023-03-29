let a = {
  c: [1, 2, 3],
}
let value = a.c
Object.defineProperty(a, 'c', {
  get() {
    console.log(7)
    return value
  },
  set(v) {
    value = v
    console.log(v)
  },
})
a.c[0] = 2
// a.c = 41
console.log(a.c)
