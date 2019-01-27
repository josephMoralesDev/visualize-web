import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import WaveMaker from './components/WaveMaker/index';
import AudioInput from './components/AudioInput/index';

class App extends Component {
  render() {
    return (
      <div className="App">
        <AudioInput inputId="file-1" audioId="audio-1" />
        <AudioInput inputId="file-2" audioId="audio-2" />
        <div className="waveboard">
          <WaveMaker inputId="file-1" audioId="audio-1" />
          <WaveMaker inputId="file-2" audioId="audio-2" secondary/>
        </div>
      </div>
    );
  }
}

export default App;
