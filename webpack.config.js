const path = require( "path" );

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
    entry: "./src/js/polly.js",
    output: {
        path: path.join( __dirname, "public/js" ),
        filename: "polly.js",
    },
} ];