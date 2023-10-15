chrome.runtime.onInstalled.addListener(function () {
    chrome.storage.local.get(["whitelisted", "enabled"], function (local) {
      if (!Array.isArray(local.whitelisted)) {
        chrome.storage.local.set({ whitelisted: [] });

      }
      if(url !== "redirect.html"){
  pasturl = url;
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
  
    chrome.storage.local.get(["whitelisted", "enabled"], function (local) {
      const { whitelisted, enabled } = local;
  
      // Check if the extension is enabled
      if (enabled) {
        // Use Array.some() to check if any whitelisted domain matches the current hostname
        const isWhitelisted = Array.isArray(whitelisted) && whitelisted.some(domain => hostname.includes(domain));
  
        // If not whitelisted, redirect to "redirect.html"
        if (!isWhitelisted) {
          const redirectionURL = chrome.runtime.getURL("redirect.html");
          chrome.tabs.update(tabId, { url: redirectionURL });
        }
      }
    });
  });
 
