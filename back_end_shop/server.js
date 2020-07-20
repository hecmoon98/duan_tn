const http = require('http');

const app = require('./app'); // tiêp theo tao app

const port = process.env.PORT || 5000;

const server = http.createServer(app);

server.listen(port);
