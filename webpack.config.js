var webpack = require('webpack');
var path = require('path');
// 分离css文件
var ExtractTextPlugin = require('extract-text-webpack-plugin');
// 动态加载html文件
var HtmlWebpackPlugin = require('html-webpack-plugin');

var config = {
  //页面入口文件配置
  entry: {
    index:'./src/components/index/index.js'
  },
  //入口文件输出配置
  output: {
    // 配置静态资源引入路径
    //publicPath : 'http://localhost/techdoc/techdoc-ui/output',
    path:path.join(__dirname, 'output'),
    filename: 'js/[name].js',
  },
  // 插件项
  plugins: [
      new HtmlWebpackPlugin({
          filename: 'html/index.html',
          inject: 'body',
          chunks:['index'],
          template: './src/html/index.html',
          chunksSortMode:'dependency',
          hash:true,
      }),
      new ExtractTextPlugin("css/[name].css"),
  ],
  module: {
      //加载器配置
      loaders: [
          {
              test: /\.css$/,
              loader: ExtractTextPlugin.extract("style-loader", "css-loader")
          },
          {
              test: /\.js[x]?$/,
              loaders: ['jsx-loader','babel-loader?presets[]=react,presets[]=es2015'],
              exclude:/node_modules/
          },
          {
              test: /\.scss$/,
              loader: ExtractTextPlugin.extract("style-loader", "css-loader!sass-loader")
          },
          {
              test: /\.(jpe?g|png|gif|eot|ttf|woff|svg)/i,
              loader: 'url-loader?limit=5120&name=/static/[name].[ext]'
          },
      ]
  },

  //其它解决方案配置
  resolve: {
      extensions: ['', '.js', '.jsx', '.json', '.scss'],
      alias:{
          "zepto":(path.join(__dirname, "./src/libs/zepto/zepto.min.js"))
      }
  }
};
console.log(path.join(__dirname, 'output'))
module.exports = config;
