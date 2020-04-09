const path = require('path');

module.exports = {
  webpack(config) {
    [
      'graphql',
      'components',
      'pages',
    ].forEach((item) => {
      config.resolve.alias[`@${item}`] = path.join(__dirname, `src/${item}`);
    });
    config.resolve.extensions = ['.js', '.jsx', '.ts', '.tsx'];
    return config;
  },
};
