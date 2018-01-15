/**
 * Created by pusti on 29.07.2017.
 */
const CopyWebpackPlugin = require('copy-webpack-plugin');
module.exports = function(paths) {
    return {
        plugins: [
            new CopyWebpackPlugin(
                [{ from: `${paths.source.directory}/manifest.json`, to: `${paths.build.directory}/manifest.json` }]
            )
        ]
    };
};