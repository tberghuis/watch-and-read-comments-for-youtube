import { ytdAppPromise } from "../dom-element-dependencies";

export default async function watchPlayerFullscreen(appInstance) {
  const ytdApp = await ytdAppPromise;
  // ytdApp.fullscreen_ = new Proxy({}, validator);

  Object.defineProperty(ytdApp, "fullscreen_", {
    set: function(x) {
      if (x) {
        appInstance.playerFullscreen = true;
      } else {
        appInstance.playerFullscreen = false;
      }
      this.fullscreen__ = x;
    },
    get: function() {
      return this.fullscreen__;
    }
  });
}
