/**
 * Created by pusti on 29.07.2017.
 */
const ExtractTextPlugin = require('extract-text-webpack-plugin');
module.exports = function(paths, isDebug) {
    return {
        module: {
            rules: [
                {
                    test: /\.scss$/,
                    include: paths.source.directory,
                    use: ExtractTextPlugin.extract({
                        publicPath: '../',
                        fallback: 'style-loader',
                        use: [{
                            loader: 'css-loader',
                            options: {
                                sourceMap: isDebug,
                                modules: true,
                                localIdentName: isDebug ? '[name]-[local]-[hash:base64:5]' : '[hash:base64:5]',
                                minimize: !isDebug,
                                discardComments: { removeAll: true },
                            } }, 'sass-loader'],
                    }),
                },
                {
                    test: /\.css$/,
                    include: paths.source.directory,
                    use: ExtractTextPlugin.extract({
                        fallback: 'style-loader',
                        use: 'css-loader',
                    }),
                },
            ],
        },
        plugins: [
            new ExtractTextPlugin('./[name]/styles.css'),
        ],
    };
};