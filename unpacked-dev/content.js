console.log("hello content.js");

var elemDiv = document.createElement("div");
elemDiv.id = "vue-app";
document.body.appendChild(elemDiv);

// This only to happen in content.dev.js
evalVueScripts("https://localhost:8080/js/chunk-vendors.js");
evalVueScripts("https://localhost:8080/js/app.js");

// version 6.6.3
inject("rxjs.js");
inject("inject.js", true);

/////////////////// functions

function evalVueScripts(url) {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", url, true);
  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4) {
      var resp = eval(xhr.responseText);
    }
  };
  xhr.send();
}

function inject(filename, isModule) {
  var s = document.createElement("script");
  s.src = chrome.runtime.getURL(filename);
  if (isModule) {
    s.type = "module";
  }

  (document.head || document.documentElement).appendChild(s);
}
