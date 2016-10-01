// node modules
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');
const path = require('path');

module.exports = config => {
    // internal packages
    const baseSassConfig = require('./base')(config); 

    // config
    const paths = config.get('paths');

    return webpack => {
        webpack = baseSassConfig(webpack);

        webpack.module.loaders.push(
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract('style-loader', 'css-loader!postcss-loader!sass-loader')
            }
        );

        webpack.postcss = function() {
            return [autoprefixer];
        };

        webpack.plugins.push(
            new ExtractTextPlugin(
                path.join(paths.dist.css, '[name].[chunkhash].css'),
                {
                    disable: false,
                    allChunks: true
                }
            )
        );

        return webpack;
    };
};
