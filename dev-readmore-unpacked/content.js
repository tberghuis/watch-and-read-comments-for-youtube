console.log("hello content");

listenNavigateFinish();

////////// functions /////////////////
function listenNavigateFinish() {
  document.body.addEventListener("yt-navigate-finish", function (event) {
    console.log("yt-navigate-finish");

    const showMore = document.querySelector("tp-yt-paper-button#expand");
    console.log("showMore", showMore);
  });
}
