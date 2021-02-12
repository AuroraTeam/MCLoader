const path = require("path")

module.exports = {
    entry: "./src/MCLoader.ts",
    node: {
        global: true,
        __filename: true,
        __dirname: false,
    },
    target: "node",
    mode: "production",
    devtool: "inline-source-map",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "MCLoader.js",
    },
    resolve: {
        extensions: [".ts", ".js", ".json"], //resolve all the modules other than index.ts
    },
    module: {
        rules: [
            {
                use: "ts-loader",
                test: /\.ts?$/,
            },
        ],
    },
}