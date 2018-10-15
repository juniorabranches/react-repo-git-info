module.exports = {
  devtool: 'cheap-module-source-map',  
  entry: "./app/App.js",
  mode: 'production',
  output: {
    filename: "public/bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        query: {
          presets: ['env', 'react']
        }
      }
    ]
  }
}
