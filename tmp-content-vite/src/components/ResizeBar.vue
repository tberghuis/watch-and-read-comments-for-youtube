<template>
  <div ref="resizeBar" id="warc-resize-bar" v-bind:style="resizebarStyle">
    <div></div>
  </div>
</template>

<script>
import { computed, onMounted } from "vue";
import {
  resizeBar,
  resizebarDragging,
  resizebarLeft,
  setupResizebarDrag,
} from "../state/resize-bar.js";

export default {
  setup() {
    onMounted(() => {
      setupResizebarDrag();
    });

    const resizebarStyle = computed(() => {
      return {
        left: `${resizebarLeft.value}px`,
        backgroundColor: resizebarDragging.value ? "yellow" : "transparent",
      };
    });
    return {
      resizebarStyle,
      resizeBar,
    };
  },
};
</script>

<style>
</style>