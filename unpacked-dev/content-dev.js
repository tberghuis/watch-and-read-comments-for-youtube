console.log("content-dev.js");

devInjectContent();

function devInjectContent() {
  console.log("REMOVE ME RELEASE VERSION, DEV ONLY");
  var s = document.createElement("script");
  s.src = "http://localhost:5173/src/main.js";
  s.type = "module";
  document.head.appendChild(s);
}
