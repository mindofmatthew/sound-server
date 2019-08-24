const Bundler = require('parcel-bundler');
const express = require('express');
const Path = require('path');
const WebSocket = require('ws');

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

/* List available files */
app.get('/_/fs', (req, res) => {
  res.send([{ name: 'foo.bar' }]);
});

/* Get contents of a file */
app.get('/_/fs/:fileName', (req, res) => {
  res.send(`Contents of ${req.params.fileName}`);
});

/* Replace a file with the supplied body contents */
app.put('/_/fs/:fileName', (req, res) => {
  res.send(req.body);
});

app.use(bundler.middleware());
app.listen(8000);
