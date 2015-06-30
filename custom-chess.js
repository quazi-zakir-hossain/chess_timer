    // Global variable -
    //------------------
    var timeMovement, timeFormat, initTime, intervalVal, padSpace, timeInHand, playTurner, chessCounter;
    //-----------------------------------------------------------------------------------------
    // member function: 
    // ---------------

    function  initialize(){
      initTime = 4 * 60;
      timeMovement = 1;
      playTurner = 0;
      timeInHand = [initTime, initTime];
    }
    
    //-----------------------------------------------------------------------------------------
    function padSpace(x) {
      return ('0' + x).slice(-2);
    }
    //-----------------------------------------------------------------------------------------
    function timeFormat(t) {
      var hours, minutes, seconds;
      seconds = t % 60;
      minutes = Math.floor(t / 60) % 60;
      hours = Math.floor(t / 3600);
      if (hours) {
        return "" + hours + ":" + (padSpace(minutes)) + ":" + (padSpace(seconds));
      } else {
        return "" + minutes + ":" + (padSpace(seconds));
      }
    }
    //-----------------------------------------------------------------------------------------
    function chessCounter() {
      var i, el;
      //console.log("Updateing Turn " + playTurner);
      timeInHand[playTurner]--;
      for (i = 0; i < 2; i++) {
        if(i==0){
        	document.getElementById("time0").innerHTML= timeFormat(timeInHand[i]);
        }else{
        	document.getElementById("time1").innerHTML= timeFormat(timeInHand[i]);
        }

        el = document.getElementById("time"+i);
      }
      if (timeInHand[playTurner] <= 0) {
        
        document.getElementById("time0").innerHTML='4:00'
        document.getElementById("time1").innerHTML='4:00'
        timeInHand[0]=initTime
        timeInHand[1]=initTime
        if(playTurner == 0){
          alert("Hurrah! Player, Black won the game.")
        }else{
          alert("Hurrah! Player, White won the game.")
        }
        clearTimeout(intervalVal);
        intervalVal = false;
      }
    }
    
    //-----------------------------------------------------------------------------------------
    function playerWhiteTurn(){
        playTurner=1;
      // console.log(timeInHand[playTurner]);
      if (intervalVal) {
        document.getElementById("time0").className = "";
        document.getElementById("time1").className = "playTurner";
        if (timeInHand[playTurner] + timeMovement > timeInHand[playTurner]) return false;
        return timeInHand[playTurner] += timeMovement;
      }else{

        return intervalVal = setInterval(function () {chessCounter()}, 1000);
      }
    }
    //-----------------------------------------------------------------------------------------
    function playerBlackTurn(){
      playTurner=0;
      if (intervalVal) {
        document.getElementById("time1").className = "";
        document.getElementById("time0").className = "playTurner";
        if (timeInHand[playTurner] + timeMovement > timeInHand[playTurner]) return false;
        return timeInHand[playTurner] += timeMovement;
      }else{
        return intervalVal = setInterval(function () {chessCounter()}, 1000);
      }
    }
    //-----------------------------------------------------------------------------------------
    function resetClockValue(){

      document.getElementById("time0").innerHTML='4:00'
      document.getElementById("time1").innerHTML='4:00'
      clearTimeout(intervalVal);
      initialize();
      intervalVal = false;

    }
    //-----------------------------------------------------------------------------------------

    initialize();