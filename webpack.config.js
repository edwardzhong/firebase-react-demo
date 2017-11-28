const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    context: path.resolve(__dirname, 'src'),
    // devtool: 'source-map',
    devtool: 'cheap-module-eval-source-map',
    entry:{
        app:'./index',
        vendor: ['react', 'react-dom','jquery','firebase','./firebaseConfig']
    },
    output:{
        path: path.join(__dirname, "build"),
        filename: "js/[name].bundle.[hash].js",
        // publicPath: '/'
    },
    devServer: {
        port:3004,
        compress:true,
        contentBase: "./build",//本地服务器所加载的页面所在的目录
        historyApiFallback: true,//不跳转
        inline: true//实时刷新
    },
    module: {//在配置文件里添加 loader
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel-loader?cacheDirectory=true',
                query: {
                    presets: ['es2015','react','stage-0']
                }
            },
            {
                test: /\.less$/,
                use: ExtractTextPlugin.extract({
                  fallback: 'style-loader',
                  use:[{
                    loader: 'css-loader',
                      options: {
                        minimize: true
                      }
                    },
                    'postcss-loader',
                    'less-loader'
                  ]
                })
            },
            {
                test: /\.(png|jpg|jpeg|gif|svg|eot|ttf|woff|woff2)$/,
                loader: 'url-loader?limit=20000'
            }
        ],
    },
    plugins: [
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(), //热加载插件
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.DefinePlugin({//设置环境变量
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
        }),
        new CleanWebpackPlugin(
            ['build/*.js','build/.*.js.map',],　 //匹配删除的文件
            {
                root: __dirname,       　　　　　　　　　　//根目录
                verbose:  true,        　　　　　　　　　　//开启在控制台输出信息
                dry:      false        　　　　　　　　　　//启用删除文件
            }
        ),
        new webpack.ProvidePlugin({//把firebase作为全局变量插入到所有的代码中，不再需要import;
            firebase: "firebase",
            "window.firebase": "firebase",
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery"

        }),
        new webpack.optimize.CommonsChunkPlugin({name: 'vendor'}),//提取合并库文件
        new webpack.LoaderOptionsPlugin({//css兼容插件
            options: {
                postcss: function() {
                    return [require('autoprefixer')];
                }
            }
        }),
        new CopyWebpackPlugin([
            { 
                from: './css/*',
                to:'./'
            }
        ]),
        new ExtractTextPlugin({ 
            filename: 'css/main.css'
        }),
        new HtmlWebpackPlugin({
            filename:'index.html',
            // inject: false,
            template: __dirname + "/src/index.html"//new 一个这个插件的实例，并传入相关的参数
        }),
        new webpack.optimize.UglifyJsPlugin({sourceMap: true })
    ]
}