<template>
  <v-style>
    #above-the-fold {
      display: flex;
      flex-direction: column;
    }
    #above-the-fold #title {
      order: 1;
    }
    #above-the-fold #top-row {
      order: 3;
    }
    #above-the-fold #bottom-row {
      order: 2;
    }
    #top-row #description {
      order: 2;
    }
    #top-row #actions {
      order: 1;
    }
  </v-style>
</template>

<script>
export default {};
</script>

<style>
</style>