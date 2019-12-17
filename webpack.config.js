const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const webpack = require('webpack');

module.exports = {
    entry: {
        Validate: './src/index.js',
        dev: './src/dev.js'
    },
    output: {
        filename: '[name].js',
        path: path.resolve(process.cwd(), './lib'),
        library: 'Validate',
        libraryTarget: 'umd',
        umdNamedDefine:true,
    },
    module: {
        //js处理
        rules: [
            {
                test: /\.(jsx?|babel|es6)$/,
                loader: 'babel-loader',
                exclude: /(node_modules|bower_components)/,
            }
        ]
    },
    //开发服务
    devServer: {
        contentBase: path.resolve(process.cwd(), './public'),
    },
    plugins: [

        //清理dist
        new CleanWebpackPlugin(),

        //打包form
        new HtmlWebpackPlugin({
            template: path.resolve(process.cwd(), './public/index.html'),
            filename: 'index.html',
            title: 'Zoo Coffee common',
            chunks: [
                'dev'
            ],
        }),

    ],
};