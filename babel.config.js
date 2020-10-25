module.exports = (api) => {
  const isDev = api.env('development');
  const isProd = api.env('production');

  const plugins = [
    ['@babel/plugin-proposal-decorators', { legacy: true }],
    ['@babel/proposal-class-properties', { loose: true }],
    '@babel/proposal-object-rest-spread',
  ];

  if (isProd) {
    plugins.push('@babel/plugin-transform-runtime');
    plugins.push(['babel-plugin-transform-react-remove-prop-types', { removeImport: true }]);
  }

  return {
    presets: [
      '@babel/preset-react',
      ['@babel/preset-env', {
        useBuiltIns: 'usage',
        corejs: '3.6',
        targets: isDev ? {
          node: 'current',
        } : {
          browsers: ['last 2 versions', 'ie >= 11'],
        },
      }],
    ],
    plugins,
  };
};
