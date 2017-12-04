var path = require('path');
var webpack = require('webpack');

module.exports = {
    entry: './src/main.ts',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'main.bundle.js'
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js'] 
    },
    module: {
        loaders: [
            {
                test: /\.ts$/,
                loader: 'ts-loader'
            }
        ]
    },
    stats: {
        colors: true
    },
    devtool: 'source-map'
 };
