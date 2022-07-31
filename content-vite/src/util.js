export function getStorageData(sKey) {
  if (process.env.NODE_ENV === "development") {
    return getStorageDataDev();
  }

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

////////// for dev

function getStorageDataDev(sKey) {
  console.log("getStorageData", sKey);
  let resolveValue;
  if (sKey === "playerWidthPercent") {
    resolveValue = 0.5;
  } else if (sKey === "extensionEnabled") {
    resolveValue = true;
  }
  return new Promise(function (resolve, reject) {
    resolve(resolveValue);
  });
}
