import React, { useState, useEffect } from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import { Synths } from './synths';

function App() {
  let [wsSend, setSendCallback] = useState(null);

  useEffect(() => {
    const socket = new WebSocket(`ws://${location.host}/_/synth/bcd`);

    socket.addEventListener('open', () => {
      setSendCallback(() => m => {
        socket.send(m);
      });
    });

    return () => {
      socket.close();
    };
  }, []);

  if (wsSend) {
    wsSend('hi!');
  }

  return (
    <Router>
      <Route path="/synths" component={Synths} />
    </Router>
  );
}

window.addEventListener('load', () => {
  render(<App />, document.getElementById('root'));
});
