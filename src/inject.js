import Vue from "vue";
import App from "./components/App.vue";
import domElementsPromise from "./dom-element-dependencies";

// i could have done this in dom-element-dependencies
async function overrideCalculateCurrentPlayerSize() {
  const { player, watchFlexy } = await domElementsPromise;
  watchFlexy.isTwoColumns_ = false;
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
  overrideCalculateCurrentPlayerSize();
  appendVueRootElement();
}

run();
