const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = (env, argv) => ({
  mode: 'development',
  entry: {
    spellbook: './src/index.ts'
  },
  devServer: {
    contentBase: path.join(__dirname, 'build'),
    historyApiFallback: true
  },
  plugins: [
    new CleanWebpackPlugin(),
  ],
  output: {
    filename: 'app.js',
    path: path.resolve(__dirname, 'build')
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      },
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
});
