const webpack = require('webpack')

const isUmdBuild = require('../util/isUmdBuild')
const BuildTarget = require('../enum/BuildTarget')
const WebpackMode = require('../enum/WebpackMode')

const config = {
    devtool: require('./webpack.config.devtool'),
    entry: require('./webpack.config.entry'),
    experiments: require('./webpack.config.experiments'),
    externals: require('./webpack.config.externals'),
    optimization: require('./webpack.config.optimization'),
    output: require('./webpack.config.output'),
    performance: require('./webpack.config.performance'),
    recordsPath: require('./webpack.config.records-path'),
    resolve: require('./webpack.config.resolve'),
    target: require('./webpack.config.target')
}

module.exports = {
    ...config,
    baseConfig: ({
        buildTarget = BuildTarget.STABLE,
        context,
        entries = [],
        externals = [],
        externalsWhitelist = [],
        isLibrary,
        mode = WebpackMode.PRODUCTION,
        nodeExternalsEnabled = false,
        pkgInfo,
        publicPath,
        treatPeerDepsAsExternals = true
    }) => ({
        name: pkgInfo.scopedName,
        devtool: config.devtool(mode),
        entry: config.entry({
            context,
            entries,
            pkgInfo
        }),
        experiments: config.experiments(),
        externals: config.externals({
            externals,
            externalsWhitelist,
            nodeExternalsEnabled,
            pkgInfo,
            treatPeerDepsAsExternals
        }),
        optimization: config.optimization({
            buildTarget,
            isLibrary,
            mode
        }),
        output: config.output({
            buildTarget,
            context,
            isLibrary,
            mode,
            pkgInfo,
            publicPath
        }),
        performance: config.performance(mode),
        recordsPath: config.recordsPath({
            buildTarget,
            context,
            mode
        }),
        resolve: config.resolve(),
        target: config.target(buildTarget),
        plugins: isUmdBuild(buildTarget)
            ? [new webpack.optimize.LimitChunkCountPlugin({ maxChunks: 1 })]
            : []
    })
}