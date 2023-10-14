document.addEventListener("DOMContentLoaded", function () {
    const locationInput = document.getElementById("location");
    const startTimeInput = document.getElementById("start-time");
    const endTimeInput = document.getElementById("end-time");
    const saveSettingsButton = document.getElementById("save-settings");
    const statusDiv = document.getElementById("status");
    const locationButton = document.getElementById("location-button");
  
    /* REMOVED BECAUSE IT CAUSED ERRORING ON GOOGLE CHROME EXTENSION
    // Load saved settings from local storage
    chrome.storage.local.get(
      ["location", "startTime", "endTime"],
      function (result) {
        locationInput.value = result.location || "";
        startTimeInput.value = result.startTime || "";
        endTimeInput.value = result.endTime || "";
      }
    ); */
  
    // Save settings when the "Save Settings" button is clicked
    saveSettingsButton.addEventListener("click", function () {
      const location = locationInput.value;
      const startTime = startTimeInput.value;
      const endTime = endTimeInput.value;
  
      // Save the settings to local storage
      chrome.storage.local.set({ location, startTime, endTime }, function () {
        statusDiv.textContent = "Settings saved!";
      });
  
      // Notify the background script to update settings if needed
      chrome.runtime.sendMessage({ type: "updateSettings" });
    });

    // Uses the Geolocation API to get the user's latitude and longitude
    const x = document.getElementById("demo"); // get/put user location info on x html document?

    function getLocation() { // getLocation function - gets the user's location
    if (navigator.geolocation) { // calls api?
        navigator.geolocation.getCurrentPosition(showPosition); // displays the current position on html
    } else { 
        x.innerHTML = "Geolocation is not supported by this browser."; // output if can't find location
    }
    }

    function showPosition(position) { // showPosition function - shows where the user is
    x.innerHTML = "Latitude: " + position.coords.latitude + 
    "<br>Longitude: " + position.coords.longitude; // prints latitude and longitude on html
    }

   locationButton.addEventListener('click', getLocation(), false); // needs this to operate - probably because it's the only thing that calls the getLocation function?
  });
  