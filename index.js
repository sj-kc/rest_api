const http = require('http');

const server = http.createServer((req, res) => {
  res.end('hello you');
});

server.listen(3000);
