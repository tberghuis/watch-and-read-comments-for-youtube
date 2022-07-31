import { ref } from "vue";

export const fullscreen = ref(false);

listenFullscreenEvent();

////////////// functions

async function listenFullscreenEvent() {
  // is this event unique??? should i namespace...
  window.addEventListener("fullscreen", function(e) {
    console.log("fullscreen: ", e.detail);
    fullscreen.value = e.detail;
  });
}

// async function listenFullscreenEvent() {
//   window.addEventListener("fullscreenchange", function(event) {
//     console.log("yt-fullscreen-change-action");
//     var ytdApp = document.querySelector("ytd-app");
//     console.log("fullscreen", ytdApp.fullscreen);
//   });
// }
