import React from 'react';
import './index.css';

export default class WaveMaker extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            bufferBars: []
        }

        this.visualizerSetup = this.visualizerSetup.bind(this);
    }

    componentDidMount() {
        this.visualizerSetup();
    }

    visualizerSetup() {
        var file = document.getElementById(this.props.inputId);
        var audio = document.getElementById(this.props.audioId);

        file.onchange = () => {
            if(file.files) driver(file.files);
        }

        const driver = files => {
            audio.src = URL.createObjectURL(files[0]);
            audio.load();
            audio.play();
            var context = new AudioContext();
            var src = context.createMediaElementSource(audio);
            var analyser = context.createAnalyser();
            
            src.connect(analyser);
            analyser.connect(context.destination);

            analyser.fftSize = 256;

            var bufferLength = analyser.frequencyBinCount;

            let dataArray = new Uint8Array(bufferLength);

            audio.play();

            const renderFrame = () => {
                requestAnimationFrame(renderFrame);
        
                //this is going to be used for our new state
                let newArray = [];

                analyser.getByteFrequencyData(dataArray);
        
                for (var i = 0; i < bufferLength; i++) {
                    let barHeight = dataArray[i];
                    
                    let rectangle = {
                        height: barHeight,
                        flex: 1,
                        backgroundColor: this.props.audioId === "audio-1" ? 'green' : 'red',
                    };
        
                    newArray.push(rectangle);
                }
        
                this.setState({ bufferBars: newArray });
            }
            renderFrame();
        }
    }



    render() {
        let { secondary } = this.props;
        let toggleClass = secondary ? 'isSecondary' : 'isPrimary';
        return (
            <div className={`wavemaker ${toggleClass}`}>
                {this.state.bufferBars.map((bar, index) => 
                    <div 
                        style={{...bar}} 
                        key={`bar-${index}`}>
                    </div>
                )}
            </div>
        );
    }
}