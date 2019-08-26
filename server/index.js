const express = require('express');
const expressWs = require('express-ws');
require('express-async-errors');

const Bundler = require('parcel-bundler');
const Path = require('path');

const fs = require('fs').promises;

const osc = require('osc');

// Set up sound server
let SCServer = null;
if (process.argv[2] !== '--no-sound') {
  SCServer = require('./SCServer.js');
}

// Set up express server
const app = express();
expressWs(app);

app.use(express.text());

app.ws('/_/scsynth', (ws, req) => {
  const wsPort = new osc.WebSocketPort({ socket: ws });

  wsPort.on('message', m => {
    console.log(`Received: ${JSON.stringify(m)}`);
    if (SCServer) {
      SCServer.send(m);
    }
  });

  // ws.on('close', m => {
  //   console.log(`Received: ${m}`);
  // });
});

// Init Filesystem
fs.mkdir('./data', { recursive: true });

/* List available files */
app.get('/_/fs', async (req, res) => {
  const a = await fs.readdir('data/');
  res.send(a.map(name => ({ name })));
});

/* Get contents of a file */
app.get('/_/fs/:name', async (req, res) => {
  res.type('text/plain').send(await fs.readFile(`data/${req.params.name}`));
});

/* Replace a file with the supplied body contents */
app.put('/_/fs/:name', async (req, res) => {
  const contents = req.body;
  await fs.writeFile(`data/${req.params.name}`, contents);
  res.type('text/plain').send(contents);
});

app.delete('/_/fs/:name', async (req, res) => {
  await fs.unlink(`data/${req.params.name}`);
  res.send();
});

// Set up parcel-based webserver
const entryPoint = Path.join(__dirname, '../client/index.html');
const bundler = new Bundler(entryPoint, { hmrPort: 8080 });
app.use(bundler.middleware());

app.listen(8000);
