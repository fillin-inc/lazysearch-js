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
        { loader: 'style-loader', options: { attrs: { id: 'lz-style' } } },
        { loader: 'css-loader' }
      ]
    }]
  }
};
