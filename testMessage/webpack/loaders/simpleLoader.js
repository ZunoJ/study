const loaderUtils = require('loader-utils')

module.exports = function simpleLoader(source) {
  let options = loaderUtils.getOptions(this)
  console.log(loaderUtils)
  return source
}
