var path = require('path');

const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    entry: './src/start.js',
    mode: 'development',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'www/')
    },
    devServer: {
        static: 'www',
        port: 8080
    },
    devtool: 'source-map',
    resolve: {
        extensions: ['.js']
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use:
                {
                    loader: "babel-loader",
                    options:
                    {
                        presets: ["@babel/preset-env"] 
                    }
                }
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, 'assets'),
                    to: path.resolve(__dirname, 'www', 'assets')
                },
                {
                    from: path.resolve(__dirname, 'src', 'index.html'),
                    to: path.resolve(__dirname, 'www', 'index.html')
                }
            ]
        })
    ],
};