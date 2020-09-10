import { ref } from "vue";
import { getStorageData } from "../util.js";

export const extensionEnabled = ref(false);

getExtensionEnabled();

listenPopupMessages();

//////////////// functions

async function getExtensionEnabled() {
  // i could have messaged background instead

  console.log("getExtensionEnabled");

  const _extensionEnabled = await getStorageData("extensionEnabled");
  console.log("_extensionEnabled", _extensionEnabled);
  if (_extensionEnabled === undefined) {
    extensionEnabled.value = true;
  } else {
    extensionEnabled.value = _extensionEnabled;
  }
  fireExtensionEnabledEventForInject(extensionEnabled.value);
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
