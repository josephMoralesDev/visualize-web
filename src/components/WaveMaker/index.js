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
        var file = document.getElementById("thefile");
        var audio = document.getElementById("audio");

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

            var wavemaker = document.querySelector(".wavemaker");
            
            src.connect(analyser);
            analyser.connect(context.destination);

            analyser.fftSize = 256;

            var bufferLength = analyser.frequencyBinCount;
            console.log(bufferLength);

            let dataArray = new Uint8Array(bufferLength);

            let WIDTH = wavemaker.offsetWidth;

            let barWidth = (WIDTH / bufferLength);


            audio.play();
            const renderFrame = () => {
                requestAnimationFrame(renderFrame);
        
                let newArray = [];
                analyser.getByteFrequencyData(dataArray);
        
                for (var i = 0; i < bufferLength; i++) {
                    let barHeight = dataArray[i];
        
                    let r = barHeight + (25 * (i / bufferLength));
                    let g = 250 * (i / bufferLength);
                    let b = 50;
        
                    let rectangle = {
                        backgroundColor: "rgb(" + r + "," + g + "," + b + ")",
                        height: barHeight,
                        flex: 1
                    };
        
                    newArray.push(rectangle);
                }
        
                this.setState({ bufferBars: newArray });
            }
            renderFrame();
        }
    }



    render() {
        return (
            <div className="wavemaker">
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