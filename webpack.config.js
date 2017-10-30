var path = require('path');
var webpack = require('webpack');

module.exports = {
    entry: './app.js',
    output: {
        path: __dirname,
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            {
                test: /.jsx?$/,
                loader: 'babel-loader',
                exclude: __dirname + '/node_modules',
                query: {
                    presets: ['env', 'react']
                }
            },
            {
                test: /\.scss/,
                include: __dirname + '/sass/*',
                exclude: __dirname + '/node_modules',
                loaders: ['sass-loader', 'css-loader', 'style-loader']
            }
        ]
    }
}
