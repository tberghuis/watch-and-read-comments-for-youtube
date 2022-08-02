import { createApp, h } from "vue";
import App from "./App.vue";

const app = createApp(App);

app.component("v-style", {
  render() {
    return h(
      "style", // tag name
      {}, // props/attributes
      this.$slots.default() // array of children
    );
  },
});

app.mount("#vue-app");

console.log("hello vue main.js");

console.log("NODE_ENV", process.env.NODE_ENV);
