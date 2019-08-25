import React, { useState, useEffect } from 'react';

import { Link } from 'react-router-dom';

export function SynthList({ history }) {
  const [synths, updateSynths] = useState([]);
  const [toDelete, updateToDelete] = useState(null);

  useEffect(() => {
    fetch('/_/fs/')
      .then(r => r.json())
      .then(v => updateSynths(v));
  }, [updateSynths]);

  // useEffect(() => {
  //   fetch('/_/fs/')
  //     .then(r => r.json())
  //     .then(v => updateSynths(v));
  // }, [toDelete, updateToDelete]);

  return (
    <div>
      <h1>List of Synths</h1>
      <NewSynth history={history} />
      <ul>
        {synths.map((synth, index) => {
          const name = synth.name.slice(0, -4);
          return <SynthListing key={index} name={name} />;
        })}
      </ul>
    </div>
  );
}

function NewSynth({ history }) {
  const [name, updateName] = useState('');

  return (
    <form
      onSubmit={e => {
        history.push(`/synths/${name}`);
        e.preventDefault();
      }}>
      <input
        type="text"
        value={name}
        onChange={e => {
          updateName(e.target.value);
        }}
      />
      <input type="submit" disabled={name === ''} value="New Synth" />
    </form>
  );
}

function SynthListing({ name, onDelete }) {
  return (
    <li>
      <Link to={`/synths/${name}`}>{name}</Link>
      <button onClick={() => onDelete(name)}>Delete</button>
    </li>
  );
}
