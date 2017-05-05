/*jshint esversion: 6 */
'use strict';

import React from 'react';

const PlayerSeekTo = ({onClick, amount}) => {
  console.log("Amount=",amount);
  return (
    <span
      className="seekto"
      onClick={() => onClick(amount)}>
        {amount}
    </span>
  );

}

export default PlayerSeekTo;
