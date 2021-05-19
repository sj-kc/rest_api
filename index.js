const http = require('http');
const url = require('url');
const { StringDecoder } = require('string_decoder');

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

    routing(data, (status, payload) => {
      const payloadString = JSON.stringify(payload);

      res.writeHead(status);
      res.setHeader('Content-Type', 'application/json');

      res.end(payloadString);
    });
  });
});

const routes = {
  ping() {
    return 'pong';
  },

  notFound(data, callback) {
    callback(400, { error: 'Not found' });
  },
};

const routesHandler = {
  ping: routes.ping,
};

server.listen(3000);
