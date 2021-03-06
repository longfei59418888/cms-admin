var config = require('./config')
var path = require('path')
var port = config.DEV_PORT,
    localIp = config.DEV_IP,
    HtmlWebpackPlugin = require("html-webpack-plugin"),
    merge = require('webpack-merge'),
    webpackConfigBase = require('./webpack.config.base.js'),
    webpack = require("webpack");
var devConfig = {
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    {
                        loader: 'style-loader'
                    }, {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1
                        }
                    }
                ]
            }, {
                test: /^.((?!module).)*\.scss$/,
                use: [
                    {
                        loader: 'style-loader',
                        options: {
                            importLoaders: 1
                        }
                    }, {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1,

                        }
                    }, {
                        loader: "sass-loader"
                    }
                ]
            }, {
                test: /\.module\.scss$/,
                use: [
                    {
                        loader: 'style-loader',
                        options: {
                            importLoaders: 1
                        }
                    }, {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                            importLoaders: 1,
                            localIdentName: '[name]-[local]-[hash:base64:5]'
                        }
                    }, {
                        loader: "sass-loader"
                    }
                ]
            }
        ]
    },
    devServer: {
        port: port,
        host: localIp,
        hot: true,
        quiet: false,
        contentBase:path.join(__dirname, "../"),  // 静态资源目录
        historyApiFallback: {
            index: '/index.html'
        },
        stats: {
            assets: false,
            colors: true,
            version: false,
            hash: false,
            timings: false,
            chunks: false,
            chunkModules: false
        },
        proxy: {}
    },
    plugins: [

        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('dev'),
            'DEVELOPMETN_URL': JSON.stringify('https://api.gilea.cn/')
        }),
        new webpack
            .optimize
            .CommonsChunkPlugin({
                name: 'vendor', // 入口文件名
                filename: 'vendor.bundle.js', // 打包后的文件名
            })
    ]
};
module.exports = merge(webpackConfigBase, devConfig);