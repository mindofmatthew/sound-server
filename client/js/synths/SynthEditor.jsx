import React from 'react';

export function SynthEditor() {
  fetch('/_/fs/my.synth')
    .then(r => r.text())
    .then(v => {
      console.log(v);
    });

  return (
    <div>
      <h1>Edit a Synth</h1>
    </div>
  );
}
