<template>
  <div id="warc-app" v-if="isOnWatchPage && extensionEnabled && !fullscreen">
    <StaticStyles></StaticStyles>
    <DescriptionOrder></DescriptionOrder>
    <DynStyles></DynStyles>
    <ResizeBar></ResizeBar>
    <TabHeadings></TabHeadings>
  </div>
</template>

<script>
import StaticStyles from "./components/StaticStyles.vue";
import DescriptionOrder from "./components/DescriptionOrder.vue";
import DynStyles from "./components/DynStyles.vue";
import ResizeBar from "./components/ResizeBar.vue";
import TabHeadings from "./components/TabHeadings.vue";

import { isOnWatchPage } from "./state/watch-page.js";
import { extensionEnabled } from "./state/extension-enabled.js";
import { fullscreen } from "./state/full-screen.js";

export default {
  name: "App",
  components: {
    StaticStyles,
    DescriptionOrder,
    DynStyles,
    ResizeBar,
    TabHeadings,
  },

  setup() {
    return {
      isOnWatchPage,
      extensionEnabled,
      fullscreen,
    };
  },
};
</script>

<style>
</style>
