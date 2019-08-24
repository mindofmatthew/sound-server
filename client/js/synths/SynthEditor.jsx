import React from 'react';

export function SynthEditor() {
  fetch('/_/fs/my_synth.scd', {
    method: 'put',
    body: 'hi there new file friend',
  })
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
