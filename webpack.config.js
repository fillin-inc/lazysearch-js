module.exports = {
  entry: {
    lz: './src/lz.js',
  },

  output: {
    path: __dirname + '/dist',
    filename: '[name].js',
  },

  module: {
    rules: [{
      test: /src\/*\.js$/,
      loader: 'babel-loader',
      exclude: /node_modules|\.tmp|vendor/
    }]
  }
};
