chrome.runtime.onInstalled.addListener(function () {
  chrome.storage.local.get(["whitelisted", "enabled"], function (local) {
    if (!Array.isArray(local.whitelisted)) {
      chrome.storage.local.set({ whitelisted: [] });
    }

    if (typeof local.enabled !== "boolean") {
      chrome.storage.local.set({ enabled: false });
    }
  });
});

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
      const isWhitelisted = Array.isArray(whitelisted) && whitelisted.some(domain => hostname.includes(domain));

      // If not whitelisted, check prayer times and redirect if needed
      if (!isWhitelisted) {
        console.log(1);
        var pasturl = url;
        console.log(pasturl);
        const redirectionURL = chrome.runtime.getURL("redirect.html");
        chrome.tabs.update(tabId, {url: redirectionURL});
        /* try {
          const prayerTimesResponse = await fetchPrayerTimes("Scarborough", "Canada", 2);
          const currentPrayer = getCurrentPrayer(prayerTimesResponse.data.timings);
          
          // Replace 'Fajr' with the prayer you want to check for redirection
          if (currentPrayer === 'Fajr') {
            const redirectionURL = chrome.runtime.getURL("redirect.html");
            chrome.tabs.update(tabId, { url: redirectionURL });
          } else  if (currentPrayer === 'Dhuhr') {
            const redirectionURL = chrome.runtime.getURL("redirect.html");
            chrome.tabs.update(tabId, { url: redirectionURL });
          } else if (currentPrayer === 'Asr') {
            const redirectionURL = chrome.runtime.getURL("redirect.html");
            chrome.tabs.update(tabId, { url: redirectionURL });
          } else if (currentPrayer === 'Maghrib') {
            const redirectionURL = chrome.runtime.getURL("redirect.html");
            chrome.tabs.update(tabId, { url: redirectionURL });
          } else if (currentPrayer === 'Isha') {
            const redirectionURL = chrome.runtime.getURL("redirect.html");
            chrome.tabs.update(tabId, { url: redirectionURL });
          }
        } catch (error) {
          console.error("Error fetching prayer times:", error);
        } */
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
  const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  
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