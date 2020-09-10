import { ref } from "vue";
import { getStorageData } from "../util.js";

export const extensionEnabled = ref(false);

const extensionEnabledPromise = getStorageData("extensionEnabled");

initExtensionEnabled();
waitInjectReady();
listenPopupMessages();

//////////////// functions

function waitInjectReady() {
  window.addEventListener("inject-ready", initExtensionEnabled);
}

// this may run twice as sometimes content.js loads before inject.js
async function initExtensionEnabled() {
  const _extensionEnabled = await extensionEnabledPromise;

  if (_extensionEnabled === undefined) {
    extensionEnabled.value = true;
  } else {
    extensionEnabled.value = _extensionEnabled;
  }

  fireExtensionEnabledEventForInject(extensionEnabled.value);

  // this was firing before inject loaded
  // setTimeout(function() {
  //   fireExtensionEnabledEventForInject(extensionEnabled.value);
  // }, 500);
}

function listenPopupMessages() {
  chrome.runtime.onMessage.addListener((msgObj) => {
    // console.log("listenPopupMessages -> msgObj", msgObj);

    if (msgObj.hasOwnProperty("extensionEnabled")) {
      extensionEnabled.value = msgObj.extensionEnabled;

      // custom event to inject
      fireExtensionEnabledEventForInject(msgObj.extensionEnabled);
    }
  });
}

// send to inject script
function fireExtensionEnabledEventForInject(value) {
  const extensionEnabledEvent = new CustomEvent("extension-enabled", {
    detail: value,
  });
  window.dispatchEvent(extensionEnabledEvent);
}

// run on page load
// function getExtensionEnabled() {
//   chrome.runtime.sendMessage("get-extension-enabled", function(response) {
//     fireExtensionEnabledEventForInject(response);
//   });
// }
