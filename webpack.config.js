var HtmlWebpackPlugin = require('html-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
// var img = require('./src/assets/panda.jpg');

module.exports = {
    entry: './src/sketch.js',
    output: {
        path: './dist',
        filename: 'bundle.js'
    },
    devServer: {
        inline: true,
        port: 8123,
    },
    module: {
        loaders: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            query: {
                presets: ['es2015']
            }
        }, {
            test: /\.js$/, 
            loader: 'eslint-loader', 
            exclude: /node_modules/
        }]
    },
    resolve: {
        extensions: [ '', '.js', '.jpg', '.png', '.gif', '.ttf']
    },
    plugins: [
        new CopyWebpackPlugin([
            {from: './src/assets', to: './assets'},
            {from: './src/styles.css'}
        ]),
        new HtmlWebpackPlugin({
            title: 'puzzle-test',
            template: './src/index.html',
            inject: 'head'
        })
    ]
}