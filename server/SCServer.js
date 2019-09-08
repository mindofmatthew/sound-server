const EventEmitter = require('events');
const { spawn } = require('child_process');
const osc = require('osc');

class SCServer extends EventEmitter {
  constructor() {
    super();

    // Server is not yet ready
    this._ready = false;

    // Set up SC Server
    this._scsynth = spawn(
      '/Applications/SuperCollider.app/Contents/Resources/scsynth',
      ['-u', 57000],
    );

    this._scsynth.stdout.on('data', data => {
      console.log(data.toString());

      if (
        !this._ready &&
        data.toString().match(/SuperCollider 3 server ready/)
      ) {
        this._ready = true;
        this.emit('ready');
      }
    });

    this._scsynth.stderr.on('data', data => {
      console.error(`stderr: ${data}`);
    });

    this._scsynth.on('close', code => {
      console.log(`child process exited with code ${code}`);
    });

    // Set up UDP Connection
    this._udp = new osc.UDPPort({
      localAddress: '127.0.0.1',
      localPort: 7400,
      remoteAddress: '127.0.0.1',
      remotePort: 57000,
    });

    this._udp.on('ready', () => {});

    this._udp.on('message', message => {
      console.log(`SC: ${JSON.stringify(message)}`);
      this.emit('message', message);
    });

    this._udp.open();

    // Send Initial Messages to Server
    this.on('ready', () => {
      this.send({ address: '/dumpOSC', args: [1] });
      this.send({ address: '/version' });
      this.send({ address: '/notify', args: [1] });
    });
  }

  send(message) {
    this._udp.send(message);
  }
}

module.exports = new SCServer();
