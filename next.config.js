const path = require("path");
const withSass = require("@zeit/next-sass");

module.exports = withSass({
  webpack(config) {
    [
      "component",
      "constants",
      "context",
      "facade",
      "services",
      "graphql",
      "pages",
      "utils",
      "lib",
      "helpers",
      "HOC",
      "hooks,",
    ].forEach(
      (item) =>
        (config.resolve.alias[`@${item}`] = path.resolve("src/", `${item}/`))
    );

    ["public"].forEach((item) => {
      config.resolve.alias[`@${item}`] = path.resolve(`${item}/`);
    });
    config.module.rules.push({
      test: /\.svg$/,
      use: [
        "babel-loader",
        {
          loader: "react-svg-loader",
          options: {
            svgo: {
              plugins: [{ removeTitle: false }],
              floatPrecision: 2,
            },
          },
        },
      ],
    });

    return config;
  },
});
