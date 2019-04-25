<template>
  <div id="warc-app">
    <div ref="resizeBar" id="warc-resize-bar" v-bind:style="resizebarStyle"></div>
    <div v-html="appStyles"></div>
  </div>
</template>

<script>
import domElementsPromise from "../dom-element-dependencies";
import Vue from "vue";
import setupResizebarDrag from "../lib/setup-resizebar-drag";

const App = {
  data: function() {
    return {
      width: 500,
      resizebarLeft: 500
    };
  },
  // beforeCreate: function() {
  //   console.log("beforeCreate", JSON.parse(JSON.stringify(this.$refs)));
  // },
  // created: function() {
  //   console.log("created", JSON.parse(JSON.stringify(this.$refs)));
  // },
  // beforeMount: function() {
  //   console.log("beforeMount", JSON.parse(JSON.stringify(this.$refs)));
  // },
  mounted: function() {
    // console.log("mounted", JSON.parse(JSON.stringify(this.$refs.resizeBar)));
    // console.log("mounted", this.$refs.resizeBar);
    // console.log("addEventListener", this.$refs.resizeBar.addEventListener);
    setupResizebarDrag(this.$refs.resizeBar, this);
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
        left: `${this.resizebarLeft}px`
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
