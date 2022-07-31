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
}

function listenPopupMessages() {
  chrome.runtime.onMessage.addListener((msgObj) => {
    if (msgObj.hasOwnProperty("extensionEnabled")) {
      extensionEnabled.value = msgObj.extensionEnabled;
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
