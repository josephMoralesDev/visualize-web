import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import WaveMaker from './components/WaveMaker/index';
import AudioInput from './components/AudioInput/index';

class App extends Component {
  render() {
    return (
      <div className="App">
        <AudioInput />
        <WaveMaker />
      </div>
    );
  }
}

export default App;
