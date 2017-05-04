/*jshint esversion: 6 */
'use strict';

import React, { Component } from 'react';
import YouTube from 'react-youtube';
import PlaypauseBtn from './player_playpause_btn';
import PlayerTimer from './player_timer';

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
    this.myTimer = this.myTimer.bind(this);
    this.startStopTimer = this.startStopTimer.bind(this);
  }

  onReady(event) {
    this.setState({player: event.target});

    const pv = this.props.playerConfig.opts.playerVars;
    const start = pv.start? pv.start : 0;
    const end = pv.end? pv.end : this.state.player.getDuration();

    this.state.player.seekTo(start);
    this.setState({ start: start });
    this.setState({ duration: end - start });
  }

  myTimer(event) {
    this.setState({
      currentTime: this.state.player.getCurrentTime()
    });
 }

  onStateChange(event){
    this.setState({status: event.data});
    
    if(event.data === 1){ // start playing
      this.startStopTimer('start');
    }else{
      this.startStopTimer('stop');
    }
  }

  startStopTimer(action) {
    if(action === 'stop'){
      clearInterval(this.countdown);
    }else{
      this.countdown = setInterval(this.myTimer, 500);
    }
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

          <PlayerTimer
            start={this.state.start}
            currentTime={this.state.currentTime}
            duration={this.state.duration} />
        </div>
      </div>
    );
  }
}

export default YoutubeCustomPlayer;
