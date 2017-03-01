var path = require('path');

module.exports = {
  entry: {demo: ['whatwg-fetch', './src/index.js']},
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    loaders: [
      { test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      },
      { test: /\.css$/,
        exclude: /node_modules/,
        loaders: [
          "style-loader",
          "css-loader",
          "postcss-loader"
        ]
      }
    ]
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
    inline: true
  }
};
