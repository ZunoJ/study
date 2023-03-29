const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
const resolve = (p) => path.resolve(__dirname, p)
const { VueLoaderPlugin } = require('vue-loader')

// 引入插件
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
// 引入模块联邦
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin')

module.exports = {
  entry: './src/main.js',
  output: {
    path: resolve('./dist'),
    filename: '[name].bundle.js',
    chunkFilename: '[name].js'
  },
  devServer: {
    port: 8085,
    // 配置允许跨域
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Method': 'GET,POST,PUT,OPTIONS'
    }
  },
  devtool: false,
  optimization: {
    splitChunks: {
      chunks: 'all',
      minSize: 0,
      cacheGroups: {
        vendor: {
          test: '/[\\/]node_modules[\\/]/',
          priority: 20,
          reuseExistingChunk: true
        }
      }
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env']
            }
          }
        ]
      },
      {
        test: /\.vue$/,
        use: ['vue-loader']
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './public/index.html'
    }),
    new VueLoaderPlugin(),
    new ModuleFederationPlugin({
      name: 'vue2lib_remote',
      filename: 'remoteEntry.js',
      exposes: {
        './vue2': 'vue',
        './xxxx': './src/xxxx.vue'
      }
    })
  ]
}
