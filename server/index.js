// node modules
const express = require('express');
const nunjucks = require('nunjucks');
const path = require('path');
const webpack = require('webpack');

module.exports = config => {
    let webpackDevMiddleware;
    let webpackHotMiddleware;

    // Environments
    const nodeEnv = process.env.NODE_ENV;
    const portEnv = process.env.PORT;

    // config
    const assetsFile = require('./config/webpack-assets.json');
    const port = portEnv || config.port || 3000;

    let webpackConfig;
    switch(nodeEnv) {
        case 'DEVELOPMENT':
            webpackConfig = require('../build/webpack/development');
            webpackDevMiddleware = require('webpack-dev-middleware');
            webpackHotMiddleware = require('webpack-hot-middleware');
            break;
        default:
    }

    const globalVars = {
        title: config.get('project').title,
        assets: assetsFile[config.get('project').short_name]
    };

    // Instances
    const app = express();
    let compiler;
    if (webpackConfig) {
        compiler = webpack(webpackConfig);
    }

    nunjucks.configure(__dirname + '/views', {
        autoescape: true,
        express: app,
        noCache: true,
        watch: true,
    });

    app.use('/assets', express.static(path.join(config.get('paths').dist.root, 'assets')));

    if (webpackDevMiddleware) {
        app.use(webpackDevMiddleware(compiler, {
            publicPath: config.output.publicPath,
            stats: { colors: true }
        }));
    }

    if (webpackHotMiddleware) {
        app.use(webpackHotMiddleware(compiler, {
            log: console.log
        }));
    }

    app.listen(config.port || 3000, function () {
        const name = config.get('project').name;
        console.log(`${name} listening on port ${port}!`);
    });
};
