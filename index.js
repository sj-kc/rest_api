const http = require('http');
const url = require('url');
const { StringDecoder } = require('string_decoder');

const _helper = require('./helpers/data');

_helper.read({
  folder: 'users',
  file: 'users',
  getData(err = false, data = {}) {
    console.log(err, data);
  },
});

const server = http.createServer((req, res) => {
  const urlParsed = url.parse(req.url, true);

  const pathTrimmed = urlParsed.pathname.replace(/^\/+|\/+$/g, '');
  const queries = urlParsed.query;
  const httpMethod = req.method.toLowerCase();
  const headers = req.headers;

  const decoder = new StringDecoder();
  let buffer = '';

  req.on('data', (data) => {
    buffer += decoder.write(data);
  });

  req.on('end', () => {
    buffer += decoder.end();

    const routing = routesHandler[pathTrimmed]
      ? routesHandler[pathTrimmed]
      : routes.notFound;

    const data = {
      path: pathTrimmed,
      queries,
      httpMethod,
      headers,
    };

    routing(data, (status = 200, payload = {}) => {
      const payloadString = JSON.stringify(payload);

      res.setHeader('Content-Type', 'application/json');
      res.writeHead(status);

      res.end(payloadString);
    });
  });
});

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

const routesHandler = {
  ping: routes.ping,
  users: routes.users,
};

server.listen(3000);
