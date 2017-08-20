module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'reqt.js',
    library: 'reqt',
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader'
    }]
  }
}
