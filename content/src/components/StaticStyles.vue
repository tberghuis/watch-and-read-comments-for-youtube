<template>
  <v-style>
    #warc-resize-bar {
    position: fixed;
    width: 30px;
    left: 500px;
    top: 0;
    bottom: 0;
    opacity: 0.5;
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
    #info.ytd-video-primary-info-renderer {
    display: block !important;
    }
  </v-style>
</template>

<script>
export default {};
</script>

<style>
</style>