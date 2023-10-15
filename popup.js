async function fetchData() {
  const res = await fetch(
    "http://api.aladhan.com/v1/timingsByCity?city=Scarborough&country=Canada&method=2"
  );
  const record = await res.json();
  document.getElementById("Fajr").innerHTML = record.data.timings.Fajr;
  document.getElementById("Dhuhr").innerHTML = record.data.timings.Dhuhr;
  document.getElementById("Asr").innerHTML = record.data.timings.Asr;
  document.getElementById("Maghrib").innerHTML = record.data.timings.Maghrib;
  document.getElementById("Isha").innerHTML = record.data.timings.Isha;
}
fetchData();

document.addEventListener("DOMContentLoaded", function () {
  const prayerButton = document.getElementById("prayerButton");

  timerButton.addEventListener("click", function () {
    chrome.tabs.create({ url: "timer.html" });
  });
});
