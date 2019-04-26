// should i worry about remove listeners, nah

export default function setupResizebarDrag(resizeBarRef, appInstance) {
  let leftMouseDown = false;
  let leftMouseDownPageX = 0;

  resizeBarRef.addEventListener(
    "mousedown",
    function(e) {
      if (e.which === 1) {
        leftMouseDown = true;
        leftMouseDownPageX = e.pageX;
        // console.log("leftMouseDownPageX", leftMouseDownPageX);
      }
    },
    false
  );
  document.documentElement.addEventListener(
    "mousemove",
    function(e) {
      if (leftMouseDown) {
        // this stops page from highlighting text
        e.preventDefault();
        let moveDist = e.pageX - leftMouseDownPageX;
        // console.log("e.pageX", e.pageX);
        appInstance.resizebarLeft = leftMouseDownPageX + moveDist - 15;
      }
    },
    false
  );
  document.documentElement.addEventListener(
    "mouseup",
    function(e) {
      if (e.which === 1 && leftMouseDown) {
        leftMouseDown = false;
        appInstance.playerWidth = appInstance.resizebarLeft - 48;
      }
    },
    false
  );
}
