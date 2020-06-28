module.exports = {
  plugins: {
    'postcss-import': {},
    'postcss-preset-env': {
      browsers: 'last 2 versions, ie 11',
      features: {
        'custom-media-queries': true,
      },
    },
    cssnano: {},
  },
};
