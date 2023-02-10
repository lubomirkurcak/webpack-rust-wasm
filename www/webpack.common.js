const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WasmPackPlugin = require('@wasm-tool/wasm-pack-plugin');

module.exports = {
    entry: {
        index: './src/index.ts',
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Cringe Management',

        }),
        new WasmPackPlugin({
            crateDirectory: path.resolve(__dirname, '../src'),
            outDir: path.resolve(__dirname, '../pkg'),
        })
    ],
    resolve: {
        extensions: ['.ts', '.js'],
    },
    output: {
        filename: '[name].[contenthash].js',
        path: path.resolve(__dirname, 'dist'),
        clean: true,
    },
    experiments: {
        syncWebAssembly: true,
    },
    module: {
        rules: [
            {
                test: /\.ts$/i,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif|ico)$/i,
                type: 'asset/resource',
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: 'asset/resource',
            },
        ],
    },
};