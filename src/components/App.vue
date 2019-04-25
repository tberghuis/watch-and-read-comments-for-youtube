<template>
  <div id="warc-app">
    <div id="warc-resize-bar" v-bind:style="resizebarStyle"></div>
    <div v-html="appStyles"></div>
    <div v-html="fixedStyles"></div>
  </div>
</template>

<script>
import domElementsPromise from "../dom-element-dependencies";
import Vue from "vue";

const fixedStyles = `
  <style>
    #player-container-outer.ytd-watch-flexy {
      min-width: 0 !important;
    }
  </style>
`;

const App = {
  data: function() {
    return {
      width: 500,
      fixedStyles
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
  width: 2px;
  background-color: black;
  left: 500px;
  top: 0;
  bottom: 0;
}
</style>
