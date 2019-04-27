<template>
  <div id="warc-tab-headings" :style="headingsContainerStyle">
    <button v-on:click="descriptionTabClick" :class="{active: descriptionActive}">description</button>
    <button v-on:click="commentsTabClick" :class="{active: commentsActive}">comments</button>
    <button v-on:click="relatedTabClick" :class="{active: relatedActive}">related</button>
    <div v-html="sidebarStyles"></div>
  </div>
</template>

<script>
import Vue from "vue";

function scrollTo(scrollTo) {
  Vue.nextTick(function() {
    window.scroll(0, scrollTo);
  });
}

function fullscreenWatcher(tabHeadingsInstance) {
  var fullscreenChangeHandler = {
    set: function(obj, prop, value) {

      //

      obj[prop] = value;
    }
  };

  var p = new Proxy({}, handler);
}

const TabHeadings = {
  data: function() {
    return {
      descriptionActive: true,
      commentsActive: false,
      relatedActive: false,
      descriptionScrollTop: 0,
      commentsScrollTop: 0,
      relatedScrollTop: 0,
      headingsContainerStyle: {
        visibility: "visible"
      }
    };
  },
  methods: {
    saveScrollTop() {
      let scrollTop = document.documentElement.scrollTop;
      if (this.descriptionActive) {
        this.descriptionScrollTop = scrollTop;
      }
      if (this.commentsActive) {
        this.commentsScrollTop = scrollTop;
      }
      if (this.relatedActive) {
        this.relatedScrollTop = scrollTop;
      }
    },
    descriptionTabClick() {
      this.saveScrollTop();
      this.commentsActive = false;
      this.relatedActive = false;
      this.descriptionActive = true;
      scrollTo(this.descriptionScrollTop);
    },
    commentsTabClick() {
      this.saveScrollTop();
      this.relatedActive = false;
      this.descriptionActive = false;
      this.commentsActive = true;
      scrollTo(this.commentsScrollTop);
    },
    relatedTabClick() {
      this.saveScrollTop();
      this.commentsActive = false;
      this.descriptionActive = false;
      this.relatedActive = true;
      scrollTo(this.relatedScrollTop);
    }
  },
  computed: {
    sidebarStyles: function() {
      if (this.descriptionActive) {
        return `
        <style>
          #related.ytd-watch-flexy,
          #comments.ytd-watch-flexy {
            height: 0;
            overflow: hidden;
          }
        </style>
      `;
      }
      if (this.commentsActive) {
        return `
        <style>
          #primary-inner.ytd-watch-flexy > *:not(#player):not(#comments) {
            height: 0;
            overflow: hidden;
          }
        </style>
      `;
      }
      if (this.relatedActive) {
        return `
        <style>
          #primary-inner.ytd-watch-flexy > *:not(#player):not(#related) {
            height: 0;
            overflow: hidden;
          }
        </style>
      `;
      }
    }
  }
};

export default TabHeadings;
</script>

<style scoped>
div {
  position: fixed;
  top: 80px;
  z-index: 10000;
}
button {
  font-size: 20px;
}
button.active {
  background-color: pink;
}
</style>
