module.exports = {
    mode: 'development',
    entry: './#src/js/script.js',
    output: {
      filename: 'bundle.js',
    },
    optimization: {
      minimize: true,
    },
    watch: true,
    devtool: 'source-map',

    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /(node_modules)/,
          loader: 'babel-loader',
          query: {
            presets: [
              '@babel/preset-env'
            ]
          },
        },
      ],
    },
  };