module.exports = {
  module: {
    rules: [
      {
        test: /\.(frag|vert|glsl)$/,
        exclude: /node_modules/,
        use: ['raw-loader', 'glslify-loader'],
      },
    ],
  },
}
