export default function setupResizebarDrag(resizeBarRef, appInstance) {
  // console.log(
  //   "TCL: setupResizebarDrag -> resizeBarRef, appInstance",
  //   resizeBarRef,
  //   appInstance
  // );

  // resizeBarRef.addEventListener
  // appInstance.resizebarLeft

  let leftMouseDown = false;
  let leftMouseDownPageX = 0;

  resizeBarRef.addEventListener(
    "mousedown",
    function(e) {
      if (e.which === 1) {
        e.preventDefault();
        leftMouseDown = true;
        leftMouseDownPageX = e.pageX;
      }
    },
    false
  );
  resizeBarRef.addEventListener(
    "mousemove",
    function(e) {
      // console.log("mousemove");
      if (leftMouseDown) {
        e.preventDefault();
        let moveDist = e.pageX - leftMouseDownPageX;
        console.log("TCL: setupResizebarDrag -> moveDist", moveDist);
        appInstance.resizebarLeft += moveDist;
      }
    },
    false
  );
  // resizeBarRef.addEventListener(
  //   "mouseup",
  //   function() {
  //     if (flag === 0) {
  //       console.log("click");
  //     } else if (flag === 1) {
  //       console.log("drag");
  //     }
  //   },
  //   false
  // );
}
