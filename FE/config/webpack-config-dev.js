//webpack配置
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
    mode: 'development',

    entry: "./src/app.js",

    output:{
        path:path.resolve(__dirname ,"../dev"),
        filename : "app.js"
    },
    devServer:{
        contentBase : path.resolve(__dirname ,"../dev"),
        port : 8000,
        proxy :{
            '/api':{
                target : 'http://localhost:3000',
                changeOrigin:true
            }
        }
    },
    module:{
        rules:[
            {
                test: /\.art/,
                loader:'art-template-loader'
            },
            {
                test:/\.(scss|css)/,
                loaders:['style-loader','css-loader','sass-loader']
            }
        ]
    }
    ,
    //webpack插件 增强功能
    plugins:[
        //当前路径应该是dev
        new HtmlWebpackPlugin({
            //引入的模板路径
            template: './src/index.html',
            //出去的路径
            filename: 'index.html'
        }),
        //值得注意的是webpack-dev-server会将文件存储在内存里
        new CopyWebpackPlugin([{
            from : './public',
            to   : './public'
        }])
    ]
}