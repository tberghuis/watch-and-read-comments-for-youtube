listenPopupMessages();

//////////////// functions

async function getExtensionEnabled() {
  let extensionEnabled = await getStorageData("extensionEnabled");
  if (extensionEnabled === undefined) {
    extensionEnabled = true;
  }
  return extensionEnabled;
}

function setExtensionEnabled(value) {
  chrome.storage.local.set({ extensionEnabled: value }, function () {
    console.log("data saved");
  });
}

function listenPopupMessages() {
  chrome.runtime.onMessage.addListener(function (
    request,
    sender,
    sendResponse
  ) {
    // console.log("request", request);
    if (request === "get-extension-enabled") {
      (async () => {
        const extensionEnabled = await getExtensionEnabled();
        sendResponse(extensionEnabled);
      })();
    } else if (request.hasOwnProperty("extensionEnabled")) {
      setExtensionEnabled(request.extensionEnabled);
    }
    // prevents lastError, this function cannot be async
    return true;
  });
}

function getStorageData(sKey) {
  return new Promise(function (resolve, reject) {
    chrome.storage.local.get(sKey, function (items) {
      if (chrome.runtime.lastError) {
        console.error(chrome.runtime.lastError.message);
        reject(chrome.runtime.lastError.message);
      } else {
        resolve(items[sKey]);
      }
    });
  });
}
