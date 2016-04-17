var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var StringReplacePlugin = require('string-replace-webpack-plugin');

function getEntry(env) {
    if (env === 'test') {
        return undefined;
    }
    return {
        vendor: './src/vendor.ts',
        index: './src/index.ts'
    };
}

function getOutput(env) {
    return {
        path: env === 'prod' ? path.join(__dirname) : path.join(__dirname, 'dist'),
        filename: 'js/[name].js',
        sourceMapFilename: '[file].map'
    };
}

function getPlugins(env) {
    var plugins = [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            inject: 'body'
        }),
        new StringReplacePlugin()
    ];
    
    if (env === 'prod') {
        plugins.push(new webpack.optimize.DedupePlugin());
        plugins.push(new webpack.optimize.UglifyJsPlugin());
        plugins.push(new webpack.optimize.OccurenceOrderPlugin());
    }
    
    return plugins;
}

module.exports = function (env) {
    return {
        devtool: 'sourcemap',
        entry: getEntry(env),
        output: getOutput(env),
        resolve: {
            extensions: ['', '.ts', '.js', '.scss', '.css', '.html']
        },
        module: {
            loaders: [
                {
                    test: /\.ts$/,
                    loader: 'ts'
                },
                {
                    test: /\.(scss|css)$/,
                    loader: 'style-loader!css-loader!sass-loader'
                },
                {
                    test: /\.html$/,
                    loader: 'html'
                },
                {
                    test: /ConfigService\.ts$/,
                    loader: StringReplacePlugin.replace({
                        replacements: [
                            {
                                pattern: /\$apiUrl\$/,
                                replacement: function (match, p1, offset, string) {
                                    return process.env['Topics:ApiUrl'];
                                }
                            }
                        ]
                    })
                }
            ]
        },
        plugins: getPlugins(env),
        devServer: {
            port: 8082
        }
    }
}