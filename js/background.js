const colorList = ['red', 'green', 'blue', 'yellow', 'white', 'black'];

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ colorList });
});
