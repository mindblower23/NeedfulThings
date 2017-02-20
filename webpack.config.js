var path = require('path');

module.exports = {
  entry: {demo: ['whatwg-fetch', './client/js/index.js']},
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'client/js/dist')
  },
  module: {
    loaders: [
      { test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      }
    ]
  }
};
