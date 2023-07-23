var elemDiv = document.createElement("div");
elemDiv.id = "vue-app";
document.body.appendChild(elemDiv);

// version 6.6.3
// inject("rxjs.js");
// inject("inject.js", true);

inject("inject-vite.js");

/////////////////// functions

function inject(filename, isModule) {
  var s = document.createElement("script");
  s.src = chrome.runtime.getURL(filename);
  if (isModule) {
    s.type = "module";
  }

  (document.head || document.documentElement).appendChild(s);
}