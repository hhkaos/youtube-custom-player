/*jshint esversion: 6 */
let intervalReference;

const checkProgress = (state) =>{
  console.log("Checking progress!=",state.player.getCurrentTime())
  if(parseInt(state.player.getCurrentTime(),10) >= state.end){
    state.player.stopVideo();
    clearInterval(intervalReference);
  }

};

var YoutubeWorkaround = function(state, history){
  if(history[0] === 'BUFFERING' && history[1] === 'ENDED' && !history[8]){
    console.log("history[2]=",history[2]);
    state.player.playVideo();
    if( history[2] === 'UNSTARTED' && !history[3]){
      console.log("Paso 1");
      state.player.seekTo(state.start);
    }else if( history[2] === 'PLAYING' && !history[3]){
      console.log("Paso 2");
      state.player.stopVideo();
    }else if(history[3] === 'UNSTARTED' && !history[4]){
      console.log("Paso 3");
      state.player.seekTo(state.start);
      //debugger
    }else if(history[6] === 'PLAYING' && !history[7]){
      state.player.seekTo(state.start);
    }else if(!intervalReference){
      console.log("Empezamos a comprobar progreso")
      intervalReference = setInterval(function(){checkProgress(state)}, 1000);
      /*setTimeout(function(){

        state.player.stopVideo();
      }, end);*/

    }
  }
};

export default YoutubeWorkaround;
