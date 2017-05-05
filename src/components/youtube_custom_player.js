/*jshint esversion: 6 */
'use strict';

import React, { Component } from 'react';
import YouTube from 'react-youtube';
import PlaypauseBtn from './player_playpause_btn';
import PlayerTimer from './player_timer';
import YoutubeWorkaround from './youtube_workaround';

class YoutubeCustomPlayer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      videoId: props.playerConfig.videoId,
      opts: props.playerConfig.opts,
      status: 0,
      state_history: []
    };

    if(this.state.opts){
      const vars = this.state.opts.playerVars;
      if(vars && (vars.start > vars.end)){
        throw Error('Error: end of video can not be before start');
      }
    }else{
      console.log("Loading=",this.state)
      return <div>Loading...</div>;
    }
    console.log("{this.state.opts}=", this.state.opts)
    this.onReady = this.onReady.bind(this);
    this.onStateChange = this.onStateChange.bind(this);
    this.onPlayPauseVideo = this.onPlayPauseVideo.bind(this);
    this.myTimer = this.myTimer.bind(this);
    this.startStopTimer = this.startStopTimer.bind(this);
  }

  onReady(event) {
    this.setState({player: event.target});
    window.player = event.target;
    const pv = this.props.playerConfig.opts.playerVars;
    const start = pv.start? pv.start : 0;
    console.log("start=",start);
    const end = pv.end? pv.end : this.state.player.getDuration();
    console.log("end=",end);
    console.log("getCurrentTime=",this.state.player.getCurrentTime());

    /*player.stopVideo();
    console.log("")
    this.state.player.seekTo(0, function(a){console.log("listo!")});
    player.playVideo();*/
    this.setState({ start: start });
    this.setState({ end: end });
    this.setState({ duration: end - start });
  }

  myTimer(event) {
    this.setState({
      currentTime: this.state.player.getCurrentTime()
    });
 }

  onStateChange(event){
    /*
      BUFFERING: 3, ENDED: 0, PAUSED: 2, PLAYING: 1,
      UNSTARTED: -1, VIDEO_CUED: 5
    */
    const states = {
      '3': 'BUFFERING',
      '0': 'ENDED',
      '2': 'PAUSED',
      '1': 'PLAYING',
      '-1': 'UNSTARTED',
      '5': 'VIDEO_CUED'
    }
    this.state.state_history.push(states[event.data]);
    const history = this.state.state_history;
    this.setState({state_history: history});
    console.log("state_history=",this.state.state_history)
    this.setState({status: event.data});

    if(event.data === 1){
      this.startStopTimer('start');
    }else{
      this.startStopTimer('stop');
    }

    YoutubeWorkaround(this.state, history);



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
