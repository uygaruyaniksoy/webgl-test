module.exports = {
  entry: './index.js',
  module: {
    rules: [
      {
        exclude: /(node_modules|bower_components)/,
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.(txt|vert|frag|glsl)$/,
        use: 'raw-loader'
      }
    ]
  },
  node: {
    fs: 'empty'
  },
  output: {
    filename: 'bundle.js'
  },
  devtool: 'source-map'
};
