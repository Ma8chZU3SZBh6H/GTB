const path = require("path");
const nodeExternals = require('webpack-node-externals');

module.exports = {
    mode: 'development',
    target: 'node',
    entry: './src/index.ts',
    resolve: {
        extensions: [".ts", ".tsx", ".js", "jsx"],
    },
    module: {
        rules: [
            {
                test: /\.(ts|js)$/,
                exclude: /node_modules/,
                include: [path.join(__dirname, '/src/')],
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-typescript'],
                        },
                    },
                ],
            },
        ],
    },
    externals: [nodeExternals()]
}