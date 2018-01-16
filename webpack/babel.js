/**
 * Created by pusti on 30.07.2017.
 */
module.exports = function() {
    return {
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /(node_modules|bower_components)/,
                    use: {
                        loader: 'babel-loader'
                    }
                }
            ]
        },
    };
};