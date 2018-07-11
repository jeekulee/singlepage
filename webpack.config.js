var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var CleanWebpackPlugin = require('clean-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');


module.exports = {
  entry: {
    index: './js/index.js'
  },
  output: {
    filename: './js/[name].[hash:6].js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      { test: /\.js$/, use: ["babel-loader"], exclude: /(node_modules)/ },
      { test: /\.html$/, use: ["html-loader"] },
      { test: /\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/, loader: 'url-loader?limit=100000&name=images/[hash:8].[name].[ext]' },
      // { test:/\.scss$/, use: ["style-loader", "css-loader", "sass-loader"] }
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: ["css-loader", "sass-loader"]
        })
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: "css-loader"
        })
      }
    ]
  },
  resolve: {
      modules: ['./js/js', 'node_modules/']
  },
  devServer: {
    contentBase: './',
    host: "0.0.0.0",
    port: 9090,
    inline: true,
    hot: true
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      minify: { //压缩HTML文件
        removeComments: true, //移除HTML中的注释
        collapseWhitespace: false //删除空白符与换行符
      },
      chunks: ['index']
    }),
    new ExtractTextPlugin("./css/style.[hash:6].css"),
    new CleanWebpackPlugin(
      [
        'dist/*'
      ],　 //匹配删除的文件
      {
        root: __dirname,       　　　　　　　　　　//根目录
        verbose: true,        　　　　　　　　　　//开启在控制台输出信息
        dry: false        　　　　　　　　　　//启用删除文件
      }
    ),
    new CopyWebpackPlugin([
      {
        from:__dirname + '/vendor',
        to:__dirname + '/dist/vendor'
      }
    ], {
        ignore: [],
        copyUnmodified: true,
        debug: "debug"
      }
    )
  ],
  externals: {
    jquery: 'window.$'
  }
}