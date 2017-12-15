const path = require( "path" );
const UglifyJSPlugin = require( "uglifyjs-webpack-plugin" );

const isProduction = false;

const common = {
    output: {
        path: path.join( __dirname, "public/js" ),
        filename: "[name].js",
        chunkFilename: "[name].chunk.js"
    },
    plugins: [
        new UglifyJSPlugin( { sourceMap: true, uglifyOptions: { mangle: isProduction } } )
    ],
    devtool: "source-map",
    module: {
        rules: [
            { test: /\.jsx?$/, loader: "babel-loader" },
        ],
    },
    resolve: {
        extensions: [ ".js", ".jsx" ],
        alias: {
            "react": path.resolve( __dirname, "src/js/ui/react-proxy" ), // eslint-disable-line quote-props
            "react-dom": path.resolve( __dirname, "src/js/ui/react-dom-proxy" )
        }
    }
};
module.exports = [
    { lib: [ "./src/js/lib.js", "./src/js/polly.js" ] },
    { ui: "./src/js/ui/index.js" },
    { main: "./src/js/console/main.js" }
].map( entry => Object.assign( { entry }, common ) );
