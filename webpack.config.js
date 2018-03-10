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
      test: /\.js$/,
      exclude: /node_modules|\.tmp|vendor/,
      use: { loader: 'babel-loader' }
    },{
      test: /\.html$/,
      use: [{
        loader: 'html-loader',
        options: {
          minimize: true
        }
      }]
    },{
      test: /\.css$/,
      use: [
        { loader: 'style-loader/useable', options: { attrs: { id: 'lz-style' } } },
        { loader: 'css-loader' }
      ]
    }]
  }
};
