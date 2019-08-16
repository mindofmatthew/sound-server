const express = require('express');

const WebSocket = require('ws');

const Bundler = require('parcel-bundler');
const Path = require('path');
const entryPoint = Path.join(__dirname, '../client/index.html');

const app = express();

const wss = new WebSocket.Server({ port: 8888 });

wss.on('connection', socket => {
  console.log('--Connection Opened--');

  socket.on('message', data => {
    console.log('Message Received:');
    console.log(data);
  });

  socket.on('close', () => {
    console.log('--Connection Closed--');
  });
});

const bundler = new Bundler(entryPoint, { hmrPort: 8080 });

app.use(bundler.middleware());
app.listen(8000);
