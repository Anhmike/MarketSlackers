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
    db: process.env.MONGOLAB_URI
  },

  test: {
    root: rootPath,
    app: {
      name: 'marketslackers'
    },
    port: process.env.PORT || 3000,
    db: process.env.MONGOLAB_URI
  },

  production: {
    root: rootPath,
    app: {
      name: 'marketslackers'
    },
    port: process.env.PORT || 3000,
    db: process.env.MONGOLAB_URI
  }
};

module.exports = config[env];
