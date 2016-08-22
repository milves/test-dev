module.exports = {
  entry: './src/client.js',
  output: {
    path: './public',
    filename: 'bundle.js'     
  },
  resolve: {
    extensions: ['', '.js', '.json', '.jsx'] 
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  }
};