import React from 'react';
import './App.css';

const bank = [{
  keyCode: 81,
  keyTrigger: 'Q',
  id: 'Heater-1',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3'
}, {
  keyCode: 87,
  keyTrigger: 'W',
  id: 'Heater-2',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3'
}, {
  keyCode: 69,
  keyTrigger: 'E',
  id: 'Heater-3',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3'
}, {
  keyCode: 65,
  keyTrigger: 'A',
  id: 'Heater-4',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3'
}, {
  keyCode: 83,
  keyTrigger: 'S',
  id: 'Clap',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3'
}, {
  keyCode: 68,
  keyTrigger: 'D',
  id: 'Open-HH',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3'
}, {
  keyCode: 90,
  keyTrigger: 'Z',
  id: "Kick-n'-Hat",
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3'
}, {
  keyCode: 88,
  keyTrigger: 'X',
  id: 'Kick',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3'
}, {
  keyCode: 67,
  keyTrigger: 'C',
  id: 'Closed-HH',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3'
},
];

class DrumPad extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      style: "drum-pad"
    }
    this.handleClick = this.handleClick.bind(this);
    this.styleChanger = this.styleChanger.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyPress);
  }
  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyPress);
  }

  handleKeyPress(event){
    if (event.keyCode === this.props.keyCode){
      this.handleClick();
    }
  }

  styleChanger() {
    this.state.style === "drum-pad" ? this.setState({style: "drum-pad-active"}) : this.setState({style: "drum-pad"})
  }

  handleClick() {
    this.props.soundUpdate(this.props.clipId);
    let audio = document.getElementById(this.props.keyTrigger);
    audio.currentTime = 0;
    audio.play();
    this.styleChanger();
    setTimeout(() => this.styleChanger(), 100);
  }

  render(){
    return (
      <div id={this.props.clipId} className={this.state.style} onClick={this.handleClick}> 
        <audio className='clip' id={this.props.keyTrigger} src={this.props.clip}></audio>
        {this.props.keyTrigger}
    </div>
    )
  }
}

class App extends React.Component {
  constructor () {
    super();
    this.state = {
      currentSound: ''
    }
    this.soundUpdate = this.soundUpdate.bind(this);
  }
  soundUpdate(soundName){
    this.setState({currentSound: soundName})
  }
  render() {
    return (
      <div className="App">
        <div id="machine-header">
          <p id="machine-header-title">Drum Machine</p>
          <div id="sound-name">
    <p id="display">{this.state.currentSound}</p>
          </div>
        </div>
        {bank.map((item, i) => {
        return (
          <DrumPad 
						clipId={bank[i].id} 
						clip={bank[i].url}
						keyTrigger={bank[i].keyTrigger}
            keyCode={bank[i].keyCode}
            soundUpdate={this.soundUpdate}
            key={i}
					/>
        )
      })}

      </div>
    );
  }
}

export default App;
