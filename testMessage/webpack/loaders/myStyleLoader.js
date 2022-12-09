module.exports = function (source) {
  let result = `let style = document.createElement('style')
    style.innerHTML = ${JSON.stringify(source)}
    document.head.appendChild(style)`
  return result
}
