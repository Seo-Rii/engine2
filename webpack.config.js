const path = require('path')

exports.default = (env, argv) => {
    return [
        {
            entry: './index.ts',
            devtool: 'source-map',
            target: 'es6',
            output: {
                path: path.resolve(__dirname, 'build'),
                filename: 'index.js',
            },
            resolve: {
                extensions: ['.ts'],
            },
            module: {
                rules: [
                    {
                        test: /\.ts?$/,
                        loader: 'babel-loader',
                    },
                ],
            },
        },
    ]
}
