const textarea = document.getElementById("textarea");
const save = document.getElementById("save");
const checkbox = document.getElementById("checkbox");

save.addEventListener("click", () => {
  // Use "whitelisted" instead of "blocked"
  const whitelisted = textarea.value.split("\n").map(s => s.trim()).filter(Boolean);
  chrome.storage.local.set({ whitelisted });
});

checkbox.addEventListener("change", (event) => {
  const enabled = event.target.checked;
  chrome.storage.local.set({ enabled });
});

window.addEventListener("DOMContentLoaded", () => {
  chrome.storage.local.get(["whitelisted", "enabled"], function (local) {
    // Change variable names to "whitelisted"
    const { whitelisted, enabled } = local;
    if (Array.isArray(whitelisted)) {
      textarea.value = whitelisted.join("\n");
      checkbox.checked = enabled;
    }
  });
});