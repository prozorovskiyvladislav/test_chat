const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: path.resolve(__dirname, 'src/index.js'),
    output: {
        filename: 'index.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    "style-loader",
                    "css-loader",
                    "sass-loader",
                ],
            },
            {
                test: /\.html$/,
                use: [
                    {
                        loader: 'html-loader',
                    },
                ],
            },
        ]
    },
    devServer: {
        static: {
            directory: path.resolve(__dirname, 'dist'),
        },
        port: 3000,
        open: true,
        hot: true,
        compress: true,
        historyApiFallback: true
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'public', 'index.html')
        }),
    ],
    resolve: {
        extensions: ['.js', '.jsx', '.md'],
        modules: [path.resolve(__dirname, 'src'), 'node_modules'],
    },
};