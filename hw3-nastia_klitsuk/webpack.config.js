var path = require('path');
var webpack = require('webpack');

module.exports = {
    entry: {
        cell: './scripts/cell.js',
        board: './scripts/game.js',
        main: './scripts/main.js'
    },
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: '[name].js'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015']
                }
            }
        ]
    },
    stats: {
        colors: true
    },
    devtool: 'source-map'
};