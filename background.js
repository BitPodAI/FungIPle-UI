chrome.action.onClicked.addListener(() => {
  if (chrome.sidePanel) {
    chrome.sidePanel.setOptions({ path: 'index.html' });
  } else {
    console.error('Side panel API is not available.');
  }
});

chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: true }).catch(error => console.error(error));

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.set({ isAuthenticated: false, lastActiveTime: null });
});

chrome.runtime.onSuspend.addListener(() => {
  chrome.storage.local.set({ lastActiveTime: Date.now() });
});
