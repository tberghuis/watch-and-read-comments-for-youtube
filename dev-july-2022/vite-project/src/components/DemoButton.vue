<script setup lang="ts">
import { ref } from 'vue'

const demoClick = () => {
  console.log("demo click");
}
</script>

<template>
  <div>
    <button @click="demoClick">
      demo button changed
    </button>
  </div>
</template>

<style scoped>
div {
  position: fixed;
  z-index: 10000;
}
</style>
