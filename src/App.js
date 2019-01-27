import React, { Component } from 'react';
import './App.css';

import WaveMaker from './components/WaveMaker/index';
import AudioInput from './components/AudioInput/index';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isSecondary: 'audio-1',
    }

    this.handleToggle = this.handleToggle.bind(this);
  }

  handleToggle() {
    let newSecondary = this.state.isSecondary === 'audio-1' ? 'audio-2' : 'audio-1';
    this.setState({isSecondary: newSecondary});
  }
  render() {

    let { isSecondary } = this.state;

    return (
      <div className="App">
        <AudioInput inputId="file-1" audioId="audio-1" />
        <AudioInput inputId="file-2" audioId="audio-2" />
        <button onClick={this.handleToggle}> toggle </button>

        <div className="waveboard">
          <WaveMaker
            inputId="file-1"
            audioId="audio-1"
            secondary={isSecondary === 'audio-1'}
          />
          <WaveMaker
            inputId="file-2"
            audioId="audio-2"
            secondary={isSecondary === 'audio-2'}
          />
        </div>
      </div>
    );
  }
}

export default App;
