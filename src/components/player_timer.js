/*jshint esversion: 6 */
'use strict';

import React from 'react';

const PlayerTimer = ({currentTime, duration, start}) => {

  const secsToStr = (totalSeconds) => {
    let hours = Math.floor(totalSeconds / 3600);
    totalSeconds %= 3600;
    let minutes = Math.floor(totalSeconds / 60);
    let seconds = totalSeconds % 60;

    let output = '';
    if(hours > 0){
      output += hours + ':';
    }
    if(minutes > 0 || hours > 0){
      output += ('0'+minutes).slice(-2);
    }else{
      output += '00';
    }
    if(seconds){
      output += ':' + ('0'+seconds).slice(-2)
    }else{
      output += ':' + '00';
    }

    return output;
  }


  let ct = '00:00';
  if(currentTime-start > 0){
    ct = secsToStr(parseInt(currentTime-start));
  }
  duration = secsToStr(parseInt(duration))
  return (
    <span className="timer">{ct} / {duration}</span>
  );

}

export default PlayerTimer;
