import React, { useState, useEffect } from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import { Synths } from './synths';

function App() {
  let [wsSend, setSendCallback] = useState(null);
  let [connectionStatus, setConnectionStatus] = useState('Starting');

  useEffect(() => {
    const socket = new WebSocket(`ws://${location.host}/_/synth/bcd`);

    socket.addEventListener('open', () => {
      setConnectionStatus('Open');
      setSendCallback(() => m => {
        socket.send(m);
      });
    });

    socket.addEventListener('close', e => {
      setConnectionStatus(`Closed: (${e.code}) ${e.reason}`);
    });

    socket.addEventListener('error', e => {
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
          wsSend('hi');
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
