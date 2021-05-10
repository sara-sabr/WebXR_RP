const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const packageVersion = require('./package.json');
const buildDate = new Date().toLocaleString('en-CA', {
  timeZone: 'Canada/Eastern',
});

module.exports = (env) => {
  const build = env.NODE_ENV ? env.NODE_ENV : 'production';
  const debugMode = env.debugMode ? env.debugMode : false;

  console.log('Webpack is building for...');
  console.log('Environment: ', build);
  console.log('Debug Mode: ', debugMode);
  console.log('Package Version', packageVersion.version);
  console.log('Build Date', buildDate);
  return {
    mode: build,
    devtool: debugMode == true ? 'inline-source-map' : undefined,
    entry: {
      index: {
        import: './src/main.ts',
      },
    },
    plugins: [
      new CleanWebpackPlugin({ cleanStaleWebpackAssets: !debugMode }),
      new HtmlWebpackPlugin({
        template: './src/login.html',
        packageVersion: packageVersion.version,
        buildDate: buildDate,
      }),
    ],
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
      publicPath: '',
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.js'],
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: 'ts-loader',
          exclude: /node_modules/,
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif|gltf|mp3)$/i,
          type: 'asset/resource',
        },
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
        },
      ],
    },
    optimization: {
      runtimeChunk: 'single',
    },
  };
};
