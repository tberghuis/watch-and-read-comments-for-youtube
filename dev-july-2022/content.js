console.log("hello content");


createVueRoot();
inject();

/////////////////// functions

function inject() {
  var s = document.createElement("script");
  s.src = "http://127.0.0.1:5173/src/demo.ts";
  s.type = "module";
  document.head.appendChild(s);
}

function createVueRoot() {
  var elemDiv = document.createElement("div");
  elemDiv.id = "vue-app";
  document.body.appendChild(elemDiv);
}
