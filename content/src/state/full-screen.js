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
