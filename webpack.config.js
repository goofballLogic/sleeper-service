const path = require( "path" );
const UglifyJSPlugin = require( "uglifyjs-webpack-plugin" );

module.exports = [ {
    entry: "./src/js/entry.js",
    output: {
        path: path.join( __dirname, "public/js" ),
        filename: "app.js",
    },
    devtool: "inline-source-map",
    module: {
        rules: [
            { test: /\.js$/, loader: "babel-loader" },
        ],
    },
}, {
    entry: [ "babel-polyfill", "./src/js/polly.js" ],
    output: {
        path: path.join( __dirname, "public/js" ),
        filename: "polly.js",
    },
    plugins: [
        new UglifyJSPlugin()
    ]
} ];