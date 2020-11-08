const WebpackMode = require('../enum/WebpackMode')

const plugin = {
    bundleAnalyzer: require('./webpack.plugin.bundle-analyzer'),
    bundleStats: require('./webpack.plugin.bundle-stats'),
    clean: require('./webpack.plugin.clean'),
    copy: require('./webpack.plugin.copy'),
    define: require('./webpack.plugin.define'),
    html: require('./webpack.plugin.html'),
    manifest: require('./webpack.plugin.manifest'),
    progress: require('./webpack.plugin.progress'),
    stats: require('./webpack.plugin.stats')
}

const initStatsPlugins = ({
    mode = WebpackMode.PRODUCTION,
    pluginOptions = {}
}) => ([
    plugin.stats({
        mode,
        options: pluginOptions.stats || {}
    }),
    plugin.bundleAnalyzer({
        mode: mode,
        options: pluginOptions.bundleAnalyzer || {}
    }),
    // plugin.bundleStats({
    //     mode: mode,
    //     options: pluginOptions.bundleStats || {}
    // })
])

const initPlugins = ({
    mode = WebpackMode.PRODUCTION,
    nodeExternals = false,
    pluginOptions = {},
    statsEnabled = true,
    userPlugins = []
}) => ({
    plugins: [
        plugin.progress(),
        plugin.clean(),
        plugin.define(pluginOptions.define || {}),
        ...userPlugins,
        ...(statsEnabled
            ? initStatsPlugins({
                mode,
                pluginOptions
            })
            : []),
        plugin.manifest()
    ]
})

module.exports = ({
    ...plugin,
    initPlugins,
    initStatsPlugins
})