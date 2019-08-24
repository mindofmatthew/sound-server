import React from 'react';
import { Route } from 'react-router-dom';

import { SynthList } from './SynthList.jsx';
import { SynthEditor } from './SynthEditor.jsx';

export function Synths({ match }) {
  return (
    <>
      <Route exact path={match.path} component={SynthList} />
      <Route path={`${match.path}/:synthName`} component={SynthEditor} />
    </>
  );
}
