/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-param-reassign */
/* eslint-disable no-return-assign */
const path = require('path');

module.exports = {
  webpack(config) {
    [
      'component',
      'constants',
      'context',
      'facade',
      'services',
      'graphql',
      'pages',
      'utils',
    ].forEach(
      (item) => (config.resolve.alias[`@${item}`] = path.resolve('src/', `${item}/`)),
    );

    ['config'].forEach(
      (item) => (config.resolve.alias[`@${item}`] = path.resolve(`${item}/`)),
    );
    return config;
  },
};
