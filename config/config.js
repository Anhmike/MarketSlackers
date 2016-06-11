var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'development';

var config = {
  development: {
    root: rootPath,
    app: {
      name: 'marketslackers'
    },
    port: process.env.PORT || 3000,
    db: 'mongodb://localhost/marketslackers-development'
  },

  test: {
    root: rootPath,
    app: {
      name: 'marketslackers'
    },
    port: process.env.PORT || 3000,
    db: 'mongodb://localhost/marketslackers-test'
  },

  production: {
    root: rootPath,
    app: {
      name: 'marketslackers'
    },
    port: process.env.PORT || 3000,
    db: 'mongodb://localhost/marketslackers-production'
  }
};

module.exports = config[env];
