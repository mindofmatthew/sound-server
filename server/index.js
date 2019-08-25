const Bundler = require('parcel-bundler');
const express = require('express');
const Path = require('path');
const WebSocket = require('ws');
const expressWs = require('express-ws');

const fs = require('fs').promises;

require('express-async-errors');

const entryPoint = Path.join(__dirname, '../client/index.html');

const app = express();
expressWs(app);

app.use(express.text());

app.ws('/_/synth/:name', (ws, req) => {
  ws.on('message', m => {
    console.log(`Received: ${m}`);
  });
});

const bundler = new Bundler(entryPoint, { hmrPort: 8080 });

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

app.use(bundler.middleware());
app.listen(8000);
