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
      use: {
        loader: 'babel-loader',
        options: {
          presets: [
            ['env', {
              'targets': {
                'browsers': ['> 1%', 'last 2 versions', 'not ie <=  9']
              }
            }],
          ],
          comments: false
        }
      }
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
