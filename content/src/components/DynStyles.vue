<template>
  <v-style>
    #player.ytd-watch-flexy {
    width: {{playerWidth}}px;
    }
    #primary-inner.ytd-watch-flexy {
    margin-left: {{24 + playerWidth + 24 + 2 + 24}}px;
    }
    #warc-tab-headings {
    left: {{24 + playerWidth + 24 + 2 + 24}}px;
    }
  </v-style>
</template>

<script>
import { playerWidth } from "../state/player-width.js";

export default {
  setup() {
    return {
      playerWidth,
    };
  },
};
</script>

<style>
</style>