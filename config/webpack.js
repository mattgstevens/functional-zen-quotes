var path = require('path')

module.exports = {
  entry: path.resolve(__dirname, '../client/client.js')
, output: {
    // path: path.resolve(__dirname, '../client/build')
    path: path.resolve(__dirname, '../public/js')
  , filename: '/app.js'
  }

, module: {
    loaders: [
      {
        test: /\.js$/
      , exclude: /node_modules/
      , loader: 'babel-loader'
      }
    ]
  }
}

