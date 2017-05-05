/*jshint esversion: 6 */
import React from 'react';
import ReactDOM from 'react-dom';
import CustomYoutubePlayer from './components/youtube_custom_player';


class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      playerConfig:{
        videoId: 'p6QjUROOZKY',
        opts: {
          height: 197,
          width: 350,
          playerVars: {
            // https://developers.google.com/youtube/player_parameters
            autoplay: 0, // No autoplay
            controls: 0, // Disable controls
            loop: 1, // Loop 1 = true
            start: 0, // Start at second 90
            //end: 15,
            rel: 0, // Show related videos at the end
            showinfo: 0
          }
        }
      },
      videos: [
        {
          title: 'Objetivo de la Charla',
          start: 0,
          end: 73
        },
        {
          title: 'Claves de éxito',
          start: 74,
          end: 144
        },
        {
          title: 'ØøFactores decisivos',
          start: 157,
          end: 262
        }
      ]
    };
  }





  render() {


      const videoItems = this.state.videos.map(({title, start, end}) => {

        console.log("my start "+start+" end "+ end);
        console.log("this.state.playerConfig.opts=",this.state.playerConfig.opts)
        //let config = this.state.playerConfig;
        const playerConfig ={
          videoId: 'p6QjUROOZKY',
          title: title,
          opts: {
            height: 197,
            width: 350,
            playerVars: {
              // https://developers.google.com/youtube/player_parameters
              autoplay: 0, // No autoplay
              controls: 0, // Disable controls
              loop: 1, // Loop 1 = true
              start: start, // Start at second 90
              end: end,
              rel: 0, // Show related videos at the end
              showinfo: 0
            }
          }
        };

        const key = playerConfig.videoId + start;
        console.log("playerConfig=", playerConfig);

        //debugger
        return (
          <div className="col-md-6" key={key}>

            <CustomYoutubePlayer

              playerConfig={playerConfig} />

          </div>
        );
      });



    return (
      <div className="text-center">

        <div className="col-md-6">
          <h1>Youtube player</h1>
          <iframe width="350" height="197" src="https://www.youtube.com/embed/p6QjUROOZKY" frameborder="0" allowfullscreen></iframe>
        </div>

        <div className="col-md-6">
          <h1>Custom player</h1>
          <CustomYoutubePlayer
            playerConfig={this.state.playerConfig}
          />
        </div>

        <div className="col-md-12">
          <h1>Video chopped</h1>
        </div>

        {videoItems}

      </div>
    );
    /*

    */
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
