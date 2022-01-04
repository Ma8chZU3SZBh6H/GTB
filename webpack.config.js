const path = require("path");
module.exports = {
    mode: 'development',
    target: 'node',
    entry: './src/index.ts',
    resolve: {
        extensions: ['.ts']
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
}