const path = require('path');

module.exports = {
  webpack: (config) => {
    // config.resolve.alias['@react-pdf/renderer'] = path.resolve(
    //   './node_modules/@react-pdf/renderer'
    // );
    return config;
  },
};