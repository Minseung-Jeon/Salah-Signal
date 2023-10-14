function startTimer(duration, display) {
    var timer = duration,
      minutes,
      seconds;
      
    setInterval(function () {
      minutes = parseInt(timer / 60);
      seconds = parseInt(timer % 60);
  
      minutes = minutes < 10 ? "0" + minutes : minutes;
      seconds = seconds < 10 ? "0" + seconds : seconds;
  
      display.textContent = minutes + ":" + seconds;
      
      if (timer <= 0) {
        clearInterval(countdown); // Stop the countdown when it reaches 0 or goes below 0.
        stop;
      } else {
        timer--;
      }
    }, 1000);
  }
  
  window.onload = function () {
    var durationMinutes = 3;
    /* var durationSeconds = 60;
    var durationMinutes = 15 * durationSeconds; */
      display = document.querySelector("#timer");
    startTimer(durationMinutes, display);
  };
  