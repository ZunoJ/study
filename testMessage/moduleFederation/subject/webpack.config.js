const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
const resolve = (p) => path.resolve(__dirname, p)
const { VueLoaderPlugin } = require('vue-loader')
// 引入模块联邦
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin')

module.exports = {
  entry: './src/main.js',
  resolve: {
    alias: {
      //   vue: path.resolve(`./node_modules/vue`)
    }
  },
  output: {
    path: resolve('./dist'),
    filename: '[name].js',
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
      cacheGroups: {
        vendor: {
          test: '/[\\/]node_modules[\\/]/',
          priority: -10,
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
    new HtmlWebpackPlugin({
      template: './public/index.html'
    }),
    new VueLoaderPlugin(),
    new ModuleFederationPlugin({
      name: 'subject',
      filename: 'remoteEntry.js',
      remotes: {
        lib_remote:
          'lib_remote@http://localhost:8090/moduleFederation/lib/dist/remoteEntry.js'
      },
      shared: ['vue']
    })
  ]
}
