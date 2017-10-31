module.exports = [ {
    entry: "./src/js/entry.js",
    output: {
        path: __dirname + "/public/js",
        filename: "app.js"
    },
    module: {
        rules: [
            { test: /\.js$/, loader: 'babel-loader' }
        ]
    }
}, {
    entry: "./src/js/polly.js",
    output: {
        path: __dirname + "/public/js",
        filename: "polly.js"
    }
} ];