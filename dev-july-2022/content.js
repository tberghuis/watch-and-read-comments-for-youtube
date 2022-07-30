console.log("hello content");

inject();





/////////////////// functions

function inject() {
  var s = document.createElement("script");
  s.src = "http://127.0.0.1:5173/src/demo.ts";
  s.type = "module";
  document.head.appendChild(s);
}
