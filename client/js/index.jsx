import React, { useState, useEffect } from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

function App() {
  let [wsSend, updateWSSend] = useState(null);

  useEffect(() => {
    const socket = new WebSocket('ws://localhost:8888');

    socket.addEventListener('open', () => {
      updateWSSend(() => socket.send);
    });

    return () => {
      socket.close();
    };
  }, []);

  return (
    <div>
      <h1>Hello World!</h1>
    </div>
  );
}

window.addEventListener('load', () => {
  render(<App />, document.getElementById('root'));
});
