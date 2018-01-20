module.exports = {
  entry: './index.js',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.(txt|vert|frag)$/,
        use: 'raw-loader'
      }
    ]
  },
  node: {
    fs: 'empty'
  },
  output: {
    filename: 'bundle.js'
  }
};
