/**
 * Created by pusti on 29.07.2017.
 */

const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = function(PATHS) {
    return {
        plugins: [
            new HtmlWebpackPlugin({
                filename: `${PATHS.build.popup}/index.html`,
                template: `${PATHS.source.popup}/index.html`,
                chunks: ["popup"]
            })
        ]
    };
};