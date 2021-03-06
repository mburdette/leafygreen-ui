module.exports = ({ config, mode }) => {
  // Use web version of webpack config
  const webpackConfig = require('../webpack.config.js')[0](mode);
  config.module.rules = webpackConfig.module.rules;
  config.resolve.extensions = webpackConfig.resolve.extensions;

  return config;
};
