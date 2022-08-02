import { ref } from "vue";

export const isOnWatchPage = ref(checkOnWatchPage());

console.log("isOnWatchPage", isOnWatchPage);

listenNavigateFinish();

///////////// functions

function checkOnWatchPage() {
  if (window.location.href.indexOf("watch") > -1) {
    return true;
  }
  return false;
}

function listenNavigateFinish() {
  document.body.addEventListener("yt-navigate-finish", function (event) {
    isOnWatchPage.value = checkOnWatchPage();
  });
}
