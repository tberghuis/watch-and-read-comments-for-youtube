let resolvePlayer, resolveWatchFlexy, resolveYtdApp;

export const playerPromise = new Promise(resolve => (resolvePlayer = resolve));
export const watchFlexyPromise = new Promise(
  resolve => (resolveWatchFlexy = resolve)
);
export const ytdAppPromise = new Promise(resolve => (resolveYtdApp = resolve));

const resolveElement = (query, resolve) => {
  let element = document.querySelector(query);
  if (element) {
    resolve(element);
    return;
  }
  setTimeout(() => resolveElement(query, resolve), 0);
};

document.onreadystatechange = function() {
  console.log("onreadystatechange");
  if (document.readyState === "complete") {
    console.log("complete");
    resolveElement("#player.ytd-watch-flexy", resolvePlayer);
    resolveElement("ytd-watch-flexy", resolveWatchFlexy);
    resolveElement("ytd-app", resolveYtdApp);
  }
};
