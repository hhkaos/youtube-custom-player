/*jshint esversion: 6 */
'use strict';

import React from 'react';

const PlayerPlaypauseBtn = ({onClick, status}) => {

  let str = null;
  if(status === 1){
    str = 'fa fa-pause myBtn';
  }else{
    str = 'fa fa-play myBtn';
  }
  console.log("Llego");

  return (
    <i
      className={str}
      onClick={() => onClick()}
    ></i>
  );

}

export default PlayerPlaypauseBtn;
