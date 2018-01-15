/**
 * Created by pusti on 29.07.2017.
 */
module.exports = function() {
    return {
        module: {
            rules: [
                {
                    test: /\.(jpg|png|svg)$/,
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]'
                    },
                },
            ],
        },
    };
};