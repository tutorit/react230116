let path = require('path');
let webpack = require('webpack');
 
module.exports = {
  entry: './jsx/demo.app.jsx',
  mode: 'development',
  output: { path: __dirname+'/wwwroot/app', filename: 'demo.webpack.bundle.js' },
  module: {
    rules: [
      {
        test: /.jsx?$/,
		exclude: /node_modules/,
		use:{
			loader: 'babel-loader',
			options:{
				presets:["@babel/env","@babel/react"]
			}
		}
      }
    ]
  },
  resolve:{
    extensions: ['.js','.jsx']
  }
};