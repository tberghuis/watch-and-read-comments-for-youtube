console.log("hello content");

createVueRoot();

inject("inject-vite.js");

// for release, built content.js does not need to be injected
devInjectContent();

///////////////// functions

function devInjectContent() {
  console.log("REMOVE ME RELEASE VERSION, DEV ONLY");
  var s = document.createElement("script");
  s.src = "http://localhost:5173/src/main.js";
  s.type = "module";
  document.head.appendChild(s);
}

function createVueRoot() {
  var elemDiv = document.createElement("div");
  elemDiv.id = "vue-app";
  document.body.appendChild(elemDiv);
}

function inject(filename, isModule) {
  var s = document.createElement("script");
  s.src = chrome.runtime.getURL(filename);
  if (isModule) {
    s.type = "module";
  }

  (document.head || document.documentElement).appendChild(s);
}
