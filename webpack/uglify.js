/**
 * Created by pusti on 29.07.2017.
 */
const webpack = require('webpack');
module.exports = function() {
    return {
        plugins: [
            new webpack.optimize.UglifyJsPlugin({
                sourceMap: true,
                compress: {
                    warnings: false,
                }
            })
        ]
    };
};
