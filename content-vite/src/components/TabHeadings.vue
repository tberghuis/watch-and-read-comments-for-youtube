<template>
  <div id="warc-tab-headings">
    <button v-on:click="descriptionTabClick" :class="{ active: descriptionActive }">description</button>
    <button v-on:click="commentsTabClick" :class="{ active: commentsActive }">comments</button>
    <button v-on:click="relatedTabClick" :class="{ active: relatedActive }">related</button>
    <button v-on:click="chatTabClick" :class="{ active: chatActive }">chat</button>
    <div v-html="sidebarStyles"></div>
  </div>
</template>

<script>
import { nextTick } from "vue";

function scrollTo(scrollTo) {
  nextTick(function () {
    window.scroll(0, scrollTo);
  });
}

const TabHeadings = {
  data: function () {
    return {
      descriptionActive: true,
      commentsActive: false,
      relatedActive: false,
      chatActive: false,
      descriptionScrollTop: 0,
      commentsScrollTop: 0,
      relatedScrollTop: 0,
      chatScrollTop: 0,
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
      if (this.chatActive) {
        this.chatScrollTop = scrollTop;
      }
    },
    descriptionTabClick() {
      this.saveScrollTop();
      this.commentsActive = false;
      this.relatedActive = false;
      this.chatActive = false;
      this.descriptionActive = true;
      scrollTo(this.descriptionScrollTop);
    },
    commentsTabClick() {
      this.saveScrollTop();
      this.relatedActive = false;
      this.descriptionActive = false;
      this.chatActive = false;
      this.commentsActive = true;
      scrollTo(this.commentsScrollTop);

      // const event = new CustomEvent("warc-load-comments");
      // window.dispatchEvent(event);

    },
    relatedTabClick() {
      this.saveScrollTop();
      this.commentsActive = false;
      this.descriptionActive = false;
      this.chatActive = false;
      this.relatedActive = true;
      scrollTo(this.relatedScrollTop);
    },
    chatTabClick() {
      this.saveScrollTop();
      this.commentsActive = false;
      this.descriptionActive = false;
      this.relatedActive = false;
      this.chatActive = true;
      scrollTo(this.relatedScrollTop);
    },
  },
  computed: {
    sidebarStyles: function () {
      if (this.descriptionActive) {
        return `
        <style>
          #below > *:not(ytd-watch-metadata), #comment-teaser {
            height: 0;
            overflow: hidden;
            margin: 0;
            padding: 0;
          }
          ytd-live-chat-frame {
            display: none;
          }
        </style>
      `;
      }
      if (this.commentsActive) {
        return `
        <style>
          #below > *:not(#comments) {
            height: 0;
            overflow: hidden;
            margin: 0;
            padding: 0;
          }
          ytd-live-chat-frame {
            display: none;
          }
        </style>
      `;
      }
      if (this.relatedActive) {
        return `
        <style>
          #below > *:not(#related) {
            height: 0;
            overflow: hidden;
            margin: 0;
            padding: 0;
          }
          ytd-live-chat-frame {
            display: none;
          }
        </style>
      `;
      }
      if (this.chatActive) {
        return `
        <style>
          #below > *:not(#chat) {
            height: 0;
            overflow: hidden;
            margin: 0;
            padding: 0;
          }
        </style>
      `;
      }
    },
  },
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
