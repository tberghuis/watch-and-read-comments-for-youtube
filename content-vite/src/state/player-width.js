import { ref } from "vue";
import { Subject } from "rxjs";
import { getStorageData } from "../util.js";
import { resizebarLeft } from "./resize-bar.js";

// init to null and wait???
// only write to playerWidth from playerWidthSubject subcription
export const playerWidth = ref(500);
// todo write a vue hook useSubject
export const playerWidthSubject = new Subject();

let playerWidthPercent = 0.5;

initPlayerWidth();
subscribePlayerWidthSubject();
// messageListen();

////////////// functions

async function initPlayerWidth() {
  playerWidthPercent = await getPlayerWidthPercentStorage();
  reinitPlayerWidth();
  onWindowResize();
}

function subscribePlayerWidthSubject() {
  playerWidthSubject.subscribe({
    next: (v) => {
      playerWidth.value = v;
      const schedulePlayerSizeUpdateEvent = new CustomEvent(
        "schedule-player-size-update"
      );
      window.dispatchEvent(schedulePlayerSizeUpdateEvent);
      setPlayerWidthPercentStorage();
    },
  });
}

// todo listen reset-divider-event

async function getPlayerWidthPercentStorage() {
  // not really a percentage but a fraction
  let playerWidthPercent = await getStorageData("playerWidthPercent");
  if (playerWidthPercent === undefined) {
    playerWidthPercent = 0.5;
  }
  return playerWidthPercent;
}

function reinitPlayerWidth() {
  const playerWidth = document.documentElement.clientWidth * playerWidthPercent;
  playerWidthSubject.next(playerWidth);
  resizebarLeft.value = 24 + playerWidth + 24 - 14;
}

async function setPlayerWidthPercentStorage() {
  playerWidthPercent = playerWidth.value / document.documentElement.clientWidth;
  chrome.storage.local.set({ playerWidthPercent }, function() {
    console.log("playerWidthPercent saved", playerWidthPercent);
  });
}

function onWindowResize() {
  let resizeTimer;
  window.onresize = function(event) {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function() {
      reinitPlayerWidth();
    }, 250);
  };
}

function messageListen() {
  chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.message === "reset-divider") {
      playerWidthPercent = 0.5;

      reinitPlayerWidth();
    }
  });
}
