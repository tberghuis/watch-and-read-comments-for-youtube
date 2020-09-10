console.log("hello popup.js");

// send message to get extensionEnabled....
getExtensionEnabled();

extensionEnabledCheckboxListener();

resetDividerButtonListener();

////////////// functions

function getExtensionEnabled() {
  chrome.runtime.sendMessage("get-extension-enabled", function (response) {
    document.getElementById("extensionEnabledCheckbox").checked = response;
  });
}

function extensionEnabledCheckboxListener() {
  document
    .getElementById("extensionEnabledCheckbox")
    .addEventListener("change", function () {
      sendMessageSetExtensionEnabled(this.checked);
    });
}

function sendMessageSetExtensionEnabled(value) {
  // send to background
  chrome.runtime.sendMessage({ extensionEnabled: value });

  // send to tab when active
  chrome.tabs.query({}, (tabs) => {
    tabs.forEach((tab) => {
      chrome.tabs.sendMessage(tab.id, { extensionEnabled: value });
    });
  });
}

function resetDividerButtonListener() {
  const resetDividerBtn = document.getElementById("reset-divider");
  resetDividerBtn.addEventListener("click", () => {
    sendResetDividerMessageToContentScript();
  });
}

function sendResetDividerMessageToContentScript() {
  chrome.tabs.query({}, (tabs) => {
    tabs.forEach((tab) => {
      chrome.tabs.sendMessage(tab.id, { message: "reset-divider" });
    });
  });
}
