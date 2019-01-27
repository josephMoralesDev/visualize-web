import React from 'react';

export default class AudioInput extends React.Component {
    render() {
        return (
            <div>
                <input type="file" id="thefile" accept="audio/*" />
                <audio id="audio" controls></audio>
            </div>
        );
    }
}