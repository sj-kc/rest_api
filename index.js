const http = require('http');
const url = require('url');
const { StringDecoder } = require('string_decoder');
const controller = require('./controllers/controller');

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
      : routesHandler.notFound;

    const data = {
      path: pathTrimmed,
      queries,
      httpMethod,
      headers,
      payload: JSON.parse(buffer),
    };

    routing(data, (status = 200, payload = {}) => {

      const payloadString = JSON.stringify(payload);

      res.setHeader('Content-Type', 'application/json');
      res.writeHead(status);

      res.end(payloadString);
    });
  });
});

const routesHandler = {
  ping: controller.ping,
  users: controller.users,
  notFound: controller.notFound,
};

server.listen(3000);
