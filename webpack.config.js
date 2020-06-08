const path = require('path')
module.exports = {
    mode: process.env.NODE_ENV.trim(),
    entry:{
        app: './libs/wxAxios.js'
    },
    output:{
        filename: process.env.NODE_ENV === 'development' ? 'wxAxios.js': 'wxAxios.min.js',
        path: path.resolve(__dirname, 'dist'),
        library: 'wxAxios',
        libraryTarget: "umd"
    },
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                include: [path.resolve(__dirname, "./libs")],
            }
        ]
    }
}