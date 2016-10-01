
module.exports = config => {
    const webpackConfig = require('./base')(config);
    const sassConfig = require('../sass/development')(config); 

    webpackConfig.devtool = 'source-map';

    return sassConfig(webpackConfig);
};