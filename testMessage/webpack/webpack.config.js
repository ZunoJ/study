var path = require('path')
var webpack = require('webpack')
//首先引入插件
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const myPlugin = require('./plugins/myPlugin')
console.log(process.env.NODE_ENV)
let config = {
  devServer: {
    port: '3000', //默认是8080
    hot: true
  },
  resolve: {
    alias: {
      _vue: 'vue/dist/vue.common.js'
    }
  },
  //   optimization: {
  //     splitChunks: {
  //       chunks: 'all',
  //       minSize: 300,
  //       cacheGroups: {
  //         vue: {
  //           name: 'vue-vendor',
  //           test: (module) => {
  //             return /vue/.test(module.context)
  //           }
  //         }
  //       }
  //     }
  //   },
  entry: { sagfas: './src/entry.js' },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[fullhash].js',
    publicPath: './',
    library: 'MyLibrary'
  },
  resolveLoader: {
    // alias: {
    //   simpleLoader: path.resolve(__dirname, './loaders/simpleLoader.js'),
    // },
    modules: ['node_modules', path.resolve(__dirname, './loaders')]
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              plugins: [['@babel/plugin-transform-runtime', { corejs: 3 }]]
            }
          },
          {
            loader: 'simpleLoader'
          }
        ],
        exclude: /node_modules/
      },
      {
        test: /.css$/,
        use: [
          {
            loader: path.resolve(__dirname, './loaders/myStyleLoader.js')
          }
        ],
        include: /src/
      }
    ]
  },
  plugins: [
    new myPlugin(),
    new CleanWebpackPlugin(),
    //数组 放着所有的webpack插件
    new HtmlWebpackPlugin({
      template: './public/index.html',
      filename: 'index.html', //打包后的文件名
      minify: {
        removeAttributeQuotes: false, //是否删除属性的双引号
        collapseWhitespace: false //是否折叠空白
      }
      // hash: true //是否加上hash，默认是 false
    })
    // new webpack.DllReferencePlugin({
    //   manifest: require('./dll/vendor-manifest.json')
    // })
  ]
}
if (process.env.NODE_ENV !== 'production') {
  console.log(92)
  config.plugins.push(
    new webpack.DllReferencePlugin({
      manifest: require('./dll/vendor-manifest.json')
    })
  )
}
module.exports = config
