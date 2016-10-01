// node modules
const webpack = require('webpack');
const path = require('path');
const AssetsPlugin = require('assets-webpack-plugin');

module.exports = config => {
    // config
    const paths = config.get('paths');

    const webpackConfig = {
        name: 'app',
        target: 'web',
        output: {
            filename: path.join(paths.dist.js, '[name].js'),
            chunkFilename: path.join(paths.dist.js, '[name].js'),
            path: paths.dist.root,
            public: '/'
        },
        plugins: [
            new webpack.optimize.CommonsChunkPlugin({
                names: [config.short_name],
                minChunks: Infinity
            }),
            new webpack.DefinePlugin({}),
            new webpack.optimize.OccurrenceOrderPlugin(),
            new AssetsPlugin({
                path: path.join(paths.root, 'server', 'config')
            }),
        ],
        module : {
            loaders: [
                {
                    test: /\.(js)$/,
                    exclude: /node_modules/,
                    loader: 'babel',
                    query: {
                        cacheDirectory: true,
                        presets: ['es2015'],
                    },
                },
            ],
        },
    };

    webpackConfig.entry = {};
    webpackConfig.entry[config.get('project').short_name] = [
        'webpack/hot/dev-server',
        'webpack-hot-middleware/client',
        path.join(paths.src.root, paths.src.js, 'app.js'),
    ];

    return webpackConfig;
};