/*jshint esversion: 6 */
'use strict';

import React, { Component } from 'react';
import YouTube from 'react-youtube';
import PlaypauseBtn from './player_playpause_btn';
//import PlayerCanvas from './player_canvas.js'



class YoutubeCustomPlayer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      videoId: props.playerConfig.videoId,
      opts: props.playerConfig.opts,
      status: 0
    };

    this.onReady = this.onReady.bind(this);
    this.onStateChange = this.onStateChange.bind(this);
    this.onPlayPauseVideo = this.onPlayPauseVideo.bind(this);
  }

  onReady(event) {
    this.setState({player: event.target});
  }

  onStateChange(event){
    this.setState({status: event.data});
  }

  onPlayPauseVideo() {
    if(this.state.status === 1){
      this.state.player.pauseVideo();
    }
    else{
      this.state.player.playVideo();
    }
  }

  render() {
    const style = {
      width: this.state.opts.width + 'px',
      height: (this.state.opts.height + 60) + 'px'
    }
    return (
      <div style={style}>
        <YouTube
          className="player-canvas"
          videoId={this.state.videoId}
          opts={this.state.opts}
          onReady={this.onReady}
          onStateChange={this.onStateChange}
          />
        <div className="player-toolbar">
          <PlaypauseBtn
            status={this.state.status}
            onClick={this.onPlayPauseVideo} />
        </div>
      </div>
    );
  }
}

export default YoutubeCustomPlayer;
