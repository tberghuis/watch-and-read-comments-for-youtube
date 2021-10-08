import {
  watchFlexyPromise,
  playerPromise,
  ytdAppPromise,
} from "./dom-elements.js";

const { Subject } = rxjs;

const extensionEnabledSubject = new Subject();

let origCalculateCurrentPlayerSize_;
let origIsTwoColumns;

initOrig();
subscribeExtensionEnabledSubject();
listenCustomEvents();
// proxyFullscreen();
listenFullscreen();


/////////////////// functions

function listenCustomEvents() {
  window.addEventListener("extension-enabled", function (evt) {
    extensionEnabledSubject.next(evt.detail);
    schedulePlayerSizeUpdate();
  });

  //
  const event = new CustomEvent("inject-ready");
  window.dispatchEvent(event);

  window.addEventListener(
    "schedule-player-size-update",
    schedulePlayerSizeUpdate
  );

  window.addEventListener("warc-load-comments", loadComments);
}

async function schedulePlayerSizeUpdate() {
  const watchFlexy = await watchFlexyPromise;
  watchFlexy.schedulePlayerSizeUpdate_();
}

function subscribeExtensionEnabledSubject() {
  extensionEnabledSubject.subscribe({
    next: (v) => {
      console.log("extensionEnabledSubject", v);

      if (v) {
        overrideOrig();
      } else {
        restoreOrig();
      }
    },
  });
}

async function initOrig() {
  const watchFlexy = await watchFlexyPromise;
  origCalculateCurrentPlayerSize_ = watchFlexy.calculateCurrentPlayerSize_;
  origIsTwoColumns = watchFlexy.isTwoColumns_;
}

async function overrideOrig() {
  const watchFlexy = await watchFlexyPromise;
  const player = await playerPromise;

  origIsTwoColumns = watchFlexy.isTwoColumns_;
  watchFlexy.isTwoColumns_ = false;
  Object.defineProperty(watchFlexy, "isTwoColumns_", {
    get: function () {
      return false;
    },
    set: function (newVal) {
      origIsTwoColumns = newVal;
    },
    configurable: true,
  });

  watchFlexy.calculateCurrentPlayerSize_ = function () {
    let width = player.clientWidth;
    let ratio = watchFlexy.videoHeightToWidthRatio_;
    return { width, height: Math.floor(width * ratio) };
  };
}

async function restoreOrig() {
  const watchFlexy = await watchFlexyPromise;

  delete watchFlexy.isTwoColumns_;
  watchFlexy.isTwoColumns_ = origIsTwoColumns;

  watchFlexy.calculateCurrentPlayerSize_ = origCalculateCurrentPlayerSize_;
}

// async function proxyFullscreen() {
//   const ytdApp = await ytdAppPromise;
//   Object.defineProperty(ytdApp, "fullscreen_", {
//     set: function (x) {
//       // customevent

//       const event = new CustomEvent("fullscreen", { detail: x });
//       window.dispatchEvent(event);

//       this.fullscreen__ = x;
//     },
//     get: function () {
//       return this.fullscreen__;
//     },
//   });
// }

async function listenFullscreen() {
  console.log("listenFullscreen");
  const ytdApp = await ytdAppPromise;
  window.addEventListener("fullscreenchange", function (e) {
    const customEvent = new CustomEvent("fullscreen", { detail: ytdApp.fullscreen });
    window.dispatchEvent(customEvent);
    console.log("fullscreen", ytdApp.fullscreen);
  });
}


function loadComments() {
  // do I need to grab last if more than one???
  const nc = document.querySelector("ytd-comments yt-next-continuation");
  if (nc) {
    // nc.fire("yt-load-next-continuation", nc.getContinuationUrl.bind(nc));
    nc.trigger();
  }
}
