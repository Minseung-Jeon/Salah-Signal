function startTimer(duration, display) {
    var startTime = localStorage.getItem('startTime');
    var remainingTime = localStorage.getItem('remainingTime');
    if (!startTime || !remainingTime) {
        startTime = new Date().getTime();
        remainingTime = duration;
        localStorage.setItem('startTime', startTime);
        localStorage.setItem('remainingTime', remainingTime);
    } else {
        // Calculate the time that has passed since the timer started
        var elapsedTime = new Date().getTime() - startTime;
        remainingTime -= Math.floor(elapsedTime / 1000);

        if (remainingTime <= 0) {
            display.textContent = "00:00";
            localStorage.removeItem('startTime');
            localStorage.removeItem('remainingTime');
            return;        }
    }

    var timerInterval = setInterval(function () {
        minutes = Math.floor(remainingTime / 60);
        seconds = remainingTime % 60;

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = minutes + ":" + seconds;

        if (remainingTime <= 0) {
            clearInterval(timerInterval); // Stop the countdown when it reaches 0 or goes below 0.
            localStorage.removeItem('startTime');
            localStorage.removeItem('remainingTime');
        } else {
            remainingTime--;
        }
    }, 1000);
}

window.onload = function () {
    var durationSeconds = 60 * 15; // 15 minutes
    display = document.querySelector("#timer");
    startTimer(durationSeconds, display);
};

