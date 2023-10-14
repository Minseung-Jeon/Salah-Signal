document.addEventListener("DOMContentLoaded", function () {
    const locationInput = document.getElementById("location");
    const startTimeInput = document.getElementById("start-time");
    const endTimeInput = document.getElementById("end-time");
    const saveSettingsButton = document.getElementById("save-settings");
    const statusDiv = document.getElementById("status");
  
    // Load saved settings from local storage
    chrome.storage.local.get(
      ["location", "startTime", "endTime"],
      function (result) {
        locationInput.value = result.location || "";
        startTimeInput.value = result.startTime || "";
        endTimeInput.value = result.endTime || "";
      }
    );
  
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
  });
  