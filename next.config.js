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
      'lib',
    ].forEach(
      (item) => (config.resolve.alias[`@${item}`] = path.resolve('src/', `${item}/`)),
    );

    ['public'].forEach((item) => {
      config.resolve.alias[`@${item}`] = path.resolve(`${item}/`);
    });
    config.module.rules.push({
      test: /\.svg$/,
      use: [
        'babel-loader',
        {
          loader: 'react-svg-loader',
          options: {
            svgo: {
              plugins: [
                { removeTitle: false },
              ],
              floatPrecision: 2,
            },
          },
        },
      ],

    });

    return config;
  },
};
