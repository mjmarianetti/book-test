require('dotenv').config();

const config = require('./config/app');
const http = require('http');
const app = require('./app');

const server = http.createServer(app);
const port = config.application.port || 3000;

server.listen(port, () => console.log(`running ${port}`));