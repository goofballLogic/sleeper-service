const path = require( "path" );
const UglifyJSPlugin = require( "uglifyjs-webpack-plugin" );

const common = {
    output: {
        path: path.join( __dirname, "public/js" ),
        filename: "[name].js",
    },
    plugins: [
        new UglifyJSPlugin( { sourceMap: true } )
    ],
    devtool: "inline-source-map",
    module: {
        rules: [
            { test: /\.js$/, loader: "babel-loader" },
        ],
    },
};
module.exports = [
    { lib: [ "./src/js/lib.js", "./src/js/polly.js" ] },
    { main: "./src/js/console/main.js" }
].map( entry => Object.assign( { entry }, common ) );
