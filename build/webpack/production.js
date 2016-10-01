// node modules
const webpack = require('webpack');
const path = require('path');

module.exports = config => {
    // internal packages
    const webpackConfig = require('./base')(config); 
    const sassConfig = require('../sass/production')(config);

    // config
    const paths = config.get('paths');

    webpackConfig.output.filename = path.join(paths.dist.js, '[name].[chunkhash].js');
    webpackConfig.output.chunkFilename = path.join(paths.dist.js, '[name].[chunkhash].js');

    webpackConfig.plugins.push(
        new webpack.optimize.UglifyJsPlugin({
            mangle: true,
            compress: {
                sequences   : true,
                dead_code   : true,
                conditionals: true,
                booleans    : true,
                unused      : true,
                if_return   : true,
                join_vars   : true,
                drop_console: true,
                warnings: false
            }
        })
    );

    return sassConfig(webpackConfig)
};
