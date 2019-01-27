import React from 'react';

export default class AudioInput extends React.Component {
    render() {
        return (
            <div>
                <input type="file" id={this.props.inputId} accept="audio/*" />
                <audio id={this.props.audioId} controls></audio>
            </div>
        );
    }
}