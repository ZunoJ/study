let path = require('path')
let webpack = require('webpack')

module.exports = {
  entry: {
    vendor: ['vue']
  },
  output: {
    path: path.resolve(__dirname, './dll'),
    filename: '[name].dll.js',
    library: '[name]_library'
  },
  plugins: [
    new webpack.DllPlugin({
      name: '[name]_library',
      path: path.resolve('./dll', '[name]-manifest.json')
    })
  ]
}
