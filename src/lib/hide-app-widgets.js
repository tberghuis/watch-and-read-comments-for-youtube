import { ytdAppPromise } from "../dom-element-dependencies";

export default async function hideAppWidgets(appInstance) {
  const ytdApp = await ytdAppPromise;

  Object.defineProperty(ytdApp, "fullscreen_", {
    set: function(x) {
      if (x) {
        appInstance.hideAppWidgets = true;
      } else if (window.location.href.indexOf("watch") > -1) {
        appInstance.hideAppWidgets = false;
      }
      this.fullscreen__ = x;
    },
    get: function() {
      return this.fullscreen__;
    }
  });

  if (window.location.href.indexOf("watch") > -1) {
    appInstance.hideAppWidgets = false;
  }
  document.body.addEventListener("yt-navigate-finish", function(event) {
    if (window.location.href.indexOf("watch") > -1) {
      appInstance.hideAppWidgets = false;
    } else {
      appInstance.hideAppWidgets = true;
    }
  });
}
