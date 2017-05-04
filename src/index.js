/*jshint esversion: 6 */
import React from 'react';
import ReactDOM from 'react-dom';
import CustomYoutubePlayer from './components/youtube_custom_player';


class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      playerConfig:{
        videoId: '-DX3vJiqxm4',
        opts: {
          height: 390,
          width: 640,
          playerVars: {
            // https://developers.google.com/youtube/player_parameters
            controls: 0, //Disable controls
            autoplay: 0, //No autoplay
            start: 1800, // Start at second 90
            //end: 10
          }
        }
      }
    };
  }

  render() {
    return (
      <div>
        <CustomYoutubePlayer
          playerConfig={this.state.playerConfig}
        />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
