module.exports = {
    entry: "./src/js/entry.js",
    output: {
        path: __dirname + "/public/js",
        filename: "app.js"
    },
    module: {
        loaders: [
            { test: /\.css$/, loader: "style!css" }
        ]
    }
};