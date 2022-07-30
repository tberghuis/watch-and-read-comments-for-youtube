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
listenFullscreen();
expandDescriptionWhenEnabled();

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

  // window.addEventListener("warc-load-comments", loadComments);
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

  // watchFlexy.calculateCurrentPlayerSize_ = function () {
  //   let width = player.clientWidth;
  //   let ratio = watchFlexy.videoHeightToWidthRatio_;
  //   return { width, height: Math.floor(width * ratio) };
  // };

  watchFlexy.calculateCurrentPlayerSize_ = function () {
    let width = player.clientWidth;
    // 104 = 56 + (2 * 24)
    let height = document.documentElement.clientHeight - 104;
    return { width, height };
  };
}

async function restoreOrig() {
  const watchFlexy = await watchFlexyPromise;

  delete watchFlexy.isTwoColumns_;
  watchFlexy.isTwoColumns_ = origIsTwoColumns;

  watchFlexy.calculateCurrentPlayerSize_ = origCalculateCurrentPlayerSize_;
}

async function listenFullscreen() {
  // console.log("listenFullscreen");
  const ytdApp = await ytdAppPromise;
  window.addEventListener("fullscreenchange", function (e) {
    const customEvent = new CustomEvent("fullscreen", {
      detail: ytdApp.fullscreen,
    });
    window.dispatchEvent(customEvent);
    // console.log("fullscreen", ytdApp.fullscreen);
  });
}

function loadComments() {
  document.querySelector("yt-visibility-monitor").markDirty();
}

function expandDescription() {
  const expander = document.querySelector(
    "ytd-text-inline-expander#description-inline-expander"
  );
  console.log("expander", expander);

  if (expander) {
    expander.setAttribute("is-expanded", "");
  }
}

function expandDescriptionWhenEnabled() {
  extensionEnabledSubject.subscribe({
    next: (v) => {
      if (v) {
        document.body.addEventListener(
          "yt-page-data-updated",
          expandDescription
        );
      } else {
        document.body.removeEventListener(
          "yt-page-data-updated",
          expandDescription
        );
      }
    },
  });
}
