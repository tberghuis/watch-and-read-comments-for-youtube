// TODO only inject if setting enabled

var s = document.createElement("script");
s.src = chrome.runtime.getURL("inject.js");
(document.head || document.documentElement).appendChild(s);

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.data === "reset-divider") {
    const resetDividerEvent = new CustomEvent("reset-divider-event");
    window.dispatchEvent(resetDividerEvent);
  }
  sendResponse();
});
