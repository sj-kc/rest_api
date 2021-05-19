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

    res.end('hello you');
  });
});

server.listen(3000);
