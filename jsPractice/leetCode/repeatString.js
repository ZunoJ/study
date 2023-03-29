function repeatString(str) {
  if (typeof str !== 'string') {
    return false
  }
  return str.split('').reverse().join('') === str
}
console.log(repeatString('level'))
