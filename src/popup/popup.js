const resetDividerBtn = document.getElementById("reset-divider");
resetDividerBtn.addEventListener("click", () => {
  sendResetDividerMessageToContentScript();
});

function sendResetDividerMessageToContentScript() {
  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, { data: 'reset-divider' }, function(response) {});
  });
}