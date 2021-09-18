const colorList = ["red", "green", "blue", "custom1", "custom2"];

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ colorList });
});
