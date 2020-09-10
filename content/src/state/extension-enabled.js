import { ref } from "vue";
import { getStorageData } from "../util.js";

export const extensionEnabled = ref(false);

initExtensionEnabled();

listenPopupMessages();

//////////////// functions

async function initExtensionEnabled() {
  // i could have messaged background instead

  console.log("getExtensionEnabled");

  const _extensionEnabled = await getStorageData("extensionEnabled");
  console.log("_extensionEnabled", _extensionEnabled);
  if (_extensionEnabled === undefined) {
    extensionEnabled.value = true;
  } else {
    extensionEnabled.value = _extensionEnabled;
  }

  // this was firing before inject loaded
  setTimeout(function() {
    fireExtensionEnabledEventForInject(extensionEnabled.value);
  }, 500);
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
