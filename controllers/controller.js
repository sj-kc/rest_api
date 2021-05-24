const routes = {
  ping(data, callback) {
    callback(200, { data: 'pong' });
  },

  users(data, callback) {
    callback();
  },

  notFound(data, callback) {
    callback(404, { error: 'Not found' });
  },
};

module.exports = routes;
