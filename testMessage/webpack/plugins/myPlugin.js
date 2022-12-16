class myPlugin {
  apply(complier) {
    complier.hooks.emit.tap('myPlugin', (compliation) => {
      console.log('my plugin', compliation)
    })
  }
}
module.exports = myPlugin
