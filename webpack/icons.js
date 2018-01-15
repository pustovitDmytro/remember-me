/**
 * Created by pusti on 01.08.2017.
 */
const CopyWebpackPlugin = require('copy-webpack-plugin');
module.exports = function(paths) {
    return {
        plugins: [
            new CopyWebpackPlugin(
                [{ from: paths.source.icons, to: paths.build.icons }]
            )
        ]
    };
};