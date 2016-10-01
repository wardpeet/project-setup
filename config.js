// node modules
const path = require('path');

// config
const packageInfo = require('./package.json');
const rootDir = path.resolve('./');

const project = {
    title: 'Project title',
    name: 'Project name',
    short_name: 'shrtnme',
    version: packageInfo.version,
};

const paths = {
    root: rootDir,
    src: {
        root: path.join(rootDir, 'src'),
    },
    dist: {
        root: path.join(rootDir, 'dist'),
    }
}

paths.src.js = '/assets/js'
paths.dist.js = '/assets/js'
paths.src.scss = '/assets/scss'
paths.dist.css = '/assets/css'

const globals = {
    
};

const config = (settings => ({
    get: name => settings[name]
}))({ project, paths, globals });

module.exports = config;