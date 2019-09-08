import React, { useState, useEffect } from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import { WebSocketPort } from 'osc/dist/osc-browser';

import { Synths } from './synths';

function App() {
  let [wsSend, setSendCallback] = useState(null);
  let [connectionStatus, setConnectionStatus] = useState('Starting');

  useEffect(() => {
    const socket = new WebSocketPort({
      url: `ws://${location.host}/_/scsynth`,
    });
    socket.open();

    socket.on('ready', () => {
      setConnectionStatus('Open');
      setSendCallback(() => m => {
        socket.send(m);
      });
    });

    socket.on('close', e => {
      setConnectionStatus(`Closed: (${e.code}) ${e.reason}`);
    });

    socket.on('error', e => {
      setConnectionStatus('Error');
    });

    return () => {
      socket.close();
    };
  }, []);

  return (
    <>
      <button
        onClick={() => {
          wsSend({ address: '/s_new', args: ['formant', 1000, 0, 0] });
        }}>
        say hi to the server
      </button>
      <div>Status: {connectionStatus}</div>
      <Router>
        <Route path="/synths" component={Synths} />
      </Router>
    </>
  );
}

window.addEventListener('load', () => {
  render(<App />, document.getElementById('root'));
});
