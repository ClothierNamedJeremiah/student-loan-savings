const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

/**
 * The first rule scans for .js or .jsx extension files and uses
 * the babel-loader plugin on it to transpile. The ./node_modules/
 * repository is ignored so files do not get affected.
 *
 * The 'HtmlWebpackPlugin' will create index.html for us with
 * automatic addition of script tag in the body section of the
 * HTML file. As long as a template exists at the path specified,
 * the plugin will handle the rest.
 */
module.exports = {
  entry: './src/index.js',

  output: {
    path: path.join(__dirname, '/build'),
    filename: 'bundle.js',
  },

  devServer: {
    port: 2595,
  },

  module: {
    rules: [
      {
        test: /\.(jsx|js)$/,
        resolve: {
          extensions: ['.js', '.jsx'],
        },
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                ['@babel/preset-env', { targets: 'defaults' }],
                ['@babel/preset-react', { runtime: 'automatic' }],
              ],
            },
          },
        ],
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
  ],
};
