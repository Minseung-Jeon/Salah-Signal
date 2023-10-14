

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
    console.log(url);
    if (!url || !url.startsWith("http")) {
      return;
    }
  
    const hostname = new URL(url).hostname;
  
    chrome.storage.local.get(["whitelisted", "enabled"], function (local) {
      const { whitelisted, enabled } = local;
      console.log("Whitelisted:", local.whitelisted);
      console.log("Enabled:", local.enabled);
  
      // Check if the extension is enabled
      if (enabled) {
        // Use Array.includes() to check if the hostname is in the whitelisted array
        if (Array.isArray(whitelisted) && whitelisted.includes(hostname)) {
          // Do nothing, as the hostname is whitelisted
        } else {
          // If the hostname is not whitelisted, redirect to "redirect.html"
          const redirectionURL = chrome.runtime.getURL("redirect.html");
          chrome.tabs.update(tabId, { url: redirectionURL });
        }
      }
    });
  });
  