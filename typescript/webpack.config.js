//webpack.config.js
const path = require('path');

module.exports = {
   mode: "development",
   devtool: "inline-source-map",
   entry: {
      main: "./src/index.ts",
   },
   output: {
      path: path.resolve(__dirname, './dist'),
      filename: "index.js", // <--- Will be compiled to this single file
      libraryTarget: 'umd',
      clean: true
   },
   resolve: {
      extensions: [".ts", ".tsx", ".js"],
   },
   module: {
      rules: [{
         test: /\.tsx?$/,
         use: [{
            loader: 'expose-loader',
            options: {
               exposes: [
                  {
                     globalName: "DOM",
                     override: true
                  },
               ],
            },
         }, {
            loader: 'ts-loader'
         }]
      }
      ]
   }
};