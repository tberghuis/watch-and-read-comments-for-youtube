<template>
  <div id="warc-app">
    <div id="warc-resize-bar" v-bind:style="resizebarStyle"></div>
    <div v-html="appStyles"></div>
  </div>
</template>

<script>
import domElementsPromise from "../dom-element-dependencies";
import Vue from "vue";

const App = {
  data: function() {
    return {
      width: 500
    };
  },
  created: function() {
    window._APP = this;
  },
  computed: {
    appStyles: function() {
      Vue.nextTick(async function() {
        const { watchFlexy } = await domElementsPromise;
        watchFlexy.schedulePlayerSizeUpdate_();
      });
      return `
        <style>
          #player.ytd-watch-flexy {
            width: ${this.width}px;
          }
        </style>
      `;
    },
    resizebarStyle: function() {
      return {
        left: `${this.width}px`
      };
    }
  }
};

export default App;
</script>

<style>
#warc-resize-bar {
  position: fixed;
  width: 30px;
  background-color: black;
  left: 500px;
  top: 0;
  bottom: 0;
}
#warc-resize-bar:hover {
  cursor: ew-resize;
}

#player-container-outer.ytd-watch-flexy {
  min-width: 0 !important;
}
</style>
