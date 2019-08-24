import React, { useState } from 'react';

import { Controlled as CodeMirror } from 'react-codemirror2';
import './scdMode.js';
import 'codemirror/lib/codemirror.css';

export function SynthEditor() {
  const [code, updateCode] = useState('');

  fetch('/_/fs/my.synth')
    .then(r => r.text())
    .then(v => {
      console.log(v);
    });

  return (
    <div>
      <h1>Edit a Synth</h1>
      <CodeMirror
        value={code}
        options={{ mode: 'scd' }}
        onBeforeChange={(ed, data, val) => updateCode(val)}
      />
    </div>
  );
}
