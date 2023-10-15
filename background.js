chrome.runtime.onInstalled.addListener(function () {
  //for checking every 10 seconds
  setInterval(checkingEveryTenSeconds, 5000);
  //

  chrome.storage.local.get(["whitelisted", "enabled"], function (local) {
    if (!Array.isArray(local.whitelisted)) {
      chrome.storage.local.set({ whitelisted: [] });
    }

    if (typeof local.enabled !== "boolean") {
      chrome.storage.local.set({ enabled: false });
    }
  });
});

var isRedirected = false;

function checkingEveryTenSeconds() {
  var diffSec;
  var diffMin;
  var timerInterval;

  var hours;
  var minutes;
  var seconds;

  var currentHourAndMinute;

const prayerSchedule = {
  fajr: "Fajr",
  dhubr: "Dhuhr",
  asr: "Asr",
  maghrib: "Maghrib",
  isha: "Isha"
}

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
      const fajrTime = data.data.timings.Fajr;
      const dhuhrTime = data.data.timings.Dhuhr;
      const asrTime = data.data.timings.Asr;
      const MaghribTime = data.data.timings.Maghrib;
      const ImsakTime = data.data.timings.Imsak;
      const dateReadable = data.data.date.readable;

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

      // Compare data.status with otherStatus
      if (
        currentHourAndMinute == fajrTime ||
        currentHourAndMinute == dhuhrTime ||
        currentHourAndMinute == asrTime ||
        currentHourAndMinute == MaghribTime ||
        currentHourAndMinute == ImsakTime
      ) {
        if (isRedirected == true) {
        } else {
          console.log("Status matches otherStatus!");
          console.log("Timer Starts");


          chrome.tabs.create({ url: "redirect.html" });
          isRedirected=true;
          //startTimer();
        }
      } else {
        console.log("Status does not match otherStatus");
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  const url = changeInfo.pendingUrl || changeInfo.url;
  console.log("Current URL:", url);
  if (!url || !url.startsWith("http")) {
    return;
  }

  const hostname = new URL(url).hostname;

  chrome.storage.local.get(["whitelisted", "enabled"], async function (local) {
    const { whitelisted, enabled } = local;

    // Check if the extension is enabled
    if (enabled) {
      // Use Array.some() to check if any whitelisted domain matches the current hostname
      const isWhitelisted =
        Array.isArray(whitelisted) &&
        whitelisted.some((domain) => hostname.includes(domain));

      // If not whitelisted, check prayer times and redirect if needed
      if (!isWhitelisted) {
        try {
          const prayerTimesResponse = await fetchPrayerTimes(
            "Scarborough",
            "Canada",
            2
          );
          const currentPrayer = getCurrentPrayer(
            prayerTimesResponse.data.timings
          );
          // Replace 'Fajr' with the prayer you want to check for redirection
          if (currentPrayer === "Fajr") {
            const redirectionURL = chrome.runtime.getURL("redirect.html");
            chrome.tabs.update(tabId, { url: redirectionURL });
          } else if (currentPrayer === "Dhuhr") {
            const redirectionURL = chrome.runtime.getURL("redirect.html");
            chrome.tabs.update(tabId, { url: redirectionURL });
          } else if (currentPrayer === "Asr") {
            const redirectionURL = chrome.runtime.getURL("redirect.html");
            chrome.tabs.update(tabId, { url: redirectionURL });
          } else if (currentPrayer === "Maghrib") {
            const redirectionURL = chrome.runtime.getURL("redirect.html");
            chrome.tabs.update(tabId, { url: redirectionURL });
          } else if (currentPrayer === "Isha") {
            const redirectionURL = chrome.runtime.getURL("redirect.html");
            chrome.tabs.update(tabId, { url: redirectionURL });
          }
        } catch (error) {
          console.error("Error fetching prayer times:", error);
        }
      }
    }
  });
});

// Function to fetch prayer times from the API
async function fetchPrayerTimes(city, country, method) {
  const apiUrl = `http://api.aladhan.com/v1/timingsByCity?city=${city}&country=${country}&method=${method}`;
  const response = await fetch(apiUrl);
  const data = await response.json();
  return data;
}

// Function to get the current prayer based on prayer times
function getCurrentPrayer(prayerTimings) {
  // You may need to adapt this based on the API response structure
  const currentTime = new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  for (const prayer in prayerTimings) {
    if (prayerTimings.hasOwnProperty(prayer)) {
      const prayerTime = prayerTimings[prayer];
      if (currentTime >= prayerTime) {
        return prayer;
      }
    }
  }

  return null;
}
