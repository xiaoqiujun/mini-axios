const path = require('path')
module.exports = {
    mode: process.env.NODE_ENV.trim(),
    entry:{
        app: './index.js'
    },
    output:{
        filename: process.env.NODE_ENV === 'development' ? 'mini-axios.js': 'mini-axios.min.js',
        path: path.resolve(__dirname, 'dist'),
        library: 'MiniAxios',
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