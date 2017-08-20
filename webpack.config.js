module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'reqt.js'
    },
    module: {
        loaders: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader'
        }]
    }
}
