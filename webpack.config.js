module.exports = {
    entry: "./src/index.ts",
    output: {
        filename: "index.js",
        path: __dirname + "/lib"
    },
    // Enable sourcemaps for debugging webpack's output.
    devtool: "source-map",

    resolve: {
        // Add '.ts' as resolvable extension.
        extensions: ["*", ".webpack.js", ".web.js", ".ts", ".js"]
    },
    module: {
        rules: [{
            test: /\.tsx?$/,
            loaders: ['awesome-typescript-loader?configFileName=./tsconfig.json'],
            exclude: /(node_modules)/
        }, {
            enforce: 'pre',
            test: /\.js$/,
            loader: "source-map-loader",
            exclude: /(node_modules)/
        }]
    },

    // When importing a module whose path matches one of the following, just
    // assume a corresponding global variable exists and use that instead.
    // This is important because it allows us to avoid bundling all of our
    // dependencies, which allows browsers to cache those libraries between builds.

    externals: {
        "pixi.js": "pixi.js",
    },
    node: {
        fs: "empty"
    }
};
