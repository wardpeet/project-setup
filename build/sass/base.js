// node modules
const path = require('path');

module.exports = config => {
    // config
    const paths = config.get('paths');

    return webpack => {
        webpack.sassLoader = {
            includePaths: path.join(paths.src.root, paths.src.scss)
        };

        return webpack;
    };
};