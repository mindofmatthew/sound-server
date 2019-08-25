import React, { useState, useEffect } from 'react';

import { Controlled as CodeMirror } from 'react-codemirror2';
import './scdMode.js';
import 'codemirror/lib/codemirror.css';

export function SynthEditor({
  match: {
    params: { synth },
  },
}) {
  const [code, updateCode] = useState('');
  const [submittedCode, updateSubmittedCode] = useState(null);

  useEffect(() => {
    if (submittedCode === null) {
      fetch(`/_/fs/${synth}.scd`).then(r => {
        if (r.ok) {
          r.text().then(v => updateCode(v));
        } else {
          updateCode('');
        }
      });
    } else {
      fetch(`/_/fs/${synth}.scd`, {
        method: 'put',
        body: submittedCode,
      })
        .then(r => r.text())
        .then(v => {
          updateCode(v);
        });
    }
  }, [synth, submittedCode]);

  return (
    <div>
      <h1>Edit: {synth}</h1>
      <CodeMirror
        value={code}
        options={{ mode: 'scd' }}
        onBeforeChange={(ed, data, val) => updateCode(val)}
      />
      <button
        disabled={code === submittedCode}
        onClick={() => updateSubmittedCode(code)}>
        Save
      </button>
    </div>
  );
}
