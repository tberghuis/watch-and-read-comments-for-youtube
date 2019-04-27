import Vue from "vue";
import App from "./components/App.vue";
import { watchFlexyPromise, playerPromise } from "./dom-element-dependencies";

async function overridePageJavascript() {
  const watchFlexy = await watchFlexyPromise;
  const player = await playerPromise;
  watchFlexy.isTwoColumns_ = false;
  // somehow works with observers
  Object.defineProperty(watchFlexy, "isTwoColumns_", {
    get: function() {
      return false;
    }
  });
  watchFlexy.calculateCurrentPlayerSize_ = function() {
    let width = player.clientWidth;
    let ratio = watchFlexy.videoHeightToWidthRatio_;
    return { width, height: width * ratio };
  };
}

function appendVueRootElement() {
  var elem = document.createElement("div");
  document.body.appendChild(elem);
  const vueInstance = new Vue({
    el: elem,
    render: h => h(App)
  });
}

function run() {
  overridePageJavascript();
  appendVueRootElement();
}

run();
