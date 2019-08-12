const { resolve } = require("path");
const HtmlWP = require('html-webpack-plugin')
const MiniCssEP = require('mini-css-extract-plugin')
const isDev = process.env.NODE_ENV !== 'production'

module.exports = {
    entry: [
        resolve("src", "index.js")
    ],
    output: {
        path: resolve("dist"),
        filename: "main.js"
    },
    plugins: [
        new HtmlWP({
            filename: "index.html",
            template: resolve("public","index.html")
        }),
        new MiniCssEP({
            filename: "[name].css",
            chunkFilename: "[id].css"
        })
    ],
    module: {
        rules: [{
            test: /\.html$/,
            use: [{
                loader: "html-loader"
            }]
        },
        {
            test: /\.js$/,
            exclude: /node_modules/,
            use: [{
                loader: "babel-loader"
            }]
        },{
            test: /\.module\.s?css$/,
            use: [ isDev 
                ?   {loader:"style-loader"}
                :   {loader: MiniCssEP.loader}
                ,{
                loader: 'css-loader',
                options: {
                    modules: true,
                    localIdentName: '[local]__[hash:base64:5]'
                }
            },{
                loader: 'sass-loader'
            }]
        },{
            test: /\.s?css$/,
            exclude: /\.module.(s(a|c)ss)$/,
            use: [{
                loader: MiniCssEP.loader
            },{
                loader: 'css-loader'
            },{
                loader: 'sass-loader'
            }]
        },{
            test: /\.(jpg|png)/,
            use: [{
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]',
                    outputPath: 'imgs/',
                    publicPath: 'imgs/'
                }
            }]
        }]
    },
    devServer: {
        // no need to build first even though the folder
        // does not exists (on disk)
        contentBase: "./dist",
        open: true,
        hot: true,
        inline: true,
        publicPath: "/"
  }
}