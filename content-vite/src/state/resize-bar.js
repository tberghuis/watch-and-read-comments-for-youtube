import { ref } from "vue";
import { playerWidthSubject } from "./player-width.js";

export const resizebarDragging = ref(false);
export const resizebarLeft = ref(24 + 500 + 24 - 14);

export const resizeBar = ref(null);

let leftMouseDownPageX = 0;

addPersistentEventListeners();

//////////// functions

export function setupResizebarDrag() {
  // will it blend (ref work properly) toggle extension enabled

  resizeBar.value.addEventListener(
    "mousedown",
    function(e) {
      if (e.which === 1) {
        resizebarDragging.value = true;
        leftMouseDownPageX = e.pageX;
      }
    },
    false
  );
}

function addPersistentEventListeners() {
  document.documentElement.addEventListener(
    "mousemove",
    function(e) {
      if (resizebarDragging.value) {
        // this stops page from highlighting text
        e.preventDefault();
        let moveDist = e.pageX - leftMouseDownPageX;
        resizebarLeft.value = leftMouseDownPageX + moveDist - 15;
      }
    },
    false
  );

  document.documentElement.addEventListener(
    "mouseup",
    function(e) {
      if (e.which === 1 && resizebarDragging.value) {
        resizebarDragging.value = false;
        let playerWidth = resizebarLeft.value - 24 - 24 + 14;
        playerWidthSubject.next(playerWidth);
      }
    },
    false
  );
}

// TODO remove resizeBar listener when extension disabled
