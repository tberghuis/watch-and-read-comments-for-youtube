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
  setTimeout(resolveElement, 0);
};

document.onreadystatechange = function() {
  if (document.readyState === "complete") {
    resolveElement("#player.ytd-watch-flexy", resolvePlayer);
    resolveElement("ytd-watch-flexy", resolveWatchFlexy);
    resolveElement("ytd-app", resolveYtdApp);
  }
};

//////////////////////////////

// export default new Promise(resolve => {
//   let player, watchFlexy;
//   const assignDomElements = () => {
//     player = document.querySelector("#player.ytd-watch-flexy");
//     watchFlexy = document.querySelector("ytd-watch-flexy");
//     if (!player || !watchFlexy) {
//       setTimeout(assignDomElements, 0);
//     } else {
//       resolve({ player, watchFlexy });
//     }
//   };

//   document.onreadystatechange = async function() {
//     if (document.readyState === "complete") {
//       assignDomElements();
//     }
//   };
// });
