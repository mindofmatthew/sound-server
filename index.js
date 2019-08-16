const sc = require('supercolliderjs');
const ws = require('ws');

// sc.server.boot().then(server => {
//   // Compile synthDef from a file
//   // Will recompile and send to server if the file changes.
//   let def = server.loadSynthDef('formant', './formant.scd');
//
//   // Create group at the root
//   let group = server.group();
//
//   let freqSpec = {
//     minval: 100,
//     maxval: 8000,
//     warp: 'exp'
//   };
//
//   // Map 0..1 to an exponential frequency range from 100..8000
//   let randFreq = () => sc.map.mapWithSpec(Math.random(), freqSpec);
//
//   let spawn = (dur) => {
//     server.synth(def, {
//       fundfreq: randFreq(),
//       formantfreq: randFreq(),
//       bwfreq: randFreq(),
//       pan: sc.map.linToLin(0, 1, -1, 1, Math.random()),
//       timeScale: dur
//     }, group);
//
//     let next = Math.random() * 0.25;
//     // Schedule this function again:
//     setTimeout(() => spawn(next), next * 1000);
//   };
//
//   spawn(Math.random());
// });
