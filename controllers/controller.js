const users = require('./users');

const routes = {
  ping(data, callback) {
    callback(200, { data: 'pong' });
  },

  notFound(data, callback) {
    callback(404, { error: 'Not found' });
  },

  users,
};

module.exports = routes;
