<template>
  <div id="warc-tab-headings">
    <button v-on:click="descriptionTabClick" :class="{active: descriptionActive}">description</button>
    <button v-on:click="commentsTabClick" :class="{active: commentsActive}">comments</button>
    <button v-on:click="relatedTabClick" :class="{active: relatedActive}">related</button>
    <div v-html="sidebarStyles"></div>
  </div>
</template>

<script>
const TabHeadings = {
  data: function() {
    return {
      descriptionActive: true,
      commentsActive: false,
      relatedActive: false
    };
  },
  methods: {
    descriptionTabClick() {
      console.log("descriptionTabClick");

      // TODO save scroll position

      this.commentsActive = false;
      this.relatedActive = false;
      this.descriptionActive = true;
    },
    commentsTabClick() {
      // TODO save scroll position

      this.relatedActive = false;
      this.descriptionActive = false;
      this.commentsActive = true;
    },
    relatedTabClick() {
      // TODO save scroll position

      this.commentsActive = false;
      this.descriptionActive = false;
      this.relatedActive = true;
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
  font-size: 30px;
}
button.active {
  background-color: pink;
}
</style>
