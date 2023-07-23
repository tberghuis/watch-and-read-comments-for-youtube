console.log("hello content");

createVueRoot();

inject("inject-vite.js");

///////////////// functions

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
