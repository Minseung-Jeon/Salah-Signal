var diffSec;
var diffMin;
var timerInterval;

var hours;
var minutes;
var seconds;

var fajrTime, dhuhrTime, asrTime, MaghribTime, ImsakTime;

const apiURL =
  "http://api.aladhan.com/v1/timingsByCity?city=Scarborough&country=Canada&method=2";

fetch(apiURL)
  .then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json(); // Parse the response as JSON
  })
  .then((data) => {
    // Access and use the retrieved data here
    const status = data.status;
    //fajrTime = string
    fajrTime = data.data.timings.Fajr;
    dhuhrTime = data.data.timings.Dhuhr;
    asrTime = data.data.timings.Asr;
    MaghribTime = data.data.timings.Maghrib;
    ImsakTime = data.data.timings.Imsak;
    dateReadable = data.data.date.readable;

    const currentTime = new Date();
    hours = currentTime.getHours();
    minutes = currentTime.getMinutes();
    const hoursLength = String(hours).length;
    const minutesLength = String(minutes).length;
    if (hoursLength == 1 && minutesLength == 1) {
      hours = "0" + hours;
      minutes = "0" + minutes;
    } else if (hoursLength == 1) {
      hours = "0" + hours;
    } else if (minutesLength == 1) {
      minutes = "0" + minutes;
    }
    currentHourAndMinute = String(hours) + ":" + String(minutes);

    console.log("typeofhours", currentHourAndMinute, fajrTime);

    console.log("API Status: " + status);
    console.log("Fajr Time: " + fajrTime);
    console.log("dhuhrTime" + dhuhrTime);
    console.log("asrTime", asrTime);
    console.log("MaghribTime", MaghribTime);
    console.log("Imsak", ImsakTime);
    // Compare data.status with otherStatus
    if (
      currentHourAndMinute == fajrTime ||
      currentHourAndMinute == dhuhrTime ||
      currentHourAndMinute == asrTime ||
      currentHourAndMinute == MaghribTime ||
      currentHourAndMinute == ImsakTime
    ) {
      if (isRedirected == true) {
      }
      isRedirected = true;
      console.log("Status matches otherStatus");
      console.log("Timer Starts");
      startTimer();
    } else {
      console.log("Status does not match otherStatus");
    }
  })
  .catch((error) => {
    console.error("Error:", error);
  });

function updateTimer() {
  var startTime = localStorage.setItem("startTime", "a");
  var remainingTime = localStorage.setItem("remainingTime", "b");
  const currentTime = new Date();
  hours = currentTime.getHours();
  minutes = currentTime.getMinutes();
  seconds = currentTime.getSeconds();

  const prayHours = 12;
  const prayMinutes = 2;
  const praySeconds = 0;

  diffSec = seconds - praySeconds;
  diffMin = minutes - prayMinutes;
  if (diffMin >= 15) {
    diffSec = 0;
    diffMin = 0;
    document.getElementById("timer").textContent = "00:00";
    //document.getElementById("timerFinished").textContent = "TIME IS UP!!!!!";
    window.location.href = "timer.html";
  } else {
    document.getElementById("timer").textContent = diffMin + ":" + diffSec;
  }
}

function startTimer() {
  display = document.querySelector("#timer");

  timerInterval = setInterval(updateTimer, 1000);
}

window.onload = function () {
  startTimer();
};
