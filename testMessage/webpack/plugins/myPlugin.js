class myPlugin {
  apply(complier) {
    complier.hooks.done.tap('myPlugin', (complier) => {
      complier.compilation.hooks.seal.tap('sss', () => {
        console.log('进入插件洛')
      })
    })
  }
}
module.exports = myPlugin
