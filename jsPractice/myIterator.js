let myIterator = {
  count: 0,
  next() {
    console.log(this);
    if (this.count < 10) {
      return { done: false, value: this.count++ };
    } else {
      return { done: true };
    }
  },
};
let obj = {
  a: 1,
  [Symbol.iterator]() {
    console.log(this);
    return myIterator;
  },
};
for (const item of obj) {
  console.log(item);
}
