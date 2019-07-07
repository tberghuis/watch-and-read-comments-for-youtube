<template>
  <div id="warc-app">
    <div
      ref="resizeBar"
      id="warc-resize-bar"
      :class="{ hidden: hideAppWidgets }"
      v-bind:style="resizebarStyle"
    >
      <div></div>
    </div>
    <div v-html="appStyles"></div>
    <TabHeadings :class="{ hidden: hideAppWidgets }"></TabHeadings>
  </div>
</template>

<script>
import { watchFlexyPromise } from "../dom-element-dependencies";
import Vue from "vue";
import setupResizebarDrag from "../lib/setup-resizebar-drag";
import TabHeadings from "./TabHeadings";
import hideAppWidgets from "../lib/hide-app-widgets";

const App = {
  data: function() {
    return {
      resizebarDragging: false,
      resizebarLeft: 24 + 500 + 24 - 14,
      playerWidth: 500,
      playerWidthPercent: 0.5,
      appStyles: "",
      // must be a better way, probably vuex
      hideAppWidgets: true
    };
  },
  beforeCreate: function() {
    hideAppWidgets(this);
    const appInstance = this;
    window.addEventListener("reset-divider-event", function() {
      appInstance.playerWidthPercent = 0.5;
      appInstance.setPlayerWidth();
      // save to localstorage
      Promise.resolve().then(() =>
        localStorage.setItem(
          "warc-player-width-percent",
          appInstance.playerWidthPercent
        )
      );
    });
  },
  mounted: function() {
    let pwp = localStorage.getItem("warc-player-width-percent");
    this.playerWidthPercent = pwp ? pwp : 0.5;

    this.setPlayerWidth();
    
    setupResizebarDrag(this.$refs.resizeBar, this);
  },
  watch: {
    playerWidth: function(playerWidth) {
      this.appStyles = `
        <style>
          #player.ytd-watch-flexy {
            width: ${playerWidth}px;
          }
          #primary-inner.ytd-watch-flexy {
            margin-left: ${24 + playerWidth + 24 + 2 + 24}px;
          }
          #warc-tab-headings {
            left: ${24 + playerWidth + 24 + 2 + 24}px;
          }
        </style>
      `;
      Vue.nextTick(async function() {
        const watchFlexy = await watchFlexyPromise;
        watchFlexy.schedulePlayerSizeUpdate_();
      });
    }
  },
  computed: {
    resizebarStyle: function() {
      return {
        left: `${this.resizebarLeft}px`,
        backgroundColor: this.resizebarDragging ? "yellow" : "transparent"
      };
    }
  },
  components: {
    TabHeadings
  },
  methods: {
    setPlayerWidth: function() {
      this.playerWidth =
        document.documentElement.clientWidth * this.playerWidthPercent;
      this.resizebarLeft = 24 + this.playerWidth + 24 - 14;
    }
  }
};

export default App;

</script>

<style>
#warc-resize-bar {
  position: fixed;
  width: 30px;
  left: 500px;
  top: 0;
  bottom: 0;
  opacity: 0.5;
}
#warc-resize-bar.hidden,
.hidden #warc-tab-headings {
  visibility: "hidden";
}
#warc-resize-bar > div {
  margin: auto;
  width: 2px;
  background-color: black;
  height: 100%;
}
#warc-resize-bar:hover {
  cursor: ew-resize;
}
#player-container-outer.ytd-watch-flexy {
  min-width: 0 !important;
}
#player.ytd-watch-flexy {
  position: fixed !important;
  left: 24px;
  top: 80px;
}
#columns.ytd-watch-flexy,
#primary.ytd-watch-flexy {
  margin: 0 !important;
  padding: 0 !important;
  max-width: initial !important;
}
#player-container-outer.ytd-watch-flexy {
  max-width: initial !important;
}
#columns.ytd-watch-flexy {
  margin-right: 24px !important;
  margin-top: 64px !important;
  display: block !important;
}
</style>
