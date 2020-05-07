const webpack = require('webpack');

const path = require('path');
const {
    SRC_APPS_PATH,
    SRC_COMPONENT_PATH,
    SRC_CONFIG_PATH,
    SRC_CSS_PATH,
    SRC_HOOKS_PATH,
    SRC_JS_PATH,
    SRC_PROP_TYPES_PATH,
    SRC_UTIL_PATH,
} = require('./path');

const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ManifestWebpackPlugin = require('webpack-manifest-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');


const makeNamePreserveRelativeAssetDirectory = (file) => {
    const srcDirName = path.relative(
        path.join(__dirname, '..', 'src'),
        path.dirname(file)
    );

    return `${srcDirName}/[name].[ext]`;
};


module.exports = {
    plugins: [
        new CleanWebpackPlugin(),
        new ManifestWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: 'css/[name].css',
            chunkFilename: 'css/[id].css',
        }),
        new webpack.DefinePlugin({}),
    ],
    resolve: {
        alias: {
            apps: SRC_APPS_PATH,
            components: SRC_COMPONENT_PATH,
            config: SRC_CONFIG_PATH,
            css: SRC_CSS_PATH,
            hooks: SRC_HOOKS_PATH,
            js: SRC_JS_PATH,
            propTypes: SRC_PROP_TYPES_PATH,
            util: SRC_UTIL_PATH,
        },
        extensions: ['.js', '.jsx', '.json',],
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                enforce: 'pre',
                loader: 'eslint-loader',
                options: {
                    eslintPath: 'eslint-config-airbnb-standard/node_modules/eslint',
                    // fix: true,
                    failOnError: true,
                    failOnWarning: true,
                },
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                },
            },
            {
                // TODO: media-query-splitting-plugin
                test: /\.(sa|sc|c)ss$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            // hmr: process.env.NODE_ENV === 'development',
                        },
                    },
                    'css-loader',
                    // 'postcss-loader',
                    'sass-loader',
                ],
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: makeNamePreserveRelativeAssetDirectory,
                    },
                },
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: makeNamePreserveRelativeAssetDirectory,
                    },
                },
            },
        ],
    },
}