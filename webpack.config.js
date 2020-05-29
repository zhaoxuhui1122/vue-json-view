var path = require('path')
var webpack = require('webpack')
const NODE_ENV = process.env.NODE_ENV;
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    entry: NODE_ENV === 'npm' ? './src/index.js' : './src/main.js',
    output: {
        path: path.resolve(__dirname, NODE_ENV === 'npm' ? './build' : './dist'),
        publicPath: NODE_ENV === 'npm' ? '/build/' : '/dist/',
        filename: NODE_ENV === 'npm' ? 'index.js' : 'build.js',
        libraryTarget: 'umd',
        library: 'vue-json-view',
        umdNamedDefine: true
    },
    devtool: NODE_ENV==='develop'?'cheap-module-eval-source-map':'#source-map',
    module: {
        rules: [{
                test: /\.css$/,
                use: [
                    'vue-style-loader',
                    'css-loader',
                    'less-loader'
                ],
            }, {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    loaders: {}
                    // other vue-loader options go here
                }
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]?[hash]'
                }
            }
        ]
    },
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.esm.js'
        },
        extensions: ['*', '.js', '.vue', '.json']
    },
    devServer: {
        historyApiFallback: true,
        noInfo: true,
        overlay: {
            warnings: false,
            errors: true
        },
    },
    performance: {
        hints: false
    },
    plugins:[
        new CleanWebpackPlugin()
    ]
}

if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'npm') {
    module.exports.plugins = (module.exports.plugins || []).concat([
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: true,
            compress: {
                warnings: false
            }
        }),
        new webpack.LoaderOptionsPlugin({
            minimize: true
        }),
    ])
}
