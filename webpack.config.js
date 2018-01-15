const CleanWebpackPlugin = require('clean-webpack-plugin');
const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const styles = require('./webpack/styles');
const uglify = require('./webpack/uglify');
const images = require('./webpack/images');
const html = require('./webpack/html');
const json = require('./webpack/json');
const icons = require('./webpack/icons');
const babel = require('./webpack/babel');

const DIRS = option => ({
    source: path.join(__dirname, 'src'),
    build: path.join(__dirname, `build/${option}`)
});
const common = (PATHS, browser, isDebug) => merge([
    {
        entry: {
            background: `${PATHS.source.background}/index.js`,
            popup: `${PATHS.source.popup}/index.js`,
            content: `${PATHS.source.content}/index.js`
        },
        output: {
            path: PATHS.build.directory,
            filename: "[name]/index.js"
        },
        plugins: [
            new CleanWebpackPlugin(
                [PATHS.build.directory],
                { verbose: true }
            ),
            new webpack.DefinePlugin({
                BROWSER: JSON.stringify(browser),
                DEBUG: isDebug
            })
        ]
    },
    html(PATHS),
    images(),
    json(PATHS),
    babel(),
    icons(PATHS)
]);

module.exports = (env = {}) => {
    const isDebug = !env.release;
    const { browser } = env;
    const DIR=DIRS(browser);
    const PATHS = {
        source: {
            directory: DIR.source,
            background: path.join(DIR.source, 'background'),
            popup: path.join(DIR.source, 'popup'),
            content: path.join(DIR.source, 'content'),
            icons: path.join(DIR.source, 'icons'),
        },
        build: {
            directory: DIR.build,
            background: path.join(DIR.build, 'background'),
            popup: path.join(DIR.build, 'popup'),
            content: path.join(DIR.build, 'content'),
            icons: path.join(DIR.build, 'icons'),
        }
    };

    if (isDebug){
        return merge([
            common(PATHS, browser, true),
            styles(PATHS, true)
        ]);
    } else{
        return merge([
            common(PATHS, browser, false),
            uglify(),
            styles(PATHS, false)
        ]);
    }
};