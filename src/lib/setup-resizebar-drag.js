// should i worry about remove listeners, nah

export default function setupResizebarDrag(resizeBarRef, appInstance) {
  let leftMouseDownPageX = 0;

  resizeBarRef.addEventListener(
    "mousedown",
    function(e) {
      if (e.which === 1) {
        appInstance.resizebarDragging = true;
        leftMouseDownPageX = e.pageX;
      }
    },
    false
  );
  document.documentElement.addEventListener(
    "mousemove",
    function(e) {
      if (appInstance.resizebarDragging) {
        // this stops page from highlighting text
        e.preventDefault();
        let moveDist = e.pageX - leftMouseDownPageX;
        appInstance.resizebarLeft = leftMouseDownPageX + moveDist - 15;
      }
    },
    false
  );
  document.documentElement.addEventListener(
    "mouseup",
    function(e) {
      if (e.which === 1 && appInstance.resizebarDragging) {
        appInstance.resizebarDragging = false;
        appInstance.playerWidth = appInstance.resizebarLeft - 24 - 24 + 14;
        let pwp =
          appInstance.playerWidth / document.documentElement.clientWidth;
        // this is probably overkill, included for performance reasons
        Promise.resolve().then(() =>
          localStorage.setItem("warc-player-width-percent", pwp)
        );
      }
    },
    false
  );
}
